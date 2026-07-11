import type { ReactNode } from "react";

/**
 * FrontierSensitivityScatter
 * Figure 1 of the AI Conversion Atlas: domains placed by how much raw model
 * capability matters (frontier sensitivity, x) against how hard it is to turn
 * capability into real-world output (conversion drag, y).
 *
 * Positions are ordinal judgments, not measured quantities. That framing is
 * part of the figure and must not be removed. Dashed halos mark the
 * placements we are least confident about.
 *
 * Converted from the Claude Design mockup (Conversion_Map_dc.html), adapted
 * to the Atlas design tokens. Pure SVG, no chart library.
 * Ledger: clm-0029 (thesis), clm-0024 (METR domain evidence, staged).
 */

type DomainPoint = {
  id: string;
  label: string;
  /** 0-100 ordinal judgment, higher = raw capability matters more */
  sensitivity: number;
  /** 0-100 ordinal judgment, higher = harder to convert into output */
  drag: number;
  /** true = sits in the high-sensitivity, low-drag conversion zone */
  converts: boolean;
  /** dashed halo for the placements most open to challenge */
  contested?: boolean;
  labelSide?: "left" | "right";
};

const DOMAINS: DomainPoint[] = [
  { id: "ai-rnd", label: "AI R&D and coding", sensitivity: 92, drag: 12, converts: true, labelSide: "left" },
  { id: "cyber", label: "Cyber and intelligence", sensitivity: 83, drag: 27, converts: true, labelSide: "left" },
  { id: "agentic", label: "Agentic computer use", sensitivity: 77, drag: 47, converts: false, contested: true, labelSide: "right" },
  { id: "science", label: "Scientific discovery", sensitivity: 73, drag: 55, converts: false, labelSide: "left" },
  { id: "health", label: "Healthcare administration", sensitivity: 49, drag: 70, converts: false, labelSide: "right" },
  { id: "mfg", label: "Manufacturing and robotics", sensitivity: 57, drag: 85, converts: false, contested: true, labelSide: "right" },
  { id: "public", label: "Public services", sensitivity: 35, drag: 79, converts: false, contested: true, labelSide: "right" }
];

// Plot geometry
const X0 = 80;
const X1 = 1000;
const Y0 = 600;
const Y1 = 60;
const px = (s: number) => X0 + (s / 100) * (X1 - X0);
const py = (d: number) => Y0 - (d / 100) * (Y0 - Y1);

const INK = "oklch(0.17 0.018 42)";
const MUTED = "oklch(0.39 0.018 42)";
const FAINT = "oklch(0.48 0.015 42)";
const RULE = "oklch(0.82 0.004 42)";
const ACCENT = "var(--primary)";
const ACCENT_DEEP = "var(--primary-strong)";

