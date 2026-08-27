import type { ReactNode } from "react";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { FigureActions } from "@/components/ui/FigureActions";
import {
  isPublicReviewStatus,
  type EvidenceBasis,
  type ReviewStatus
} from "@/lib/evidenceStatus";

const EPISTEMIC_PREFIX: Record<EvidenceBasis, string> = {
  observed: "Observed:",
  "model estimate": "We estimate:",
  scenario: "Scenario:",
  "official target": "Official target:",
  "company target": "Company target:",
  "expert-coded": "Expert-coded:",
  "historical analogy": "Historical analogy:",
  hypothesis: "Hypothesis:"
};

export function FigureShell({
  basis,
  children,
  definitionsDiffer = false,
  evidenceNote,
  exportBaseName,
  exportSvg,
  number,
  reviewStatus,
  source,
  subtitle,
  title
}: {
  basis: EvidenceBasis;
  children: ReactNode;
  definitionsDiffer?: boolean;
  evidenceNote?: ReactNode;
  exportBaseName?: string;
  exportSvg?: string;
  number: string;
  reviewStatus: ReviewStatus;
  source: ReactNode;
  subtitle: ReactNode;
  title: string;
}) {
  const figureId = `figure-${number.toLowerCase()}`;
  if (!isPublicReviewStatus(reviewStatus)) return null;

  return (
    <figure className="mb-24" id={figureId}>
      <h3 className="max-w-[40ch] font-display text-[26px] font-semibold leading-[1.2] text-ink sm:text-[34px]">
        <span className="text-accent">{EPISTEMIC_PREFIX[basis]}</span>{" "}
        {title}
      </h3>
      <div className="mt-2 max-w-[80ch] text-[15px] leading-6 text-ink-soft">
        {subtitle}
      </div>

      <div className="figure-plot mt-[26px]">{children}</div>

      <figcaption className="mt-[14px] flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-t border-hairline pt-[10px] text-[13px] leading-5 text-ink-soft">
        <div className="max-w-[66ch]">
          <p>
            {source}{" "}
            <span className="ml-1 inline-block align-middle">
              <EvidenceChip basis={basis} reviewStatus={reviewStatus} />
            </span>
            {definitionsDiffer ? (
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.05em] text-ink">
                Definitions differ
              </span>
            ) : null}
          </p>
          {evidenceNote ? (
            <details className="mt-2">
              <summary className="focus-ring w-fit cursor-pointer font-medium text-ink">
                Evidence and caveats
              </summary>
              <div className="mt-2 max-w-[66ch]">{evidenceNote}</div>
            </details>
          ) : null}
        </div>
        <FigureActions
          explicitSvg={exportSvg}
          exportBaseName={exportBaseName ?? `figure-${number}`}
          figureId={figureId}
        />
      </figcaption>
    </figure>
  );
}
