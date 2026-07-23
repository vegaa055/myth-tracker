/**
 * Seed the Neo4j database with the bundled myth dataset.
 *
 * Usage:
 *   npm run seed                    # uses .env.local  (local Docker Neo4j)
 *   npm run seed:aura               # uses .env.aura   (Neo4j AuraDB)
 *   npx tsx scripts/seed.ts --env-file=path/to/file
 *
 * Every setting is reported before connecting, including WHERE it came
 * from — the common failure is a URI from one source and a password from
 * another (e.g. an Aura URI in the shell, but the local password still
 * being picked up from .env.local).
 *
 * Graph model:
 *   (:Myth)<-[:VARIANT_OF]-(:Variant)-[:TOLD_BY]->(:Culture)
 *   (:Variant)-[:CONTAINS_MOTIF {role}]->(:Motif)
 *   (:Myth)-[:REFERENCE_VARIANT]->(:Variant)
 *   (:Variant)-[:SIMILAR_TO {score, verdict, sharedMotifs}]->(:Variant)
 *     (precomputed with the same engine the app uses, so the graph is
 *      independently explorable in Neo4j Browser)
 */
import { existsSync } from "node:fs";
import { config } from "dotenv";

const args = process.argv.slice(2);
const envFile =
  args.find((a) => a.startsWith("--env-file="))?.split("=").slice(1).join("=") ??
  ".env.local";

// Record which vars the shell already supplied, so we can report the source
// of each value. dotenv does not override existing vars: shell wins.
const TRACKED = [
  "NEO4J_URI",
  "NEO4J_USER",
  "NEO4J_USERNAME",
  "NEO4J_PASSWORD",
] as const;
const fromShell = new Set(TRACKED.filter((k) => process.env[k] !== undefined));

const envFileFound = existsSync(envFile);
if (envFileFound) config({ path: envFile, quiet: true });

import neo4j, { Neo4jError } from "neo4j-driver";
import { motifs, motifIndex } from "../data/motifs";
import { cultures } from "../data/cultures";
import { myths, variants } from "../data/myths";
import { pairwiseSimilarities } from "../lib/similarity";

