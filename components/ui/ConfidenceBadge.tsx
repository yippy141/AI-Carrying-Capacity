import type { EvidenceLabel } from "@/lib/types";

type ConfidenceBadgeProps = {
  label: EvidenceLabel | "needs review";
};

const toneClasses: Record<ConfidenceBadgeProps["label"], string> = {
  observed: "border-accent bg-accent text-white",
  "official-claim": "border-warning bg-warning text-white",
  "qualitative-coded": "border-primary bg-primary text-white",
  estimated: "border-primary-strong bg-primary-strong text-white",
  missing: "border-missing/40 bg-background text-missing",
  placeholder: "border-primary/40 bg-background text-primary-strong",
  "needs review": "border-accent/40 bg-accent-soft text-accent"
};

export function ConfidenceBadge({ label }: ConfidenceBadgeProps) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[label]}`}
    >
      {label}
    </span>
  );
}
