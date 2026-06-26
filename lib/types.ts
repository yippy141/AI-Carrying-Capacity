export type EvidenceLabel =
  | "observed"
  | "official-claim"
  | "qualitative-coded"
  | "estimated"
  | "missing"
  | "placeholder";

export type DimensionKey =
  | "frontier_access"
  | "conversion_capacity"
  | "diffusion_speed"
  | "adaptation_capacity"
  | "distribution_quality"
  | "realized_outcomes";

export type PlaceholderMetadata = {
  project: string;
  version: string;
  status: "placeholder" | string;
  updated: string;
  note?: string;
  sector?: string;
  module?: string;
};

export type CountryProfile = {
  iso: string;
  name: string;
  status: EvidenceLabel;
  notes?: string;
};

export type CountryProfilesData = {
  metadata: PlaceholderMetadata;
  profiles: CountryProfile[];
};

export type SectorObservation = {
  label: string;
  value: null;
  evidence_label: EvidenceLabel;
  source_ids: string[];
  note: string;
};

export type SectorData = {
  metadata: PlaceholderMetadata;
  observations: SectorObservation[];
};

export type ScenarioData = {
  metadata: PlaceholderMetadata;
  scenarios: unknown[];
};

export type Dimension = {
  key: DimensionKey;
  label: string;
  shortLabel: string;
  description: string;
};
