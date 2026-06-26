import type { ReactNode } from "react";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

type NarrativeBlockProps = {
  children: ReactNode;
  eyebrow?: string;
  title: string;
};

export function NarrativeBlock({
  children,
  eyebrow,
  title
}: NarrativeBlockProps) {
  return (
    <section className="py-14">
      {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
      <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
        <h2 className="max-w-xl text-3xl text-foreground sm:text-4xl">
          {title}
        </h2>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-muted">
          {children}
        </div>
      </div>
    </section>
  );
}
