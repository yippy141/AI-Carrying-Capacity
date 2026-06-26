import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { visualSystemData } from "@/lib/data";
import type { UncertaintyLegendItem } from "@/lib/types";

type UncertaintyLegendProps = {
  items?: UncertaintyLegendItem[];
  compact?: boolean;
};

export function UncertaintyLegend({
  compact = false,
  items = visualSystemData.uncertainty_legend
}: UncertaintyLegendProps) {
  return (
    <section className="border-y border-rule py-6" aria-label="Evidence labels">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Uncertainty legend
          </h2>
          <p className="mt-2 leading-7 text-muted">
            Colors describe evidence status, not country performance. Missing
            values remain visible.
          </p>
        </div>
        <div
          className={
            compact
              ? "flex max-w-3xl flex-wrap gap-2"
              : "grid w-full max-w-4xl gap-3 sm:grid-cols-2"
          }
        >
          {items.map((item) => (
            <div
              className={
                compact
                  ? "flex items-center"
                  : "rounded-lg border border-rule bg-background p-4"
              }
              key={item.label}
            >
              <ConfidenceBadge label={item.label} />
              {compact ? null : (
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.definition}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
