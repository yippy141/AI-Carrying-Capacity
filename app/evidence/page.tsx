import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import {
  evidenceBasisForObservationLabel,
  evidenceClassificationForClaim,
  isPublicReviewStatus
} from "@/lib/evidenceStatus";
import {
  loadAdoptionDepth,
  loadClaimLedger,
  loadSourceRegister
} from "@/lib/registers";

export const metadata: Metadata = {
  title: "Evidence"
};

export default function EvidencePage() {
  const sources = loadSourceRegister().filter(
    (row) => row.placeholder !== "true"
  );
  const claims = loadClaimLedger();
  const observations = loadAdoptionDepth();
  const publicClaims = claims
    .map((claim) => ({
      ...claim,
      evidence: evidenceClassificationForClaim(claim)
    }))
    .filter((claim) => isPublicReviewStatus(claim.evidence.reviewStatus));
  const approved = claims.filter((c) => c.product_use_status === "approved");
  const caveated = claims.filter(
    (c) => c.product_use_status === "approved_with_caveat"
  );
  const staged = claims.filter((c) => c.product_use_status === "staged");

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          Evidence
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          The source, observation, and claim registers behind the study.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Every public claim routes through this ledger with its sources,
          confidence, and required caveat. {sources.length} reviewed sources;{" "}
          {observations.length} canonical observations;{" "}
          {approved.length + caveated.length} claims cleared for the narrative
          ({caveated.length} of them caveat-bound); {staged.length} staged
          pending source promotion. Raw CSVs live in the repository:{" "}
          <a
            className="focus-ring underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/data/sources/source_register.csv"
            rel="noopener noreferrer"
            target="_blank"
          >
            source register
          </a>,{" "}
          <a
            className="focus-ring underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/data/observations/adoption_depth.csv"
            rel="noopener noreferrer"
            target="_blank"
          >
            adoption-depth observations
          </a>, and{" "}
          <a
            className="focus-ring underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/data/claims/claim_ledger.csv"
            rel="noopener noreferrer"
            target="_blank"
          >
            claim ledger
          </a>
          .
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-3xl text-foreground">Canonical observations</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Figure-ready values keep their original period, denominator, survey
          universe, evidence label, and comparability class. Separate source
          families are not silently harmonized.
        </p>
        <div
          aria-label="Scrollable canonical observation table"
          className="focus-ring mt-6 overflow-x-auto"
          tabIndex={0}
        >
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Canonical adoption-depth observations used by Figure 1
            </caption>
            <thead>
              <tr className="border-b-2 border-foreground text-xs uppercase tracking-[0.08em] text-muted">
                <th className="py-2 pr-3 font-semibold" scope="col">Geography / panel</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Measure</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Value</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Period</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Denominator</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Evidence</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Comparability</th>
                <th className="py-2 font-semibold" scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((observation) => (
                <tr
                  className="border-b border-rule align-top"
                  id={observation.observation_id}
                  key={observation.observation_id}
                >
                  <td className="py-3 pr-3 leading-6 text-muted">
                    <span className="block font-semibold text-foreground">
                      {observation.geography}
                    </span>
                    {observation.panel}
                  </td>
                  <td className="py-3 pr-3 leading-6 text-foreground">
                    {observation.measure}
                  </td>
                  <td className="py-3 pr-3 font-semibold text-foreground">
                    {observation.value} {observation.unit}
                  </td>
                  <td className="py-3 pr-3 leading-6 text-muted">
                    {observation.period}
                  </td>
                  <td className="py-3 pr-3 leading-6 text-muted">
                    {observation.denominator}
                  </td>
                  <td className="py-3 pr-3">
                    <EvidenceChip
                      basis={evidenceBasisForObservationLabel(observation.evidence_label)}
                      reviewStatus="canonical"
                    />
                    {observation.evidence_label === "official-claim" ? (
                      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
                        Official source
                      </span>
                    ) : null}
                  </td>
                  <td className="py-3 pr-3 text-muted">
                    {observation.comparability_class.replaceAll("-", " ")}
                  </td>
                  <td className="py-3 font-mono text-xs">
                    <a
                      className="focus-ring text-primary-strong underline"
                      href={"#" + observation.source_id}
                    >
                      {observation.source_id}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl text-foreground">Claim ledger</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Statuses: <strong className="text-foreground">approved</strong> rests
          entirely on canonical sources;{" "}
          <strong className="text-foreground">approved with caveat</strong>{" "}
          must ship with its caveat;{" "}
          <strong className="text-foreground">staged</strong> awaits source
          verification and supports nothing in the narrative on its own.
        </p>
        <div className="mt-6 divide-y divide-hairline border-y border-hairline">
          {publicClaims.map((claim) => (
            <article
              className="py-5"
              id={claim.claim_id}
              key={claim.claim_id}
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-missing">
                <span className="font-mono">{claim.claim_id}</span>
                <EvidenceChip
                  basis={claim.evidence.basis}
                  reviewStatus={claim.evidence.reviewStatus}
                />
                <span>Claim type: {claim.claim_type.replaceAll("_", " ")}</span>
                <span>
                  Evidence type: {claim.evidence_type.replaceAll("_", " ")}
                </span>
                <span className="uppercase tracking-[0.08em] text-foreground">
                  Product status: {claim.product_use_status.replaceAll("_", " ")}
                </span>
                <span>· confidence {claim.confidence}</span>
              </div>
              <p className="mt-2 leading-7 text-foreground">{claim.claim}</p>
              {claim.caveat ? (
                <p className="mt-2 text-sm leading-6 text-muted">
                  <span className="font-semibold text-foreground">Caveat:</span>{" "}
                  {claim.caveat}
                </p>
              ) : null}
              <p className="mt-2 text-xs leading-5 text-missing">
                Sources: {claim.source_ids || "none recorded"}
                {claim.counterevidence_source_ids
                  ? ` · counterevidence: ${claim.counterevidence_source_ids}`
                  : ""}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16" id="source-register">
        <h2 className="text-3xl text-foreground">Source register</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Reliability tiers run A (official data, peer review, major
          international organizations) to E (background only). A source&apos;s
          reliability and its claims&apos; validity are different things:
          official documents are tier-A sources for what a government intends,
          not for whether it worked.
        </p>
        <div
          aria-label="Scrollable source register table"
          className="focus-ring mt-6 overflow-x-auto"
          tabIndex={0}
        >
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <caption className="sr-only">
              Reviewed canonical sources supporting the study
            </caption>
            <thead>
              <tr className="border-b-2 border-foreground text-xs uppercase tracking-[0.08em] text-muted">
                <th className="py-2 pr-3 font-semibold" scope="col">ID</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Source</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Org</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Year</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Tier</th>
                <th className="py-2 pr-3 font-semibold" scope="col">Official-claim status</th>
                <th className="py-2 font-semibold" scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr
                  className="border-b border-rule align-top scroll-mt-24"
                  id={source.source_id}
                  key={source.source_id}
                >
                  <td className="py-2.5 pr-3 font-mono text-xs text-missing">
                    {source.source_id}
                  </td>
                  <td className="py-2.5 pr-3 leading-6 text-foreground">
                    {source.title_english}
                  </td>
                  <td className="py-2.5 pr-3 leading-6 text-muted">
                    {source.authors_org}
                  </td>
                  <td className="py-2.5 pr-3 text-muted">{source.year}</td>
                  <td className="py-2.5 pr-3 font-semibold text-foreground">
                    {source.reliability_tier}
                  </td>
                  <td className="py-2.5 pr-3 text-muted">
                    {source.official_claim_status.replaceAll("_", " ")}
                  </td>
                  <td className="py-2.5">
                    {source.url_or_doi && source.url_or_doi !== "missing" ? (
                      <a
                        className="focus-ring text-primary-strong underline"
                        href={source.url_or_doi}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        source ↗
                      </a>
                    ) : (
                      <span className="text-missing">missing</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted">
          Staged research additions awaiting verification are tracked in{" "}
          <a
            className="focus-ring underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity/tree/main/research/source-register"
            rel="noopener noreferrer"
            target="_blank"
          >
            research/source-register
          </a>{" "}
          and do not appear above. Legacy source-status view:{" "}
          <Link className="focus-ring underline" href="/sources">
            /sources
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
