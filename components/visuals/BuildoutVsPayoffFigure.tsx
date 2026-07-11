type Series = {
  label: string;
  unit: string;
  sourceLabel: string;
  points: { period: string; value: number }[];
};

type PanelSpec = {
  title: string;
  framing: string;
  pendingSources: string[];
  series?: Series;
};

const PANELS: PanelSpec[] = [
  {
    title: "Panel A · The buildout, visible now",
    framing:
      "Computing-infrastructure investment and data-center electricity demand. This panel will show the build stage: spending and physical capacity, which move first and measure the size of the bet.",
    pendingSources: [
      "Epoch AI computing-infrastructure share of US GDP (staged, src-v1-dr-004)",
      "LBNL 2024 US Data Center Energy Usage Report (canonical, src-0010 — extraction pending)"
    ]
  },
  {
    title: "Panel B · The payoff, not yet visible",
    framing:
      "Measured productivity effects. This panel will show the harvest stage: model-estimated and observed productivity gains, which lag the buildout by design of the underlying economics.",
    pendingSources: [
      "IMF Europe TFP model estimate (staged, src-v1-dr-011)",
      "OECD G7 labor-productivity model estimate (staged, src-v1-dr-012)",
      "Task-level RCT evidence (staged, src-v2-dr-010)"
    ]
  }
];

/**
 * Planned lab prototype: build-stage effects versus harvest-stage effects.
 * Data-ready with explicit empty states. A panel renders a chart only
 * when a canonical series is wired in; until then it names exactly
 * what is missing and why. No fake charts and no public figure number.
 */
export function BuildoutVsPayoffFigure() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {PANELS.map((panel) => (
        <section
          aria-label={panel.title}
          className="flex min-h-64 flex-col border border-rule bg-white p-6"
          key={panel.title}
        >
          <h4 className="font-display text-xl font-semibold text-foreground">
            {panel.title}
          </h4>
          <p className="mt-2 text-sm leading-6 text-muted">{panel.framing}</p>

          {panel.series ? null : (
            <div className="mt-5 flex flex-1 flex-col justify-center border border-dashed border-missing p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-missing">
                Awaiting canonical data
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                This panel renders only from reviewed sources. Pending
                promotion:
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm leading-6 text-muted">
                {panel.pendingSources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
