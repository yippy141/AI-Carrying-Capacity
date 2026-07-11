"use client";

import { useMemo, useState } from "react";

import {
  buildAdoptionDepthExportSvg,
  buildAdoptionDepthFigureModel,
  type AdoptionDepthObservation,
  type FigureObservation
} from "@/lib/adoptionDepth";

const ECB_LABELS = [
  "Not in use",
  "Very infrequent or experimental",
  "Moderate use",
  "Significant use"
];

const ECB_COLORS = [
  "var(--surface-strong)",
  "oklch(0.78 0.008 42)",
  "oklch(0.38 0.018 42)",
  "var(--primary)"
];

function formatPercent(value: number): string {
  return (Number.isInteger(value) ? value.toFixed(0) : String(value)) + "%";
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function ExportControls({
  svg,
  onError
}: {
  svg: string;
  onError: (message: string) => void;
}) {
  function exportSvg() {
    onError("");
    triggerDownload(
      new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
      "adoption-is-not-integration.svg"
    );
  }

  function exportPng() {
    onError("");
    const source = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const sourceUrl = URL.createObjectURL(source);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1600;
      canvas.height = 1500;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(sourceUrl);
        onError("PNG export is unavailable in this browser.");
        return;
      }
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(sourceUrl);
      canvas.toBlob((blob) => {
        if (!blob) {
          onError("The browser could not create the PNG file.");
          return;
        }
        triggerDownload(blob, "adoption-is-not-integration.png");
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      onError("The browser could not render the export image.");
    };
    image.src = sourceUrl;
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Figure export options">
      <button
        className="focus-ring min-h-11 border border-foreground bg-white px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
        onClick={exportSvg}
        type="button"
      >
        Export SVG
      </button>
      <button
        className="focus-ring min-h-11 border border-foreground bg-white px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
        onClick={exportPng}
        type="button"
      >
        Export PNG
      </button>
    </div>
  );
}

function SourceLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 border-t border-rule pt-4 text-xs leading-5 text-missing">
      {children}
    </p>
  );
}

function ScaleBar({
  row,
  color = "var(--foreground)",
  max = 100
}: {
  row: FigureObservation;
  color?: string;
  max?: number;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 text-sm leading-5">
        <span className="font-medium text-foreground">{row.definition}</span>
        <span className="shrink-0 font-semibold text-foreground">
          {formatPercent(row.value)}
        </span>
      </div>
      <div
        aria-label={
          row.definition +
          ": " +
          formatPercent(row.value) +
          ". Denominator: " +
          row.denominator
        }
        className="mt-2 h-3 bg-surface-strong"
        role="img"
      >
        <div
          className="h-full"
          style={{
            backgroundColor: color,
            width: String(Math.min(100, (row.value / max) * 100)) + "%"
          }}
        />
      </div>
    </div>
  );
}

/**
 * Figure 1. Values are resolved by canonical observation ID in
 * buildAdoptionDepthFigureModel; this component contains no plotted values.
 */
