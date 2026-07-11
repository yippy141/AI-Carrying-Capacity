import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { loadClaimLedger, loadSourceRegister } from "@/lib/registers";

export const metadata: Metadata = {
  title: "Evidence"
};

const STATUS_TO_CHIP: Record<string, string> = {
  approved: "observed",
  approved_with_caveat: "observed",
  staged: "staged",
  rejected: "missing"
};

export default function EvidencePage() {
  const sources = loadSourceRegister().filter(
    (row) => row.placeholder !== "true"
  );
  const claims = loadClaimLedger();
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
          The source register and claim ledger behind the study.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Every public claim routes through this ledger with its sources,
          confidence, and required caveat. {sources.length} reviewed sources;{" "}
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
          </a>{" "}
          and{" "}
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
        <h2 className="text-3xl text-foreground">Claim ledger</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Statuses: <strong className="text-foreground">approved</strong> rests
          entirely on canonical sources;{" "}
          <strong className="text-foreground">approved with caveat</strong>{" "}
          must ship with its caveat;{" "}
          <strong className="text-foreground">staged</strong> awaits source
          verification and supports nothing in the narrative on its own.
        </p>
        <div className="mt-6 space-y-4">
          {claims.map((claim) => (
            <article
              className="border border-rule bg-white p-5"
              id={claim.claim_id}
              key={claim.claim_id}
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-missing">
                <span className="font-mono">{claim.claim_id}</span>
                <EvidenceChip
                  status={STATUS_TO_CHIP[claim.product_use_status] ?? "staged"}
                />
                <span className="uppercase tracking-[0.08em]">
                  {claim.product_use_status.replaceAll("_", " ")}
                </span>
                <span>· confidence {claim.confidence}</span>
                <span>· {claim.claim_type.replaceAll("_", " ")}</span>
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

      <section className="mt-16">
        <h2 className="text-3xl text-foreground">Source register</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Reliability tiers run A (official data, peer review, major
          international organizations) to E (background only). A source&apos;s
          reliability and its claims&apos; validity are different things:
          official documents are tier-A sources for what a government intends,
          not for whether it worked.
        </p>
        <div className="mt-6 overflow-x-auto" tabIndex={0}>
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-foreground text-xs uppercase tracking-[0.08em] text-muted">
                <th className="py-2 pr-3 font-semibold">ID</th>
                <th className="py-2 pr-3 font-semibold">Source</th>
                <th className="py-2 pr-3 font-semibold">Org</th>
                <th className="py-2 pr-3 font-semibold">Year</th>
                <th className="py-2 pr-3 font-semibold">Tier</th>
                <th className="py-2 pr-3 font-semibold">Official-claim status</th>
                <th className="py-2 font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((source) => (
                <tr className="border-b border-rule align-top" key={source.source_id}>
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
