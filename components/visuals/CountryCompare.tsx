import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { visualSystemData } from "@/lib/data";
import type {
  AtlasLayerKey,
  CountryLayerState,
  VisualCountry,
  VisualLayer,
  VisualSystemData
} from "@/lib/types";

import { evidenceToneClasses, sourceSummary } from "@/components/visuals/statusStyles";

type CountryCompareProps = {
  data?: VisualSystemData;
  maxComparators?: number;
};

function stateForLayer(country: VisualCountry, layer: AtlasLayerKey) {
  return country.layer_states.find((state) => state.layer === layer);
}

function SourceCount({ state }: { state: CountryLayerState }) {
  const count = state.source_ids.length;

  if (count === 0) {
    return <span>sources missing</span>;
  }

  return <span>{count} staged source{count === 1 ? "" : "s"}</span>;
}

function LayerStateRow({
  layer,
  state
}: {
  layer: VisualLayer;
  state?: CountryLayerState;
}) {
  if (!state) {
    return (
      <div className="border-t border-rule py-3 text-sm text-missing">
        {layer.short_label}: missing
      </div>
    );
  }

  return (
    <div className="border-t border-rule py-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${evidenceToneClasses[state.evidence_label]}`}
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-foreground">
            {layer.short_label}
          </p>
        </div>
        <ConfidenceBadge label={state.evidence_label} />
      </div>
      <p className="mt-2 text-sm font-semibold text-foreground">
        {state.status}
      </p>
      <p className="mt-2 text-xs leading-5 text-muted">{state.note}</p>
      <p className="mt-3 text-xs font-semibold text-muted">
        <SourceCount state={state} />
      </p>
    </div>
  );
}

export function CountryCompare({
  data = visualSystemData,
  maxComparators = 5
}: CountryCompareProps) {
  const pilotCountries = data.countries.filter((country) => country.group === "pilot");
  const comparators = data.countries
    .filter((country) => country.group === "comparator")
    .slice(0, maxComparators);
  const countries = [...pilotCountries, ...comparators];

  return (
    <section className="py-12">
      <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold text-foreground">
            Compare systems without collapsing them.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-muted">
            The country view keeps hypothesis language attached to source state.
            It does not publish a composite national score.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {countries.map((country) => (
            <article
              className="rounded-lg border border-rule bg-background p-5"
              key={country.iso}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary-strong">
                    {country.group === "pilot" ? "Pilot country" : "Comparator"}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold">
                    {country.name}
                  </h3>
                </div>
                <span className="rounded-full border border-rule bg-surface px-3 py-1 text-xs font-semibold text-muted">
                  {country.iso}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                {country.summary}
              </p>
              <div className="mt-5 space-y-3">
                {data.layers.map((layer) => (
                  <LayerStateRow
                    key={`${country.iso}-${layer.key}`}
                    layer={layer}
                    state={stateForLayer(country, layer.key)}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-rule bg-surface p-4 text-sm leading-6 text-muted">
        {sourceSummary(
          countries.flatMap((country) =>
            country.layer_states.flatMap((state) => state.source_ids)
          ),
          data.sources
        ).length}{" "}
        staged source references are attached to these country states. Several
        source URLs remain marked missing until canonical review.
      </div>
    </section>
  );
}
