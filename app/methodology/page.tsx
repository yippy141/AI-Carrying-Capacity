import type { Metadata } from "next";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { NarrativeBlock } from "@/components/ui/NarrativeBlock";
import { SourceNote } from "@/components/ui/SourceNote";
import { dimensions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Methodology"
};

const evidenceLabels = [
  "observed",
  "official-claim",
  "qualitative-coded",
  "estimated",
  "missing"
] as const;

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Methodology
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          V0 is a diagnostic framework, not a definitive ranking.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          The atlas asks how societies convert accessible AI capability into
          material outcomes while preserving missingness, uncertainty, and
          adaptation costs.
        </p>
      </div>

      <div className="mt-12">
        <MethodologyCallout title="The V0 rule">
          No single national score should be published until source coverage,
          missingness, weighting, and sensitivity checks are documented. China-US
          advantage claims are hypotheses to test, not conclusions to assume.
        </MethodologyCallout>
      </div>

      <NarrativeBlock title="The atlas keeps analytic layers separate.">
        <p>
          Frontier access, conversion capacity, diffusion speed, adaptation
          capacity, distribution quality, and realized outcomes are distinct
          claims. A country can be strong on one layer and bottlenecked on
          another.
        </p>
        <p>
          V0 pages may identify candidate measures and source gaps, but an empty
          field is not a low score. It is rendered as missing until a reviewed
          source supports a value.
        </p>
      </NarrativeBlock>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dimension) => (
          <article
            className="rounded-lg border border-rule p-5"
            key={dimension.key}
          >
            <h2 className="font-display text-2xl font-semibold">
              {dimension.label}
            </h2>
            <p className="mt-3 leading-7 text-muted">{dimension.description}</p>
            <p className="mt-5 text-sm font-semibold text-missing">
              V0 value status: missing
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 border-y border-rule py-8">
        <h2 className="font-display text-3xl font-semibold">Evidence labels</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {evidenceLabels.map((label) => (
            <ConfidenceBadge key={label} label={label} />
          ))}
        </div>
      </section>

      <div className="mt-12">
        <SourceNote label="placeholder">
          <p>
            This page summarizes the scaffold method in `docs/METHOD.md`. It
            contains no indicator values and no ranking outputs.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
