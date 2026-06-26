import { visualSystemData } from "@/lib/data";
import type {
  BottleneckAxis,
  BottleneckCountry,
  BottleneckItem,
  VisualCountry,
  VisualSystemData
} from "@/lib/types";

import {
  watchLabels,
  watchSoftClasses,
  watchToneClasses
} from "@/components/visuals/statusStyles";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";

type BottleneckFingerprintProps = {
  data?: VisualSystemData;
};

function countryName(countries: VisualCountry[], iso: string) {
  return countries.find((country) => country.iso === iso)?.short_name ?? iso;
}

function itemForAxis(country: BottleneckCountry, axis: BottleneckAxis) {
  return country.items.find((item) => item.axis === axis.key);
}

function FingerprintCell({
  axis,
  country,
  item
}: {
  axis: BottleneckAxis;
  country: string;
  item?: BottleneckItem;
}) {
  if (!item) {
    return (
      <div
        className="flex min-h-24 flex-col justify-between rounded-md border border-rule bg-surface p-3 text-xs text-missing"
        aria-label={`${country}, ${axis.label}: missing`}
      >
        <span className="font-semibold">missing</span>
        <span>No state</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-24 rounded-md border p-3 ${watchSoftClasses[item.watch_level]}`}
      aria-label={`${country}, ${axis.label}: ${watchLabels[item.watch_level]}, ${item.evidence_label}`}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`h-4 w-4 rounded-full ${watchToneClasses[item.watch_level]}`}
          aria-hidden="true"
        />
        <span className="text-right text-[0.68rem] font-semibold leading-4">
          {watchLabels[item.watch_level]}
        </span>
      </div>
      <p className="mt-4 text-xs leading-5 text-muted">{item.note}</p>
      <div className="mt-3">
        <ConfidenceBadge label={item.evidence_label} />
      </div>
    </div>
  );
}

export function BottleneckFingerprint({
  data = visualSystemData
}: BottleneckFingerprintProps) {
  return (
    <section className="py-12">
      <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <h2 className="font-display text-4xl font-semibold text-foreground">
            Bottlenecks have fingerprints.
          </h2>
          <p className="mt-5 max-w-xl leading-8 text-muted">
            Each dot is a qualitative watch state from staged research. It is a
            prompt for source review, not a performance grade.
          </p>
          <div className="mt-6 grid max-w-md gap-2 text-sm">
            {Object.entries(watchLabels).map(([key, label]) => (
              <div className="flex items-center gap-3" key={key}>
                <span
                  className={`h-3 w-3 rounded-full ${watchToneClasses[key as keyof typeof watchLabels]}`}
                  aria-hidden="true"
                />
                <span className="text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[860px]">
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `9rem repeat(${data.bottlenecks.axes.length}, minmax(7.5rem, 1fr))`
              }}
            >
              <div />
              {data.bottlenecks.axes.map((axis) => (
                <div
                  className="rounded-md border border-rule bg-background p-3"
                  key={axis.key}
                >
                  <p className="text-sm font-semibold text-foreground">
                    {axis.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted">
                    {axis.description}
                  </p>
                </div>
              ))}

              {data.bottlenecks.countries.map((country) => (
                <div className="contents" key={country.iso}>
                  <div
                    className="flex items-center border-t border-rule py-3"
                  >
                    <div>
                      <p className="font-display text-2xl font-semibold">
                        {countryName(data.countries, country.iso)}
                      </p>
                      <p className="text-xs font-semibold text-muted">
                        {country.iso}
                      </p>
                    </div>
                  </div>
                  {data.bottlenecks.axes.map((axis) => (
                    <FingerprintCell
                      axis={axis}
                      country={countryName(data.countries, country.iso)}
                      item={itemForAxis(country, axis)}
                      key={`${country.iso}-${axis.key}`}
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
