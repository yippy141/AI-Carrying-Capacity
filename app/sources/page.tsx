import type { Metadata } from "next";

import { SourceBackedClaimCard } from "@/components/visuals/SourceBackedClaimCard";
import { StagedEvidenceBanner } from "@/components/visuals/StagedEvidenceBanner";
import { UncertaintyLegend } from "@/components/visuals/UncertaintyLegend";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceNote } from "@/components/ui/SourceNote";
import { getSourceRegisterSummary, visualSystemData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sources"
};

export default function SourcesPage() {
  const summary = getSourceRegisterSummary();
  const badgeLabel = summary.status;

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Source register
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          Sources are tracked before claims are made.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          The atlas is built around reviewed provenance. V0 does not use
          Wikipedia and does not silently convert source gaps into values.
        </p>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-rule p-5">
          <p className="text-sm font-semibold text-muted">Register path</p>
          <p className="mt-3 break-words font-semibold text-foreground">
            {summary.path}
          </p>
        </article>
        <article className="rounded-lg border border-rule p-5">
          <p className="text-sm font-semibold text-muted">Register rows</p>
          <p className="mt-3 font-display text-4xl font-semibold">
            {summary.totalRows}
          </p>
        </article>
        <article className="rounded-lg border border-rule p-5">
          <p className="text-sm font-semibold text-muted">Evidence rows</p>
          <p className="mt-3 font-display text-4xl font-semibold">
            {summary.reviewedRows}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <ConfidenceBadge label={badgeLabel} />
          </div>
        </article>
      </section>

      <div className="mt-10">
        <StagedEvidenceBanner title="Claim examples are staged">
          <p>
            Source cards below demonstrate the interface pattern. A source may be
            reliable as a document while still supporting only an official claim,
            target, or scenario assumption.
          </p>
        </StagedEvidenceBanner>
      </div>

      <section className="mt-16 border-y border-rule py-8">
        <h2 className="font-display text-3xl font-semibold">
          Source discipline
        </h2>
        <ul className="mt-6 grid gap-4 text-muted md:grid-cols-2">
          <li className="leading-7">
            Official government claims should be labeled separately from
            independently validated evidence.
          </li>
          <li className="leading-7">
            Missing values should remain missing rather than being inferred for
            visual completeness.
          </li>
          <li className="leading-7">
            Estimates and qualitative coding require explicit labels and a
            documented method.
          </li>
          <li className="leading-7">
            Source limitations should travel with the claim, not remain buried
            in research notes.
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl font-semibold">
            Source-backed claim examples
          </h2>
          <p className="mt-5 max-w-3xl leading-8 text-muted">
            These cards show how claims carry evidence labels, caveats, source
            IDs, review status, and missing URL/DOI markers. They are staged
            examples, not canonical conclusions.
          </p>
        </div>
        <div className="mt-8 grid gap-5">
          {visualSystemData.claim_cards.map((claim) => (
            <SourceBackedClaimCard
              claim={claim}
              key={claim.claim_id}
              sources={visualSystemData.sources}
            />
          ))}
        </div>
      </section>

      <div className="mt-16">
        <UncertaintyLegend />
      </div>

      <div className="mt-12">
        <SourceNote label={badgeLabel}>
          <p>
            The source register currently has {summary.totalRows} total rows,
            including {summary.placeholderRows} placeholder rows and {" "}
            {summary.reviewedRows} reviewed evidence rows. Until reviewed
            sources are added, indicator and country values stay missing.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
