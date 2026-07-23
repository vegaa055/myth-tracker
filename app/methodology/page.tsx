import Link from "next/link";
import { VERDICT_COLOR } from "@/lib/similarity";

export const metadata = { title: "Methodology · Myth Tracker" };

export default function MethodologyPage() {
  return (
    <main className="page page-narrow prose">
      <div className="page-kicker">How the scoring works</div>
      <h1>Separating connection from coincidence</h1>
      <p className="page-lead">
        Two stories can look alike for three different reasons: they descend
        from a common ancestor, one borrowed from the other, or they were
        invented independently and merely rhyme. Myth Tracker&apos;s
        similarity engine is built to tell these apart — and, above all, to
        avoid the classic trap of calling every resemblance a connection.
      </p>

      <h2>The Seven Sisters problem</h2>
      <p>
        The motivating case: Greek mythology has Orion chasing seven sisters
        who become the Pleiades; First Nations Australian traditions —
        isolated from Eurasia for roughly 50,000 years before 1788 — tell of
        seven sisters, pursued by a male figure identified with Orion, who
        rise into the sky as the same cluster. Both call them <i>seven</i>{" "}
        although most eyes see six stars, and both explain the discrepancy
        with a lost sister. If these stories are genuinely related, their
        common source predates the out-of-Africa dispersals: it would be close
        to 100,000 years old.
      </p>
      <p>
        But the careful analysis (Berezkin&apos;s motif statistics, and the
        reasoning laid out in Crecganford&apos;s treatment of the case) shows
        why the naive conclusion is unsafe:
      </p>
      <ul>
        <li>
          The Pleiades and Orion are among the most salient objects in the
          night sky — <b>every</b> culture tells stories about them (340+
          Pleiades motifs vs fewer than 100 Seven Sisters motifs in
          Berezkin&apos;s database), so the base rate for coincidental overlap
          is enormous.
        </li>
        <li>
          Earth&apos;s rotation makes Orion visibly <i>follow</i> the Pleiades
          across the sky — the &quot;chase&quot; is written in the sky for
          anyone to read off independently.
        </li>
        <li>
          &quot;Man pursues woman/women&quot; is one of the most common motifs
          on Earth, especially natural for hunter cultures.
        </li>
        <li>
          Core elements of the Australian telling — the ice-bodied sisters,
          the frost, the initiation ritual triggered by the cluster&apos;s
          rising — are <b>entirely absent</b> from the Greek version. Under
          common descent you expect core elements to survive somewhere;
          their total loss in one branch argues for independent origin.
        </li>
        <li>
          What <i>does</i> survive scrutiny is the narrow, arbitrary motif of
          &quot;seven stars, six visible, one lost&quot; — plausibly a memory
          of the star Pleione when it stood visibly apart from Atlas, 70–100
          thousand years ago.
        </li>
      </ul>
      <p>
        The engine below is that reasoning, made mechanical and applied to
        every pair of stories in the database.
      </p>

      <h2>Step 1 — Decompose stories into motifs</h2>
      <p>
        Following Yuri Berezkin&apos;s analytical catalogue (and the older
        Thompson Motif Index / ATU tale-type tradition), each telling is
        described as a bundle of discrete motifs — &quot;birds sent to find
        land&quot;, &quot;the lost Pleiad&quot;, &quot;serpent withholds the
        waters&quot;. Motifs are the unit of comparison because they survive
        transmission far better than whole plots: stories are re-cut at every
        retelling, but their components persist.
      </p>
      <p>
        Each motif in a telling is tagged with a role: <b>core</b> (the story
        is unrecognisable without it), <b>supporting</b>, or{" "}
        <b>peripheral</b> (local colour).
      </p>

      <h2>Step 2 — Weight shared motifs by global rarity</h2>
      <p>
        Every motif carries an estimate of how many of the world&apos;s
        traditions attest it (out of ~1000, Berezkin-style). Sharing a
        near-universal motif is weak evidence; sharing a rare, arbitrary one
        is strong evidence — the same logic as inverse document frequency in
        text search, or shared derived characters in cladistics.
      </p>
      <div className="formula">
        rarity(m) = 1 − ln(attestations) / ln(1000)
        <br />
        weight(m) = 0.15 + 0.85 × rarity(m) &nbsp;&nbsp;// floor: plot overlap still counts a little
      </div>
      <p>
        &quot;Hunter pursues women&quot; (~400/1000 traditions) gets weight
        ≈ 0.26; &quot;birds released to scout for land&quot; (~25/1000) gets
        ≈ 0.60. A pair of stories sharing three rare motifs will vastly
        outscore a pair sharing three universal ones.
      </p>

      <h2>Step 3 — Overlap, weighted by role</h2>
      <p>
        The raw similarity is a weighted overlap: shared motifs (counted at
        the <i>average</i> of their two roles — core-in-one but
        peripheral-in-the-other is intermediate evidence) divided by shared
        plus unshared material. Unshared motifs count against the score but
        are damped: in cladistic terms they are autapomorphies — a story
        accumulating its own elaborations over millennia is weaker
        counter-evidence of kinship than a missing shared core.
      </p>
      <div className="formula">
        overlap = Σ shared [ w(m) × avg(roleA, roleB) ] / ( Σ shared [ w(m) × max(roleA, roleB) ] + 0.55 × Σ unshared [ w(m) × role ] )
        <br />
        role weights: core = 3, supporting = 2, peripheral = 1
      </div>

      <h2>Step 4 — The core-retention penalty (the coincidence filter)</h2>
      <p>
        This is the filter that weeds out stories that <i>seem</i> similar but
        miss too many essential elements. For each story in the pair, we ask:
        what fraction of its <b>core</b> motifs is entirely absent from the
        other? Under real descent or borrowing, core elements tend to survive
        in some recognisable form; wholesale absence is the signature of
        coincidence.
      </p>
      <div className="formula">
        missRate = ½ × (coreA missing in B / coreA&nbsp; + &nbsp;coreB missing in A / coreB)
        <br />
        penalty = 1 − 0.65 × missRate &nbsp;&nbsp;// full retention → ×1.0, total disjunction → ×0.35
        <br />
        <br />
        score = overlap × penalty
      </div>
      <p>
        This is exactly what demotes Greek–Australian Seven Sisters: healthy
        motif overlap, but each side&apos;s core includes elements
        (ritual/ice-water on one side, the shame-of-Merope aetiology pattern
        on the other) that the other side lacks entirely.
      </p>

      <h2>Step 5 — Verdict tiers, not fake probabilities</h2>
      <p>
        Mythological data is too soft for the score to be read as a
        probability, so it maps to tiers:
      </p>
      <div className="verdict-scale">
        <div className="tier">
          <span className="range">≥ 62%</span>
          <span style={{ color: VERDICT_COLOR["likely-common-origin"] }}>
            <b>Likely common origin</b>
          </span>
          <span>
            — dense overlap including rare motifs, cores mutually retained
            (Mesopotamian ↔ Hebrew flood).
          </span>
        </div>
        <div className="tier">
          <span className="range">38 – 62%</span>
          <span style={{ color: VERDICT_COLOR["possible-connection"] }}>
            <b>Possible connection</b>
          </span>
          <span>
            — real signal, but descent vs. contact vs. chance is not settled
            (the Mesopotamian ↔ Indian flood traditions, or the Greek ↔
            Japanese underworld retrievals).
          </span>
        </div>
        <div className="tier">
          <span className="range">22 – 38%</span>
          <span style={{ color: VERDICT_COLOR["superficial-resemblance"] }}>
            <b>Superficial resemblance</b>
          </span>
          <span>
            — the likeness rests on common motifs or collapses under the
            core-retention test.
          </span>
        </div>
        <div className="tier">
          <span className="range">&lt; 22%</span>
          <span style={{ color: VERDICT_COLOR["likely-coincidence"] }}>
            <b>Likely coincidence</b>
          </span>
          <span>
            — stories that merely rhyme (the Gun-Yu engineering flood vs. the
            ark tradition).
          </span>
        </div>
      </div>

      <h2>What the score deliberately ignores</h2>
      <p>
        Geography and chronology are shown on the maps but kept <b>out</b> of
        the similarity number. That is intentional: transmission plausibility
        (could these peoples have shared an ancestor or a contact route
        recently enough?) is a separate question from textual resemblance, and
        collapsing the two lets each contaminate the other. A high score
        across an &quot;impossible&quot; gap — like the seven-count of the
        Pleiades across the Australian isolation barrier — is precisely the
        interesting kind of result, because it forces a choice: extreme
        antiquity, unrecorded contact, or a hole in the motif model.
      </p>

      <h2>Method lineage</h2>
      <ul>
        <li>
          <b>Yuri Berezkin</b> — analytical catalogue of ~3000 motifs across
          ~1000 world traditions; areal statistics linking motif distributions
          to prehistoric migration routes.
        </li>
        <li>
          <b>Julien d&apos;Huy</b> — phylogenetic (cladistic/Bayesian)
          reconstruction of myth families such as the Cosmic Hunt, treating
          motifs as heritable characters.
        </li>
        <li>
          <b>Aarne–Thompson–Uther / Thompson Motif Index</b> — the classical
          decomposition of folk narrative into types and motifs.
        </li>
        <li>
          <b>Michael Witzel</b> — the Laurasian/Gondwanan macro-family
          hypothesis for world mythology.
        </li>
        <li>
          <b>Crecganford (Jon White)</b> — public-facing analyses applying
          Berezkin-style motif statistics; the Seven Sisters coincidence
          argument that this app&apos;s core-retention penalty formalises.
        </li>
      </ul>

      <p style={{ marginTop: "2.5rem" }}>
        <Link href="/">← Back to the Myth Index</Link>
      </p>
    </main>
  );
}
