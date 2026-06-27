type StagedEvidenceBannerProps = {
  title?: string;
  sourceStatus?: string;
  children?: React.ReactNode;
};

export function StagedEvidenceBanner({
  title = "Staged evidence warning",
  sourceStatus = "staged / not canonical",
  children
}: StagedEvidenceBannerProps) {
  return (
    <aside className="rounded-lg border border-warning/35 bg-[oklch(0.97_0.035_72)] p-5 text-[oklch(0.32_0.09_72)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em]">
            {sourceStatus}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-foreground">
            {title}
          </h2>
        </div>
        <span className="w-fit rounded-full border border-warning/40 bg-background px-3 py-1 text-xs font-semibold text-muted">
          no composite score
        </span>
      </div>
      <div className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">
        <p>
          Visuals use local V0 JSON unless explicitly stated otherwise. They are
          diagnostic scaffolds, not reviewed findings.
        </p>
        <p>
          Official targets and program claims are separate from independently
          observed evidence.
        </p>
        <p>
          Missing values stay visible. They are not filled for visual polish or
          used to rank countries.
        </p>
      </div>
      {children ? <div className="mt-4 text-sm leading-6">{children}</div> : null}
    </aside>
  );
}
