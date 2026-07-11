import Link from "next/link";

const WORKING_PAPER_URL =
  "https://github.com/yippy141/AI-Carrying-Capacity/blob/main/content/essays/launch-essay-v1.md";

const stations = [
  {
    number: "01",
    title: "AI capability",
    description:
      "Frontier models and raw capability — the part of the race everyone watches."
  },
  {
    number: "02",
    title: "Conversion capacity",
    description:
      "Power, factories, firms, institutions, and skills that turn capability into use."
  },
  {
    number: "03",
    title: "Real outcomes",
    description:
      "Productivity, strategic power, and broadly shared welfare — the part that matters."
  }
];

/**
 * Hero for the Frontier Is Not Fate study. Ribbon figure adapted from
 * the superseded PR #19 FrontierNotFateHero: capability enters at full
 * width and narrows through conversion bottlenecks. Illustrative
 * schematic, not scored data — that caption is part of the figure.
 */
export function FrontierNotFateHero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-24">
      <p className="mb-6 text-sm font-medium text-muted">
        Working paper, v1.1 draft · Last updated July 11, 2026 · Evidence cutoff
        July 5, 2026
      </p>

      <div className="max-w-5xl">
        <h1 className="text-5xl leading-[1.05] text-foreground sm:text-7xl">
          Frontier is not fate.
        </h1>
        <p className="mt-8 max-w-3xl text-xl leading-9 text-muted sm:text-2xl sm:leading-10">
          The AI race is not only about who builds the most capable model. It is
          about who can convert capability into industry, science, state
          capacity, and broadly shared welfare — and the two races have
          different winners.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          className="focus-ring rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
          href="/findings"
        >
          Explore the findings
        </Link>
        <a
          className="focus-ring rounded-full border border-rule px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-strong"
          href={WORKING_PAPER_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Read the working paper
        </a>
      </div>

      <figure className="mt-14 border-t border-rule pt-8">
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {stations.map((station) => (
            <div className="flex flex-col gap-2" key={station.number}>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-sm font-semibold text-primary-strong">
                  {station.number}
                </span>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {station.title}
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted">
                {station.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto pb-2" tabIndex={0}>
          <svg
            aria-labelledby="hero-ribbon-title hero-ribbon-desc"
            className="block min-w-[760px]"
            role="img"
            viewBox="0 0 1180 290"
            width="100%"
          >
            <title id="hero-ribbon-title">
              Frontier capability narrows through conversion bottlenecks
            </title>
            <desc id="hero-ribbon-desc">
              Schematic: capability enters at full width on the left and
              narrows through two bottleneck steps before reaching real
              outcomes on the right. Illustrative, not scored data.
            </desc>
            <defs>
              <marker
                id="hero-ribbon-arrow"
                markerHeight="7"
                markerWidth="7"
                orient="auto"
                refX="3.2"
                refY="5.6"
              >
                <path
                  d="M0.6,0.6 L3.2,5.4 L5.8,0.6"
                  fill="none"
                  stroke="var(--missing)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.3"
                />
              </marker>
            </defs>

            {/* ribbon body: full width at left, stepped narrowing rightward */}
            <path
              d="M40,40 L1140,40 L1140,110 L900,110 C850,110 810,150 760,150 L430,150 C380,150 350,190 300,190 L40,190 Z"
              fill="oklch(0.955 0.012 42)"
            />
            <path
              d="M40,190 L300,190 C350,190 380,150 430,150 L760,150 C810,150 850,110 900,110 L1140,110"
              fill="none"
              stroke="var(--rule)"
              strokeWidth="1.5"
            />
            <line
              stroke="var(--foreground)"
              strokeWidth="2"
              x1="40"
              x2="1140"
              y1="40"
              y2="40"
            />
            <text
              fill="var(--muted)"
              fontSize="11.5"
              fontWeight="600"
              letterSpacing="0.12em"
              x="48"
              y="30"
            >
              CAPABILITY FRONTIER
            </text>

            <rect fill="var(--primary)" height="150" width="5" x="40" y="40" />
            <rect fill="var(--primary)" height="70" width="5" x="1135" y="40" />
            <polygon fill="var(--primary)" points="1135,40 1162,75 1135,110" />
            <text
              fill="var(--primary-strong)"
              fontSize="11.5"
              fontWeight="600"
              letterSpacing="0.1em"
              textAnchor="end"
              x="1128"
              y="130"
            >
              WHAT REACHES OUTCOMES
            </text>

            {/* animated flow line through the ribbon */}
            <path
              className="frontier-flow"
              d="M45,115 L300,115 C350,115 380,95 430,95 L760,95 C810,95 850,75 900,75 L1135,75"
              fill="none"
              opacity="0.55"
              stroke="var(--primary)"
              strokeDasharray="2 14"
              strokeLinecap="round"
              strokeWidth="2"
            />

            {/* bottleneck 1 */}
            <g>
              {[330, 365, 400].map((x, index) => (
                <line
                  key={x}
                  markerEnd="url(#hero-ribbon-arrow)"
                  stroke="var(--missing)"
                  strokeWidth="1.3"
                  x1={x}
                  x2={x}
                  y1={186 - index * 8}
                  y2={226}
                />
              ))}
              <text
                fill="var(--primary-strong)"
                fontSize="10.5"
                fontWeight="700"
                letterSpacing="0.13em"
                textAnchor="middle"
                x="365"
                y="250"
              >
                BOTTLENECK
              </text>
              <text fill="var(--muted)" fontSize="13" textAnchor="middle" x="365" y="268">
                Compute · power · grid · chips
              </text>
            </g>

            {/* bottleneck 2 */}
            <g>
              {[795, 830, 865].map((x, index) => (
                <line
                  key={x}
                  markerEnd="url(#hero-ribbon-arrow)"
                  stroke="var(--missing)"
                  strokeWidth="1.3"
                  x1={x}
                  x2={x}
                  y1={146 - index * 8}
                  y2={226}
                />
              ))}
              <text
                fill="var(--primary-strong)"
                fontSize="10.5"
                fontWeight="700"
                letterSpacing="0.13em"
                textAnchor="middle"
                x="830"
                y="250"
              >
                BOTTLENECK
              </text>
              <text fill="var(--muted)" fontSize="13" textAnchor="middle" x="830" y="268">
                Procurement · redesign · skills · trust
              </text>
            </g>
          </svg>
        </div>
        <figcaption className="mt-2 text-sm leading-6 text-muted">
          The two-stage race, as a schematic. Capability enters at full width;
          what reaches real outcomes depends on the bottlenecks in between.
          <span className="italic"> Illustrative schematic, not scored data.</span>
        </figcaption>
      </figure>
    </section>
  );
}
