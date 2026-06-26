"use client";

import { useMemo, useState } from "react";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { sourceSummary } from "@/components/visuals/statusStyles";
import type {
  ScenarioCase,
  ScenarioControl,
  VisualCountry,
  VisualSource
} from "@/lib/types";

type ScenarioSimulatorProps = {
  cases: ScenarioCase[];
  controls: ScenarioControl[];
  countries: VisualCountry[];
  sources: VisualSource[];
};

function defaultSelections(controls: ScenarioControl[]) {
  return Object.fromEntries(
    controls.map((control) => [control.key, control.options[0]?.key ?? ""])
  );
}

function countryName(countries: VisualCountry[], iso: string) {
  return countries.find((country) => country.iso === iso)?.name ?? iso;
}

export function ScenarioSimulator({
  cases,
  controls,
  countries,
  sources
}: ScenarioSimulatorProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    defaultSelections(controls)
  );

  const rankedCases = useMemo(() => {
    return cases
      .map((scenario) => {
        const matchCount = Object.entries(scenario.assumptions).filter(
          ([key, value]) => selected[key] === value
        ).length;

        return { matchCount, scenario };
      })
      .sort((a, b) => b.matchCount - a.matchCount);
  }, [cases, selected]);

  const active = rankedCases[0];
  const activeSources = active
    ? sourceSummary(active.scenario.source_ids, sources)
    : [];

  if (controls.length === 0 || cases.length === 0) {
    return (
      <section className="rounded-lg border border-rule bg-surface p-6">
        <h2 className="font-display text-3xl font-semibold">
          Scenario simulator
        </h2>
        <p className="mt-3 leading-7 text-missing">
          Scenario data is missing.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
      <div>
        <h2 className="font-display text-4xl font-semibold text-foreground">
          Scenario simulator
        </h2>
        <p className="mt-5 max-w-xl leading-8 text-muted">
          Change the assumptions to surface the nearest staged hypothesis
          pattern. The simulator compares pathways; it does not forecast winners.
        </p>

        <div className="mt-8 space-y-7">
          {controls.map((control) => (
            <fieldset className="border-t border-rule pt-5" key={control.key}>
              <legend className="font-semibold text-foreground">
                {control.label}
              </legend>
              <div className="mt-3 grid gap-2">
                {control.options.map((option) => {
                  const isSelected = selected[control.key] === option.key;

                  return (
                    <button
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "focus-ring rounded-lg border border-primary bg-primary p-3 text-left text-white"
                          : "focus-ring rounded-lg border border-rule bg-background p-3 text-left text-foreground transition-colors hover:border-primary"
                      }
                      key={option.key}
                      onClick={() =>
                        setSelected((current) => ({
                          ...current,
                          [control.key]: option.key
                        }))
                      }
                      type="button"
                    >
                      <span className="block text-sm font-semibold">
                        {option.label}
                      </span>
                      <span
                        className={
                          isSelected
                            ? "mt-1 block text-xs leading-5 text-white/85"
                            : "mt-1 block text-xs leading-5 text-muted"
                        }
                      >
                        {option.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-rule bg-background p-5">
        {active ? (
          <>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-strong">
                  nearest staged pattern
                </p>
                <h3 className="mt-2 font-display text-4xl font-semibold text-foreground">
                  {active.scenario.label}
                </h3>
              </div>
              <span className="w-fit rounded-full border border-rule bg-surface px-3 py-1 text-xs font-semibold text-muted">
                {active.matchCount} of {controls.length} assumptions
              </span>
            </div>

            <p className="mt-5 text-lg leading-8 text-foreground">
              {active.scenario.description}
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {active.scenario.signals.map((signal) => (
                <div
                  className="border-t border-rule pt-4"
                  key={`${active.scenario.id}-${signal.country_iso}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl font-semibold">
                        {countryName(countries, signal.country_iso)}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {signal.label}
                      </p>
                    </div>
                    <ConfidenceBadge label={signal.evidence_label} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {signal.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-rule pt-5">
              <p className="text-sm font-semibold text-foreground">Caveat</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {active.scenario.caveat}
              </p>
            </div>

            <div className="mt-7 border-t border-rule pt-5">
              <p className="text-sm font-semibold text-foreground">
                Source trail
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeSources.length === 0 ? (
                  <span className="text-sm text-missing">sources missing</span>
                ) : (
                  activeSources.map((source) => (
                    <span
                      className="rounded-full border border-rule bg-surface px-3 py-1 text-xs font-semibold text-muted"
                      key={source.source_id}
                      title={`${source.title_english}; ${source.review_status}`}
                    >
                      {source.source_id}
                    </span>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-missing">No matching scenario pattern.</p>
        )}
      </div>
    </section>
  );
}
