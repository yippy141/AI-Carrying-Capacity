import type { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
};

export function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-primary-strong">
      <span className="h-px w-9 bg-primary" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
