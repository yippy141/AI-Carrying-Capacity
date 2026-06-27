"use client";

import { useMemo, useState } from "react";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { sourceSummary } from "@/components/visuals/statusStyles";
import type {
  ScenarioCase,
  ScenarioControl,
  ScenarioSignal,
  VisualCountry,
  VisualSource
} from "@/lib/types";

type ScenarioAssumptionBrowserProps = {
  cases: ScenarioCase[];
  controls: ScenarioControl[];
  countries: VisualCountry[];
  sources: VisualSource[];
};

type CompatibleScenario = {
  matchCount: number;
  scenario: ScenarioCase;
};

function defaultSelections(controls: ScenarioControl[]) {
  return Object.fromEntries(
    controls.map((control) => [control.key, control.options[0]?.key ?? ""])
  );
}

function countryName(countries: VisualCountry[], iso: string) {
  return countries.find((country) => country.iso === iso)?.name ?? iso;
}

function optionLabel(controls: ScenarioControl[], key: string, value: string) {
  const control = controls.find((item) => item.key === key);
  const option = control?.options.find((item) => item.key === value);
  return {
    control: control?.label ?? key,
    option: option?.label ?? value
  };
}

function signalList(
  signals: ScenarioSignal[],
  countries: VisualCountry[],
  iso: string
) {
  const countrySignals = signals.filter((signal) => signal.country_iso === iso);

  if (countrySignals.length === 0) {
    return (
      <p className="text-sm leading-6 text-muted">
        No country-specific option is coded in the staged V0 pattern.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {countrySignals.map((signal) => (
        <div key={`${iso}-${signal.label}`}>
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-semibold text-foreground">
              {countryName(countries, signal.country_iso)} · {signal.label}
            </p>
            <ConfidenceBadge label={signal.evidence_label} />
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{signal.note}</p>
        </div>
      ))}
    </div>
  );
}

function ScenarioCard({
  item,
  controls,
  countries,
  sources
}: {
  item: CompatibleScenario;
  controls: ScenarioControl[];
  countries: VisualCountry[];
  sources: VisualSource[];
}) {
  const attachedSources = sourceSummary(item.scenario.source_ids, sources);
  const assumptionPairs = Object.entries(item.scenario.assumptions).map(
    ([key, value]) => optionLabel(controls, key, value)
  );

  return (
    <article className="rounded-lg border border-rule bg-background p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-strong">
            compatible staged pathway
          </p>
          <h3 className="mt-2 font-display text-4xl font-semibold text-foreground">
            {item.scenario.label}
          </h3>
        </div>
        <span className="w-fit rounded-full border border-warning/35 bg-[oklch(0.97_0.035_72)] px-3 py-1 text-xs font-semibold text-muted">
          no probability
        </span>
      </div>

      <div className="mt-5 rounded-lg border border-rule bg-surface p-4 text-sm leading-6 text-muted">
        This is not a forecast. No probabilities are estimated. The tool shows
        which assumptions activate which strategic pathways.
      </div>

      <div className="mt-7 grid gap-5">
        <section className="border-t border-rule pt-5">
          <p className="text-sm font-semibold text-foreground">Trigger</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            {item.scenario.description}
          </p>
        </section>

        <section className="border-t border-rule pt-5">
          <p className="text-sm font-semibold text-foreground">
            Assumptions in this pathway
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {assumptionPairs.map((pair) => (
              <li
                className="rounded-lg border border-rule bg-surface p-3 text-sm"
                key={`${pair.control}-${pair.option}`}
              >
                <span className="block font-semibold text-foreground">
                  {pair.control}
                </span>
                <span className="mt-1 block text-muted">{pair.option}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-5 border-t border-rule pt-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              China options
            </p>
            <div className="mt-3">
              {signalList(item.scenario.signals, countries, "CHN")}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              U.S. options
            </p>
            <div className="mt-3">
              {signalList(item.scenario.signals, countries, "USA")}
            </div>
          </div>
        </section>

        <section className="grid gap-5 border-t border-rule pt-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Escalation channels
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Not separately quantified in V0. Treat any escalation language as a
              hypothesis pending reviewed scenario sources and claim-ledger rows.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Conversion-capacity implication
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {item.scenario.caveat}
            </p>
          </div>
        </section>

        <section className="grid gap-5 border-t border-rule pt-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Evidence state
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {attachedSources.length === 0 ? (
                <span className="text-sm text-missing">sources missing</span>
              ) : (
                attachedSources.map((source) => (
                  <span
                    className="rounded-full border border-rule bg-surface px-3 py-1 text-xs font-semibold text-muted"
                    key={source.source_id}
                    title={`${source.title_english}; ${source.review_status}`}
                  >
                    {source.source_id} · {source.review_status}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              What would change this scenario
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Canonical source promotion, counterevidence in the claim ledger,
              reviewed indicators, or new evidence about frontier capability,
              compute constraints, deployment speed, or labor adaptation.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}

export function ScenarioAssumptionBrowser({
  cases,
  controls,
  countries,
  sources
}: ScenarioAssumptionBrowserProps) {
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    defaultSelections(controls)
  );

  const compatibleCases = useMemo(() => {
    const ranked = cases
      .map((scenario) => {
        const matchCount = Object.entries(scenario.assumptions).filter(
          ([key, value]) => selected[key] === value
        ).length;

        return { matchCount, scenario };
      })
      .sort((a, b) => b.matchCount - a.matchCount);

    const matching = ranked.filter((item) => item.matchCount > 0);
    return (matching.length > 0 ? matching : ranked).slice(0, 3);
  }, [cases, selected]);

  if (controls.length === 0 || cases.length === 0) {
    return (
      <section className="rounded-lg border border-rule bg-surface p-6">
        <h2 className="font-display text-3xl font-semibold">
          Scenario assumption browser
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
          Scenario assumption browser
        </h2>
        <p className="mt-5 max-w-xl leading-8 text-muted">
          Change assumptions to surface compatible staged pathways. This browser
          does not estimate probabilities, forecast winners, or rank countries.
        </p>

        <div className="mt-6 rounded-lg border border-warning/35 bg-[oklch(0.97_0.035_72)] p-4 text-sm leading-6 text-muted">
          This is not a forecast. No probabilities are estimated. The tool shows
          which assumptions activate which strategic pathways.
        </div>

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

      <div className="space-y-5">
        {compatibleCases.map((item) => (
          <ScenarioCard
            controls={controls}
            countries={countries}
            item={item}
            key={item.scenario.id}
            sources={sources}
          />
        ))}
      </div>
    </section>
  );
}

export const ScenarioSimulator = ScenarioAssumptionBrowser;
