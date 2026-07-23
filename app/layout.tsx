import type { Metadata } from "next";
import { Spectral, Inter } from "next/font/google";
import Link from "next/link";
import { getDataset } from "@/lib/repo";
import "./globals.css";

const display = Spectral({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Render per-request everywhere: pages must reflect the live database (and
// its availability badge), not data frozen into static HTML at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Myth Tracker",
  description:
    "Tracing the world's oldest stories across the map — motif analysis, similarity scoring, and the geography of myth transmission.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { source } = await getDataset();
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <header className="site-header">
          <Link href="/" className="site-title">
            <span className="star">✦</span>Myth Tracker
          </Link>
          <nav className="site-nav">
            <Link href="/">Myth Index</Link>
            <Link href="/explore">Explore Map</Link>
            <Link href="/methodology">Methodology</Link>
          </nav>
          <span className={`data-source ${source === "neo4j" ? "live" : ""}`}>
            data: <strong>{source === "neo4j" ? "Neo4j graph" : "bundled (Neo4j offline)"}</strong>
          </span>
        </header>
        {children}
      </body>
    </html>
  );
}
