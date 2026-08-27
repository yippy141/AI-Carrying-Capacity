export type FigureAnnotation = {
  id: string;
  label: string;
  labelX: number;
  labelY: number;
  anchorX: number;
  anchorY: number;
  align?: "start" | "center" | "end";
};

function translateFor(align: FigureAnnotation["align"]): string {
  if (align === "end") return "translate(-100%, -50%)";
  if (align === "center") return "translate(-50%, -50%)";
  return "translate(0, -50%)";
}

/**
 * Direct annotation overlay for chart containers. The parent must be relative.
 * Coordinates are percentages so the leader geometry survives responsive scale.
 */
export function AnnotationLayer({
  annotations
}: {
  annotations: FigureAnnotation[];
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        {annotations.map((annotation) => (
          <line
            key={annotation.id}
            stroke="var(--hairline)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1={`${annotation.anchorX}%`}
            x2={`${annotation.labelX}%`}
            y1={`${annotation.anchorY}%`}
            y2={`${annotation.labelY}%`}
          />
        ))}
      </svg>
      {annotations.map((annotation) => (
        <span
          className="absolute max-w-44 bg-paper px-1 font-sans text-[13px] leading-[1.35] text-ink-soft"
          key={annotation.id}
          style={{
            left: `${annotation.labelX}%`,
            top: `${annotation.labelY}%`,
            transform: translateFor(annotation.align)
          }}
        >
          {annotation.label}
        </span>
      ))}
      <ul className="sr-only">
        {annotations.map((annotation) => (
          <li key={annotation.id}>{annotation.label}</li>
        ))}
      </ul>
    </div>
  );
}
