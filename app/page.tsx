import Link from "next/link";

import { ConversionMap } from "@/components/visuals/ConversionMap";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { NarrativeBlock } from "@/components/ui/NarrativeBlock";
import { SourceNote } from "@/components/ui/SourceNote";
import {
  computeEnergyData,
  countryProfiles,
  manufacturingData,
  pilotCountries
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
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 lg:pb-16 lg:pt-24">
        <p className="mb-5 max-w-2xl text-sm font-semibold text-primary-strong">
          V0 scaffold · no national rankings · missing values stay missing
        </p>
        <div className="max-w-5xl">
          <h1 className="text-5xl text-foreground sm:text-6xl lg:text-7xl">
            AI Conversion Atlas
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
            A research interface for studying how countries convert accessible
            AI capability into productivity, state capacity, scientific output,
            strategic power, and broadly distributed welfare.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            className="focus-ring rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
            href="/methodology"
          >
            Read the method
          </Link>
          <Link
            className="focus-ring rounded-full border border-rule px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary-strong"
            href="/sources"
          >
            Check source status
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <ConversionMap />
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8">
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
            The first modules are placeholders for a US-China pilot and selected
            comparators where reviewed data allows. The country profile file is
            currently marked {countryProfiles.metadata.status}; the two sector
            files are marked {manufacturingData.metadata.status} and{" "}
            {computeEnergyData.metadata.status}.
          </p>
        </NarrativeBlock>

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

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {pilotCountries.map((country) => (
            <Link
              className="focus-ring rounded-lg border border-rule p-5 transition-colors hover:border-primary"
              href={`/countries/${country.iso}`}
              key={country.iso}
            >
              <span className="text-sm font-semibold text-primary-strong">
                Planned profile
              </span>
              <span className="mt-2 block font-display text-2xl font-semibold">
                {country.name}
              </span>
              <span className="mt-3 block leading-7 text-muted">
                {country.notes}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <SourceNote label="placeholder">
            <p>
              The homepage uses only scaffold metadata and placeholder files.
              It does not include external data, API-backed values, or inferred
              scores.
            </p>
          </SourceNote>
        </div>
      </section>
    </main>
  );
}
