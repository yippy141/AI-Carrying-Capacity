import assert from "node:assert/strict";
import test from "node:test";

import {
  evidenceClassificationForClaim,
  isPublicReviewStatus
} from "./evidenceStatus.ts";

test("review status gates public rendering without changing evidence basis", () => {
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "observed_statistic",
      evidence_type: "dataset",
      product_use_status: "staged"
    }),
    { basis: "observed", reviewStatus: "staged" }
  );
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "observed_statistic",
      evidence_type: "dataset",
      product_use_status: "rejected"
    }),
    { basis: "observed", reviewStatus: "rejected" }
  );
  assert.equal(isPublicReviewStatus("staged"), false);
  assert.equal(isPublicReviewStatus("reviewed"), true);
});

test("claim semantics do not collapse caveated claims into observed", () => {
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "official_target",
      evidence_type: "official_document",
      product_use_status: "approved_with_caveat"
    }),
    { basis: "official target", reviewStatus: "reviewed" }
  );
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "hypothesis",
      evidence_type: "derived",
      product_use_status: "approved_with_caveat"
    }),
    { basis: "hypothesis", reviewStatus: "reviewed" }
  );
});

test("observations, scenarios, targets, and estimates remain distinct", () => {
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "observed_statistic",
      evidence_type: "official_document",
      product_use_status: "approved"
    }),
    { basis: "observed", reviewStatus: "canonical" }
  );
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "scenario_assumption",
      evidence_type: "official_document",
      product_use_status: "approved_with_caveat"
    }),
    { basis: "scenario", reviewStatus: "reviewed" }
  );
  assert.deepEqual(
    evidenceClassificationForClaim({
      claim_type: "model_estimate",
      evidence_type: "working_paper",
      product_use_status: "approved_with_caveat"
    }),
    { basis: "model estimate", reviewStatus: "reviewed" }
  );
});
