export type AdoptionDepthObservation = {
  observation_id: string;
  geography: string;
  period: string;
  panel: string;
  measure: string;
  value: string;
  unit: string;
  denominator: string;
  survey_universe: string;
  source_id: string;
  evidence_label: string;
  comparability_class: string;
  definition: string;
  caveat: string;
  last_verified: string;
};

export type FigureObservation = Omit<AdoptionDepthObservation, "value"> & {
  value: number;
};

export const ADOPTION_DEPTH_FIGURE_IDS = {
  ecb: [
    "obs-adoption-depth-001",
    "obs-adoption-depth-002",
    "obs-adoption-depth-003",
    "obs-adoption-depth-004"
  ],
  btosAllFirms: "obs-adoption-depth-005",
  btosAdopters: [
    "obs-adoption-depth-007",
    "obs-adoption-depth-008"
  ],
  eurostatSize: [
    "obs-adoption-depth-010",
    "obs-adoption-depth-011",
    "obs-adoption-depth-012"
  ]
} as const;

export type AdoptionDepthFigureModel = {
  ecb: {
    rows: FigureObservation[];
    reportedTotal: number;
    unreportedResidual: number;
  };
  btos: {
    allFirms: FigureObservation;
    adopterOnly: FigureObservation[];
  };
  eurostat: {
    sizeGradient: FigureObservation[];
  };
  plottedObservationIds: string[];
};

function numericObservation(row: AdoptionDepthObservation): FigureObservation {
  const value = Number(row.value);
  if (!Number.isFinite(value)) {
    throw new Error(`Observation ${row.observation_id} has a non-numeric value.`);
  }
  return { ...row, value };
}

function requireObservation(
  rowsById: Map<string, AdoptionDepthObservation>,
  observationId: string
): FigureObservation {
  const row = rowsById.get(observationId);
  if (!row) {
    throw new Error(`Figure 1 requires missing observation ${observationId}.`);
  }
  return numericObservation(row);
}

/**
 * The production figure model is keyed only by canonical observation IDs.
 * This makes the CSV, rather than component literals, the source of every
 * plotted number and denominator.
 */
export function buildAdoptionDepthFigureModel(
  observations: AdoptionDepthObservation[]
): AdoptionDepthFigureModel {
  const rowsById = new Map(
    observations.map((row) => [row.observation_id, row] as const)
  );
  const ecbRows = ADOPTION_DEPTH_FIGURE_IDS.ecb.map((id) =>
    requireObservation(rowsById, id)
  );
  const allFirms = requireObservation(
    rowsById,
    ADOPTION_DEPTH_FIGURE_IDS.btosAllFirms
  );
  const adopterOnly = ADOPTION_DEPTH_FIGURE_IDS.btosAdopters.map((id) =>
    requireObservation(rowsById, id)
  );
  const sizeGradient = ADOPTION_DEPTH_FIGURE_IDS.eurostatSize.map((id) =>
    requireObservation(rowsById, id)
  );
  const reportedTotal = ecbRows.reduce((sum, row) => sum + row.value, 0);

  return {
    ecb: {
      rows: ecbRows,
      reportedTotal,
      unreportedResidual: Math.max(0, 100 - reportedTotal)
    },
    btos: { allFirms, adopterOnly },
    eurostat: { sizeGradient },
    plottedObservationIds: [
      ...ecbRows,
      allFirms,
      ...adopterOnly,
      ...sizeGradient
    ].map((row) => row.observation_id)
  };
}

function xml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function percentLabel(value: number): string {
  return `${Number.isInteger(value) ? value.toFixed(0) : value}%`;
}

/**
 * Builds a portable, self-contained export using the same model rendered in
 * the semantic HTML figure. The browser uses this SVG directly for SVG
 * downloads and as the rasterization source for PNG downloads.
 */
