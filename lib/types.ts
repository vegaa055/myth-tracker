/**
 * Core domain types for Myth Tracker.
 *
 * The model follows the motif-decomposition approach used in comparative
 * mythology (Berezkin's analytical catalogue, the Thompson Motif Index,
 * d'Huy's phylogenetic work): a myth *family* is attested through regional
 * *variants*, and each variant is described as a bundle of *motifs*.
 */

/** How central a motif is to a particular telling of the story. */
export type MotifRole = "core" | "supporting" | "peripheral";

export interface Motif {
  id: string;
  name: string;
  description: string;
  /**
   * Approximate number of distinct traditions (out of ~1000 in a
   * Berezkin-style world catalogue) in which this motif is attested.
   * Lower = rarer = stronger evidence of connection when shared.
   * These are order-of-magnitude estimates for scoring, not exact counts.
   */
  attestations: number;
}

export interface Culture {
  id: string;
  name: string;
  region: string;
  period: string;
  description: string;
}

export interface VariantMotif {
  motifId: string;
  role: MotifRole;
}

export interface Variant {
  id: string;
  mythId: string;
  title: string;
  cultureId: string;
  region: string;
  lat: number;
  lng: number;
  /** Earliest known attestation (written, oral-tradition dating, etc.) */
  attestation: string;
  summary: string;
  /** The most widely accepted telling of this variant. */
  fullText: string;
  /** Known alternative tellings / regional sub-variants. */
  variations: string[];
  motifs: VariantMotif[];
}

export interface MythOrigin {
  known: boolean;
  /** Marker position for the proposed origin (only when known). */
  lat?: number;
  lng?: number;
  region?: string;
  /** Scholarly note on how the origin was inferred, or why it is unknown. */
  note: string;
  estimatedAge: string;
}

export interface Myth {
  id: string;
  name: string;
  aka: string[];
  description: string;
  origin: MythOrigin;
  /** id of the variant treated as the earliest/reference form, if any. */
  referenceVariantId?: string;
}

/** Verdict tiers produced by the similarity engine. */
export type Verdict =
  | "likely-common-origin"
  | "possible-connection"
  | "superficial-resemblance"
  | "likely-coincidence";

export interface SharedMotifDetail {
  motifId: string;
  name: string;
  rarity: number; // 0..1, higher = rarer
  roleA: MotifRole;
  roleB: MotifRole;
}

export interface SimilarityResult {
  a: string; // variant id
  b: string; // variant id
  /** Final score in [0, 1]. */
  score: number;
  verdict: Verdict;
  /** Rarity-weighted overlap before the core-retention penalty. */
  weightedOverlap: number;
  /** Multiplier in (0, 1] penalising missing core elements. */
  corePenalty: number;
  sharedMotifs: SharedMotifDetail[];
  /** Core motifs of A absent from B (names). */
  missingCoreA: string[];
  /** Core motifs of B absent from A (names). */
  missingCoreB: string[];
}

/** Everything the UI needs, from either Neo4j or the bundled dataset. */
export interface Dataset {
  myths: Myth[];
  variants: Variant[];
  motifs: Motif[];
  cultures: Culture[];
  source: "neo4j" | "bundled";
  /** When source is "bundled", why the database was not used. */
  note?: string;
}
