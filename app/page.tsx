import Link from "next/link";

import { EvidenceChip } from "@/components/ui/EvidenceChip";
import { FigureShell } from "@/components/ui/FigureShell";
import { BuildoutVsPayoffFigure } from "@/components/visuals/BuildoutVsPayoffFigure";
import { ConversionChainCompare } from "@/components/visuals/ConversionChainCompare";
import { FrontierNotFateHero } from "@/components/visuals/FrontierNotFateHero";
import { FrontierSensitivityScatter } from "@/components/visuals/FrontierSensitivityScatter";
import { loadForecastRegister } from "@/lib/registers";

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
          intensity, broadening but shallow),{" "}
          <strong className="text-foreground">harvest</strong> (productivity,
          still mostly ahead), and{" "}
          <strong className="text-foreground">distribute</strong> (who gets the
          gains, just starting to show).
        </p>
      </StudySection>

      <StudySection eyebrow="Finding 1" title="Buildout is not payoff." id="finding-1">
        <p>
          The most visible economic effect of AI today is spending, not
          productivity. Data centers, chips, and grid investment show up in
          national accounts immediately; measured productivity gains do not.
          Treating the two as one number — &ldquo;AI&apos;s effect on the
          economy&rdquo; — is the most common analytical error in the AI-race
          discourse. The buildout measures the size of the bet. The payoff
          depends on adoption depth and organizational change that current data
          say are still thin: most firms that use AI use it shallowly, and
          intensive use remains rare.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FigureShell
          number="1"
          title="The bet and the payoff move on different clocks"
          type="empirical"
          caption={
            <>
              Panel A tracks build-stage series (investment, electricity
              demand); Panel B tracks harvest-stage series (measured
              productivity effects). Both panels render only from reviewed
              sources, and neither has canonical data wired in yet — the empty
              states name exactly what is pending.
            </>
          }
          evidenceNote={
            <p>
              Build-stage candidates: Epoch AI&apos;s estimate that computing
              infrastructure reached roughly 1.5% of US GDP in early 2026
              (staged, model estimate) and the LBNL data-center energy report
              (canonical, extraction pending). Harvest-stage candidates:
              IMF and OECD model estimates of AI productivity effects (staged;
              model estimates, not observations). Status per{" "}
              <Link className="focus-ring underline" href="/evidence">
                the evidence register
              </Link>
              .
            </p>
          }
        >
          <BuildoutVsPayoffFigure />
        </FigureShell>
      </div>

      <StudySection eyebrow="Finding 2" title="Frontier returns differ by domain." id="finding-2">
        <p>
          Model capability is jagged: systems that handle hours of software
          engineering manage minutes of agentic computer use, and less in the
          physical world. Map that against how much complementary
          infrastructure each domain needs, and the strategic geography of AI
          comes into focus. Where work is digital and feedback-rich — the AI
          research loop, coding, cyber — the next increment of capability
          converts fast. Where output depends on hardware, regulation,
          procurement, and trust — factories, hospitals, agencies — being at
          the frontier buys much less.
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

      <StudySection eyebrow="Finding 3" title="National systems convert differently." id="finding-3">
        <p>
          The United States and China are strong in different stages of the
          same chain. America&apos;s bet is a frontier bet with a conversion
          problem: unmatched capability assets, but adoption, procurement, and
          grid constraints that its own government names as the bottleneck.
          China&apos;s bet is a conversion bet with a measurement problem:
          state-directed diffusion at enormous aggregate scale, thin at the
          median, and hardest to verify exactly where the story gets
          interesting. Neither column of the comparison below declares a
          winner — the point is that the two systems flatten in different
          places.
        </p>
      </StudySection>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FigureShell
          number="3"
          title="Two systems, two conversion chains"
          type="conceptual"
          caption={
            <>
              Each cell gives the best current characterization of one chain
              stage in one country, with its evidence status: observed,
              official claim, hypothesis, or missing. Official claims record
              intent, not verified outcomes.
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
          A framework that cannot say what would falsify it is a vibe. The
          forecast register tracks measurable questions with deadlines,
          resolution sources, and update histories. Ranges are initial author
          judgments — drafts, marked as such — not market prices or model
          outputs.
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
                Initial range{" "}
                <span className="font-semibold text-foreground">
                  {forecast.initial_probability_range}
                </span>{" "}
                · resolves via {forecast.resolution_source} by {forecast.deadline}
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
