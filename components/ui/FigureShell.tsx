import type { ReactNode } from "react";

import { EvidenceChip } from "@/components/ui/EvidenceChip";

type FigureType = "empirical" | "modeled" | "conceptual" | "forecast";

/**
 * Shared shell for study figures: figure number, title, type
 * classification, caption, and an expandable evidence note. Evidence
 * status lives here — in the caption layer — rather than in
 * page-width banners. See docs/FIGURE_REGISTER.md.
 */
export function FigureShell({
  number,
  title,
  type,
  children,
  caption,
  evidenceNote
}: {
  number: string;
  title: string;
  type: FigureType;
  children: ReactNode;
  caption: ReactNode;
  evidenceNote?: ReactNode;
}) {
  return (
    <figure className="my-12 border-y border-rule py-8" id={`figure-${number.toLowerCase()}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4">
        <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          <span className="mr-3 text-primary-strong">Figure {number}.</span>
          {title}
        </h3>
        <EvidenceChip status={type} />
      </div>

      {children}

      <figcaption className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        {caption}
      </figcaption>

      {evidenceNote ? (
        <details className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          <summary className="focus-ring cursor-pointer font-semibold text-foreground">
            Evidence and caveats
          </summary>
          <div className="mt-2 border-l-2 border-rule pl-4">{evidenceNote}</div>
        </details>
      ) : null}
    </figure>
  );
}
