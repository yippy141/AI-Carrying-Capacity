import type { Metadata } from "next";

import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { computeEnergyData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compute & Energy"
};

const candidateAreas = [
  "Data center capacity",
  "Grid interconnection and power availability",
  "Compute access and deployment constraints",
  "Electricity price and reliability exposure"
];

export default function ComputeEnergyPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Constraint module
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          Compute, electricity, and grid absorption.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          AI conversion depends on more than model access. This module will
          track whether compute and energy systems can absorb deployment demand.
        </p>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        {candidateAreas.map((area) => (
          <article className="rounded-lg border border-rule p-5" key={area}>
            <h2 className="font-display text-2xl font-semibold">{area}</h2>
            <p className="mt-3 leading-7 text-muted">
              Candidate research area only. No sourced indicator value has been
              added to this module yet.
            </p>
            <p className="mt-5 text-sm font-semibold text-missing">
              value status: missing
            </p>
          </article>
        ))}
      </section>

      <div className="mt-12">
        <MethodologyCallout title="Module data status">
          The compute-energy data file is marked{" "}
          {computeEnergyData.metadata.status} and contains{" "}
          {computeEnergyData.observations.length} observation records.
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <SourceNote label="placeholder">
          <p>
            This page reads from `data/processed/v0_compute_energy.json`. It
            does not infer data center capacity, electricity demand, or grid
            bottlenecks from unsourced placeholders.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
