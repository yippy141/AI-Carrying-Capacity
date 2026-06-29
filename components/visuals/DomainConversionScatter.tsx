const haloPoints = [
  { cx: 612, cy: 125, rx: 58, ry: 34 },
  { cx: 402, cy: 158, rx: 50, ry: 30 },
  { cx: 797, cy: 328, rx: 48, ry: 30 }
];

const domainPoints = [
  {
    label: "AI R&D and coding",
    cx: 936,
    cy: 525,
    anchor: "end",
    labelX: 924,
    labelY: 529,
    fill: "var(--primary)"
  },
  {
    label: "Cyber and intelligence",
    cx: 850,
    cy: 438,
    anchor: "end",
    labelX: 838,
    labelY: 442,
    fill: "var(--primary)"
  },
  {
    label: "Agentic computer use",
    cx: 797,
    cy: 328,
    anchor: "start",
    labelX: 809,
    labelY: 324,
    fill: "var(--foreground)"
  },
  {
    label: "Scientific discovery",
    cx: 758,
    cy: 285,
    anchor: "end",
    labelX: 746,
    labelY: 281,
    fill: "var(--foreground)"
  },
  {
    label: "Healthcare administration",
    cx: 534,
    cy: 205,
    anchor: "start",
    labelX: 546,
    labelY: 201,
    fill: "var(--foreground)"
  },
  {
    label: "Manufacturing and robotics",
    cx: 612,
    cy: 125,
    anchor: "start",
    labelX: 624,
    labelY: 121,
    fill: "var(--foreground)"
  },
  {
    label: "Public services",
    cx: 402,
    cy: 158,
    anchor: "start",
    labelX: 414,
    labelY: 154,
    fill: "var(--foreground)"
  }
] as const;

