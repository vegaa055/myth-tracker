import { getDataset } from "@/lib/repo";
import { computeSimilarity, motifRarity } from "@/lib/similarity";
import { familyColor } from "@/lib/colors";
import ExploreMapLoader from "@/components/ExploreMapLoader";
import type { ExploreConnection, ExplorePoint } from "@/components/ExploreMap";

export const metadata = { title: "Explore Map · Myth Tracker" };

export default async function ExplorePage() {
  const { myths, variants, motifs, cultures } = await getDataset();
  const motifIndex = new Map(motifs.map((m) => [m.id, m]));
  const cultureIndex = new Map(cultures.map((c) => [c.id, c]));
  const mythIndex = new Map(myths.map((m) => [m.id, m]));

  // Pairwise similarity across the whole corpus (including cross-family),
  // kept where the resemblance is at least "superficial".
  const connectionsByVariant = new Map<string, ExploreConnection[]>();
  for (let i = 0; i < variants.length; i++) {
    for (let j = i + 1; j < variants.length; j++) {
      const a = variants[i];
      const b = variants[j];
      const sim = computeSimilarity(a, b, motifIndex);
      if (sim.score < 0.18 || sim.sharedMotifs.length === 0) continue;
      const shared = sim.sharedMotifs.slice(0, 4).map((s) => s.name);
      const push = (
        from: typeof a,
        to: typeof b
      ) => {
        const list = connectionsByVariant.get(from.id) ?? [];
        list.push({
          otherId: to.id,
          title: to.title,
          region: to.region,
          mythName: mythIndex.get(to.mythId)?.name ?? to.mythId,
          sameFamily: from.mythId === to.mythId,
          score: sim.score,
          verdict: sim.verdict,
          shared,
        });
        connectionsByVariant.set(from.id, list);
      };
      push(a, b);
      push(b, a);
    }
  }

  const points: ExplorePoint[] = variants.map((v) => {
    const myth = mythIndex.get(v.mythId);
    const culture = cultureIndex.get(v.cultureId);
    const conns = (connectionsByVariant.get(v.id) ?? []).sort(
      (a, b) => b.score - a.score
    );
    const originText = myth
      ? myth.origin.known
        ? `${myth.origin.region} — ${myth.origin.estimatedAge}. ${myth.origin.note}`
        : `Unknown / contested — ${myth.origin.estimatedAge}. ${myth.origin.note}`
      : "Unknown.";
    return {
      id: v.id,
      mythId: v.mythId,
      mythName: myth?.name ?? v.mythId,
      color: familyColor(v.mythId),
      title: v.title,
      region: v.region,
      cultureName: culture?.name ?? v.cultureId,
      culturePeriod: culture?.period ?? "",
      cultureDescription: culture?.description ?? "",
      lat: v.lat,
      lng: v.lng,
      attestation: v.attestation,
      summary: v.summary,
      fullText: v.fullText,
      variations: v.variations,
      originText,
      motifs: v.motifs
        .map((vm) => {
          const mo = motifIndex.get(vm.motifId);
          return mo
            ? { name: mo.name, role: vm.role, rare: motifRarity(mo) > 0.45 }
            : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
      connections: conns.slice(0, 10),
    };
  });

  const families = myths.map((m) => ({
    id: m.id,
    name: m.name,
    color: familyColor(m.id),
  }));

  return <ExploreMapLoader points={points} families={families} />;
}
