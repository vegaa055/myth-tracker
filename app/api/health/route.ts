import { NextResponse } from "next/server";
import { connectionInfo, probeNeo4j } from "@/lib/neo4j";
import { getDataset } from "@/lib/repo";

/**
 * Connection diagnostics: GET /api/health
 *
 * Reports whether the deployment can actually reach Neo4j and, if not,
 * why — the badge in the header only says "offline", which is not enough
 * to debug a hosted environment. Exposes no secrets: the password is
 * reported as set/unset plus length, and the host is partially masked.
 *
 * Safe to delete once the deployment is working.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const config = connectionInfo();
  const probe = await probeNeo4j();
  const dataset = await getDataset();

  const hints: string[] = [];

  if (!config.env.NEO4J_URI) {
    hints.push(
      "NEO4J_URI is not set in this environment. On Vercel: Settings → " +
        "Environment Variables, tick Production, then REDEPLOY — existing " +
        "deployments do not pick up new variables."
    );
  }
  if (!config.env.NEO4J_PASSWORD) {
    hints.push("NEO4J_PASSWORD is not set in this environment.");
  }
  if (config.usingLocalDefaults && process.env.VERCEL) {
    hints.push(
      "Running on Vercel but still using local development defaults — the " +
        "environment variables are not reaching this deployment."
    );
  }
  if (probe.code === "Neo.ClientError.Security.Unauthorized") {
    hints.push(
      "Credentials rejected. Confirm NEO4J_PASSWORD matches this instance " +
        "and that NEO4J_USER is 'neo4j'."
    );
  }
  if (probe.code === "ServiceUnavailable" || probe.code === "SessionExpired") {
    hints.push(
      config.scheme.startsWith("neo4j+s")
        ? "Aura free instances pause after inactivity — open the Aura console " +
            "and resume the instance, then retry."
        : "Database not reachable at this URI. Locally, check `docker ps`."
    );
  }
  if (probe.ok && dataset.source === "bundled") {
    hints.push(
      "Connected successfully but serving bundled data: the database is " +
        "reachable but empty. Seed it with `npm run seed:aura`."
    );
  }

  return NextResponse.json(
    {
      status: dataset.source === "neo4j" ? "ok" : "degraded",
      servingDataFrom: dataset.source,
      reason: dataset.note ?? null,
      neo4j: {
        reachable: probe.ok,
        latencyMs: probe.latencyMs,
        error: probe.error ?? null,
        code: probe.code ?? null,
      },
      config,
      counts: {
        myths: dataset.myths.length,
        variants: dataset.variants.length,
        motifs: dataset.motifs.length,
      },
      hints,
    },
    { headers: { "cache-control": "no-store" } }
  );
}
