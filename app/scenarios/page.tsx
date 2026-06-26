import type { Metadata } from "next";

import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { scenarioData } from "@/lib/data";

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

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {["Adoption velocity", "Adaptation stress", "Distribution quality"].map(
          (label) => (
            <article className="rounded-lg border border-rule p-5" key={label}>
              <h2 className="font-display text-2xl font-semibold">{label}</h2>
              <p className="mt-3 leading-7 text-muted">
                Placeholder pathway. Scenario values are missing until reviewed
                assumptions and sources are added.
              </p>
              <p className="mt-5 text-sm font-semibold text-missing">
                value status: missing
              </p>
            </article>
          )
        )}
      </section>

      <div className="mt-12">
        <MethodologyCallout title="Scenario count">
          The current scenario file is marked {scenarioData.metadata.status} and
          contains {scenarioData.scenarios.length} scenario records.
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <SourceNote label="placeholder">
          <p>
            Scenario data is read from `data/scenarios/v0_scenarios.json`. Empty
            arrays are shown as empty rather than filled with demonstration
            estimates.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
