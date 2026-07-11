import type { Metadata } from "next";
import Link from "next/link";

import { StagedEvidenceBanner } from "@/components/visuals/StagedEvidenceBanner";

export const metadata: Metadata = {
  title: "Research lab"
};

const labItems = [
  {
    href: "/scenarios",
    label: "Scenario assumption browser",
    description:
      "Which assumptions activate which strategic pathways. Not a forecast; no probabilities."
  },
  {
    href: "/sectors/manufacturing",
    label: "Manufacturing & robotics module",
    description:
      "The first sector module: robot density, installations, and conversion hypotheses."
  },
  {
    href: "/sectors/compute-energy",
    label: "Compute & energy module",
    description:
      "Data centers, grid interconnection, and the physical absorption boundary."
  },
  {
    href: "/sources",
    label: "Legacy source-status view",
    description:
      "The original source-status page; superseded by the Evidence register."
  }
];

export default function LabPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary-strong">
          Research lab
        </p>
        <h1 className="text-4xl leading-tight text-foreground sm:text-5xl">
          Exploratory views that are not part of the study.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          These pages are working instruments: scenario reasoning aids, sector
          scaffolds, and staged visual prototypes. They carry staged-evidence
          banners because their data has not cleared the evidence gate that the
          study narrative requires.
        </p>
      </div>

      <div className="mt-10 max-w-3xl">
        <StagedEvidenceBanner title="Lab views are not reviewed findings">
          <p>
            Country-profile shells and staged visual data live here until
            canonical sources support them. Nothing in the lab implies a score
            or ranking.
          </p>
        </StagedEvidenceBanner>
      </div>

      <div className="mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
        {labItems.map((item) => (
          <Link
            className="focus-ring border border-rule bg-white p-5 transition-colors hover:border-primary"
            href={item.href}
            key={item.href}
          >
            <span className="font-display text-xl font-semibold text-foreground">
              {item.label}
            </span>
            <span className="mt-2 block text-sm leading-6 text-muted">
              {item.description}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
