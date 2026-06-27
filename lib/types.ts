export type EvidenceLabel =
  | "observed"
  | "official-claim"
  | "qualitative-coded"
  | "estimated"
  | "missing"
  | "placeholder";

export type MissingReason =
  | "not_reviewed"
  | "not_available"
  | "not_comparable"
  | "not_applicable"
  | "confidential"
  | "not_yet_measured"
  | "source_unverified"
  | "placeholder";

export type AttributionStrength =
  | "descriptive"
  | "before_after"
  | "comparison_group"
  | "quasi_causal"
  | "causal"
  | "model_based"
  | "speculative"
  | "not_applicable"
  | "placeholder";

export type InputOutputRole =
  | "input"
  | "process"
  | "output"
  | "outcome"
  | "stress"
  | "distribution"
  | "context"
  | "placeholder";

export type SourceMethodType =
  | "official_statistics"
  | "law_or_regulation"
  | "government_strategy"
  | "administrative_data"
  | "survey"
  | "dataset"
  | "peer_reviewed_paper"
  | "working_paper"
  | "think_tank_report"
  | "corporate_filing"
  | "corporate_report"
  | "media_report"
  | "expert_commentary"
  | "model_estimate"
  | "placeholder";

export type OfficialClaimStatus =
  | "not_official_claim"
  | "official_target"
  | "official_program_claim"
  | "official_observed_statistic"
  | "mixed"
  | "placeholder";

export type IndependentValidationStatus =
  | "independently_validated"
  | "partially_validated"
  | "not_independently_validated"
  | "not_applicable"
  | "unknown"
  | "placeholder";

export type DimensionKey =
  | "frontier_access"
  | "conversion_capacity"
  | "diffusion_speed"
  | "adaptation_capacity"
  | "distribution_quality"
  | "realized_outcomes";

export type AtlasLayerKey =
  | "frontier_access"
  | "conversion_capacity"
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

export type VisualSource = {
  source_id: string;
  title_english: string;
  authors_org: string;
  year: string;
  language: string;
  source_type: string;
  method_type?: SourceMethodType | string;
  official_claim_status?: OfficialClaimStatus | string;
  independent_validation_status?: IndependentValidationStatus | string;
  reliability_tier: string;
  review_status: string;
  url_or_doi: string;
  limitations: string;
};

export type VisualLayer = {
  key: AtlasLayerKey;
  label: string;
  short_label: string;
  description: string;
  interface_note: string;
};

export type CountryLayerState = {
  layer: AtlasLayerKey;
  status: string;
  evidence_label: EvidenceLabel;
  source_ids: string[];
  note: string;
};

export type VisualCountry = {
  iso: string;
  name: string;
  short_name: string;
  group: "pilot" | "comparator";
  summary: string;
  layer_states: CountryLayerState[];
};

export type WatchLevel =
  | "primary-watch"
  | "secondary-watch"
  | "open-question"
  | "missing";

export type BottleneckAxis = {
  key: string;
  label: string;
  layer: AtlasLayerKey;
  description: string;
};

export type BottleneckItem = {
  axis: string;
  watch_level: WatchLevel;
  evidence_label: EvidenceLabel;
  source_ids: string[];
  missing_reason?: MissingReason;
  note: string;
};

export type BottleneckCountry = {
  iso: string;
  items: BottleneckItem[];
};

export type ManufacturingHeatmapFactor = {
  key: string;
  label: string;
  layer: DimensionKey;
  indicator_ids: string[];
  description: string;
};

export type ManufacturingHeatmapCell = {
  factor: string;
  value: null;
  value_status: EvidenceLabel;
  source_evidence_label: EvidenceLabel;
  source_ids: string[];
  missing_reason?: MissingReason;
  input_output_role?: InputOutputRole;
  attribution_strength?: AttributionStrength;
  status_note: string;
};

export type ManufacturingHeatmapCountry = {
  iso: string;
  cells: ManufacturingHeatmapCell[];
};

export type ScenarioOption = {
  key: string;
  label: string;
  description: string;
};

export type ScenarioControl = {
  key: string;
  label: string;
  options: ScenarioOption[];
};

export type ScenarioSignal = {
  country_iso: string;
  label: string;
  evidence_label: EvidenceLabel;
  note: string;
};

export type ScenarioCase = {
  id: string;
  label: string;
  description: string;
  assumptions: Record<string, string>;
  signals: ScenarioSignal[];
  caveat: string;
  source_ids: string[];
};

export type SourceBackedClaim = {
  claim_id: string;
  title: string;
  claim: string;
  claim_type: string;
  evidence_label: EvidenceLabel;
  confidence: "low" | "medium" | "high" | "not-rated";
  geography: string;
  sector: string;
  source_ids: string[];
  caveat: string;
  review_status: string;
};

export type UncertaintyLegendItem = {
  label: EvidenceLabel;
  definition: string;
};

export type VisualSystemData = {
  metadata: PlaceholderMetadata;
  layers: VisualLayer[];
  sources: VisualSource[];
  countries: VisualCountry[];
  bottlenecks: {
    axes: BottleneckAxis[];
    countries: BottleneckCountry[];
  };
  manufacturing_heatmap: {
    factors: ManufacturingHeatmapFactor[];
    countries: ManufacturingHeatmapCountry[];
  };
  scenarios: {
    controls: ScenarioControl[];
    cases: ScenarioCase[];
  };
  claim_cards: SourceBackedClaim[];
  uncertainty_legend: UncertaintyLegendItem[];
};
