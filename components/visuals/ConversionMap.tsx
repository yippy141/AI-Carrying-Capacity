import { dimensions } from "@/lib/data";

export function ConversionMap() {
  return (
    <figure className="border-y border-rule py-7">
      <div
        className="relative grid min-h-[360px] gap-3 overflow-hidden sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Methodology structure showing six separated dimensions. All example values are marked missing."
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
          role="img"
          aria-labelledby="conversion-map-title"
          preserveAspectRatio="none"
          viewBox="0 0 900 360"
        >
          <title id="conversion-map-title">
            Placeholder conversion framework without scores
          </title>
          <path
            d="M0 290 C140 210 230 245 330 180 S530 95 690 145 830 120 900 72"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
          />
          <path
            d="M0 108 C145 150 255 118 365 170 S565 260 707 206 824 244 900 276"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>
        {dimensions.map((dimension) => (
          <div
            className="relative flex min-h-36 flex-col justify-between rounded-lg border border-rule bg-background/90 p-4"
            key={dimension.key}
          >
            <div>
              <p className="font-display text-xl font-semibold text-foreground">
                {dimension.shortLabel}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {dimension.description}
              </p>
            </div>
            <p className="mt-5 text-xs font-semibold text-missing">
              value: missing
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        This is a structural diagram, not a scorecard. The lines show analytic
        relationships to test; they do not encode country or sector values.
      </figcaption>
    </figure>
  );
}