export function FrontierSensitivityScatter({
  showQuadrantShading = true,
  showUncertaintyHalos = true,
  embedded = false
}: {
  showQuadrantShading?: boolean;
  showUncertaintyHalos?: boolean;
  /** true when rendered inside a FigureShell that provides number/title */
  embedded?: boolean;
}) {
  return (
    <figure className={embedded ? "m-0 bg-white" : "my-10 border border-rule bg-white p-5 sm:p-10"}>
      {embedded ? null : (
        <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 pb-5" style={{ borderColor: INK }}>
          <div className="max-w-[62ch]">
            <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-[0.13em]" style={{ color: ACCENT_DEEP }}>
              AI Conversion Atlas
            </p>
            <h3
              className="m-0 font-display text-2xl font-semibold leading-tight sm:text-[33px]"
              style={{ color: INK, letterSpacing: "-0.012em" }}
            >
              Where frontier capability converts, and where it stalls
            </h3>
          </div>
          <p className="m-0 max-w-[30ch] self-end text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
            Each domain placed by how much raw model capability matters, against how hard it is to turn that
            capability into real-world output.
          </p>
        </div>
      )}

      <div className="overflow-x-auto pb-2" tabIndex={0}>
      <svg
        viewBox="0 0 1020 660"
        className="mt-2 block w-full min-w-[680px]"
        role="img"
        aria-label="Scatter plot of seven domains by frontier sensitivity and conversion drag. Positions are ordinal judgments, not measured values."
      >
        {showQuadrantShading && (
          <>
            {/* conversion zone: high sensitivity, low drag */}
            <rect x={560} y={360} width={X1 - 560} height={Y0 - 360} fill={ACCENT} opacity={0.05} />
            {/* high-drag band */}
            <rect x={X0} y={Y1} width={X1 - X0} height={150} fill={FAINT} opacity={0.045} />
          </>
        )}

        {/* median crosshair */}
        <line x1={560} y1={Y1} x2={560} y2={Y0} stroke={RULE} strokeWidth={1} strokeDasharray="2 5" />
        <line x1={X0} y1={360} x2={X1} y2={360} stroke={RULE} strokeWidth={1} strokeDasharray="2 5" />

        {/* axis frame */}
        <line x1={X0} y1={Y1} x2={X0} y2={Y0} stroke={INK} strokeWidth={1.5} />
        <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke={INK} strokeWidth={1.5} />

        {/* zone labels */}
        <text x={X1 - 10} y={Y0 - 12} textAnchor="end" fontSize={11.5} fontWeight={700} letterSpacing="0.12em" fill={ACCENT_DEEP}>
          WHERE CAPABILITY PAYS OFF
        </text>
        <text x={92} y={80} fontSize={11.5} fontWeight={700} letterSpacing="0.12em" fill={FAINT}>
          HIGH DRAG — BEING AT THE FRONTIER BUYS LESS
        </text>

        {/* axis titles */}
        <text x={(X0 + X1) / 2} y={640} textAnchor="middle" fontSize={14} fontWeight={600} fill={INK}>
          Frontier sensitivity → how much raw model capability matters
        </text>
        <text x={40} y={330} transform="rotate(-90 40 330)" textAnchor="middle" fontSize={14} fontWeight={600} fill={INK}>
          Conversion drag → difficulty of turning capability into output
        </text>

        {/* ticks */}
        <text x={84} y={618} fontSize={11} fill={FAINT}>low</text>
        <text x={X1} y={618} textAnchor="end" fontSize={11} fill={FAINT}>high</text>
        <text x={74} y={Y0 - 2} textAnchor="end" fontSize={11} fill={FAINT}>low</text>
        <text x={74} y={72} textAnchor="end" fontSize={11} fill={FAINT}>high</text>

        {/* uncertainty halos under points */}
        {showUncertaintyHalos &&
          DOMAINS.filter((d) => d.contested).map((d) => (
            <ellipse
              key={`halo-${d.id}`}
              cx={px(d.sensitivity)}
              cy={py(d.drag)}
              rx={54}
              ry={32}
              fill="none"
              stroke={FAINT}
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.55}
            />
          ))}

        {/* points and labels */}
        {DOMAINS.map((d) => {
          const cx = px(d.sensitivity);
          const cy = py(d.drag);
          const left = d.labelSide === "left";
          return (
            <g key={d.id}>
              <circle cx={cx} cy={cy} r={6.5} fill={d.converts ? ACCENT : INK} />
              <text
                x={left ? cx - 12 : cx + 12}
                y={cy + (left ? 4 : -4)}
                textAnchor={left ? "end" : "start"}
                fontSize={15.5}
                fontWeight={600}
                fill={INK}
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      <div className="mt-3 grid gap-8 border-t pt-4 sm:grid-cols-2" style={{ borderColor: RULE }}>
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: FAINT }}>
            Reading the markers
          </span>
          <Legend swatch={<circle cx={11} cy={8} r={5.5} fill={ACCENT} />}>
            Sits in the high-sensitivity, low-drag zone where frontier capability converts fastest
          </Legend>
          <Legend swatch={<circle cx={11} cy={8} r={5.5} fill={INK} />}>
            Frontier matters, but conversion drag holds back real-world output
          </Legend>
          <Legend
            swatch={
              <ellipse cx={11} cy={8} rx={9} ry={5.5} fill="none" stroke={FAINT} strokeWidth={1} strokeDasharray="3 3" />
            }
          >
            Dashed halo = placement we are least confident about
          </Legend>
        </div>
        <figcaption className="text-[13.5px] leading-relaxed" style={{ color: MUTED }}>
          <span className="font-semibold" style={{ color: INK }}>How to read.</span> Capability matters most toward
          the lower right, where sensitivity is high and drag is low: AI R&amp;D, coding, and cyber. Physical and
          institutional domains sit high in the drag band, where being at the frontier buys less because output
          depends on hardware, regulation, procurement, and trust.
          <span className="mt-2.5 block italic" style={{ color: FAINT }}>
            Positions are illustrative, not scored. Axes are ordinal judgments, not measured quantities; the dashed
            halos mark domains whose placement is most contestable. Read the pattern, not the coordinates.
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function Legend({ swatch, children }: { swatch: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-[13.5px]" style={{ color: MUTED }}>
      <svg width={22} height={16} aria-hidden>{swatch}</svg>
      <span>{children}</span>
    </div>
  );
}

export default FrontierSensitivityScatter;
