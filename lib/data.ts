import { readFileSync } from "node:fs";
import path from "node:path";

import computeEnergyJson from "@/data/processed/v0_compute_energy.json";
import countryProfilesJson from "@/data/processed/v0_country_profiles.json";
import manufacturingJson from "@/data/processed/v0_sector_manufacturing.json";
import scenariosJson from "@/data/scenarios/v0_scenarios.json";
import type {
  CountryProfile,
  CountryProfilesData,
  Dimension,
  EvidenceLabel,
  ScenarioData,
  SectorData
} from "@/lib/types";

type SourceRegisterStatus = Extract<EvidenceLabel, "missing" | "placeholder"> | "needs review";

export const dimensions: Dimension[] = [
  {
    key: "frontier_access",
    label: "Frontier access",
    shortLabel: "Access",
    description:
      "What level of AI capability actors can build, buy, import, deploy, or adapt."
  },
  {
    key: "conversion_capacity",
    label: "Conversion capacity",
    shortLabel: "Conversion",
    description:
      "Complementary assets that turn AI access into repeated operational use."
  },
  {
    key: "diffusion_speed",
    label: "Diffusion speed",
    shortLabel: "Diffusion",
    description:
      "The time from a pilot to intensive, value-producing use across institutions."
  },
  {
    key: "adaptation_capacity",
    label: "Adaptation capacity",
    shortLabel: "Adaptation",
    description:
      "The ability of labor markets, law, infrastructure, and legitimacy systems to absorb disruption."
  },
  {
    key: "distribution_quality",
    label: "Distribution quality",
    shortLabel: "Distribution",
    description:
      "Whether gains reach workers, SMEs, regions, patients, citizens, and public services."
  },
  {
    key: "realized_outcomes",
    label: "Realized outcomes",
    shortLabel: "Outcomes",
    description:
      "Observed changes in productivity, quality, availability, state capacity, welfare, and adjustment costs."
  }
];

export const pilotCountries: CountryProfile[] = [
  {
    iso: "USA",
    name: "United States",
    status: "missing",
    notes: "Planned V0 pilot page. Indicator values are missing until source review."
  },
  {
    iso: "CHN",
    name: "China",
    status: "missing",
    notes: "Planned V0 pilot page. Indicator values are missing until source review."
  }
];

export const countryProfiles = countryProfilesJson as CountryProfilesData;
export const manufacturingData = manufacturingJson as SectorData;
export const computeEnergyData = computeEnergyJson as SectorData;
export const scenarioData = scenariosJson as ScenarioData;

export function getCountryProfile(isoParam: string): CountryProfile {
  const normalized = isoParam.trim().toUpperCase();
  const profile =
    countryProfiles.profiles.find((entry) => entry.iso.toUpperCase() === normalized) ??
    pilotCountries.find((entry) => entry.iso === normalized);

  if (profile) {
    return profile;
  }

  return {
    iso: normalized,
    name: normalized,
    status: "missing",
    notes: "No reviewed country profile exists for this ISO code."
  };
}

export function getSourceRegisterSummary() {
  const sourceRegisterPath = path.join(
    process.cwd(),
    "data",
    "sources",
    "source_register.csv"
  );
  const raw = readFileSync(sourceRegisterPath, "utf8");
  const rows = raw
    .split(/\r?\n/)
    .map((row) => row.trim())
    .filter(Boolean);
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow?.split(",") ?? [];
  const placeholderIndex = headers.indexOf("placeholder");
  const reviewStatusIndex = headers.indexOf("review_status");
  const placeholderRows = dataRows.filter((row) => {
    const columns = row.split(",");
    return (
      columns[placeholderIndex] === "true" ||
      columns[reviewStatusIndex] === "placeholder"
    );
  }).length;
  const reviewedRows = dataRows.length - placeholderRows;
  const status: SourceRegisterStatus =
    dataRows.length === 0
      ? "missing"
      : reviewedRows > 0
        ? "needs review"
        : "placeholder";

  return {
    path: "data/sources/source_register.csv",
    placeholderRows,
    reviewedRows,
    totalRows: dataRows.length,
    status
  };
}
