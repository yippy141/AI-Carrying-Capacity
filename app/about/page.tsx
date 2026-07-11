import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          About
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          This project started as an argument in a group chat.
        </h1>

        <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
          <p>
            A friend, an economist by training, kept pressing one question
            about the US–China AI race that the standard commentary never
            answers: if the United States reaches the frontier first, what
            materially changes? Would American manufacturing revive? Would
            hospitals get cheaper? Or does a frontier lead mostly matter in
            cyber, intelligence, and the AI research loop, while the rest of
            the economy barely notices for years?
          </p>
          <p>
            <strong className="text-foreground">Frontier Is Not Fate</strong>{" "}
            is the attempt at the missing mechanism: an interactive study of
            when advanced AI becomes national power — and when infrastructure,
            institutions, and organization flatten the return. The underlying
            evidence system, the{" "}
            <strong className="text-foreground">AI Conversion Atlas</strong>,
            keeps the study honest: a source register with reliability tiers
            and official-claim statuses, a claim ledger with confidence levels
            and required caveats, and a forecast register that says in advance
            what would change our minds.
          </p>
          <p>
            The project refuses three things on principle: composite country
            scores, rankings, and silent imputation of missing values. Missing
            evidence is shown as missing, official claims are labeled as
            official claims, and the China–US comparison is a pair of
            hypotheses under test, not a verdict.
          </p>
        </div>

        <h2 className="mt-14 text-3xl text-foreground">Authorship</h2>
        <div className="mt-5 space-y-5 leading-8 text-muted">
          <p>
            Researched and written by{" "}
            <a
              className="focus-ring font-semibold text-foreground underline"
              href="https://jhyip.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jinhua Yip
            </a>
            . Background in international relations and China technology
            policy; works in English and Chinese sources.
          </p>
          <p>
            Research, drafting, and engineering assistance from AI tools —
            Claude (Anthropic) and OpenAI models — under human review. Deep
            Research outputs enter the repository as staged material and
            support no public claim until their sources are independently
            verified. All errors are the author&apos;s.
          </p>
        </div>

        <h2 className="mt-14 text-3xl text-foreground">Acknowledgments</h2>
        <p className="mt-5 leading-8 text-muted">
          The founding question belongs to the group chat — particularly the
          economist who kept asking &ldquo;so what?&rdquo; until it had to be
          answered properly. Conceptual debts to the absorptive-capacity and
          productivity-J-curve literatures, METR&apos;s time-horizon work, and
          the researchers building honest measurements of AI diffusion at the
          OECD, ECB, Eurostat, the US Census Bureau, and the IFR.
        </p>

        <h2 className="mt-14 text-3xl text-foreground">Get involved</h2>
        <p className="mt-5 leading-8 text-muted">
          The project is open source at{" "}
          <a
            className="focus-ring font-semibold text-foreground underline"
            href="https://github.com/yippy141/AI-Carrying-Capacity"
            rel="noopener noreferrer"
            target="_blank"
          >
            github.com/yippy141/AI-Carrying-Capacity
          </a>
          . Critique is welcome — especially from people working on China
          technology policy, AI governance, and the economics of technology
          diffusion. Start with{" "}
          <Link className="focus-ring underline" href="/methods">
            the methods
          </Link>{" "}
          and{" "}
          <Link className="focus-ring underline" href="/evidence">
            the evidence register
          </Link>
          ; if you can falsify a claim, the ledger has a column waiting for
          your source.
        </p>
      </div>
    </main>
  );
}
