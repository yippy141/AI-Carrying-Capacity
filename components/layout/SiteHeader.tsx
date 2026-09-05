import Link from "next/link";

const navItems = [
  { href: "/", label: "Study" },
  { href: "/paper", label: "Paper" },
  { href: "/evidence", label: "Evidence" },
  { href: "/methods", label: "Methods" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-baseline justify-between gap-x-8 gap-y-3 px-6 py-[18px] sm:px-8">
        <Link className="focus-ring inline-flex w-fit items-baseline" href="/">
          <span className="font-display text-[19px] font-semibold leading-none">
            Frontier Is Not Fate
          </span>
        </Link>
        <div className="flex flex-wrap items-baseline justify-end gap-x-6 gap-y-3">
          <nav aria-label="Primary navigation">
            <ul className="flex flex-wrap gap-x-[22px] gap-y-2 text-sm text-ink-soft">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="focus-ring"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            </ul>
          </nav>
          <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-soft">
            Reader RC
          </span>
        </div>
      </div>
    </header>
  );
}
