import assert from "node:assert/strict";
import test from "node:test";

import { evidenceStatusForClaim } from "./evidenceStatus.ts";

test("product-use gates override evidence classification", () => {
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "observed_statistic",
      evidence_type: "dataset",
      product_use_status: "staged"
    }),
    "staged"
  );
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "observed_statistic",
      evidence_type: "dataset",
      product_use_status: "rejected"
    }),
    "missing"
  );
});

test("claim semantics do not collapse caveated claims into observed", () => {
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "official_target",
      evidence_type: "official_document",
      product_use_status: "approved_with_caveat"
    }),
    "official target"
  );
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "hypothesis",
      evidence_type: "derived",
      product_use_status: "approved_with_caveat"
    }),
    "hypothesis"
  );
});

test("observations, official claims, and estimates remain distinct", () => {
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "observed_statistic",
      evidence_type: "official_document",
      product_use_status: "approved"
    }),
    "observed"
  );
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "official_program_claim",
      evidence_type: "official_document",
      product_use_status: "approved_with_caveat"
    }),
    "official claim"
  );
  assert.equal(
    evidenceStatusForClaim({
      claim_type: "model_estimate",
      evidence_type: "working_paper",
      product_use_status: "approved_with_caveat"
    }),
    "model estimate"
  );
});
