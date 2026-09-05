import { AnnotationLayer } from "@/components/ui/AnnotationLayer";
import { EvidenceChip } from "@/components/ui/EvidenceChip";
import {
  buildAdoptionDepthFigureModel,
  type AdoptionDepthObservation,
  type FigureObservation
} from "@/lib/adoptionDepth";

const ECB_LABELS = [
  "Not in use",
  "Very infrequent or experimental",
  "Moderate use",
  "Significant use"
];

const ECB_COLORS = [
  "var(--surface)",
  "var(--hairline)",
  "var(--comparator)",
  "var(--ink)"
];

function formatPercent(value: number): string {
  return (Number.isInteger(value) ? value.toFixed(0) : String(value)) + "%";
}

function Axis({ max, midpoint }: { max: number; midpoint: number }) {
  return (
    <div className="mt-2 flex justify-between border-t border-hairline pt-1 font-mono text-[11px] text-ink-soft">
      <span>0%</span>
      <span>{midpoint}%</span>
      <span>{max}%</span>
    </div>
  );
}

function ScaleBar({
  color,
  max = 100,
  modelEstimate = false,
  row
}: {
  color: string;
  max?: number;
  modelEstimate?: boolean;
  row: FigureObservation;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 font-mono text-[13px] leading-5">
        <span className="font-sans text-[15px] text-ink">{row.definition}</span>
        <span className="shrink-0 font-medium text-ink">{formatPercent(row.value)}</span>
      </div>
      <div
        aria-label={`${row.definition}: ${formatPercent(row.value)}. Denominator: ${row.denominator}`}
        className="mt-2 h-3 bg-surface"
        role="img"
      >
        <div
          className="h-full"
          style={{
            backgroundColor: modelEstimate ? "var(--surface)" : color,
            backgroundImage: modelEstimate
              ? 'url("/patterns/model-estimate.svg")'
              : undefined,
            border: modelEstimate ? `1px solid ${color}` : undefined,
            width: `${Math.min(100, (row.value / max) * 100)}%`
          }}
        />
      </div>
    </div>
  );
}

