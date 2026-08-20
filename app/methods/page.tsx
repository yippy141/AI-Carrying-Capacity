import type { Metadata } from "next";
import Link from "next/link";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { NarrativeBlock } from "@/components/ui/NarrativeBlock";
import { dimensions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Methods"
};

const evidenceLabels = [
  "observed",
  "official-claim",
  "qualitative-coded",
  "estimated",
  "missing"
] as const;

const valueTypes = [
  {
    label: "Observed data",
    definition:
      "Independently measured or reported by a credible third party (e.g., IFR robot density, LBNL energy data)."
  },
  {
    label: "Model estimate",
    definition:
      "Modelled or inferred where direct measurement is unavailable (e.g., IMF/OECD productivity projections, Epoch capex decomposition). Named owner and vintage required."
  },
  {
    label: "Official target",
    definition:
      "Stated by a government or programme (e.g., AI+ penetration targets, investment packages). Records intent — never mixed with realized outcomes."
  },
  {
    label: "Survey response",
    definition:
      "Self-reported by firms or workers (e.g., ECB SAFE, Census BTOS). Sensitive to phrasing and weighting; definitions stated alongside values."
  },
  {
    label: "Scenario / commentary",
    definition:
      "Expert reasoning, scenario branches, forecast rationales. Supports framing, never empirical values."
  }
];

export default function MethodsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">Methods</p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          A diagnostic framework, not a ranking.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          The study asks how societies convert accessible AI capability into
          material outcomes while preserving missingness, uncertainty, and
          adaptation costs. The Atlas evidence system enforces that discipline.
        </p>
      </div>

      <div className="mt-12">
        <MethodologyCallout title="The standing rule">
          No single national score is published until source coverage,
          missingness, weighting, and sensitivity checks are documented. China–US
          advantage claims are hypotheses to test, not conclusions to assume.
        </MethodologyCallout>
      </div>

      <NarrativeBlock title="The analytic layers stay separate.">
        <p>
          Frontier capability, accessible capability, conversion capacity, and
          outcomes are distinct objects — and outcomes split further into
          build, use, harvest, and distribute stages that move on different
          clocks. A country can be strong on one layer and bottlenecked on
          another; pooling them is how readiness indices lose the plot.
        </p>
        <p>
          Fields without reviewed sources render as missing. An empty field is
          not a low score.
        </p>
        <p>
          Figure-ready values also pass through a canonical observation layer
          that preserves each value&apos;s period, denominator, survey universe,
          evidence label, and comparability class. Source families stay
          separate unless their definitions genuinely support comparison.
        </p>
      </NarrativeBlock>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dimension) => (
          <article className="border border-rule p-5" key={dimension.key}>
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
        <h2 className="font-display text-3xl font-semibold">
          Every value carries a type
        </h2>
        <dl className="mt-6 grid gap-5 md:grid-cols-2">
          {valueTypes.map((type) => (
            <div key={type.label}>
              <dt className="font-semibold text-foreground">{type.label}</dt>
              <dd className="mt-1 text-sm leading-6 text-muted">
                {type.definition}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted">
            Evidence labels in figures
          </h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {evidenceLabels.map((label) => (
              <ConfidenceBadge key={label} label={label} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-3xl font-semibold">Limitations</h2>
        <ul className="mt-5 list-disc space-y-3 pl-5 leading-7 text-muted">
          <li>
            No causal identification: nothing here estimates a national causal
            effect of frontier capability on output. Figures are descriptive
            and conceptual, and say so.
          </li>
          <li>
            Comparability limits: China lacks a public, recurring,
            representative firm AI-use survey comparable to Census BTOS or
            Eurostat modules; robot density is the cleanest China–West
            comparator and it is denominator-sensitive.
          </li>
          <li>
            Survey sensitivity: adoption rates can move materially with
            question phrasing and weighting. The register records which
            definition, reference window, and denominator each value uses.
          </li>
          <li>
            Staged evidence: research outputs enter as staged rows and support
            nothing public until URL/DOI-verified and promoted.
          </li>
        </ul>
      </section>

      <p className="mt-12 max-w-3xl text-sm leading-6 text-muted">
        Full method documents in the repository:{" "}
        <a
          className="focus-ring underline"
          href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/docs/METHOD.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          METHOD.md
        </a>
        ,{" "}
        <a
          className="focus-ring underline"
          href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/docs/HYPOTHESES.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          HYPOTHESES.md
        </a>
        ,{" "}
        <a
          className="focus-ring underline"
          href="https://github.com/yippy141/AI-Carrying-Capacity/blob/main/docs/FIGURE_REGISTER.md"
          rel="noopener noreferrer"
          target="_blank"
        >
          FIGURE_REGISTER.md
        </a>
        . See also{" "}
        <Link className="focus-ring underline" href="/evidence">
          the evidence register
        </Link>{" "}
        and{" "}
        <Link className="focus-ring underline" href="/lab">
          the research lab
        </Link>
        .
      </p>
    </main>
  );
}
