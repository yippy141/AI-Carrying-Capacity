const CHIP_STYLES: Record<string, string> = {
  observed: "border-accent text-accent",
  "official claim": "border-warning text-warning",
  "official target": "border-warning text-warning",
  hypothesis: "border-primary-strong text-primary-strong",
  conceptual: "border-primary-strong text-primary-strong",
  "model estimate": "border-primary-strong text-primary-strong",
  staged: "border-missing text-missing",
  missing: "border-missing text-missing border-dashed",
  empirical: "border-accent text-accent",
  forecast: "border-missing text-missing",
  draft: "border-missing text-missing"
};

/**
 * Small inline evidence-status chip. The reset's replacement for
 * banner-scale warnings inside the study narrative: present, legible,
 * and proportionate.
 */
export function EvidenceChip({ status }: { status: string }) {
  const style = CHIP_STYLES[status] ?? "border-missing text-missing";
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-sm border px-1.5 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-[0.08em] ${style}`}
    >
      {status}
    </span>
  );
}
