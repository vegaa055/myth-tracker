import type {
  Motif,
  MotifRole,
  SharedMotifDetail,
  SimilarityResult,
  Variant,
  Verdict,
} from "./types";
import { TOTAL_TRADITIONS } from "@/data/motifs";

/**
 * Similarity engine — a "coincidence filter" for myth comparison.
 *
 * Two stories can look alike for three different reasons: common descent,
 * borrowing, or coincidence. Following the methodology used in comparative
 * mythology (Berezkin's areal statistics, d'Huy's phylogenetics) and the
 * reasoning popularised by Crecganford's analysis of the Seven Sisters,
 * the score is built so that coincidence-prone likeness is discounted:
 *
 * 1. RARITY WEIGHTING (inverse-frequency): sharing a near-universal motif
 *    ("a hunter pursues women", ~400/1000 traditions) is weak evidence;
 *    sharing a rare, arbitrary one ("birds released to scout for land",
 *    ~25/1000) is strong evidence. Analogous to IDF in text retrieval.
 *
 * 2. ROLE WEIGHTING: motifs that are core to a telling count more than
 *    peripheral colour.
 *
 * 3. CORE-RETENTION PENALTY: if story B is supposedly descended from the
 *    same source as A, we expect A's core elements to survive in B in some
 *    form. The Greek Seven Sisters lacks the ritual/water core of the
 *    Australian telling — exactly the kind of absence that argues for
 *    coincidence. Each missing core element multiplies the score down.
 *
 * The final score maps to a verdict tier rather than pretending to be a
 * probability: myth data is too soft for that.
 */

const ROLE_WEIGHT: Record<MotifRole, number> = {
  core: 3,
  supporting: 2,
  peripheral: 1,
};

/** Rarity in [0,1]: 0 for a motif found everywhere, →1 as it approaches unique. */
export function motifRarity(m: Motif): number {
  const att = Math.max(1, Math.min(m.attestations, TOTAL_TRADITIONS));
  return 1 - Math.log(att) / Math.log(TOTAL_TRADITIONS);
}

/**
 * Evidential weight of a motif: even a universal motif keeps a small floor
 * weight (shared plot still counts a little), but rarity dominates.
 */
function evidenceWeight(m: Motif): number {
  return 0.15 + 0.85 * motifRarity(m);
}

export function verdictFor(score: number): Verdict {
  if (score >= 0.62) return "likely-common-origin";
  if (score >= 0.38) return "possible-connection";
  if (score >= 0.22) return "superficial-resemblance";
  return "likely-coincidence";
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  "likely-common-origin": "Likely common origin",
  "possible-connection": "Possible connection",
  "superficial-resemblance": "Superficial resemblance",
  "likely-coincidence": "Likely coincidence",
};

export const VERDICT_COLOR: Record<Verdict, string> = {
  "likely-common-origin": "#34d399",
  "possible-connection": "#fbbf24",
  "superficial-resemblance": "#fb923c",
  "likely-coincidence": "#f87171",
};

export function computeSimilarity(
  a: Variant,
  b: Variant,
  motifIndex: Map<string, Motif>
): SimilarityResult {
  const aRoles = new Map(a.motifs.map((vm) => [vm.motifId, vm.role]));
  const bRoles = new Map(b.motifs.map((vm) => [vm.motifId, vm.role]));

  const allIds = new Set([...aRoles.keys(), ...bRoles.keys()]);

  let sharedSum = 0; // shared motifs at the average of their two roles
  let sharedMax = 0; // shared motifs at the greater of their two roles
  let unsharedSum = 0; // motifs present in only one telling
  const sharedMotifs: SharedMotifDetail[] = [];

  for (const id of allIds) {
    const motif = motifIndex.get(id);
    if (!motif) continue;
    const w = evidenceWeight(motif);
    const ra = aRoles.get(id);
    const rb = bRoles.get(id);

    if (ra && rb) {
      // Shared: count at the *average* of the two roles — core-in-one but
      // peripheral-in-the-other is intermediate evidence.
      sharedSum += w * ((ROLE_WEIGHT[ra] + ROLE_WEIGHT[rb]) / 2);
      sharedMax += w * Math.max(ROLE_WEIGHT[ra], ROLE_WEIGHT[rb]);
      sharedMotifs.push({
        motifId: id,
        name: motif.name,
        rarity: motifRarity(motif),
        roleA: ra,
        roleB: rb,
      });
    } else {
      unsharedSum += w * ROLE_WEIGHT[(ra ?? rb) as MotifRole];
    }
  }

  // Unshared motifs count against the score, but damped (×0.55): a story
  // accumulating its own elaborations over millennia (autapomorphies, in
  // cladistic terms) is weaker counter-evidence than a missing shared core.
  const denom = sharedMax + 0.55 * unsharedSum;
  const weightedOverlap = denom > 0 ? sharedSum / denom : 0;

  // Core-retention penalty: fraction of each story's core motifs absent
  // from the other, averaged, then applied as a multiplicative discount.
  const coreA = a.motifs.filter((vm) => vm.role === "core");
  const coreB = b.motifs.filter((vm) => vm.role === "core");
  const missingCoreA = coreA
    .filter((vm) => !bRoles.has(vm.motifId))
    .map((vm) => motifIndex.get(vm.motifId)?.name ?? vm.motifId);
  const missingCoreB = coreB
    .filter((vm) => !aRoles.has(vm.motifId))
    .map((vm) => motifIndex.get(vm.motifId)?.name ?? vm.motifId);

  const missRateA = coreA.length > 0 ? missingCoreA.length / coreA.length : 0;
  const missRateB = coreB.length > 0 ? missingCoreB.length / coreB.length : 0;
  const avgMissRate = (missRateA + missRateB) / 2;
  // Full core retention → 1.0; total core disjunction → 0.35.
  const corePenalty = 1 - 0.65 * avgMissRate;

  const score = Math.max(0, Math.min(1, weightedOverlap * corePenalty));

  return {
    a: a.id,
    b: b.id,
    score,
    verdict: verdictFor(score),
    weightedOverlap,
    corePenalty,
    sharedMotifs: sharedMotifs.sort((x, y) => y.rarity - x.rarity),
    missingCoreA,
    missingCoreB,
  };
}

/** All pairwise similarities among the given variants, sorted high→low. */
export function pairwiseSimilarities(
  variants: Variant[],
  motifIndex: Map<string, Motif>,
  minShared = 1
): SimilarityResult[] {
  const out: SimilarityResult[] = [];
  for (let i = 0; i < variants.length; i++) {
    for (let j = i + 1; j < variants.length; j++) {
      const r = computeSimilarity(variants[i], variants[j], motifIndex);
      if (r.sharedMotifs.length >= minShared) out.push(r);
    }
  }
  return out.sort((x, y) => y.score - x.score);
}