function PanelHeader({
  contextOnly = false,
  country,
  id,
  number,
  source,
  title
}: {
  contextOnly?: boolean;
  country?: "us" | "cn";
  id: string;
  number: string;
  source: string;
  title: string;
}) {
  return (
    <div>
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.08em] ${
          country === "us" ? "text-us" : country === "cn" ? "text-cn" : "text-ink-soft"
        }`}
      >
        Panel {number} · {source}{contextOnly ? " · Context only" : ""}
      </p>
      <h4 className="mt-2 font-display text-[21px] font-semibold leading-tight text-ink" id={id}>
        {title}
      </h4>
    </div>
  );
}

function PanelSource({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 border-t border-hairline pt-3 font-mono text-[11px] leading-5 text-ink-soft">
      {children}
    </p>
  );
}

/** Figure 1. Every plotted value resolves from a canonical observation ID. */
export function AdoptionDepthFigure({
  observations
}: {
  observations: AdoptionDepthObservation[];
}) {
  const model = buildAdoptionDepthFigureModel(observations);
  const [notUsing] = model.ecb.rows;
  const [narrow, comprehensive] = model.btos.adopterOnly;
  const [small, medium, large] = model.eurostat.sizeGradient;


  return (
    <div
      data-observation-ids={model.plottedObservationIds.join(" ")}
      aria-label={`Figure 1. ECB reported categories: ${model.ecb.rows.map((row) => formatPercent(row.value)).join(", ")}. U.S. Census: ${formatPercent(model.btos.allFirms.value)} of all employer businesses, ${formatPercent(narrow.value)} narrow functional users, ${formatPercent(comprehensive.value)} comprehensive model estimate. Eurostat small, medium, and large firms: ${formatPercent(small.value)}, ${formatPercent(medium.value)}, ${formatPercent(large.value)}. China: contextual source withheld pending translation review.`}
      role="group"
    >
      <p className="max-w-[66ch] text-[15px] leading-6 text-ink-soft">
        Each panel retains its own axis, denominator, and survey universe. Values
        are source-specific and must not be pooled or ranked.
      </p>

      <div className="mt-6 grid border-y border-hairline lg:grid-cols-2">
        <section className="py-8 lg:border-r lg:border-hairline lg:pr-8" aria-labelledby="ecb-panel-title">
          <PanelHeader
            id="ecb-panel-title"
            number="A"
            source="ECB SAFE · euro area"
            title="Most reported use is experimental or moderate."
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
            Axis 0–100% · weighted SAFE respondents
          </p>
          <div className="relative mt-4 min-h-52 pt-16">
            <AnnotationLayer
              annotations={[
                {
                  id: "ecb-residual",
                  label: "Published categories leave an unallocated residual.",
                  labelX: 96,
                  labelY: 18,
                  anchorX: 99,
                  anchorY: 48,
                  align: "end"
                }
              ]}
            />
            <div
              aria-label={`ECB SAFE use intensity: ${ECB_LABELS.map((label, index) => `${label} ${formatPercent(model.ecb.rows[index].value)}`).join(", ")}. Reported shares total ${model.ecb.reportedTotal}%.`}
              className="flex h-10 overflow-hidden"
              role="img"
            >
              {model.ecb.rows.map((row, index) => (
                <div
                  aria-hidden="true"
                  className="h-full border-r border-paper last:border-r-0"
                  key={row.observation_id}
                  style={{ backgroundColor: ECB_COLORS[index], width: `${row.value}%` }}
                />
              ))}
              <div
                aria-hidden="true"
                className="h-full border border-dashed border-comparator bg-paper"
                style={{ width: `${model.ecb.unreportedResidual}%` }}
              />
            </div>
            <Axis max={100} midpoint={50} />
            <ul className="mt-5 grid gap-x-5 gap-y-2 sm:grid-cols-2">
              {model.ecb.rows.map((row, index) => (
                <li className="flex items-baseline justify-between gap-3 text-[13px] text-ink-soft" key={row.observation_id}>
                  <span>{ECB_LABELS[index]}</span>
                  <span className="font-mono text-ink">{formatPercent(row.value)}</span>
                </li>
              ))}
            </ul>
          </div>
          <PanelSource>
            <a className="focus-ring underline" href="/evidence#adoption-ecb">ECB SAFE Q4 2025 — source and caveat</a> · denominator: {notUsing.denominator}
          </PanelSource>
        </section>

        <section className="border-t border-hairline py-8 lg:border-t-0 lg:pl-8" aria-labelledby="btos-panel-title">
          <PanelHeader
            country="us"
            id="btos-panel-title"
            number="B"
            source="Census BTOS · United States"
            title="Reach and functional breadth answer different questions."
          />
          <div className="mt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              All employer businesses · axis 0–100%
            </p>
            <div className="mt-4">
              <ScaleBar color="var(--us)" row={model.btos.allFirms} />
              <Axis max={100} midpoint={50} />
            </div>
          </div>
          <div className="relative mt-7 border-t border-hairline pt-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
              Q24 functional users only · axis 0–100%
            </p>
            <div className="mt-4 space-y-6">
              <ScaleBar color="var(--us)" row={narrow} />
              <div>
                <div className="mb-2">
                  <EvidenceChip basis="model estimate" reviewStatus="canonical" />
                </div>
                <ScaleBar color="var(--us)" modelEstimate row={comprehensive} />
              </div>
              <Axis max={100} midpoint={50} />
            </div>
          </div>
          <PanelSource>
            <a className="focus-ring underline" href="/evidence#adoption-census">Census CES Working Paper 26-25 — source and caveat</a> · Q23 denominator: {model.btos.allFirms.denominator} · Q24 denominator: {narrow.denominator}
          </PanelSource>
        </section>

        <section className="border-t border-hairline py-8 lg:border-r lg:border-hairline lg:pr-8" aria-labelledby="eurostat-panel-title">
          <PanelHeader
            id="eurostat-panel-title"
            number="C"
            source="Eurostat · European Union"
            title="Adoption is uneven across firm size."
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.05em] text-ink-soft">
            Within each size universe · axis 0–60%
          </p>
          <div className="mt-5 space-y-5">
            <ScaleBar color="var(--comparator)" max={60} row={small} />
            <ScaleBar color="var(--comparator)" max={60} row={medium} />
            <ScaleBar color="var(--comparator)" max={60} row={large} />
            <Axis max={60} midpoint={30} />
          </div>
          <p className="mt-5 text-[13px] leading-5 text-ink-soft">
            Diffusion context only. This panel does not measure depth of use.
          </p>
          <PanelSource>
            <a className="focus-ring underline" href="/evidence#adoption-eurostat">Eurostat 2025 — source and caveat</a> · universe: {small.survey_universe}
          </PanelSource>
        </section>

        <section className="relative border-t border-hairline py-8 lg:pl-8" aria-labelledby="china-panel-title">
          <PanelHeader
            contextOnly
            country="cn"
            id="china-panel-title"
            number="D"
            source="NBS · China"
            title="A different firm universe gives context only."
          />
          <p className="mt-5 text-[15px] leading-7 text-ink-soft">The NBS Fifth National Economic Census covers a different enterprise universe. It cannot supply a comparable all-firm adoption rate or a national ranking here.</p>
          <p className="mt-5 text-[15px] leading-7 text-ink-soft">The contextual observation is retained in the research record, unplotted. Load-bearing translated wording awaits native-language human review.</p>
          <PanelSource><a className="focus-ring underline" href="/evidence#nbs-restriction">NBS — scope and translation restriction</a></PanelSource>
        </section>
      </div>
    </div>
  );
}

export default AdoptionDepthFigure;
