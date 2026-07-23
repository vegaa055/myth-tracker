import Link from "next/link";
import { notFound } from "next/navigation";
import { getDataset } from "@/lib/repo";
import {
  computeSimilarity,
  motifRarity,
  VERDICT_COLOR,
  VERDICT_LABEL,
} from "@/lib/similarity";
import { familyColor } from "@/lib/colors";
import MythMapLoader from "@/components/MythMapLoader";
import type { MythMapConnection, MythMapMarker } from "@/components/MythMap";

export default async function MythPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { myths, variants, motifs, cultures } = await getDataset();

  const myth = myths.find((m) => m.id === id);
  if (!myth) notFound();

  const motifIndex = new Map(motifs.map((m) => [m.id, m]));
  const cultureIndex = new Map(cultures.map((c) => [c.id, c]));
  const family = variants.filter((v) => v.mythId === myth.id);

  const hub =
    family.find((v) => v.id === myth.referenceVariantId) ?? family[0];

  // Connections: reference form vs every other telling in the family.
  const connections = family
    .filter((v) => v.id !== hub.id)
    .map((v) => ({ variant: v, sim: computeSimilarity(hub, v, motifIndex) }))
    .sort((a, b) => b.sim.score - a.sim.score);

  const markers: MythMapMarker[] = family.map((v) => ({
    id: v.id,
    lat: v.lat,
    lng: v.lng,
    title: v.title,
    region: v.region,
    cultureName: cultureIndex.get(v.cultureId)?.name ?? v.cultureId,
    attestation: v.attestation,
    summary: v.summary,
    isHub: v.id === hub.id,
  }));

  const mapConnections: MythMapConnection[] = connections.map(({ variant, sim }) => ({
    fromId: hub.id,
    toId: variant.id,
    score: sim.score,
    verdict: sim.verdict,
    sharedTop: sim.sharedMotifs.slice(0, 3).map((s) => s.name),
  }));

  const accent = familyColor(myth.id);
  const familyCultureIds = [...new Set(family.map((v) => v.cultureId))];

  return (
    <main className="page">
      <div className="myth-header">
        <div className="page-kicker" style={{ color: accent }}>
          Myth family
        </div>
        <h1>{myth.name}</h1>
        <div style={{ color: "var(--text-faint)", marginBottom: "0.8rem" }}>
          {myth.aka.join(" · ")}
        </div>
        <p className="page-lead">{myth.description}</p>
      </div>

      <div className="origin-panel">
        <div className="origin-line">
          {myth.origin.known ? (
            <>
              <b style={{ color: "var(--gold)" }}>Proposed origin:</b>{" "}
              {myth.origin.region} — <i>{myth.origin.estimatedAge}</i>
            </>
          ) : (
            <>
              <b style={{ color: "var(--gold)" }}>Origin: unknown / contested</b>{" "}
              — <i>{myth.origin.estimatedAge}</i>
            </>
          )}
        </div>
        {myth.origin.note}
      </div>

      <div className="map-frame">
        <MythMapLoader
          origin={myth.origin}
          markers={markers}
          connections={mapConnections}
          accent={accent}
        />
      </div>

      <section className="block">
        <h2>Scored connections</h2>
        <p style={{ color: "var(--text-dim)", fontSize: "0.92rem" }}>
          Every telling compared against the reference form,{" "}
          <b style={{ color: "var(--text)" }}>{hub.title}</b> ({hub.region}).
          The score weights shared motifs by global rarity and penalises
          missing core elements — see{" "}
          <Link href="/methodology">how scoring works</Link>.
        </p>
        <table className="conn-table">
          <thead>
            <tr>
              <th>Telling</th>
              <th>Score</th>
              <th>Verdict</th>
              <th>Shared motifs (rarest first)</th>
              <th>Missing core elements</th>
            </tr>
          </thead>
          <tbody>
            {connections.map(({ variant, sim }) => (
              <tr key={variant.id}>
                <td>
                  <b>{variant.title}</b>
                  <br />
                  <span style={{ color: "var(--text-faint)", fontSize: "0.78rem" }}>
                    {variant.region}
                  </span>
                </td>
                <td>
                  <span
                    className="score-num"
                    style={{ color: VERDICT_COLOR[sim.verdict], fontSize: "1.05rem" }}
                  >
                    {(sim.score * 100).toFixed(0)}%
                  </span>
                </td>
                <td>
                  <span
                    className="verdict"
                    style={{
                      color: VERDICT_COLOR[sim.verdict],
                      borderColor: VERDICT_COLOR[sim.verdict],
                    }}
                  >
                    <span className="dot" />
                    {VERDICT_LABEL[sim.verdict]}
                  </span>
                </td>
                <td>
                  <div className="motif-chips">
                    {sim.sharedMotifs.map((sm) => (
                      <span
                        key={sm.motifId}
                        className={`motif-chip ${sm.rarity > 0.45 ? "rare" : ""}`}
                        title={`rarity ${(sm.rarity * 100).toFixed(0)}/100 · ${sm.roleA} in reference, ${sm.roleB} here`}
                      >
                        {sm.name}
                      </span>
                    ))}
                    {sim.sharedMotifs.length === 0 && (
                      <span style={{ color: "var(--text-faint)" }}>none</span>
                    )}
                  </div>
                </td>
                <td className="missing">
                  {[...new Set([...sim.missingCoreA, ...sim.missingCoreB])].join("; ") ||
                    "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="block">
        <h2>The tellings</h2>
        {family.map((v) => {
          const culture = cultureIndex.get(v.cultureId);
          return (
            <article className="variant-card" key={v.id}>
              <h3>
                {v.title}
                {v.id === hub.id && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: accent,
                      marginLeft: "0.6rem",
                      verticalAlign: "middle",
                      letterSpacing: "0.08em",
                    }}
                  >
                    REFERENCE FORM
                  </span>
                )}
              </h3>
              <div className="byline">
                <b>{culture?.name}</b> · {v.region} · {v.attestation}
              </div>
              <p className="summary">{v.summary}</p>
              <details>
                <summary>Read the accepted telling</summary>
                <div className="full-text">{v.fullText}</div>
              </details>
              {v.variations.length > 0 && (
                <details>
                  <summary>Variations ({v.variations.length})</summary>
                  <ul className="variations">
                    {v.variations.map((varn, i) => (
                      <li key={i}>{varn}</li>
                    ))}
                  </ul>
                </details>
              )}
              <div className="motif-row">
                {v.motifs.map((vm) => {
                  const mo = motifIndex.get(vm.motifId);
                  if (!mo) return null;
                  const rare = motifRarity(mo) > 0.45;
                  return (
                    <span
                      key={vm.motifId}
                      className={`motif-chip ${rare ? "rare" : ""} role-${vm.role}`}
                      title={`${mo.description} (${vm.role}; ~${mo.attestations}/1000 traditions)`}
                    >
                      {mo.name}
                    </span>
                  );
                })}
              </div>
            </article>
          );
        })}
      </section>

      <section className="block">
        <h2>The cultures behind the tellings</h2>
        {familyCultureIds.map((cid) => {
          const c = cultureIndex.get(cid);
          if (!c) return null;
          return (
            <div className="culture-card" key={cid}>
              <h4>{c.name}</h4>
              <div className="culture-meta">
                {c.region} · {c.period}
              </div>
              {c.description}
            </div>
          );
        })}
      </section>
    </main>
  );
}
