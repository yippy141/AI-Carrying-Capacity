import type { ClaimRow } from "@/lib/registers";

export type EvidenceStatus =
  | "observed"
  | "official target"
  | "official claim"
  | "model estimate"
  | "hypothesis"
  | "staged"
  | "missing";

const OBSERVED_EVIDENCE_TYPES = new Set([
  "dataset",
  "official_statistic",
  "survey",
  "peer_reviewed"
]);

/**
 * Classify what kind of evidence a claim contains. Product-use status is a
 * separate gate: staged and rejected claims can never inherit a stronger chip.
 */
export function evidenceStatusForClaim(
  claim: Pick<ClaimRow, "claim_type" | "evidence_type" | "product_use_status">
): EvidenceStatus {
  if (claim.product_use_status === "staged") return "staged";
  if (
    claim.product_use_status === "rejected" ||
    claim.product_use_status === "missing"
  ) {
    return "missing";
  }

  switch (claim.claim_type) {
    case "observed_statistic":
      return "observed";
    case "official_target":
      return "official target";
    case "official_program_claim":
    case "official_claim":
      return "official claim";
    case "model_estimate":
      return "model estimate";
    case "hypothesis":
    case "derived_interpretation":
    case "analytical_frame":
    case "scenario_assumption":
    case "methodological":
      return "hypothesis";
  }

  if (OBSERVED_EVIDENCE_TYPES.has(claim.evidence_type)) return "observed";
  if (claim.evidence_type === "official_target") return "official target";
  if (
    claim.evidence_type === "official_document" ||
    claim.evidence_type === "government_briefing" ||
    claim.evidence_type === "official_report"
  ) {
    return "official claim";
  }
  if (claim.evidence_type === "model_estimate") return "model estimate";
  if (claim.evidence_type === "derived") return "hypothesis";

  return "missing";
}
