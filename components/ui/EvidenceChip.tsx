import {
  isPublicReviewStatus,
  type EvidenceBasis,
  type ReviewStatus
} from "@/lib/evidenceStatus";

/**
 * Evidence basis and review status are deliberately separate. A non-public
 * review status suppresses the chip rather than styling staged evidence as if
 * it were another knowledge basis.
 */
export function EvidenceChip({
  basis,
  reviewStatus
}: {
  basis: EvidenceBasis;
  reviewStatus: ReviewStatus;
}) {
  if (!isPublicReviewStatus(reviewStatus)) return null;

  return (
    <span
      className="evidence-chip"
      data-basis={basis}
      data-review-status={reviewStatus}
    >
      {basis}
    </span>
  );
}