export function AdoptionDepthFigure({
  observations
}: {
  observations: AdoptionDepthObservation[];
}) {
  const model = useMemo(
    () => buildAdoptionDepthFigureModel(observations),
    [observations]
  );
  const exportSvg = useMemo(
    () => buildAdoptionDepthExportSvg(model),
    [model]
  );
  const [exportError, setExportError] = useState("");
  const [notUsing] = model.ecb.rows;
  const [narrow, comprehensive] = model.btos.adopterOnly;
  const [small, medium, large] = model.eurostat.sizeGradient;

  return (
    <div className="bg-white" data-observation-ids={model.plottedObservationIds.join(" ")}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-foreground py-3">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          <span className="font-semibold text-foreground">
            Within-source comparisons only.
          </span>{" "}
          The ECB measures intensity, Census measures organizational breadth,
          and Eurostat measures adoption by firm size. “Deep use” is not a
          harmonized global metric.
        </p>
        <ExportControls onError={setExportError} svg={exportSvg} />
      </div>
      {exportError ? (
        <p className="mt-2 text-sm text-primary-strong" role="status">
          {exportError}
        </p>
      ) : null}

      <section className="py-8 sm:py-10" aria-labelledby="ecb-panel-title">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="font-display text-sm font-semibold text-primary-strong">
              Panel A · ECB intensity ladder
            </p>
            <h4
              className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl"
              id="ecb-panel-title"
            >
              Most reported use is experimental or moderate.
            </h4>
          </div>
          <p className="text-sm leading-6 text-muted">
            Any use includes very infrequent use and pilot projects. Published
            weighted shares are shown as reported.
          </p>
        </div>

        <div
          aria-label={
            "ECB SAFE Q4 2025 AI use intensity. " +
            ECB_LABELS.map(
              (label, index) =>
                label + " " + formatPercent(model.ecb.rows[index].value)
            ).join(", ") +
            ". Reported rounded shares total " +
            model.ecb.reportedTotal +
            "%."
          }
          className="mt-7 flex h-12 overflow-hidden border border-foreground"
          role="img"
        >
          {model.ecb.rows.map((row, index) => (
            <div
              aria-hidden="true"
              className="h-full border-r border-white/70 last:border-r-0"
              key={row.observation_id}
              style={{
                backgroundColor: ECB_COLORS[index],
                width: String(row.value) + "%"
              }}
            />
          ))}
          <div
            aria-hidden="true"
            className="h-full border-l border-dashed border-missing bg-white"
            style={{ width: String(model.ecb.unreportedResidual) + "%" }}
          />
        </div>

        <ul className="mt-5 grid gap-x-7 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {model.ecb.rows.map((row, index) => (
            <li className="flex items-start gap-3" key={row.observation_id}>
              <span
                aria-hidden="true"
                className="mt-1 block h-3 w-3 shrink-0 border border-rule"
                style={{ backgroundColor: ECB_COLORS[index] }}
              />
              <span className="text-sm leading-5 text-muted">
                <strong className="block text-base text-foreground">
                  {formatPercent(row.value)}
                </strong>
                {ECB_LABELS[index]}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6 text-muted">
          The four rounded categories total {model.ecb.reportedTotal}%, leaving
          a visible {model.ecb.unreportedResidual}-point unreported residual.
          SAFE also offers a “don&apos;t know” response, so the residual may
          reflect that response and rounding. The chart does not renormalize.
        </p>
        <SourceLine>
          Source: ECB SAFE Q4 2025 results ({notUsing.source_id}); questionnaire
          and wording: src-0039. Period: {notUsing.period}. Denominator:{" "}
          {notUsing.denominator}. Universe: {notUsing.survey_universe}.
        </SourceLine>
      </section>

      <section
        className="border-t border-rule py-8 sm:py-10"
        aria-labelledby="btos-panel-title"
      >
        <p className="font-display text-sm font-semibold text-primary-strong">
          Panel B · U.S. organizational breadth
        </p>
        <h4
          className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl"
          id="btos-panel-title"
        >
          Firm reach and functional breadth answer different questions.
        </h4>

        <div className="mt-7 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="border-b border-foreground pb-2 text-sm font-semibold text-foreground">
              Denominator: all U.S. employer businesses
            </p>
            <div className="mt-5">
              <ScaleBar row={model.btos.allFirms} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              {model.btos.allFirms.caveat} The separate employment-weighted
              summary is retained in the observation file but is not plotted.
            </p>
          </div>

          <div>
            <p className="border-b border-foreground pb-2 text-sm font-semibold text-foreground">
              Denominator: Q24 functional AI users only
            </p>
            <div className="mt-5 space-y-6">
              <ScaleBar row={narrow} />
              <ScaleBar color="var(--primary)" row={comprehensive} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              These are separate descriptors of breadth, not categories that
              partition or sum to 100. “Comprehensive” is the paper&apos;s
              latent-class classification. Q24 asks about 15 functions over the
              prior six months, so this is not a same-question funnel from Q23.
            </p>
          </div>
        </div>
        <SourceLine>
          Source: Census CES Working Paper 26-25 ({model.btos.allFirms.source_id});
          instrument: src-0046; methodology: src-0047. Q23 collection/reference
          period: {model.btos.allFirms.period}. All-firm universe:{" "}
          {model.btos.allFirms.survey_universe}. Q24 reference window: prior six
          months. Functional-adopter denominator: {narrow.denominator}.
        </SourceLine>
      </section>

      <section
        className="border-t border-rule py-8 sm:py-10"
        aria-labelledby="eurostat-panel-title"
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="font-display text-sm font-semibold text-primary-strong">
              Panel C · Eurostat firm-size gradient
            </p>
            <h4
              className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl"
              id="eurostat-panel-title"
            >
              Adoption is uneven across firm size.
            </h4>
          </div>
          <p className="text-sm leading-6 text-muted">
            Context for diffusion, not a depth measure. “Any AI” means at least
            one listed AI technology.
          </p>
        </div>

        <div className="mt-7 grid gap-5">
          <ScaleBar max={60} row={small} />
          <ScaleBar max={60} row={medium} />
          <ScaleBar color="var(--primary)" max={60} row={large} />
          <div className="flex justify-between border-t border-rule pt-2 text-[11px] text-missing">
            <span>0%</span>
            <span>30%</span>
            <span>60%</span>
          </div>
        </div>
        <SourceLine>
          Source: Eurostat 2025 enterprise AI-use data ({small.source_id});
          dataset DOI: src-0043; metadata: src-0044. Period: {small.period}.
          Universe: {small.survey_universe}. Values are subgroup adoption rates,
          not a harmonized use-depth scale.
        </SourceLine>
      </section>
    </div>
  );
}

export default AdoptionDepthFigure;