export function buildAdoptionDepthExportSvg(
  model: AdoptionDepthFigureModel
): string {
  const [notUsing, experimental, moderate, significant] = model.ecb.rows;
  const [narrow, comprehensive] = model.btos.adopterOnly;
  const [small, medium, large] = model.eurostat.sizeGradient;
  const barX = 100;
  const barWidth = 1400;
  const ecbColors = ["#e9e8e6", "#c9c6c1", "#5c5752", "#c6572c"];
  let x = barX;
  const ecbRects = model.ecb.rows
    .map((row, index) => {
      const width = (barWidth * row.value) / 100;
      const rect = `<rect x="${x}" y="260" width="${width}" height="72" fill="${ecbColors[index]}"/>`;
      x += width;
      return rect;
    })
    .join("");
  const sizeRows = [small, medium, large]
    .map((row, index) => {
      const y = 1110 + index * 82;
      const width = (row.value / 60) * 1020;
      const labels = ["Small · 10–49", "Medium · 50–249", "Large · 250+"];
      return `<text x="100" y="${y}" class="label">${labels[index]}</text><rect x="350" y="${y - 25}" width="1020" height="32" fill="#ecebea"/><rect x="350" y="${y - 25}" width="${width}" height="32" fill="#2f2a27"/><text x="1400" y="${y}" class="value">${percentLabel(row.value)}</text>`;
    })
    .join("");
  const metadata = xml(model.plottedObservationIds.join(","));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1500" viewBox="0 0 1600 1500" role="img" aria-labelledby="title desc">
  <title id="title">Adoption is not integration</title>
  <desc id="desc">Three source-specific panels showing ECB AI-use intensity, United States BTOS organizational breadth, and Eurostat adoption by firm size. The panels are not harmonized.</desc>
  <metadata>Canonical observations: ${metadata}</metadata>
  <style>
    text{font-family:Aptos,Segoe UI,Arial,sans-serif;fill:#2f2a27}.title{font-family:Georgia,serif;font-size:58px;font-weight:700}.panel{font-family:Georgia,serif;font-size:34px;font-weight:700}.kicker{font-size:17px;font-weight:700;letter-spacing:1.6px}.body{font-size:22px}.label{font-size:21px;font-weight:600}.value{font-size:23px;font-weight:700}.note{font-size:17px;fill:#5d5650}.source{font-size:16px;fill:#5d5650}.accent{fill:#a24123}
  </style>
  <rect width="1600" height="1500" fill="#ffffff"/>
  <text x="100" y="92" class="title">Adoption is not integration</text>
  <text x="100" y="140" class="body">Within-source evidence only. “Deep use” differs by survey; panels must not be read as a harmonized ranking.</text>
  <line x1="100" y1="178" x2="1500" y2="178" stroke="#2f2a27" stroke-width="2"/>
  <text x="100" y="225" class="kicker accent">PANEL A · ECB SAFE INTENSITY</text>
  ${ecbRects}
  <rect x="${x}" y="260" width="${(barWidth * model.ecb.unreportedResidual) / 100}" height="72" fill="#ffffff" stroke="#a7a19b" stroke-dasharray="4 4"/>
  <text x="100" y="380" class="label">Not in use ${percentLabel(notUsing.value)}</text>
  <text x="430" y="380" class="label">Very infrequent / experimental ${percentLabel(experimental.value)}</text>
  <text x="970" y="380" class="label">Moderate ${percentLabel(moderate.value)}</text>
  <text x="1260" y="380" class="label accent">Significant ${percentLabel(significant.value)}</text>
  <text x="100" y="420" class="note">The four published whole-number shares total ${model.ecb.reportedTotal}; the ${model.ecb.unreportedResidual}-point residual may reflect “don’t know” responses and rounding.</text>
  <text x="100" y="450" class="source">Source: ECB SAFE Q4 2025 · ${xml(notUsing.source_id)} · denominator: ${xml(notUsing.denominator)}</text>
  <line x1="100" y1="500" x2="1500" y2="500" stroke="#d3cfca"/>
  <text x="100" y="552" class="kicker accent">PANEL B · U.S. ORGANIZATIONAL BREADTH</text>
  <text x="100" y="610" class="panel">All employer firms</text>
  <text x="100" y="652" class="body">Reported AI use in at least one business function</text>
  <rect x="100" y="684" width="600" height="42" fill="#ecebea"/><rect x="100" y="684" width="${model.btos.allFirms.value * 6}" height="42" fill="#2f2a27"/>
  <text x="720" y="716" class="value">${percentLabel(model.btos.allFirms.value)}</text>
  <text x="840" y="610" class="panel">AI-adopting firms only</text>
  <text x="840" y="652" class="body">Use AI in three or fewer functions</text>
  <rect x="840" y="684" width="600" height="34" fill="#ecebea"/><rect x="840" y="684" width="${narrow.value * 6}" height="34" fill="#2f2a27"/><text x="1460" y="712" class="value">${percentLabel(narrow.value)}</text>
  <text x="840" y="765" class="body">Comprehensive adopters</text>
  <rect x="840" y="797" width="600" height="34" fill="#ecebea"/><rect x="840" y="797" width="${comprehensive.value * 6}" height="34" fill="#c6572c"/><text x="1460" y="825" class="value">${percentLabel(comprehensive.value)}</text>
  <text x="100" y="885" class="note">Q23 ${percentLabel(model.btos.allFirms.value)} uses all employer businesses and a prior-two-week window; Q24 ${percentLabel(narrow.value)} / ${percentLabel(comprehensive.value)} uses functional adopters and a prior-six-month window.</text>
  <text x="100" y="918" class="source">Source: Census CES Working Paper 26-25 · ${xml(model.btos.allFirms.source_id)} · Nov 2025–Jan 2026</text>
  <line x1="100" y1="968" x2="1500" y2="968" stroke="#d3cfca"/>
  <text x="100" y="1020" class="kicker accent">PANEL C · EUROSTAT FIRM-SIZE GRADIENT</text>
  <text x="100" y="1062" class="body">Adoption by firm size — context for uneven diffusion, not a measure of use depth</text>
  ${sizeRows}
  <line x1="350" y1="1322" x2="1370" y2="1322" stroke="#a7a19b"/>
  <text x="350" y="1350" class="note" text-anchor="start">0%</text>
  <text x="860" y="1350" class="note" text-anchor="middle">30%</text>
  <text x="1370" y="1350" class="note" text-anchor="end">60%</text>
  <text x="100" y="1384" class="source">Source: Eurostat 2025 ICT enterprise survey · ${xml(small.source_id)}</text>
  <text x="100" y="1410" class="source">Universe: ${xml(small.survey_universe)}</text>
  <line x1="100" y1="1440" x2="1500" y2="1440" stroke="#2f2a27" stroke-width="2"/>
  <text x="100" y="1478" class="note">Figure 1 · empirical · AI Conversion Atlas · verified 2026-07-11</text>
</svg>`;
}
