import type { ReactNode } from "react";

import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import type { EvidenceLabel } from "@/lib/types";

type SourceNoteProps = {
  children: ReactNode;
  label?: EvidenceLabel | "needs review";
  title?: string;
};

export function SourceNote({
  children,
  label = "missing",
  title = "Source status"
}: SourceNoteProps) {
  return (
    <aside className="border-y border-rule py-5 text-sm text-muted">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          <div className="mt-2 max-w-3xl leading-7">{children}</div>
        </div>
        <ConfidenceBadge label={label} />
      </div>
    </aside>
  );
}
