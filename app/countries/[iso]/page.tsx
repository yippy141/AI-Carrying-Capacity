import type { Metadata } from "next";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { MethodologyCallout } from "@/components/ui/MethodologyCallout";
import { SourceNote } from "@/components/ui/SourceNote";
import { dimensions, getCountryProfile } from "@/lib/data";

type CountryPageProps = {
  params: Promise<{
    iso: string;
  }>;
};

export async function generateMetadata({
  params
}: CountryPageProps): Promise<Metadata> {
  const { iso } = await params;
  const profile = getCountryProfile(iso);

  return {
    title: `${profile.name} Country Profile`
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { iso } = await params;
  const profile = getCountryProfile(iso);

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-4xl">
        <p className="mb-5 text-sm font-semibold text-primary-strong">
          Country profile · {profile.iso}
        </p>
        <h1 className="text-5xl text-foreground sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-9 text-muted">
          This page is a V0 placeholder. It does not report country scores,
          rankings, or advantage claims.
        </p>
        <div className="mt-6">
          <ConfidenceBadge label={profile.status} />
        </div>
      </div>

      <section className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dimensions.map((dimension) => (
          <article
            className="rounded-lg border border-rule p-5"
            key={dimension.key}
          >
            <h2 className="font-display text-2xl font-semibold">
              {dimension.label}
            </h2>
            <p className="mt-3 leading-7 text-muted">{dimension.description}</p>
            <p className="mt-5 text-sm font-semibold text-missing">
              value status: missing
            </p>
          </article>
        ))}
      </section>

      <div className="mt-12">
        <MethodologyCallout title="Profile note">
          {profile.notes ??
            "No reviewed evidence has been added for this country profile."}
        </MethodologyCallout>
      </div>

      <div className="mt-12">
        <SourceNote label={profile.status}>
          <p>
            Country values are sourced from
            `data/processed/v0_country_profiles.json`. If a reviewed value is
            not present there, the UI renders it as missing.
          </p>
        </SourceNote>
      </div>
    </main>
  );
}