export function DomainConversionScatter() {
  return (
    <figure className="border-y border-rule py-8" aria-labelledby="domain-scatter-heading">
      <div className="flex flex-col gap-5 border-b-2 border-foreground pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.13em] text-primary-strong">
            AI Conversion Atlas · Figure 1
          </p>
          <h2
            className="font-display text-3xl font-semibold leading-tight text-foreground"
            id="domain-scatter-heading"
          >
            Where frontier capability converts, and where it stalls
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Each domain placed by how much raw model capability matters, against
          how hard it is to turn that capability into real-world output.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto pb-3" tabIndex={0}>
        <svg
          aria-labelledby="domain-scatter-title domain-scatter-desc"
          className="block min-w-[760px]"
          role="img"
          viewBox="0 0 1020 660"
          width="100%"
        >
          <title id="domain-scatter-title">
            Domains by frontier sensitivity and conversion drag
          </title>
          <desc id="domain-scatter-desc">
            Scatter plot of seven domains by frontier sensitivity and conversion
            drag. Positions are illustrative, not scored.
          </desc>

          <rect
            fill="var(--primary)"
            height="240"
            opacity="0.05"
            width="460"
            x="580"
            y="360"
          />
          <rect
            fill="var(--missing)"
            height="150"
            opacity="0.045"
            width="960"
            x="80"
            y="60"
          />

          <line
            stroke="var(--rule)"
            strokeDasharray="2 5"
            x1="560"
            x2="560"
            y1="60"
            y2="600"
          />
          <line
            stroke="var(--rule)"
            strokeDasharray="2 5"
            x1="80"
            x2="1040"
            y1="360"
            y2="360"
          />

          <line
            stroke="var(--foreground)"
            strokeWidth="1.5"
            x1="80"
            x2="80"
            y1="60"
            y2="600"
          />
          <line
            stroke="var(--foreground)"
            strokeWidth="1.5"
            x1="80"
            x2="1040"
            y1="600"
            y2="600"
          />

          <text
            fill="var(--primary-strong)"
            fontFamily="var(--font-sans)"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="0.12em"
            textAnchor="end"
            x="1030"
            y="588"
          >
            WHERE CAPABILITY PAYS OFF
          </text>
          <text
            fill="var(--missing)"
            fontFamily="var(--font-sans)"
            fontSize="11.5"
            fontWeight="700"
            letterSpacing="0.12em"
            x="92"
            y="80"
          >
            HIGH DRAG - BEING AT THE FRONTIER BUYS LESS
          </text>

          <text
            fill="var(--foreground)"
            fontFamily="var(--font-sans)"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
            x="560"
            y="640"
          >
            Frontier sensitivity → how much raw model capability matters
          </text>
          <text
            fill="var(--foreground)"
            fontFamily="var(--font-sans)"
            fontSize="14"
            fontWeight="600"
            textAnchor="middle"
            transform="rotate(-90 40 330)"
            x="40"
            y="330"
          >
            Conversion drag → difficulty of turning capability into output
          </text>

          <text
            fill="var(--missing)"
            fontFamily="var(--font-sans)"
            fontSize="11"
            x="84"
            y="618"
          >
            low
          </text>
          <text
            fill="var(--missing)"
            fontFamily="var(--font-sans)"
            fontSize="11"
            textAnchor="end"
            x="1040"
            y="618"
          >
            high
          </text>
          <text
            fill="var(--missing)"
            fontFamily="var(--font-sans)"
            fontSize="11"
            textAnchor="end"
            x="74"
            y="598"
          >
            low
          </text>
          <text
            fill="var(--missing)"
            fontFamily="var(--font-sans)"
            fontSize="11"
            textAnchor="end"
            x="74"
            y="72"
          >
            high
          </text>

          {haloPoints.map((point) => (
            <ellipse
              cx={point.cx}
              cy={point.cy}
              fill="none"
              key={`${point.cx}-${point.cy}`}
              opacity="0.55"
              rx={point.rx}
              ry={point.ry}
              stroke="var(--missing)"
              strokeDasharray="3 4"
            />
          ))}

          {domainPoints.map((point) => (
            <g key={point.label}>
              <circle cx={point.cx} cy={point.cy} fill={point.fill} r="6.5" />
              <text
                fill="var(--foreground)"
                fontFamily="var(--font-sans)"
                fontSize="15.5"
                fontWeight="600"
                textAnchor={point.anchor}
                x={point.labelX}
                y={point.labelY}
              >
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid gap-6 border-t border-rule pt-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-missing">
            Reading the markers
          </span>
          <div className="flex items-center gap-3 text-sm leading-6 text-muted">
            <svg aria-hidden="true" className="h-4 w-6 shrink-0">
              <circle cx="12" cy="8" fill="var(--primary)" r="5.5" />
            </svg>
            <span>
              Sits in the high-sensitivity, low-drag zone where frontier
              capability converts fastest
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm leading-6 text-muted">
            <svg aria-hidden="true" className="h-4 w-6 shrink-0">
              <circle cx="12" cy="8" fill="var(--foreground)" r="5.5" />
            </svg>
            <span>
              Frontier matters, but conversion drag holds back real-world output
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm leading-6 text-muted">
            <svg aria-hidden="true" className="h-4 w-6 shrink-0">
              <ellipse
                cx="12"
                cy="8"
                fill="none"
                rx="9"
                ry="5.5"
                stroke="var(--missing)"
                strokeDasharray="3 3"
              />
            </svg>
            <span>Dashed halo = placement we are least confident about</span>
          </div>
        </div>

        <figcaption className="text-sm leading-7 text-muted">
          <span className="font-semibold text-foreground">How to read.</span>{" "}
          Capability matters most toward the lower right, where sensitivity is
          high and drag is low: AI R&D, coding, and cyber. Physical and
          institutional domains, including manufacturing, public services, and
          healthcare administration, sit high in the drag band, where being at
          the frontier buys less because output depends on hardware, regulation,
          procurement, and trust.
          <span className="mt-3 block italic text-missing">
            <span>Positions are illustrative, not scored</span>. Axes are
            ordinal judgements, not measured quantities; the dashed halos mark
            domains whose placement is most contestable.{" "}
            <span>Read the pattern, not the coordinates</span>.
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
