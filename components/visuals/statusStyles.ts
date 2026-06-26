import type { EvidenceLabel, VisualSource, WatchLevel } from "@/lib/types";

export const evidenceToneClasses: Record<EvidenceLabel, string> = {
  observed: "border-accent bg-accent text-white",
  "official-claim": "border-warning bg-warning text-white",
  "qualitative-coded": "border-primary bg-primary text-white",
  estimated: "border-primary-strong bg-primary-strong text-white",
  missing: "border-missing/50 bg-surface text-missing",
  placeholder: "border-primary/40 bg-background text-primary-strong"
};

export const evidenceSoftClasses: Record<EvidenceLabel, string> = {
  observed: "border-accent/30 bg-accent-soft text-accent",
  "official-claim":
    "border-warning/35 bg-[oklch(0.95_0.06_72)] text-[oklch(0.35_0.11_72)]",
  "qualitative-coded":
    "border-primary/25 bg-[oklch(0.96_0.035_38.6)] text-primary-strong",
  estimated:
    "border-primary-strong/30 bg-[oklch(0.93_0.045_38.6)] text-primary-strong",
  missing: "border-rule bg-surface text-missing",
  placeholder: "border-rule bg-background text-primary-strong"
};

export const watchToneClasses: Record<WatchLevel, string> = {
  "primary-watch": "bg-primary text-white",
  "secondary-watch": "bg-warning text-white",
  "open-question": "bg-accent text-white",
  missing: "border border-rule bg-surface text-missing"
};

export const watchSoftClasses: Record<WatchLevel, string> = {
  "primary-watch":
    "border-primary/35 bg-[oklch(0.96_0.035_38.6)] text-primary-strong",
  "secondary-watch":
    "border-warning/35 bg-[oklch(0.95_0.06_72)] text-[oklch(0.35_0.11_72)]",
  "open-question": "border-accent/30 bg-accent-soft text-accent",
  missing: "border-rule bg-surface text-missing"
};

export const watchLabels: Record<WatchLevel, string> = {
  "primary-watch": "primary watch",
  "secondary-watch": "secondary watch",
  "open-question": "open question",
  missing: "missing"
};

export function sourceSummary(sourceIds: string[], sources: VisualSource[]) {
  const sourceMap = new Map(sources.map((source) => [source.source_id, source]));

  return sourceIds
    .map((sourceId) => sourceMap.get(sourceId))
    .filter((source): source is VisualSource => Boolean(source));
}

export function layerTint(index: number) {
  const classes = [
    "border-primary/35 bg-[oklch(0.97_0.025_38.6)]",
    "border-accent/30 bg-accent-soft",
    "border-warning/35 bg-[oklch(0.965_0.045_72)]",
    "border-[oklch(0.58_0.09_250)]/30 bg-[oklch(0.96_0.025_250)]",
    "border-rule bg-surface"
  ];

  return classes[index % classes.length];
}
