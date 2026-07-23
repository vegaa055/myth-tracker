import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // neo4j-driver is a Node-only package; keep it out of client bundles.
  serverExternalPackages: ["neo4j-driver"],
  // Self-contained server bundle for Docker deployment.
  output: "standalone",
};

export default nextConfig;
