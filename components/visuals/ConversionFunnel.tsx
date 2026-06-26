import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { visualSystemData } from "@/lib/data";
import type { AtlasLayerKey, EvidenceLabel, VisualSystemData } from "@/lib/types";

import { evidenceSoftClasses, layerTint } from "@/components/visuals/statusStyles";

type ConversionFunnelProps = {
  data?: VisualSystemData;
};

const evidenceOrder: EvidenceLabel[] = [
  "observed",
  "official-claim",
  "qualitative-coded",
  "estimated",
  "missing",
  "placeholder"
];

function layerCounts(data: VisualSystemData, layer: AtlasLayerKey) {
  const states = data.countries.flatMap((country) =>
    country.layer_states.filter((state) => state.layer === layer)
  );

  return evidenceOrder
    .map((label) => ({
      label,
      count: states.filter((state) => state.evidence_label === label).length
    }))
    .filter((entry) => entry.count > 0);
}

export function ConversionFunnel({
  data = visualSystemData
}: ConversionFunnelProps) {
  return (
    <figure className="overflow-hidden border-y border-rule py-8">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <figcaption>
          <h2 className="font-display text-4xl font-semibold text-foreground">
            Capability becomes power only after conversion.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-muted">
            V0 keeps each layer separate. The funnel shows where the current
            local JSON has staged source coverage, official claims, qualitative
            coding, or missing values.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <ConfidenceBadge label="qualitative-coded" />
            <ConfidenceBadge label="official-claim" />
            <ConfidenceBadge label="missing" />
          </div>
        </figcaption>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 760 360"
          >
            <path
              d="M42 70 C160 12 280 58 374 118 C492 193 610 190 720 132"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
            />
            <path
              d="M28 260 C172 230 248 295 374 236 C502 176 624 250 732 212"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </svg>

          <div className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {data.layers.map((layer, index) => {
              const counts = layerCounts(data, layer.key);

              return (
                <article
                  className={`min-h-72 rounded-lg border p-4 ${layerTint(index)}`}
                  key={layer.key}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-display text-4xl font-semibold text-foreground">
                      {index + 1}
                    </span>
                    <span className="rounded-full border border-rule bg-background px-3 py-1 text-xs font-semibold text-muted">
                      no score
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-foreground">
                    {layer.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {layer.description}
                  </p>
                  <div className="mt-5 space-y-2">
                    {counts.map((entry) => (
                      <div
                        className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-xs font-semibold ${evidenceSoftClasses[entry.label]}`}
                        key={entry.label}
                      >
                        <span>{entry.label}</span>
                        <span>{entry.count}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs leading-5 text-muted">
                    {layer.interface_note}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </figure>
  );
}
