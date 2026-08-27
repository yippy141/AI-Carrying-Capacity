import type { EvidenceLabel, VisualSource, WatchLevel } from "@/lib/types";

export const evidenceToneClasses: Record<EvidenceLabel, string> = {
  observed: "border-ink bg-ink text-paper",
  "official-claim": "border-ink bg-paper text-ink",
  "qualitative-coded": "border-ink border-dotted bg-paper text-ink",
  estimated: "border-hairline bg-hairline text-ink",
  missing: "border-comparator bg-surface text-ink-soft",
  placeholder: "border-hairline bg-paper text-ink-soft"
};

export const evidenceSoftClasses: Record<EvidenceLabel, string> = {
  observed: "border-ink bg-paper text-ink",
  "official-claim": "border-ink bg-paper text-ink",
  "qualitative-coded": "border-ink border-dotted bg-paper text-ink",
  estimated: "border-hairline bg-hairline text-ink",
  missing: "border-hairline bg-surface text-ink-soft",
  placeholder: "border-hairline bg-paper text-ink-soft"
};

export const watchToneClasses: Record<WatchLevel, string> = {
  "primary-watch": "bg-ink text-paper",
  "secondary-watch": "bg-comparator text-paper",
  "open-question": "border border-ink bg-paper text-ink",
  missing: "border border-hairline bg-surface text-ink-soft"
};

export const watchSoftClasses: Record<WatchLevel, string> = {
  "primary-watch": "border-ink bg-paper text-ink",
  "secondary-watch": "border-comparator bg-surface text-ink-soft",
  "open-question": "border-ink border-dotted bg-paper text-ink",
  missing: "border-hairline bg-surface text-ink-soft"
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
    "border-ink bg-paper",
    "border-comparator bg-surface",
    "border-hairline bg-paper",
    "border-comparator bg-paper",
    "border-hairline bg-surface"
  ];

  return classes[index % classes.length];
}
