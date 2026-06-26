import type { Metadata } from "next";

import { ScenarioSimulator } from "@/components/visuals/ScenarioSimulator";
import { UncertaintyLegend } from "@/components/visuals/UncertaintyLegend";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { scenarioData, visualSystemData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Scenarios"
};

export default function ScenariosPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Scenarios
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          Scenario work starts after assumptions are sourced.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          V0 scenarios can describe plausible pathways, but they should not
          smuggle in unsourced country advantages or fixed rankings.
        </p>
      </div>

      <section className="mt-14">
        <ScenarioSimulator
          cases={visualSystemData.scenarios.cases}
          controls={visualSystemData.scenarios.controls}
          countries={visualSystemData.countries}
          sources={visualSystemData.sources}
        />
      </section>

      <div className="mt-12">
        <MethodologyCallout title="Scenario count">
          The canonical scenario file is still marked{" "}
          {scenarioData.metadata.status} and contains{" "}
          {scenarioData.scenarios.length} records. The simulator uses staged
          local visual JSON for hypothesis patterns, not forecast values.
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <UncertaintyLegend compact />
      </div>

      <div className="mt-12">
        <SourceNote label="qualitative-coded">
          <p>
            Scenario controls and patterns are loaded from local JSON. They
            compare assumptions and source-backed hypotheses; they do not call
            APIs, estimate probabilities, or rank countries.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
