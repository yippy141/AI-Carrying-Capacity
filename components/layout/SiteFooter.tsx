import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-paper">
      <div className="mx-auto flex max-w-[1440px] flex-wrap justify-between gap-x-8 gap-y-3 px-6 py-[26px] text-[13px] text-ink-soft sm:px-8">
        <p>Frontier Is Not Fate · Jinhua Yip · Reader edition · 2026-09-06</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.05em]">
          <Link className="focus-ring" href="/about">
            About
          </Link>
          <Link className="focus-ring" href="/evidence">
            Evidence
          </Link>
          <Link className="focus-ring" href="/evidence#source-register">
            Sources
          </Link>
          <a
            className="focus-ring"
            href="https://github.com/yippy141/AI-Carrying-Capacity/commits/main"
            rel="noopener noreferrer"
            target="_blank"
          >
            Changelog
          </a>
        </div>
      </div>
    </footer>
  );
}
