import neo4j, { Driver } from "neo4j-driver";

/**
 * Lazy singleton Neo4j driver. Survives Next.js hot reloads by stashing the
 * instance on globalThis in development.
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
      { connectionAcquisitionTimeout: 4000, connectionTimeout: 4000 }
    );
  }
  return globalForNeo4j.__neo4jDriver;
}

/** Quick availability probe with a short timeout. */
export async function neo4jAvailable(): Promise<boolean> {
  try {
    await getDriver().verifyConnectivity();
    return true;
  } catch {
    return false;
  }
}
