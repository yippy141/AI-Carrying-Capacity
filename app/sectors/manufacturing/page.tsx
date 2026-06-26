import type { Metadata } from "next";

import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { manufacturingData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manufacturing Sector"
};

const candidateAreas = [
  "Robotics and embodied AI deployment",
  "Factory integration and process redesign",
  "Supplier diffusion across SMEs and regions",
  "Workforce adaptation and safety systems"
];

export default function ManufacturingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Sector module
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          Manufacturing, robotics, and embodied AI.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          This V0 module is a placeholder for comparing how AI capability turns
          into production improvements, machine integration, and sector-wide
          diffusion.
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
          The manufacturing data file is marked{" "}
          {manufacturingData.metadata.status} and contains{" "}
          {manufacturingData.observations.length} observation records.
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <SourceNote label="placeholder">
          <p>
            This page reads from `data/processed/v0_sector_manufacturing.json`.
            It does not infer robot density, productivity, automation, or labor
            outcomes from unsourced placeholders.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
