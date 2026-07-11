import assert from "node:assert/strict";
import test from "node:test";

import {
  ADOPTION_DEPTH_FIGURE_IDS,
  buildAdoptionDepthExportSvg,
  buildAdoptionDepthFigureModel
} from "./adoptionDepth.ts";
import {
  loadAdoptionDepth,
  loadSourceRegister
} from "./registers.ts";

test("Figure 1 reads its expected values from the canonical observation file", () => {
  const model = buildAdoptionDepthFigureModel(loadAdoptionDepth());

  assert.deepEqual(
    model.ecb.rows.map((row) => row.value),
    [27, 33, 31, 7]
  );
  assert.equal(model.ecb.reportedTotal, 98);
  assert.equal(model.ecb.unreportedResidual, 2);
  assert.equal(model.btos.allFirms.value, 18);
  assert.deepEqual(
    model.btos.adopterOnly.map((row) => row.value),
    [57, 4]
  );
  assert.deepEqual(
    model.eurostat.sizeGradient.map((row) => row.value),
    [17, 30.36, 55.03]
  );
});

test("all plotted observations resolve to reviewed canonical sources", () => {
  const observations = loadAdoptionDepth();
  const sources = new Map(
    loadSourceRegister().map((source) => [source.source_id, source] as const)
  );
  const model = buildAdoptionDepthFigureModel(observations);
  const rowsById = new Map(
    observations.map((row) => [row.observation_id, row] as const)
  );

  for (const observationId of model.plottedObservationIds) {
    const row = rowsById.get(observationId);
    assert.ok(row, "missing plotted observation " + observationId);
    assert.notEqual(row.denominator, "");
    assert.notEqual(row.survey_universe, "");
    const source = sources.get(row.source_id);
    assert.ok(source, "missing source " + row.source_id);
    assert.equal(source.review_status, "reviewed");
    assert.equal(source.placeholder, "false");
  }
});

test("the figure keeps source-specific denominators and reference windows separate", () => {
  const model = buildAdoptionDepthFigureModel(loadAdoptionDepth());
  const [functionalBreadth] = model.btos.adopterOnly;

  assert.notEqual(
    model.btos.allFirms.denominator,
    functionalBreadth.denominator
  );
  assert.match(model.btos.allFirms.period, /prior two weeks/i);
  assert.match(functionalBreadth.period, /prior six months/i);
  assert.ok(
    model.eurostat.sizeGradient.every(
      (row) => row.comparability_class === "context-only"
    )
  );
});

test("SVG and PNG export source is generated from the plotted model", () => {
  const model = buildAdoptionDepthFigureModel(loadAdoptionDepth());
  const svg = buildAdoptionDepthExportSvg(model);
  const expectedIds = [
    ...ADOPTION_DEPTH_FIGURE_IDS.ecb,
    ADOPTION_DEPTH_FIGURE_IDS.btosAllFirms,
    ...ADOPTION_DEPTH_FIGURE_IDS.btosAdopters,
    ...ADOPTION_DEPTH_FIGURE_IDS.eurostatSize
  ];

  assert.match(svg, /^<svg /);
  assert.match(svg, /whole-number shares total 98/);
  assert.match(svg, /prior-two-week window/);
  assert.match(svg, /not a measure of use depth/);
  assert.match(svg, />0%<\/text>/);
  assert.match(svg, />30%<\/text>/);
  assert.match(svg, />60%<\/text>/);
  assert.match(svg, /Source: Eurostat 2025 ICT enterprise survey/);
  assert.match(svg, /Universe: Enterprises with 10 or more employees/);
  for (const observationId of expectedIds) {
    assert.match(svg, new RegExp(observationId));
  }
});
