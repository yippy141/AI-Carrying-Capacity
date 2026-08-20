import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { FigureShell } from "@/components/ui/FigureShell";
import { AdoptionDepthFigure } from "@/components/visuals/AdoptionDepthFigure";
import { ConversionChainCompare } from "@/components/visuals/ConversionChainCompare";
import { FrontierNotFateHero } from "@/components/visuals/FrontierNotFateHero";
import { FrontierSensitivityScatter } from "@/components/visuals/FrontierSensitivityScatter";
import { loadAdoptionDepth, loadForecastRegister } from "@/lib/registers";

function StudySection({
  eyebrow,
  title,
  children,
  id
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-20 sm:px-8" id={id}>
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          {eyebrow}
        </p>
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-muted">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const forecasts = loadForecastRegister().slice(0, 3);
  const adoptionDepth = loadAdoptionDepth();

  return (
    <main>
      <FrontierNotFateHero />

      <StudySection eyebrow="The research question" title="What does an additional increment of frontier capability actually buy a country?" id="question">
        <p>
          When a country gains access to a more capable AI system, something
          should change: factories should get more productive, science should
          move faster, public services should improve, or strategic capability
          should grow. The marginal national return is that change — the
          difference the next increment of capability makes, given everything
          else a country brings to the table.
        </p>
        <p>
          The core claim of this study is that the return is not set at the
          frontier. It is set by <strong className="text-foreground">conversion
          capacity</strong>: the power, factories, firms, institutions, and
          skills that turn accessible capability into use, and use into
          outcomes. The same model increment buys different things in different
          places — and, within one country, different things in different
          sectors.
        </p>
        <p>
          The evidence for this runs through a chain with four stages that move
          on different clocks: <strong className="text-foreground">build</strong>{" "}
          (investment and infrastructure, visible now),{" "}
          <strong className="text-foreground">use</strong> (adoption and
          intensity, now anchored by a first canonical but non-harmonized
          evidence slice),{" "}
          <strong className="text-foreground">harvest</strong> (productivity,
          not yet attributable at national scale), and{" "}
          <strong className="text-foreground">distribute</strong> (who gets the
          gains, still weakly measured).
        </p>
      </StudySection>

      <StudySection
        eyebrow="Observation"
        title="Adoption is not integration."
        id="finding-1"
      >
        <p>
          A binary adoption rate can hide the difference between a pilot and a
          redesigned organization. In the ECB&apos;s Q4 2025 SAFE, reported
          “any use” includes very infrequent and experimental use. In the U.S.
          Census supplement, the all-firm adoption denominator is separate from
          the breadth measures reported only among adopters.
        </p>
        <p>
          The sources do not define depth the same way. The comparison therefore
          stays within each survey: intensity in SAFE, business-function breadth
          in BTOS, and a firm-size adoption gradient in Eurostat. Together they
          support measuring conversion depth instead of treating a yes/no
          adoption response as integration. Eurostat supplies diffusion context
          across firm sizes; it is not evidence of use depth.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FigureShell
          number="1"
          title="Adoption is not integration"
          type="empirical"
          caption={
            <>
              Headline adoption can coexist with experimental, moderate, or
              narrowly distributed use. The panels preserve their original
              survey definitions and denominators; values are not pooled into a
              cross-country ranking or a harmonized “deep use” metric.
            </>
          }
          evidenceNote={
            <p>
              Every plotted number is loaded from the canonical{" "}
              <span className="font-mono">adoption_depth.csv</span> observation
              file and resolves to a reviewed source ID. SAFE&apos;s four
              published shares total 98%; the figure leaves the unreported
              two-point residual unallocated because it may reflect
              “don&apos;t know” responses and rounding. The Census working
              paper is descriptive and non-causal. Full rows and source status
              are available in{" "}
              <Link className="focus-ring underline" href="/evidence">
                the evidence register
              </Link>
              .
            </p>
          }
        >
          <AdoptionDepthFigure observations={adoptionDepth} />
        </FigureShell>
      </div>

      <StudySection
        eyebrow="Observation"
        title="Buildout is visible before broad payoff."
        id="finding-buildout"
      >
        <p>
          Reviewed energy and grid sources make physical buildout and its
          constraints visible. The same evidence does not establish a broad
          national productivity payoff. Treating build and harvest as one
          number would therefore overstate what the current record can show.
          Adoption depth is now measured in Figure 1, but adoption remains a
          process measure rather than proof of a broad productivity outcome.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <aside className="max-w-3xl border-y border-rule py-5 text-sm leading-6 text-muted">
          <span className="font-semibold text-foreground">Planned figure:</span>{" "}
          the build-versus-harvest chart remains an unnumbered lab prototype
          until reviewed canonical series are wired in. No empty empirical
          figure appears in the study narrative.{" "}
          <Link className="focus-ring underline" href="/lab#planned-build-harvest">
            Inspect the planned figure →
          </Link>
        </aside>
      </div>

      <StudySection eyebrow="Proposition" title="Frontier returns differ by domain." id="finding-2">
        <p>
          The study proposes that model capability is jagged across domains and
          that complementary requirements are jagged across sectors. It follows
          that the next increment of capability may convert faster where work is
          digital and feedback-rich than where output depends on hardware,
          regulation, procurement, and trust. This is a falsifiable conceptual
          claim, not an empirical finding.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FigureShell
          number="2"
          title="Where frontier capability converts, and where it stalls"
          type="conceptual"
          caption={
            <>
              Domains placed by how much raw model capability matters
              (horizontal) against how hard capability is to convert into
              output (vertical). This is a hypothesis figure: positions are
              ordinal judgments, not measured quantities. Read the pattern, not
              the coordinates.
            </>
          }
          evidenceNote={
            <p>
              The placement logic is the study&apos;s central hypothesis
              (approved with caveat in the claim ledger). The horizontal axis
              is partly anchored by METR&apos;s domain time-horizon
              measurements, which are staged pending source promotion. Dashed
              halos mark the placements most open to challenge. Full status in{" "}
              <Link className="focus-ring underline" href="/evidence">
                the evidence register
              </Link>
              .
            </p>
          }
        >
          <FrontierSensitivityScatter embedded />
        </FigureShell>
      </div>

      <StudySection eyebrow="Comparative hypothesis" title="The United States and China encounter different conversion bottlenecks." id="finding-3">
        <p>
          Reviewed US grid evidence and official US adoption policy point to
          one set of constraints. China&apos;s official diffusion targets,
          one-time above-scale enterprise-use evidence, and observed aggregate
          robot deployment point to another, while comparable firm distribution
          and use intensity remain incomplete.
          The comparison below separates facts, interpretations, and missing
          evidence. It tests a contrast; it does not declare a winner.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FigureShell
          number="3"
          title="Two systems, two conversion chains"
          type="conceptual"
          caption={
            <>
              Each cell separates the direct record, interpretation, and
              missing evidence for one chain stage in one country. Chips label
              observed data, official targets or claims, hypotheses, staged
              material, and missing evidence without collapsing them.
            </>
          }
          evidenceNote={
            <p>
              Cell references point to the canonical source register and claim
              ledger (for example, the robot-density figures follow IFR&apos;s
              2025 workforce-data revision — China 166 per 10k, US 307).
              Staged items are labeled as such and support no cell on their
              own. Explore rows in{" "}
              <Link className="focus-ring underline" href="/evidence">
                the evidence register
              </Link>
              .
            </p>
          }
        >
          <ConversionChainCompare />
        </FigureShell>
      </div>

      <StudySection eyebrow="Forecasts" title="What would change our minds, in writing." id="forecasts">
        <p>
          A framework should say what would falsify it. The
          forecast register tracks measurable questions with deadlines,
          resolution sources, and update histories. Numerical ranges remain
          hidden while author review is pending.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {forecasts.map((forecast) => (
            <article className="border border-rule bg-white p-6" key={forecast.forecast_id}>
              <div className="flex items-center gap-2">
                <EvidenceChip status="forecast" />
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-missing">
                  {forecast.status === "draft_unreviewed" ? "draft" : forecast.status}
                </span>
              </div>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                {forecast.question}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {forecast.author_review_status === "reviewed" ? (
                  <>
                    Reviewed range{" "}
                    <span className="font-semibold text-foreground">
                      {forecast.initial_probability_range}
                    </span>{" "}
                    ·{" "}
                  </>
                ) : (
                  <>Probability hidden pending author review · </>
                )}
                resolves via {forecast.resolution_source} by {forecast.deadline}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          <Link className="focus-ring font-semibold underline" href="/forecasts">
            All ten forecast questions →
          </Link>
        </p>
      </div>

      <StudySection eyebrow="Methods and evidence" title="Every claim carries its receipts." id="methods">
        <p>
          The study runs on the AI Conversion Atlas: a source register where
          every source carries a reliability tier and an official-claim status,
          a claim ledger where every public claim carries its confidence and
          required caveat, and a methods note that says what this project
          refuses to do — no composite score, no country ranking, no silent
          imputation of missing values.
        </p>
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-base">
          <Link className="focus-ring font-semibold text-foreground underline" href="/evidence">
            Evidence register
          </Link>
          <Link className="focus-ring font-semibold text-foreground underline" href="/methods">
            Methods
          </Link>
          <Link className="focus-ring font-semibold text-foreground underline" href="/about">
            About the project
          </Link>
          <Link className="focus-ring font-semibold text-foreground underline" href="/lab">
            Research lab
          </Link>
        </p>
      </StudySection>

      <div className="pb-24" />
    </main>
  );
}
