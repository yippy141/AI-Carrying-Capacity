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
      className={`inline-flex w-fit items-center border px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.05em] ${toneClasses[label]}`}
    >
      {label}
    </span>
  );
}
