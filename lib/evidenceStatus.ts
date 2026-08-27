import type { ClaimRow } from "@/lib/registers";

export type EvidenceBasis =
  | "observed"
  | "official target"
  | "model estimate"
  | "scenario"
  | "company target"
  | "expert-coded"
  | "historical analogy"
  | "hypothesis";

export type ReviewStatus =
  | "canonical"
  | "reviewed"
  | "staged"
  | "superseded"
  | "rejected";

export type EvidenceClassification = {
  basis: EvidenceBasis;
  reviewStatus: ReviewStatus;
};

const OBSERVED_EVIDENCE_TYPES = new Set([
  "dataset",
  "official_statistic",
  "survey",
  "peer_reviewed"
]);

/**
 * Evidence basis describes how a claim is known. Review status independently
 * determines whether it is public. Government program claims are observed
 * records of what a primary document says; they do not establish outcomes.
 */
export function evidenceClassificationForClaim(
  claim: Pick<ClaimRow, "claim_type" | "evidence_type" | "product_use_status">
): EvidenceClassification {
  const reviewStatus: ReviewStatus =
    claim.product_use_status === "approved"
      ? "canonical"
      : claim.product_use_status === "approved_with_caveat"
        ? "reviewed"
        : claim.product_use_status === "staged"
          ? "staged"
          : "rejected";

  switch (claim.claim_type) {
    case "observed_statistic":
      return { basis: "observed", reviewStatus };
    case "official_target":
      return { basis: "official target", reviewStatus };
    case "official_program_claim":
    case "official_claim":
      return { basis: "observed", reviewStatus };
    case "model_estimate":
      return { basis: "model estimate", reviewStatus };
    case "scenario_assumption":
      return { basis: "scenario", reviewStatus };
    case "hypothesis":
    case "derived_interpretation":
    case "analytical_frame":
    case "methodological":
      return { basis: "hypothesis", reviewStatus };
  }

  if (OBSERVED_EVIDENCE_TYPES.has(claim.evidence_type)) {
    return { basis: "observed", reviewStatus };
  }
  if (claim.evidence_type === "official_target") {
    return { basis: "official target", reviewStatus };
  }
  if (
    claim.evidence_type === "official_document" ||
    claim.evidence_type === "government_briefing" ||
    claim.evidence_type === "official_report"
  ) {
    return { basis: "observed", reviewStatus };
  }
  if (claim.evidence_type === "model_estimate") {
    return { basis: "model estimate", reviewStatus };
  }
  if (claim.evidence_type === "derived") {
    return { basis: "hypothesis", reviewStatus };
  }

  return { basis: "hypothesis", reviewStatus };
}

export function isPublicReviewStatus(reviewStatus: ReviewStatus): boolean {
  return reviewStatus === "canonical" || reviewStatus === "reviewed";
}

export function evidenceBasisForObservationLabel(label: string): EvidenceBasis {
  switch (label) {
    case "estimated":
      return "model estimate";
    case "qualitative-coded":
      return "expert-coded";
    case "observed":
    case "official-claim":
      return "observed";
    default:
      return "hypothesis";
  }
}
