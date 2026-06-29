import Link from "next/link";

import { BottleneckFingerprint } from "@/components/visuals/BottleneckFingerprint";
import { ConversionFunnel } from "@/components/visuals/ConversionFunnel";
import { CountryCompare } from "@/components/visuals/CountryCompare";
import { DomainConversionScatter } from "@/components/visuals/DomainConversionScatter";
import { FrontierNotFateHero } from "@/components/visuals/FrontierNotFateHero";
import { UncertaintyLegend } from "@/components/visuals/UncertaintyLegend";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { NarrativeBlock } from "@/components/ui/NarrativeBlock";
import { SourceNote } from "@/components/ui/SourceNote";
import {
  computeEnergyData,
  countryProfiles,
  manufacturingData,
  visualSystemData
} from "@/lib/data";

const moduleLinks = [
  {
    href: "/methodology",
    label: "Methodology",
    description: "Definitions, evidence labels, and V0 scoring guardrails."
  },
  {
    href: "/sources",
    label: "Sources",
    description: "The source register, with placeholder rows called out."
  },
  {
    href: "/sectors/manufacturing",
    label: "Manufacturing",
    description: "A placeholder module for robotics and embodied AI."
  },
  {
    href: "/sectors/compute-energy",
    label: "Compute & energy",
    description: "A placeholder module for data centers and grid absorption."
  }
];

export default function Home() {
  return (
    <main>
      <FrontierNotFateHero />

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <ConversionFunnel />
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12">
          <DomainConversionScatter />
        </div>

        <NarrativeBlock
          eyebrow="Current scope"
          title="V0 separates access, conversion, adaptation, distribution, and outcomes."
        >
          <p>
            The atlas does not publish a composite national score. It keeps
            enabling inputs separate from realized outcomes so bottlenecks do
            not disappear inside an average.
          </p>
          <p>
            The first visual system is marked{" "}
            {visualSystemData.metadata.status}. Canonical country profiles
            remain {countryProfiles.metadata.status}, while the manufacturing
            and compute-energy data files remain {manufacturingData.metadata.status}{" "}
            and {computeEnergyData.metadata.status}.
          </p>
        </NarrativeBlock>

        <CountryCompare />

        <BottleneckFingerprint />

        <div className="grid gap-4 md:grid-cols-2">
          {moduleLinks.map((item) => (
            <Link
              className="focus-ring rounded-lg border border-rule bg-background p-5 transition-colors hover:border-primary"
              href={item.href}
              key={item.href}
            >
              <span className="font-display text-2xl font-semibold">
                {item.label}
              </span>
              <span className="mt-3 block leading-7 text-muted">
                {item.description}
              </span>
            </Link>
          ))}
        </div>

        <MethodologyCallout title="No definitive ranking in V0">
          V0 is a diagnostic scaffold. Country and sector pages can show fields,
          missingness, source status, and confidence labels, but they should not
          claim advantage until evidence and sensitivity checks support it.
        </MethodologyCallout>

        <div className="mt-12">
          <UncertaintyLegend compact />
        </div>

        <div className="mt-12">
          <SourceNote label="qualitative-coded">
            <p>
              The homepage uses local JSON only. The new visual data carries
              staged source IDs and qualitative watch states, while reviewed
              indicator values remain missing until canonical source review.
            </p>
          </SourceNote>
        </div>
      </section>
    </main>
  );
}
