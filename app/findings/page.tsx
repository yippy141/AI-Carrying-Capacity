import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";

export const metadata: Metadata = {
  title: "Findings"
};

const findings = [
  {
    id: "finding-1",
    number: "1",
    stage: "empirical",
    title: "Buildout is not payoff.",
    summary:
      "AI's most visible economic effect today is investment — data centers, chips, grid — which measures the size of the bet, not the return. Adoption is broad but shallow: across advanced economies roughly a fifth of firms report using AI, while intensive, workflow-deep use remains rare. The productivity harvest is real at task level and unproven at national level.",
    figure: "Figure 1 (data-ready; awaiting canonical series)",
    wouldChange:
      "Intensive-use shares climbing sharply; audited productivity results outside pilot settings; or capex collapsing without any harvest arriving."
  },
  {
    id: "finding-2",
    number: "2",
    stage: "conceptual",
    title: "Frontier returns differ by domain.",
    summary:
      "Capability is jagged across task types, and complements are jagged across sectors. The next increment of model capability converts fastest where work is digital and feedback-rich (AI R&D, coding, cyber) and slowest where output depends on hardware, regulation, procurement, and trust (manufacturing, healthcare, public services). This is the study's central hypothesis, held as an ordinal judgment.",
    figure: "Figure 2 (conceptual scatter)",
    wouldChange:
      "Open-weight models compressing the useful frontier gap until the sensitivity axis collapses; or physical-domain time horizons accelerating past digital ones."
  },
  {
    id: "finding-3",
    number: "3",
    stage: "conceptual",
    title: "National systems convert differently.",
    summary:
      "The United States holds a frontier bet with a conversion problem — its own government names slow organizational adoption as the bottleneck, and its grid queues run to years. China holds a conversion bet with a measurement problem — the world's largest automation base and an explicit diffusion strategy, but density-normalized diffusion behind the US (166 vs 307 per 10k after IFR's workforce revision) and no public, recurring measure of firm-level AI-use intensity. Neither system dominates the chain.",
    figure: "Figure 3 (conversion-chain comparison)",
    wouldChange:
      "Independent evidence of AI+ pilots producing measured productivity at scale (revises toward China); intensive use spreading through US SMEs or procurement becoming a real demand channel (revises toward the US)."
  }
];

export default function FindingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          Findings
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Three findings, each with its evidence stage on its sleeve.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Findings are labeled by their strongest current evidence class —
          empirical, modeled, conceptual, or forecast — and each states what
          would change it. Figures live in{" "}
          <Link className="focus-ring underline" href="/">
            the study
          </Link>
          ; sources and claims live in{" "}
          <Link className="focus-ring underline" href="/evidence">
            the evidence register
          </Link>
          .
        </p>
      </div>

      <div className="mt-14 space-y-12">
        {findings.map((finding) => (
          <article className="max-w-3xl border-t border-rule pt-8" key={finding.id}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display text-sm font-semibold text-primary-strong">
                Finding {finding.number}
              </span>
              <EvidenceChip status={finding.stage} />
            </div>
            <h2 className="mt-3 text-3xl text-foreground">{finding.title}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{finding.summary}</p>
            <p className="mt-4 text-sm leading-6 text-muted">
              <span className="font-semibold text-foreground">Figure:</span>{" "}
              <Link className="focus-ring underline" href={`/#${finding.id}`}>
                {finding.figure}
              </Link>
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              <span className="font-semibold text-foreground">
                What would change this:
              </span>{" "}
              {finding.wouldChange}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
