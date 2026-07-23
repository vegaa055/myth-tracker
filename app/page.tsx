import Link from "next/link";
import { getDataset } from "@/lib/repo";
import { familyColor } from "@/lib/colors";

export default async function Home() {
  const { myths, variants } = await getDataset();

  return (
    <main className="page">
      <div className="page-kicker">An atlas of humanity&apos;s oldest stories</div>
      <h1>Myth Index</h1>
      <p className="page-lead">
        Select a myth family to see where its earliest known form arose and how
        its tellings connect across the world — each connection scored by a
        motif-based similarity engine designed to separate real transmission
        from coincidence. Or open the{" "}
        <Link href="/explore">Explore Map</Link> to browse every story as a
        point on the globe.
      </p>

      <div className="myth-grid">
        {myths.map((m) => {
          const count = variants.filter((v) => v.mythId === m.id).length;
          return (
            <Link
              key={m.id}
              href={`/myth/${m.id}`}
              className="myth-card"
              style={{ ["--accent" as string]: familyColor(m.id) }}
            >
              <h3>{m.name}</h3>
              <div className="aka">{m.aka.join(" · ")}</div>
              <div className="desc">{m.description}</div>
              <div className="meta">
                <span className="chip">{count} regional variants</span>
                <span
                  className={`chip ${m.origin.known ? "origin-known" : "origin-unknown"}`}
                >
                  {m.origin.known
                    ? `origin: ${m.origin.region}`
                    : "origin: unknown / contested"}
                </span>
                <span className="chip">{m.origin.estimatedAge}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
