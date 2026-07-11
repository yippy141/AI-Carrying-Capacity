import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-muted sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-foreground">
            Frontier Is Not Fate
          </p>
          <p className="mt-3 max-w-2xl leading-7">
            An interactive study of when advanced AI becomes national power —
            and when infrastructure, institutions, and organization flatten the
            return. Built on the AI Conversion Atlas evidence system: no
            composite scores, no rankings, missing values stay visible.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
          <Link className="focus-ring hover:text-foreground" href="/findings">
            What we know
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/evidence">
            Evidence
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/forecasts">
            Forecasts
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/methods">
            Methods
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/about">
            About
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/lab">
            Research lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
