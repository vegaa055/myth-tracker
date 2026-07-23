/**
 * Seed the Neo4j database with the bundled myth dataset.
 *
 * Usage: npm run seed
 * Requires a running Neo4j instance (see README) and .env.local credentials.
 *
 * Graph model:
 *   (:Myth)<-[:VARIANT_OF]-(:Variant)-[:TOLD_BY]->(:Culture)
 *   (:Variant)-[:CONTAINS_MOTIF {role}]->(:Motif)
 *   (:Myth)-[:REFERENCE_VARIANT]->(:Variant)
 *   (:Variant)-[:SIMILAR_TO {score, verdict, sharedMotifs}]->(:Variant)
 *     (precomputed with the same engine the app uses, so the graph is
 *      independently explorable in Neo4j Browser)
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import neo4j from "neo4j-driver";
import { motifs, motifIndex } from "../data/motifs";
import { cultures } from "../data/cultures";
import { myths, variants } from "../data/myths";
import { pairwiseSimilarities } from "../lib/similarity";

const URI = process.env.NEO4J_URI ?? "bolt://localhost:7687";
const USER = process.env.NEO4J_USER ?? "neo4j";
const PASSWORD = process.env.NEO4J_PASSWORD ?? "mythtracker";

async function main() {
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
    console.log("Seed complete.");
  } finally {
    await session.close();
    await driver.close();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
});
