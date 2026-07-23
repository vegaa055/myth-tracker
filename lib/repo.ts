import type {
  Culture,
  Dataset,
  Motif,
  Myth,
  MotifRole,
  Variant,
} from "./types";
import { getDriver, describeNeo4jError } from "./neo4j";
import { motifs as bundledMotifs } from "@/data/motifs";
import { cultures as bundledCultures } from "@/data/cultures";
import { myths as bundledMyths, variants as bundledVariants } from "@/data/myths";

/**
 * Data access layer. Neo4j is the primary source; if it is unreachable the
 * bundled dataset (the same data the seed script loads) is served instead,
 * and the UI shows which source is active. Results are cached per server
 * process for a short time to avoid re-querying on every navigation.
 */

let cache: { data: Dataset; at: number } | null = null;
const CACHE_MS = 15_000;

export async function getDataset(): Promise<Dataset> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

  // Query directly rather than probing first: a separate verifyConnectivity()
  // round trip doubled cold-start latency on serverless for no extra safety.
  let data: Dataset;
  try {
    data = await loadFromNeo4j();
    // Reachable but empty means it was never seeded.
    if (data.variants.length === 0) {
      data = bundledDataset(
        "connected, but the database is empty — run `npm run seed:aura`"
      );
    }
  } catch (err) {
    data = bundledDataset(describeNeo4jError(err));
    // Surfaces in `vercel logs` / the local terminal instead of vanishing.
    console.error(`[myth-tracker] Neo4j unavailable: ${data.note}`);
  }

  cache = { data, at: Date.now() };
  return data;
}

function bundledDataset(note?: string): Dataset {
  return {
    myths: bundledMyths,
    variants: bundledVariants,
    motifs: bundledMotifs,
    cultures: bundledCultures,
    source: "bundled",
    note,
  };
}

async function loadFromNeo4j(): Promise<Dataset> {
  const session = getDriver().session();
  try {
    const mythsRes = await session.run(`
      MATCH (m:Myth)
      OPTIONAL MATCH (m)-[:REFERENCE_VARIANT]->(rv:Variant)
      RETURN m, rv.id AS refId ORDER BY m.name
    `);
    const myths: Myth[] = mythsRes.records.map((rec) => {
      const p = rec.get("m").properties;
      return {
        id: p.id,
        name: p.name,
        aka: p.aka ?? [],
        description: p.description,
        origin: {
          known: p.originKnown,
          lat: p.originLat ?? undefined,
          lng: p.originLng ?? undefined,
          region: p.originRegion ?? undefined,
          note: p.originNote,
          estimatedAge: p.originEstimatedAge,
        },
        referenceVariantId: rec.get("refId") ?? undefined,
      };
    });

    const motifsRes = await session.run(`MATCH (mo:Motif) RETURN mo`);
    const motifs: Motif[] = motifsRes.records.map((rec) => {
      const p = rec.get("mo").properties;
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        attestations: typeof p.attestations?.toNumber === "function"
          ? p.attestations.toNumber()
          : Number(p.attestations),
      };
    });

    const culturesRes = await session.run(`MATCH (c:Culture) RETURN c`);
    const cultures: Culture[] = culturesRes.records.map((rec) => {
      const p = rec.get("c").properties;
      return {
        id: p.id,
        name: p.name,
        region: p.region,
        period: p.period,
        description: p.description,
      };
    });

    const variantsRes = await session.run(`
      MATCH (v:Variant)-[:VARIANT_OF]->(m:Myth)
      MATCH (v)-[:TOLD_BY]->(c:Culture)
      OPTIONAL MATCH (v)-[cm:CONTAINS_MOTIF]->(mo:Motif)
      RETURN v, m.id AS mythId, c.id AS cultureId,
             collect({motifId: mo.id, role: cm.role}) AS motifLinks
    `);
    const variants: Variant[] = variantsRes.records.map((rec) => {
      const p = rec.get("v").properties;
      const motifLinks = (rec.get("motifLinks") as Array<{
        motifId: string | null;
        role: string | null;
      }>)
        .filter((l) => l.motifId != null)
        .map((l) => ({ motifId: l.motifId as string, role: l.role as MotifRole }));
      return {
        id: p.id,
        mythId: rec.get("mythId"),
        title: p.title,
        cultureId: rec.get("cultureId"),
        region: p.region,
        lat: Number(p.lat),
        lng: Number(p.lng),
        attestation: p.attestation,
        summary: p.summary,
        fullText: p.fullText,
        variations: p.variations ?? [],
        motifs: motifLinks,
      };
    });

    return { myths, variants, motifs, cultures, source: "neo4j" };
  } finally {
    await session.close();
  }
}
