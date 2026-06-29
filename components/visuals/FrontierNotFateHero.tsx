const stations = [
  {
    number: "01",
    title: "AI capability",
    tone: "text-primary-strong",
    description:
      "Frontier models and raw capability, the part of the race everyone watches."
  },
  {
    number: "02",
    title: "Conversion capacity",
    tone: "text-muted",
    description:
      "Industry, science, state capacity, talent and institutions that turn capability into use."
  },
  {
    number: "03",
    title: "Real outcomes",
    tone: "text-primary-strong",
    description: "Productivity, strategic power, and broadly shared welfare."
  }
];

const evidence = [
  {
    label: "observed",
    swatchClass: "border-accent bg-accent",
    definition:
      "Independently measured or reported by a credible third party."
  },
  {
    label: "official-claim",
    swatchClass: "border-warning bg-warning",
    definition:
      "Stated by a government or programme. Records intent, not a verified outcome."
  },
  {
    label: "estimated",
    swatchClass: "border-primary-strong bg-primary-strong",
    definition:
      "Modelled or inferred where direct measurement is unavailable."
  },
  {
    label: "missing",
    swatchClass: "border-missing bg-surface border-dashed",
    definition: "No reliable value yet. Shown, never quietly imputed."
  }
];

function FrontierRibbonFigure() {
  return (
    <figure className="mt-10 border-t border-rule pt-6 lg:mt-12">
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {stations.map((station) => (
          <div className="flex flex-col gap-2" key={station.number}>
            <div className="flex items-baseline gap-3">
              <span
                className={`font-display text-sm font-semibold ${station.tone}`}
              >
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

      <div className="mt-6 overflow-x-auto pb-3" tabIndex={0}>
        <svg
          aria-labelledby="frontier-ribbon-title frontier-ribbon-desc"
          className="block min-w-[760px]"
          role="img"
          viewBox="0 0 1180 300"
          width="100%"
        >
          <title id="frontier-ribbon-title">
            Frontier capability narrows through conversion bottlenecks
          </title>
          <desc id="frontier-ribbon-desc">
            Schematic: capability enters at full width and narrows through
            bottlenecks before reaching real outcomes.
          </desc>
          <defs>
            <marker
              id="frontier-ribbon-arrow"
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
            fontFamily="var(--font-sans)"
            fontSize="11.5"
            fontWeight="600"
            letterSpacing="0.12em"
            x="48"
            y="32"
          >
            CAPABILITY FRONTIER
          </text>

          <rect fill="var(--primary)" height="150" width="5" x="40" y="40" />
          <rect fill="var(--primary)" height="70" width="5" x="1135" y="40" />
          <polygon fill="var(--primary)" points="1135,40 1162,75 1135,110" />
          <text
            fill="var(--primary-strong)"
            fontFamily="var(--font-sans)"
            fontSize="11.5"
            fontWeight="600"
            letterSpacing="0.1em"
            textAnchor="end"
            x="1128"
            y="128"
          >
            WHAT ACTUALLY MATTERS
          </text>

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

          <g>
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="330"
              x2="330"
              y1="186"
              y2="232"
            />
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="365"
              x2="365"
              y1="178"
              y2="232"
            />
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="400"
              x2="400"
              y1="170"
              y2="232"
            />
            <text
              fill="var(--primary-strong)"
              fontFamily="var(--font-sans)"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="0.13em"
              textAnchor="middle"
              x="365"
              y="256"
            >
              BOTTLENECK
            </text>
            <text
              fill="var(--muted)"
              fontFamily="var(--font-sans)"
              fontSize="13"
              textAnchor="middle"
              x="365"
              y="274"
            >
              Compute · power · grid · talent · management
            </text>
          </g>

          <g>
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="795"
              x2="795"
              y1="146"
              y2="232"
            />
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="830"
              x2="830"
              y1="138"
              y2="232"
            />
            <line
              markerEnd="url(#frontier-ribbon-arrow)"
              stroke="var(--missing)"
              strokeWidth="1.3"
              x1="865"
              x2="865"
              y1="130"
              y2="232"
            />
            <text
              fill="var(--primary-strong)"
              fontFamily="var(--font-sans)"
              fontSize="10.5"
              fontWeight="700"
              letterSpacing="0.13em"
              textAnchor="middle"
              x="830"
              y="256"
            >
              BOTTLENECK
            </text>
            <text
              fill="var(--muted)"
              fontFamily="var(--font-sans)"
              fontSize="13"
              textAnchor="middle"
              x="830"
              y="274"
            >
              Institutions · diffusion · distribution quality
            </text>
          </g>
        </svg>
      </div>

      <figcaption className="flex flex-col gap-4 border-t border-rule pt-4 lg:flex-row lg:items-start lg:justify-between">
        <p className="max-w-3xl text-sm leading-7 text-muted">
          Read left to right. Capability enters as the frontier; conversion
          capacity decides how much becomes real; bottlenecks drain what never
          converts. The width that survives to the right edge, not the height at
          the left, is the thing worth measuring.
        </p>
        <span className="text-sm italic leading-6 text-missing lg:whitespace-nowrap">
          Illustrative schematic, not scored data
        </span>
      </figcaption>
    </figure>
  );
}

function EvidenceConventionLegend() {
  return (
    <section className="mt-14 border-t-2 border-foreground pt-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-foreground">
            How to read this atlas
          </h2>
          <p className="mt-3 leading-7 text-muted">
            Every value carries an evidence label. The colour describes how much
            we trust the number, not how a country performs. Missing values stay
            visible and are never quietly imputed.
          </p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-missing">
          Evidence convention
        </span>
      </div>

      <div className="mt-6 grid border border-rule sm:grid-cols-2 lg:grid-cols-4">
        {evidence.map((item) => (
          <div
            className="min-h-36 border-b border-rule p-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            key={item.label}
          >
            <span className="inline-flex items-center gap-3">
              <span
                className={`h-4 w-4 shrink-0 rounded-[3px] border ${item.swatchClass}`}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
            </span>
            <p className="mt-3 text-sm leading-6 text-muted">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-missing">
        Two further states, <span className="italic">qualitative-coded</span>{" "}
        and <span className="italic">placeholder</span>, appear inside modules
        where a number cannot yet stand on its own.
      </p>
    </section>
  );
}

export function FrontierNotFateHero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-12 pt-14 sm:px-8 lg:pb-16 lg:pt-20">
      <p className="mb-6 max-w-3xl text-xs font-semibold uppercase tracking-[0.12em] text-primary-strong">
        An editorial research atlas · Frontier access → conversion → outcomes
      </p>
      <div className="grid gap-8 lg:grid-cols-[1.28fr_0.72fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-5xl leading-[1.03] text-foreground sm:text-6xl lg:text-7xl">
            Frontier is
            <br />
            not fate.
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-muted lg:pb-2">
          The AI race is not only about who builds the most capable model, but
          who can convert AI capability into{" "}
          <span className="font-semibold text-foreground">
            industry, science, state capacity,
          </span>{" "}
          and broadly shared welfare.
        </p>
      </div>

      <FrontierRibbonFigure />
      <EvidenceConventionLegend />
    </section>
  );
}
