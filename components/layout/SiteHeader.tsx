import Link from "next/link";

const navItems = [
  { href: "/", label: "Study" },
  { href: "/findings", label: "What we know" },
  { href: "/evidence", label: "Evidence" },
  { href: "/forecasts", label: "Forecasts" },
  { href: "/methods", label: "Methods" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-background/95">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <Link className="focus-ring inline-flex w-fit items-baseline gap-3" href="/">
          <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
          <span className="font-display text-2xl font-semibold">
            Frontier Is Not Fate
          </span>
          <span className="hidden text-sm text-muted sm:inline">
            · AI Conversion Atlas
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-muted">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="focus-ring transition-colors hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
