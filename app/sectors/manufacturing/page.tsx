import type { Metadata } from "next";

import { SectorHeatmap } from "@/components/visuals/SectorHeatmap";
import { UncertaintyLegend } from "@/components/visuals/UncertaintyLegend";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { manufacturingData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manufacturing Sector"
};

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

      <div className="mt-12">
        <SectorHeatmap />
      </div>

      <div className="mt-12">
        <MethodologyCallout title="Module data status">
          The manufacturing data file is marked{" "}
          {manufacturingData.metadata.status} and contains{" "}
          {manufacturingData.observations.length} observation records.
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <UncertaintyLegend compact />
      </div>

      <div className="mt-12">
        <SourceNote label="missing">
          <p>
            This page reads from `data/processed/v0_sector_manufacturing.json`.
            The heatmap reads from local visual JSON and still marks every
            country-level manufacturing value missing until reviewed indicators
            are promoted.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