/** Trim stray whitespace/quotes from copy-pasted credentials. */
function clean(v: string | undefined): string | undefined {
  if (v === undefined) return undefined;
  return v.trim().replace(/^["'](.*)["']$/s, "$1");
}

function sourceOf(...keys: (typeof TRACKED)[number][]): string {
  for (const k of keys) {
    if (fromShell.has(k)) return "shell";
    if (process.env[k] !== undefined) return envFile;
  }
  return "built-in default";
}

const rawUri = process.env.NEO4J_URI;
const rawUser = process.env.NEO4J_USER ?? process.env.NEO4J_USERNAME;
const rawPassword = process.env.NEO4J_PASSWORD;

const URI = clean(rawUri) ?? "bolt://localhost:7687";
// Aura's downloaded credentials file uses NEO4J_USERNAME; accept either.
const USER = clean(rawUser) ?? "neo4j";
const PASSWORD = clean(rawPassword) ?? "mythtracker";

const uriSource = sourceOf("NEO4J_URI");
const userSource = sourceOf("NEO4J_USER", "NEO4J_USERNAME");
const passwordSource = sourceOf("NEO4J_PASSWORD");
const isAura = /neo4j\+s(sc)?:\/\/|databases\.neo4j\.io/.test(URI);

function reportConfig() {
  console.log("Connection settings");
  console.log(
    `  env file       ${envFile}${envFileFound ? "" : "  (not found — skipped)"}`
  );
  console.log(`  NEO4J_URI      ${URI}   [${uriSource}]`);
  console.log(`  NEO4J_USER     ${USER}   [${userSource}]`);
  console.log(
    `  NEO4J_PASSWORD ${"*".repeat(Math.min(PASSWORD.length, 24))} ` +
      `(${PASSWORD.length} chars)   [${passwordSource}]`
  );
  if (rawPassword !== undefined && rawPassword !== PASSWORD) {
    console.log("  note: surrounding whitespace/quotes trimmed from password");
  }
  // The exact trap that produces a confusing auth failure.
  if (isAura && passwordSource !== uriSource) {
    console.log(
      `\n  WARNING: the URI points at Aura (from ${uriSource}) but the password\n` +
        `  came from ${passwordSource}. If that is your local password rather than\n` +
        `  the Aura one, authentication will fail. Put all three values in the\n` +
        `  same place — see README "Option A".`
    );
  }
  if (isAura && PASSWORD === "mythtracker") {
    console.log(
      "\n  WARNING: using the local development password against an Aura URI."
    );
  }
  console.log("");
}

function explainFailure(err: unknown): void {
  const code = err instanceof Neo4jError ? err.code : "";
  const message = err instanceof Error ? err.message : String(err);

  if (code === "Neo.ClientError.Security.Unauthorized") {
    console.error("\nAuthentication failed — the server rejected these credentials.");
    console.error("Checklist:");
    console.error(
      `  1. Is the password above the one for THIS database (${URI})?`
    );
    console.error(
      `     It came from: ${passwordSource}. Aura shows its password once, at`
    );
    console.error(
      "     instance creation, in the downloaded credentials file."
    );
    console.error("  2. Username for Aura is 'neo4j' unless you changed it.");
    console.error(
      "  3. Re-copy the password — a truncated or partially pasted value is the"
    );
    console.error(
      `     usual cause (this one is ${PASSWORD.length} characters; Aura's are typically 43).`
    );
    console.error(
      "  4. Put NEO4J_URI, NEO4J_USER and NEO4J_PASSWORD together in .env.aura,"
    );
    console.error("     then run: npm run seed:aura");
    return;
  }

  if (
    code === "ServiceUnavailable" ||
    /ENOTFOUND|EAI_AGAIN|ECONNREFUSED|routing|timed out/i.test(message)
  ) {
    console.error(`\nCould not reach the database at ${URI}.`);
    console.error("Checklist:");
    if (isAura) {
      console.error("  1. Is the instance RUNNING in the Aura console? Free");
      console.error("     instances pause automatically after inactivity and");
      console.error("     must be resumed before they accept connections.");
      console.error("  2. Aura URIs use the neo4j+s:// scheme (TLS), not bolt://.");
    } else {
      console.error("  1. Is the container up?  docker ps");
      console.error("  2. Local URI should be bolt://localhost:7687");
    }
    console.error(`\nUnderlying error: ${message}`);
    return;
  }

  console.error(`\nSeed failed: ${message}`);
}

async function main() {
  reportConfig();
  const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
  const session = driver.session();
  try {
    await driver.verifyConnectivity();
    console.log(`Connected to ${URI}`);

    // Constraints (idempotent)
    for (const label of ["Myth", "Variant", "Motif", "Culture"]) {
      await session.run(
        `CREATE CONSTRAINT ${label.toLowerCase()}_id IF NOT EXISTS
         FOR (n:${label}) REQUIRE n.id IS UNIQUE`
      );
    }

    // Wipe previous seed data for a clean, repeatable load.
    await session.run(`MATCH (n) WHERE n:Myth OR n:Variant OR n:Motif OR n:Culture DETACH DELETE n`);
    console.log("Cleared existing Myth/Variant/Motif/Culture nodes");

    for (const mo of motifs) {
      await session.run(
        `CREATE (m:Motif {id: $id, name: $name, description: $description, attestations: $attestations})`,
        mo
      );
    }
    console.log(`Created ${motifs.length} motifs`);

    for (const c of cultures) {
      await session.run(
        `CREATE (c:Culture {id: $id, name: $name, region: $region, period: $period, description: $description})`,
        c
      );
    }
    console.log(`Created ${cultures.length} cultures`);

    for (const m of myths) {
      await session.run(
        `CREATE (m:Myth {
           id: $id, name: $name, aka: $aka, description: $description,
           originKnown: $originKnown, originLat: $originLat, originLng: $originLng,
           originRegion: $originRegion, originNote: $originNote,
           originEstimatedAge: $originEstimatedAge
         })`,
        {
          id: m.id,
          name: m.name,
          aka: m.aka,
          description: m.description,
          originKnown: m.origin.known,
          originLat: m.origin.lat ?? null,
          originLng: m.origin.lng ?? null,
          originRegion: m.origin.region ?? null,
          originNote: m.origin.note,
          originEstimatedAge: m.origin.estimatedAge,
        }
      );
    }
    console.log(`Created ${myths.length} myths`);

    for (const v of variants) {
      await session.run(
        `MATCH (m:Myth {id: $mythId}), (c:Culture {id: $cultureId})
         CREATE (v:Variant {
           id: $id, title: $title, region: $region, lat: $lat, lng: $lng,
           attestation: $attestation, summary: $summary, fullText: $fullText,
           variations: $variations
         })
         CREATE (v)-[:VARIANT_OF]->(m)
         CREATE (v)-[:TOLD_BY]->(c)`,
        {
          id: v.id,
          mythId: v.mythId,
          cultureId: v.cultureId,
          title: v.title,
          region: v.region,
          lat: v.lat,
          lng: v.lng,
          attestation: v.attestation,
          summary: v.summary,
          fullText: v.fullText,
          variations: v.variations,
        }
      );
      for (const vm of v.motifs) {
        await session.run(
          `MATCH (v:Variant {id: $vid}), (mo:Motif {id: $mid})
           CREATE (v)-[:CONTAINS_MOTIF {role: $role}]->(mo)`,
          { vid: v.id, mid: vm.motifId, role: vm.role }
        );
      }
    }
    console.log(`Created ${variants.length} variants with motif links`);

    for (const m of myths) {
      if (m.referenceVariantId) {
        await session.run(
          `MATCH (m:Myth {id: $mid}), (v:Variant {id: $vid})
           CREATE (m)-[:REFERENCE_VARIANT]->(v)`,
          { mid: m.id, vid: m.referenceVariantId }
        );
      }
    }

    // Precompute similarity edges (score > 0.1 to keep the graph readable).
    const sims = pairwiseSimilarities(variants, motifIndex).filter(
      (s) => s.score > 0.1
    );
    for (const s of sims) {
      await session.run(
        `MATCH (a:Variant {id: $a}), (b:Variant {id: $b})
         CREATE (a)-[:SIMILAR_TO {
           score: $score, verdict: $verdict,
           sharedMotifs: $sharedMotifs, corePenalty: $corePenalty
         }]->(b)`,
        {
          a: s.a,
          b: s.b,
          score: Math.round(s.score * 1000) / 1000,
          verdict: s.verdict,
          sharedMotifs: s.sharedMotifs.map((sm) => sm.name),
          corePenalty: Math.round(s.corePenalty * 1000) / 1000,
        }
      );
    }
    console.log(`Created ${sims.length} SIMILAR_TO edges`);
    console.log(`\nSeed complete — ${URI} is ready to serve the app.`);
  } finally {
    await session.close();
    await driver.close();
  }
}

main().catch((err) => {
  explainFailure(err);
  process.exit(1);
});
