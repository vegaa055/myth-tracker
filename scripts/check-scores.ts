/**
 * Dev tool: print similarity scores for benchmark pairs where comparative
 * mythology has a settled (or interestingly unsettled) opinion, to sanity-
 * check the engine after data or algorithm changes. Run: npx tsx scripts/check-scores.ts
 */
import { motifIndex } from "../data/motifs";
import { variants, variantIndexById } from "../data/myths";
import { computeSimilarity, pairwiseSimilarities } from "../lib/similarity";

const pairs: [string, string, string][] = [
  ["gf-mesopotamian", "gf-hebrew", "flagship: documented descent"],
  ["gf-mesopotamian", "gf-greek", "documented contact"],
  ["gf-mesopotamian", "gf-chinese", "control: should be coincidence"],
  ["gf-mesopotamian", "gf-hindu", "debated"],
  ["gf-mesopotamian", "gf-aztec", "independent (pre-contact)"],
  ["ss-greek", "ss-aboriginal", "the Seven Sisters question"],
  ["ss-greek", "ss-japanese", "control: should be coincidence"],
  ["ss-greek", "ss-hindu", "lost-pleiad family"],
  ["ss-greek", "ss-kiowa", "chase but no lost star"],
  ["ch-evenki", "ch-iroquois", "flagship: Beringian transmission"],
  ["ch-evenki", "ch-chukchi", "Siberian chain"],
  ["ch-evenki", "ch-sami", "western branch"],
  ["ch-evenki", "ch-greek", "Greek bear"],
  ["sg-vedic", "sg-slavic", "IE reconstruction"],
  ["sg-vedic", "sg-japanese", "the Orochi debate"],
  ["sg-hittite", "sg-greek", "documented borrowing (sinew theft)"],
  ["or-greek", "or-japanese", "Eurasian ends"],
  ["or-greek", "or-klamath", "N. American Orpheus"],
  ["ft-greek", "ft-maori", "should be weak"],
  ["ft-cherokee", "ft-haida", "regional relay family"],
];

for (const [a, b, note] of pairs) {
  const va = variantIndexById.get(a)!;
  const vb = variantIndexById.get(b)!;
  const r = computeSimilarity(va, vb, motifIndex);
  console.log(
    `${(r.score * 100).toFixed(0).padStart(3)}%  ${r.verdict.padEnd(26)} ${a} <-> ${b}   (${note})`
  );
}

console.log("\nTop 12 pairs overall:");
for (const r of pairwiseSimilarities(variants, motifIndex).slice(0, 12)) {
  console.log(
    `${(r.score * 100).toFixed(0).padStart(3)}%  ${r.verdict.padEnd(26)} ${r.a} <-> ${r.b}`
  );
}
