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
  ],
  chinaContext: "obs-adoption-depth-013"
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
  china: {
    context: FigureObservation;
  };
  plottedObservationIds: string[];
  verificationDate: string;
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
  const chinaContext = requireObservation(
    rowsById,
    ADOPTION_DEPTH_FIGURE_IDS.chinaContext
  );
  const reportedTotal = ecbRows.reduce((sum, row) => sum + row.value, 0);
  const plottedRows = [
    ...ecbRows,
    allFirms,
    ...adopterOnly,
    ...sizeGradient
  ];

  return {
    ecb: {
      rows: ecbRows,
      reportedTotal,
      unreportedResidual: Math.max(0, 100 - reportedTotal)
    },
    btos: { allFirms, adopterOnly },
    eurostat: { sizeGradient },
    china: { context: chinaContext },
    plottedObservationIds: plottedRows.map((row) => row.observation_id),
    verificationDate: plottedRows
      .map((row) => row.last_verified)
      .sort()[0] ?? "missing"
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
  const barX = 92;
  const barWidth = 640;
  const ecbColors = ["#F4F1EA", "#E7E2D9", "#9C958B", "#1C1B1A"];
  let x = barX;
  const ecbRects = model.ecb.rows
    .map((row, index) => {
      const width = (barWidth * row.value) / 100;
      const rect = `<rect x="${x}" y="338" width="${width}" height="38" fill="${ecbColors[index]}"/>`;
      x += width;
      return rect;
    })
    .join("");
  const sizeRows = [small, medium, large]
    .map((row, index) => {
      const y = 1132 + index * 78;
      const width = (row.value / 60) * 520;
      const labels = ["Small · 10–49", "Medium · 50–249", "Large · 250+"];
      return `<text x="92" y="${y}" class="label">${labels[index]}</text><rect x="290" y="${y - 23}" width="520" height="24" fill="#F4F1EA"/><rect x="290" y="${y - 23}" width="${width}" height="24" fill="#9C958B"/><text x="836" y="${y}" class="value">${percentLabel(row.value)}</text>`;
    })
    .join("");
  const metadata = xml(model.plottedObservationIds.join(","));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1760" viewBox="0 0 1600 1760" role="img" aria-labelledby="title desc">
  <title id="title">Observed: adoption is not integration</title>
  <desc id="desc">Four source-specific panels show ECB AI-use intensity, United States Census organizational breadth, Eurostat adoption by firm size, and China NBS context. Every panel has its own denominator and scale.</desc>
  <metadata>Canonical observations: ${metadata}</metadata>
  <defs><pattern id="model-hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#F4F1EA"/><line x1="0" y1="0" x2="0" y2="8" stroke="#1C1B1A" stroke-width="1"/></pattern></defs>
  <style>
    text{font-family:Inter,Arial,sans-serif;fill:#1C1B1A}.title{font-family:Newsreader,Georgia,serif;font-size:52px;font-weight:600}.panel{font-family:Newsreader,Georgia,serif;font-size:27px;font-weight:600}.meta,.label,.value,.source,.chip{font-family:"IBM Plex Mono",monospace}.meta{font-size:13px;letter-spacing:1px;fill:#57534B}.body{font-size:17px}.label{font-size:14px}.value{font-size:16px;font-weight:500}.note{font-size:14px;fill:#57534B}.source{font-size:12px;fill:#57534B}.accent{fill:#1F6F5C}.us{fill:#3E63DD}.cn{fill:#C4442A}.chip{font-size:11px;letter-spacing:1px}
  </style>
  <rect width="1600" height="1760" fill="#FBFAF7"/>
  <text x="92" y="92" class="title"><tspan class="accent">Observed:</tspan> adoption is not integration.</text>
  <text x="92" y="136" class="body" fill="#57534B">Unit: percent of firms · denominators and universes remain source-specific · values are never pooled.</text>
  <line x1="92" y1="182" x2="1508" y2="182" stroke="#E7E2D9"/>
  <line x1="800" y1="218" x2="800" y2="950" stroke="#E7E2D9"/>
  <text x="92" y="236" class="meta">PANEL A · ECB SAFE · EURO AREA</text>
  <text x="92" y="279" class="panel">Most reported use is experimental or moderate.</text>
  <text x="92" y="307" class="note">Axis: 0–100% of weighted SAFE respondents</text>
  ${ecbRects}
  <rect x="${x}" y="338" width="${(barWidth * model.ecb.unreportedResidual) / 100}" height="38" fill="#FBFAF7" stroke="#9C958B" stroke-dasharray="4 4"/>
  <text x="92" y="416" class="label">Not in use ${percentLabel(notUsing.value)}</text>
  <text x="92" y="448" class="label">Experimental ${percentLabel(experimental.value)}</text>
  <text x="92" y="480" class="label">Moderate ${percentLabel(moderate.value)}</text>
  <text x="92" y="512" class="label">Significant ${percentLabel(significant.value)}</text>
  <text x="92" y="552" class="note">Reported use categories total ${model.ecb.reportedTotal}%; ${model.ecb.unreportedResidual} points remain unallocated.</text>
  <text x="92" y="586" class="source">ECB SAFE Q4 2025</text>

  <text x="848" y="236" class="meta us">PANEL B · CENSUS BTOS · UNITED STATES</text>
  <text x="848" y="279" class="panel">Reach and breadth use different denominators.</text>
  <text x="848" y="323" class="meta">ALL EMPLOYER BUSINESSES · AXIS 0–100%</text>
  <rect x="848" y="350" width="600" height="26" fill="#F4F1EA"/><rect x="848" y="350" width="${model.btos.allFirms.value * 6}" height="26" fill="#3E63DD"/><text x="1472" y="371" class="value">${percentLabel(model.btos.allFirms.value)}</text>
  <text x="848" y="412" class="label">AI use in at least one business function</text>
  <line x1="848" y1="455" x2="1508" y2="455" stroke="#E7E2D9"/>
  <text x="848" y="492" class="meta">Q24 FUNCTIONAL USERS ONLY · AXIS 0–100%</text>
  <text x="848" y="538" class="label">One to three functions</text>
  <rect x="848" y="552" width="600" height="24" fill="#F4F1EA"/><rect x="848" y="552" width="${narrow.value * 6}" height="24" fill="#3E63DD"/><text x="1472" y="572" class="value">${percentLabel(narrow.value)}</text>
  <text x="848" y="626" class="label">Comprehensive adopters · model estimate</text>
  <rect x="848" y="640" width="600" height="24" fill="#F4F1EA"/><rect x="848" y="640" width="${comprehensive.value * 6}" height="24" fill="url(#model-hatch)" stroke="#3E63DD"/><text x="1472" y="660" class="value">${percentLabel(comprehensive.value)}</text>
  <text x="848" y="716" class="note">Q23 uses a prior-two-week window. Q24 uses a prior-six-month window.</text>
  <text x="848" y="750" class="source">Census CES Working Paper 26-25</text>

  <line x1="92" y1="950" x2="1508" y2="950" stroke="#E7E2D9"/>
  <line x1="900" y1="990" x2="900" y2="1480" stroke="#E7E2D9"/>
  <text x="92" y="1010" class="meta">PANEL C · EUROSTAT · EUROPEAN UNION</text>
  <text x="92" y="1053" class="panel">Adoption is uneven across firm size.</text>
  <text x="92" y="1085" class="note">Axis: 0–60% within each enterprise-size universe · not a measure of use depth</text>
  ${sizeRows}
  <line x1="290" y1="1358" x2="810" y2="1358" stroke="#E7E2D9"/>
  <text x="290" y="1385" class="source">0%</text><text x="550" y="1385" class="source" text-anchor="middle">30%</text><text x="810" y="1385" class="source" text-anchor="end">60%</text>
  <text x="92" y="1435" class="source">Source: Eurostat 2025 ICT enterprise survey</text>
  <text x="92" y="1462" class="source">Universe: ${xml(small.survey_universe)}</text>

  <text x="948" y="1010" class="meta cn">PANEL D · NBS · CHINA · CONTEXT ONLY</text>
  <text x="948" y="1053" class="panel">A different firm universe gives context only.</text>
  <text x="948" y="1085" class="note">Contextual record retained, unplotted.</text>
  <text x="948" y="1140" class="note">Different enterprise universe; no all-firm comparison.</text>
  <text x="948" y="1195" class="note">Load-bearing translation awaits native-language human review.</text>
  <text x="948" y="1250" class="source">NBS Fifth National Economic Census · see evidence restrictions.</text>

  <line x1="92" y1="1528" x2="1508" y2="1528" stroke="#E7E2D9"/>
  <text x="92" y="1570" class="source">Sources: ECB SAFE; U.S. Census CES WP 26-25; Eurostat ICT enterprise survey; NBS Fifth National Economic Census.</text>
  <rect x="92" y="1600" width="92" height="25" fill="#1C1B1A"/><text x="104" y="1617" class="chip" fill="#FBFAF7">OBSERVED</text>
  <text x="204" y="1617" class="chip">DEFINITIONS DIFFER</text>
  <text x="92" y="1682" class="source">Figure 1 · observation vintage in panels · observation verification ${xml(model.verificationDate)}</text>
</svg>`;
}
