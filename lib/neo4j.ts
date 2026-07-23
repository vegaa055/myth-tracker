import neo4j, { Driver, Neo4jError } from "neo4j-driver";

/**
 * Lazy singleton Neo4j driver. Survives Next.js hot reloads (and warm
 * serverless invocations) by stashing the instance on globalThis.
 */

/** Trim stray whitespace/quotes from copy-pasted credentials. */
function clean(v: string | undefined): string | undefined {
  return v?.trim().replace(/^["'](.*)["']$/s, "$1");
}

const URI = clean(process.env.NEO4J_URI) ?? "bolt://localhost:7687";
// Aura's downloaded credentials file names this NEO4J_USERNAME; accept either.
const USER =
  clean(process.env.NEO4J_USER) ?? clean(process.env.NEO4J_USERNAME) ?? "neo4j";
const PASSWORD = clean(process.env.NEO4J_PASSWORD) ?? "mythtracker";

const globalForNeo4j = globalThis as unknown as { __neo4jDriver?: Driver };

export function getDriver(): Driver {
  if (!globalForNeo4j.__neo4jDriver) {
    globalForNeo4j.__neo4jDriver = neo4j.driver(
      URI,
      neo4j.auth.basic(USER, PASSWORD),
      {
        // Serverless cold starts need room for TLS + routing discovery
        // against Aura; the old 4s budget expired mid-handshake and the
        // app silently fell back to bundled data.
        connectionTimeout: 15_000,
        connectionAcquisitionTimeout: 15_000,
        maxConnectionPoolSize: 10,
        // Connections idle longer than this are likely dead behind a
        // serverless freeze; verify before reuse.
        maxConnectionLifetime: 5 * 60 * 1000,
      }
    );
  }
  return globalForNeo4j.__neo4jDriver;
}

/** A short, human-readable reason why a connection attempt failed. */
export function describeNeo4jError(err: unknown): string {
  const code = err instanceof Neo4jError ? err.code : "";
  const message = err instanceof Error ? err.message : String(err);

  if (code === "Neo.ClientError.Security.Unauthorized") {
    return "authentication failed — NEO4J_PASSWORD (or NEO4J_USER) is wrong for this database";
  }
  if (/ENOTFOUND|EAI_AGAIN/i.test(message)) {
    return "hostname not found — check NEO4J_URI";
  }
  if (/ECONNREFUSED/i.test(message)) {
    return "connection refused — is the database running?";
  }
  if (/routing|No routing servers available/i.test(message)) {
    return "no routing servers available — the Aura instance is probably paused, or the URI is wrong";
  }
  if (/timed out|timeout/i.test(message)) {
    return "connection timed out — instance paused, or network blocked";
  }
  // The driver's generic connect failure carries a long advisory message;
  // summarise it rather than surfacing the whole paragraph.
  if (code === "ServiceUnavailable") {
    return "could not reach the server — it is not running, not listening on that host/port, or paused";
  }
  return message;
}

/** Config summary safe to expose: no secrets, host partially masked. */
export function connectionInfo() {
  let displayUri = URI;
  try {
    const u = new URL(URI);
    const [first, ...rest] = u.hostname.split(".");
    const maskedHost =
      rest.length > 0 && first.length > 2
        ? `${first.slice(0, 3)}${"*".repeat(Math.max(first.length - 3, 0))}.${rest.join(".")}`
        : u.hostname;
    displayUri = `${u.protocol}//${maskedHost}${u.port ? `:${u.port}` : ""}`;
  } catch {
    /* leave as-is if unparseable */
  }

  return {
    uri: displayUri,
    scheme: URI.split("://")[0] ?? "unknown",
    user: USER,
    passwordSet: PASSWORD.length > 0,
    passwordLength: PASSWORD.length,
    usingLocalDefaults:
      URI === "bolt://localhost:7687" || PASSWORD === "mythtracker",
    env: {
      NEO4J_URI: process.env.NEO4J_URI !== undefined,
      NEO4J_USER: process.env.NEO4J_USER !== undefined,
      NEO4J_USERNAME: process.env.NEO4J_USERNAME !== undefined,
      NEO4J_PASSWORD: process.env.NEO4J_PASSWORD !== undefined,
    },
  };
}

/** Explicit connectivity probe used by the health endpoint. */
export async function probeNeo4j(): Promise<{
  ok: boolean;
  latencyMs: number;
  error?: string;
  code?: string;
}> {
  const started = Date.now();
  try {
    await getDriver().verifyConnectivity();
    return { ok: true, latencyMs: Date.now() - started };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Date.now() - started,
      error: describeNeo4jError(err),
      code: err instanceof Neo4jError ? err.code : undefined,
    };
  }
}
