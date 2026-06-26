import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-muted sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-semibold text-foreground">
            AI Conversion Atlas
          </p>
          <p className="mt-3 max-w-2xl leading-7">
            V0 is a scaffold for evidence review, not a ranking product. Missing
            values remain missing until reviewed sources and methodology support
            a stronger claim.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
          <Link className="focus-ring hover:text-foreground" href="/methodology">
            Method
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/sources">
            Source register
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/countries/USA">
            USA profile
          </Link>
          <Link className="focus-ring hover:text-foreground" href="/countries/CHN">
            China profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
