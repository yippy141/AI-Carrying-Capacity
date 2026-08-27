import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { visualSystemData } from "@/lib/data";
import type { SourceBackedClaim, VisualSource } from "@/lib/types";

import { sourceSummary } from "@/components/visuals/statusStyles";

type SourceBackedClaimCardProps = {
  claim: SourceBackedClaim;
  sources?: VisualSource[];
};

function displayValue(value: string | undefined) {
  if (!value || value === "missing") {
    return "not coded";
  }

  return value;
}

function isOfficialClaimSource(source: VisualSource) {
  const status = source.official_claim_status;
  return Boolean(
    status && status !== "not_official_claim" && status !== "placeholder"
  );
}

export function SourceBackedClaimCard({
  claim,
  sources = visualSystemData.sources
}: SourceBackedClaimCardProps) {
  const attachedSources = sourceSummary(claim.source_ids, sources);

  return (
    <article className="border-y border-hairline py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-strong">
            {claim.claim_type} · {claim.review_status}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-foreground">
            {claim.title}
          </h2>
        </div>
        <ConfidenceBadge label={claim.evidence_label} />
      </div>

      <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground">
        {claim.claim}
      </p>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-muted">Geography</dt>
          <dd className="mt-1 text-foreground">{claim.geography}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">Sector</dt>
          <dd className="mt-1 text-foreground">{claim.sector}</dd>
        </div>
        <div>
          <dt className="font-semibold text-muted">Confidence</dt>
          <dd className="mt-1 text-foreground">{claim.confidence}</dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-rule pt-5">
        <p className="text-sm font-semibold text-foreground">Caveat</p>
        <p className="mt-2 text-sm leading-6 text-muted">{claim.caveat}</p>
      </div>

      <div className="mt-6 border-t border-rule pt-5">
        <p className="text-sm font-semibold text-foreground">
          Attached staged sources
        </p>
        <div className="mt-4 grid gap-3">
          {attachedSources.length === 0 ? (
            <p className="text-sm text-missing">
              No matching local source metadata found.
            </p>
          ) : (
            attachedSources.map((source) => (
              <div
                className="border-t border-rule py-4 first:border-t-0 first:pt-0"
                key={source.source_id}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {source.title_english}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      {source.authors_org} · {source.year} · {source.language}
                    </p>
                  </div>
                  <span className="w-fit border border-rule bg-background px-2 py-1 font-mono text-[11px] uppercase tracking-[0.05em] text-muted">
                    tier {source.reliability_tier} · {source.review_status}
                  </span>
                </div>

                {isOfficialClaimSource(source) ? (
                  <div className="mt-3 border-y border-hairline bg-surface py-3 text-xs leading-5 text-ink-soft">
                    Official target or program claim; not independently validated
                    unless the source metadata says otherwise.
                  </div>
                ) : null}

                <dl className="mt-3 grid gap-2 text-xs leading-5 text-muted sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-foreground">Source type</dt>
                    <dd>{source.source_type}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Method type</dt>
                    <dd>{displayValue(source.method_type)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      Official claim status
                    </dt>
                    <dd>{displayValue(source.official_claim_status)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">
                      Independent validation
                    </dt>
                    <dd>{displayValue(source.independent_validation_status)}</dd>
                  </div>
                </dl>

                <p className="mt-3 text-xs leading-5 text-muted">
                  URL/DOI: {source.url_or_doi}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  {source.limitations}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
