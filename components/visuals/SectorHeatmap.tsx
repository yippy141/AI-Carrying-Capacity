import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { visualSystemData } from "@/lib/data";
import type {
  ManufacturingHeatmapCell,
  ManufacturingHeatmapCountry,
  ManufacturingHeatmapFactor,
  VisualSystemData
} from "@/lib/types";

import { evidenceSoftClasses } from "@/components/visuals/statusStyles";

type SectorHeatmapProps = {
  data?: VisualSystemData;
};

function countryLabel(data: VisualSystemData, iso: string) {
  return data.countries.find((country) => country.iso === iso)?.short_name ?? iso;
}

function cellForFactor(
  country: ManufacturingHeatmapCountry,
  factor: ManufacturingHeatmapFactor
) {
  return country.cells.find((cell) => cell.factor === factor.key);
}

function HeatCell({
  cell,
  country,
  factor
}: {
  cell?: ManufacturingHeatmapCell;
  country: string;
  factor: ManufacturingHeatmapFactor;
}) {
  if (!cell) {
    return (
      <div
        className="min-h-28 rounded-md border border-rule bg-surface p-3 text-xs text-missing"
        aria-label={`${country}, ${factor.label}: missing`}
      >
        missing
      </div>
    );
  }

  return (
    <div
      className={`min-h-28 rounded-md border p-3 ${evidenceSoftClasses[cell.source_evidence_label]}`}
      aria-label={`${country}, ${factor.label}: value ${cell.value_status}, source ${cell.source_evidence_label}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-semibold text-foreground">
          value: {cell.value_status}
        </span>
        <ConfidenceBadge label={cell.source_evidence_label} />
      </div>
      <p className="mt-3 text-xs leading-5 text-muted">{cell.status_note}</p>
      <p className="mt-3 text-xs font-semibold text-muted">
        {cell.source_ids.length === 0
          ? "no staged source"
          : `${cell.source_ids.length} source${cell.source_ids.length === 1 ? "" : "s"}`}
      </p>
    </div>
  );
}

export function SectorHeatmap({ data = visualSystemData }: SectorHeatmapProps) {
  const { factors, countries } = data.manufacturing_heatmap;

  return (
    <section className="py-10">
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold text-foreground">
            Manufacturing evidence heatmap.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-muted">
            Cells show whether the visual system has an observed-source
            candidate, official claim, qualitative coding slot, or no source
            candidate. They do not show country performance.
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[920px]">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `13rem repeat(${countries.length}, minmax(7.25rem, 1fr))`
              }}
            >
              <div />
              {countries.map((country) => (
                <div
                  className="rounded-md border border-rule bg-background p-3 text-center"
                  key={country.iso}
                >
                  <p className="font-display text-xl font-semibold">
                    {countryLabel(data, country.iso)}
                  </p>
                  <p className="text-xs font-semibold text-muted">
                    {country.iso}
                  </p>
                </div>
              ))}

              {factors.map((factor) => (
                <div className="contents" key={factor.key}>
                  <div className="border-t border-rule py-3">
                    <p className="font-semibold text-foreground">
                      {factor.label}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-muted">
                      {factor.description}
                    </p>
                    <p className="mt-3 text-xs font-semibold text-primary-strong">
                      {factor.indicator_ids.join(", ")}
                    </p>
                  </div>
                  {countries.map((country) => (
                    <HeatCell
                      cell={cellForFactor(country, factor)}
                      country={countryLabel(data, country.iso)}
                      factor={factor}
                      key={`${factor.key}-${country.iso}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
