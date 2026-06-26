import type { ReactNode } from "react";

type MethodologyCalloutProps = {
  children: ReactNode;
  title: string;
};

export function MethodologyCallout({
  children,
  title
}: MethodologyCalloutProps) {
  return (
    <div className="rounded-lg border border-accent/30 bg-accent-soft p-5">
      <p className="font-display text-2xl font-semibold text-foreground">
        {title}
      </p>
      <div className="mt-3 leading-7 text-muted">{children}</div>
    </div>
  );
}
