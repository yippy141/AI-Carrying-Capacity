import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";

export const metadata: Metadata = {
  title: "What we know — and what we are testing"
};

const findings = [
  {
    id: "finding-1",
    label: "Observation",
    stage: "observed",
    title: "Adoption is not integration.",
    summary:
      "Reviewed ECB and U.S. Census evidence shows why binary adoption is an incomplete conversion measure. SAFE's “any use” includes very infrequent and experimental use; BTOS breadth measures show how narrowly many adopting firms distribute AI across business functions. These are source-specific depth signals, not a harmonized global metric.",
    figure: "Figure 1 (empirical, source-specific panels)",
    figureHref: "/#figure-1",
    wouldChange:
      "Repeated surveys showing experimental use collapsing into significant use; broad function-level integration becoming the modal adopter pattern; or better harmonized evidence overturning the source-specific gaps."
  },
  {
    id: "finding-buildout",
    label: "Observation",
    stage: "observed",
    title: "Buildout is visible before broad payoff.",
    summary:
      "Reviewed sources document data-center electricity demand and grid constraints, while the repository does not yet support a broad national productivity attribution. Build measures and harvest measures therefore remain separate. Figure 1 adds a canonical use-stage observation, but adoption remains a process measure rather than a realized outcome.",
    figure: "Planned build-versus-harvest figure (research lab)",
    figureHref: "/lab#planned-build-harvest",
    wouldChange:
      "Intensive-use shares climbing sharply; audited productivity results outside pilot settings; or capex collapsing without any harvest arriving."
  },
  {
    id: "finding-2",
    label: "Proposition",
    stage: "conceptual",
    title: "Frontier returns differ by domain.",
    summary:
      "Capability is jagged across task types, and complements are jagged across sectors. The next increment of model capability converts fastest where work is digital and feedback-rich (AI R&D, coding, cyber) and slowest where output depends on hardware, regulation, procurement, and trust (manufacturing, healthcare, public services). This is the study's central hypothesis, held as an ordinal judgment.",
    figure: "Figure 2 (conceptual scatter)",
    figureHref: "/#finding-2",
    wouldChange:
      "Open-weight models compressing the useful frontier gap until the sensitivity axis collapses; or physical-domain time horizons accelerating past digital ones."
  },
  {
    id: "finding-3",
    label: "Comparative hypothesis",
    stage: "hypothesis",
    title: "The United States and China encounter different conversion bottlenecks.",
    summary:
      "Observed US grid constraints, canonical BTOS breadth evidence, and official US adoption policy point to one set of bottlenecks. China's official diffusion targets, one-time above-scale enterprise-use evidence, and observed aggregate robotics stock point to another, while comparable firm-distribution and intensity evidence remains incomplete. The contrast is a hypothesis to test, not an empirical verdict or a winner claim.",
    figure: "Figure 3 (conversion-chain comparison)",
    figureHref: "/#finding-3",
    wouldChange:
      "Independent evidence of AI+ pilots producing measured productivity at scale (revises toward China); intensive use spreading through US SMEs or procurement becoming a real demand channel (revises toward the US)."
  }
];

export default function FindingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          Evidence and tests
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          What we know — and what we are testing
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          Observations are separated from propositions and comparative
          hypotheses. Each item shows its strongest current evidence class and
          states what would change it. Figures live in{" "}
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
                {finding.label}
              </span>
              <EvidenceChip status={finding.stage} />
            </div>
            <h2 className="mt-3 text-3xl text-foreground">{finding.title}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{finding.summary}</p>
            <p className="mt-4 text-sm leading-6 text-muted">
              <span className="font-semibold text-foreground">Figure:</span>{" "}
              <Link className="focus-ring underline" href={finding.figureHref}>
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
