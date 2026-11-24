import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CANONICAL_TRACE_VECTORS,
  CancellationToken,
  JsonSchema2020Validator,
  MCP_V14_TOOL_CONTRACTS,
  RequestCancellationRegistry,
  decodeEmbeddedWasmBytes,
  deriveChildTraceparent,
  dispatchMcpStreamableBatch,
  inspectMcpCitationSpans,
  instantiateWasmRuntime,
  negotiateMcpCapabilities,
  parseW3cTraceparent,
  runAbRegressionDiff,
  runP2QuantileExplorer,
  runPipelineSimulation,
  runTokenBucketAndOtlpInspector,
  runMcpV14ContractAndCancellationLab,
  validateJsonSchema2020Preset,
  verifyCrossLanguageTraceVectors
} from "../app.js";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const js = readFileSync(resolve(root, "app.js"), "utf8");
const readme = readFileSync(resolve(root, "README.md"), "utf8");
const wasmPath = resolve(root, "assets/polyglot_agent_runtime.wasm");
const embeddedWasmBytes = decodeEmbeddedWasmBytes();
const wasmBytes = existsSync(wasmPath) ? readFileSync(wasmPath) : embeddedWasmBytes;
assert.equal(embeddedWasmBytes.byteLength, wasmBytes.byteLength, "Embedded WASM bundle must match .wasm byte length");

assert.ok(html.startsWith("<!DOCTYPE html>"), "index.html must start with <!DOCTYPE html>");
assert.ok(html.includes("Nahian Akhtar"), "Portfolio owner name missing");
assert.ok(html.includes("New York, NY"), "Location badge missing");
assert.ok(html.includes("sim-tab-btn-lab"), "v1.1 A/B RAG Diff & WASM P2 tab missing");
assert.ok(html.includes("sim-tab-btn-v12"), "v1.2 MCP Citation Spans, WASM Token-Bucket & OTLP Waterfall tab missing");
assert.ok(html.includes("sim-tab-btn-v13"), "v1.3 Streamable MCP Batch/SSE & Cross-Lang CRC32C Lineage tab missing");

// Zero-leak repository check
const forbiddenLeakPatterns = [
  /3926\s+NW\s+6th/i,
  /386[-\s.]?292[-\s.]?4290/,
  /nahianakhtar0?2?@/i,
  /\/home\/codexdev\//,
  /C:\\\\?Users\\\\?Subvenyx/i,
  /DESKTOP-[A-Z0-9]+/
];
for (const [name, content] of [
  ["index.html", html],
  ["styles.css", css],
  ["app.js", js],
  ["README.md", readme]
]) {
  for (const rx of forbiddenLeakPatterns) {
    assert.ok(!rx.test(content), `Forbidden local/PII pattern ${rx} found in ${name}`);
  }
}

const requiredRepoLinks = [
  "https://github.com/nahianakhtar/mcp-moe-hybrid-sdk",
  "https://github.com/nahianakhtar/polyglot-agent-runtime-rs",
  "https://github.com/nahianakhtar/fullstack-rag-eval-studio",
  "https://github.com/nahianakhtar/zero-to-code-systems-lab",
  "https://github.com/nahianakhtar/nahianakhtar.github.io"
];
for (const link of requiredRepoLinks) {
  assert.ok(html.includes(link), `Missing required showcase link: ${link}`);
}

const requiredCompetencies = [
  "Systems C/C++/Rust",
  "AI Agents &amp; MCP",
  "Hybrid RAG &amp; Databases",
  "Full-Stack TypeScript/APIs",
  "GPU/CUDA/Vulkan Inference",
  "CI/CD &amp; Deterministic Builds",
  "QA/UIA Verification",
  "Security &amp; Zero-Leak Governance"
];
for (const comp of requiredCompetencies) {
  assert.ok(html.includes(comp), `Missing required competency card: ${comp}`);
}

const cardMatches = html.match(/class="bento-card matrix-card"/g) ?? [];
assert.equal(cardMatches.length, 12, "Competency matrix must contain exactly 12 cards");
assert.ok(css.includes("--bg-base") && css.includes("@media"), "Responsive CSS tokens/media missing");
assert.ok(js.length > 2000, "app.js simulator bundle unexpectedly small");

// 1. Headless functional test of live Sparse Top-2 MoE + BM25/Cosine RRF simulator
const r1 = runPipelineSimulation("64-byte cache-line C11 CRC32C telemetry ring", 6.0, 450);
assert.equal(r1.hits.length, 3);
assert.equal(r1.hits[0].id, "rs-c11-ring");
const activeGates = r1.moe.gates.filter((g) => g.active);
assert.equal(activeGates.length, 2);
const weightSum = activeGates.reduce((acc, g) => acc + g.gateWeight, 0);
assert.ok(Math.abs(weightSum - 1.0) < 1e-3, "Top-2 sparse softmax weights must sum to 1.0");

const r2 = runPipelineSimulation("SQLite WAL FTS5 Okapi BM25 cosine Reciprocal Rank Fusion", 8.0, 600);
assert.equal(r2.hits[0].id, "py-sqlite-rrf");

// 2. Headless verification of v1.1 Pairwise A/B Prompt & Chunking Regression Diff Engine
const diffPass = runAbRegressionDiff("hybrid-rrf-upgrade");
assert.equal(diffPass.passed, true);
assert.equal(diffPass.verdict, "PASS");
assert.equal(diffPass.caseBreakdown.regressed, 0);
assert.ok(diffPass.caseBreakdown.improved >= 3, "Expected >= 3 improved cases on Hybrid RRF upgrade");
assert.ok(diffPass.deltas.recallAtK > 0, "Expected positive Recall@2 delta on Hybrid RRF upgrade");
assert.ok(diffPass.drift.pairedStats.pairedTStat > 1.5, "Expected statistically positive paired t-stat");

const diffChunkFail = runAbRegressionDiff("chunk-window-truncation");
assert.equal(diffChunkFail.passed, false);
assert.equal(diffChunkFail.verdict, "REGRESSION_DETECTED");
assert.ok(diffChunkFail.caseBreakdown.regressed >= 3);
assert.ok(diffChunkFail.drift.meanChunkWordsDelta < -10);

const diffPromptDrift = runAbRegressionDiff("prompt-temp-hallucination");
assert.equal(diffPromptDrift.passed, false);
assert.equal(diffPromptDrift.verdict, "REGRESSION_DETECTED");
assert.equal(diffPromptDrift.drift.meanChunkOverlapJaccard, 1.0, "Identical chunks must yield Jaccard 1.0");
assert.ok(diffPromptDrift.deltas.faithfulness < -0.1, "Hallucinated prompt drift must reduce faithfulness");

// 3. Headless verification of Rust wasm32-unknown-unknown P² Tail-Quantile & CRC32C Explorer
const wasmExports = await instantiateWasmRuntime(wasmBytes);
const p2Wasm = runP2QuantileExplorer({
  distribution: "weyl-uniform",
  sampleCount: 50000,
  tailSpikePct: 0,
  wasmExports
});
const p2Js = runP2QuantileExplorer({
  distribution: "weyl-uniform",
  sampleCount: 50000,
  tailSpikePct: 0,
  wasmExports: null
});
assert.equal(p2Wasm.engine, "wasm32-unknown-unknown");
assert.equal(p2Wasm.stateBytes, 512, "wasm32 P2 suite state must be exact 512 bytes");
assert.equal(p2Wasm.rfc3720Crc32cHex, "0xE3069283", "RFC 3720 CRC32C check failed in WASM");
assert.equal(p2Wasm.frameCrc32cHex, p2Js.frameCrc32cHex, "WASM and JS CRC32C frame seal must match bit-for-bit");
assert.ok(Math.abs(p2Wasm.p95 - p2Js.p95) < 1e-9, "WASM and JS P2 p95 estimates must match");
assert.ok(p2Wasm.relErrorPct.p95 < 1.5, `Expected Weyl p95 relative error < 1.5%, got ${p2Wasm.relErrorPct.p95}%`);
assert.ok(p2Wasm.relErrorPct.p99 < 1.5, `Expected Weyl p99 relative error < 1.5%, got ${p2Wasm.relErrorPct.p99}%`);

// 4. Headless verification of v1.2 MCP 2025-11-25 Citation Spans, WASM 64B Token-Bucket & W3C OTLP Waterfall
const mcpLatest = negotiateMcpCapabilities("2025-11-25");
assert.equal(mcpLatest.negotiatedVersion, "2025-11-25");
assert.equal(mcpLatest.fallbackApplied, false);
assert.equal(mcpLatest.resourcesCount, 14);
const mcpFallback = negotiateMcpCapabilities("2099-01-01");
assert.equal(mcpFallback.negotiatedVersion, "2025-11-25");
assert.equal(mcpFallback.fallbackApplied, true);

const xssCitation = inspectMcpCitationSpans(
  "<script>alert(1)</script> Bearer secretToken999999 Castagnoli CRC32C SQLite FTS5"
);
assert.ok(xssCitation.redactions >= 1, "Expected Bearer token redaction in citation inspector");
assert.ok(!xssCitation.hits[0].highlightedBodyHtml.includes("<script>"), "XSS tag must never appear unescaped");
assert.ok(xssCitation.totalSpans >= 2, "Expected exact character-offset citation spans");
for (const hit of xssCitation.hits) {
  for (const sp of hit.citationSpans) {
    const src = sp.field === "title" ? hit.title : hit.body;
    assert.equal(src.slice(sp.start, sp.end), sp.term, "Citation [start, end) slice must equal exact matched term");
  }
}

assert.equal(parseW3cTraceparent("00-00000000000000000000000000000000-00f067aa0ba902b7-01"), null);
const validTp = parseW3cTraceparent("00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01");
assert.equal(validTp.traceId, "4bf92f3577b34da6a3ce929d0e0e4736");

const v12Wasm = runTokenBucketAndOtlpInspector({
  capacityMilli: 5000,
  refillPerSecMilli: 3333,
  burstRequests: 8,
  costPerReqMilli: 1500,
  stepMs: 120,
  injectTamperBitFlip: false,
  wasmExports
});
const v12Js = runTokenBucketAndOtlpInspector({
  capacityMilli: 5000,
  refillPerSecMilli: 3333,
  burstRequests: 8,
  costPerReqMilli: 1500,
  stepMs: 120,
  injectTamperBitFlip: false,
  wasmExports: null
});
assert.equal(v12Wasm.engine, "wasm32-unknown-unknown");
assert.equal(v12Wasm.bucketStateBytes, 64, "WASM ParTokenBucket must equal exact 64B cache line");
assert.equal(v12Wasm.auditSlotBytes, 256, "WASM CapabilityAuditRing slot must equal exact 256B");
assert.equal(v12Wasm.zeroFloatDriftVerified, true, "1000x1ms prime refill must conserve exact 3333 milli-tokens");
assert.equal(v12Wasm.allowedCount, v12Js.allowedCount, "WASM and BigInt token-bucket allowed count must match");
assert.equal(v12Wasm.deniedCount, v12Js.deniedCount, "WASM and BigInt token-bucket denied count must match");
assert.equal(v12Wasm.remainingMilli, v12Js.remainingMilli, "WASM and BigInt remaining milli-tokens must match");
assert.equal(v12Wasm.nextRetryAfterNs, v12Js.nextRetryAfterNs, "WASM and BigInt ceiling retry_after_ns must match");
assert.equal(v12Wasm.auditVerifyCode, 8, "All 8 CapabilityAuditRing slots must pass CRC32C verification");
assert.equal(v12Wasm.waterfallSpans.length, 6, "OTLP waterfall must contain root + 5 child spans");
assert.equal(
  v12Wasm.otlpPayload.resourceSpans[0].scopeSpans[0].spans[0].traceId,
  "4bf92f3577b34da6a3ce929d0e0e4736"
);

const v12Tamper = runTokenBucketAndOtlpInspector({
  burstRequests: 6,
  injectTamperBitFlip: true,
  wasmExports
});
assert.equal(v12Tamper.tamperDetected, true, "1-bit payload flip in WASM audit ring must trigger -8 CRC32C");
assert.equal(v12Tamper.auditVerifyCode, -8);

// 5. Headless verification of v1.3 Streamable MCP Batch/SSE & Cross-Language W3C CRC32C Lineage
assert.equal(wasmBytes.byteLength, 41925, "v1.3.0 WASM binary must equal 41,925 bytes");
assert.equal(wasmExports.par_trace_context_bytes(), 32, "WASM ParTraceContext must equal 32 bytes");

const vecWasm = verifyCrossLanguageTraceVectors({ wasmExports });
const vecJs = verifyCrossLanguageTraceVectors({ wasmExports: null });
assert.equal(vecWasm.engine, "wasm32-unknown-unknown");
assert.equal(vecWasm.allMatched, true, "All 3 canonical C11/Rust/WASM/Python/Node traceparent vectors must match");
assert.equal(vecJs.allMatched, true, "ES2022 CRC32C child-span mirror must match all 3 canonical vectors");
assert.equal(CANONICAL_TRACE_VECTORS.length, 3);
assert.equal(deriveChildTraceparent("00-4BF92F3577B34DA6A3CE929D0E0E4736-00f067aa0ba902b7-01", { wasmExports }), null);
assert.equal(deriveChildTraceparent("00-00000000000000000000000000000000-00f067aa0ba902b7-01", { wasmExports }), null);

const batchMixed = dispatchMcpStreamableBatch("mixed-pipeline-batch", {
  acceptSse: true,
  wasmExports
});
assert.equal(batchMixed.engine, "wasm32-unknown-unknown");
assert.equal(batchMixed.httpStatus, 200);
assert.equal(batchMixed.inboundCount, 5);
assert.equal(batchMixed.notificationsElided, 1);
assert.equal(batchMixed.responseCount, 4);
assert.equal(batchMixed.tracedAuditCorrelatedSlots, 4);
assert.ok(batchMixed.redactionsTotal >= 1, "Expected Bearer secret redaction inside batch tool call");
assert.ok(batchMixed.sseWire.includes("event: message\ndata: "), "Expected SSE framing when acceptSse=true");

const batchTampered = dispatchMcpStreamableBatch("mixed-pipeline-batch", {
  injectTracedTamper: true,
  wasmExports
});
assert.equal(batchTampered.tamperDetected, true);
assert.equal(batchTampered.tracedAuditCorrelatedSlots, -8);

const batch202 = dispatchMcpStreamableBatch("notifications-only-202", { wasmExports });
assert.equal(batch202.httpStatus, 202);
assert.equal(batch202.body, null);
assert.equal(batch202.notificationsElided, 2);

const batch400 = dispatchMcpStreamableBatch("oversized-batch-dos-guard", { maxBatchSize: 8, wasmExports });
assert.equal(batch400.httpStatus, 400);
assert.equal(batch400.body.error.code, -32600);

const batch429 = dispatchMcpStreamableBatch("ratelimit-429-burst", { windowTokenBudget: 1200, wasmExports });
assert.equal(batch429.httpStatus, 429);
assert.equal(batch429.body.error.code, -32029);
assert.ok(Number(batch429.headers["Retry-After"]) >= 1);

// 5B. Headless verification of v1.4 JSON-Schema Draft 2020-12 & Cooperative Cancellation Lab
assert.ok(html.includes("sim-tab-btn-v14"), "v1.4 JSON-Schema 2020-12 & Cancellation tab missing");
assert.equal(
  JsonSchema2020Validator.isValid(true, { type: "integer" }),
  false,
  "Draft 2020-12 must never accept boolean true as integer"
);
assert.equal(
  JsonSchema2020Validator.isValid(true, { type: "number" }),
  false,
  "Draft 2020-12 must never accept boolean true as number"
);
assert.equal(
  JsonSchema2020Validator.isValid([0.12, 0.42, 0.68], {
    type: "array",
    prefixItems: [{ type: "number" }, { type: "number" }, { type: "number" }],
    items: false
  }),
  true
);
assert.equal(
  JsonSchema2020Validator.isValid([0.12, 0.42, 0.68, 1.5], {
    type: "array",
    prefixItems: [{ type: "number" }, { type: "number" }, { type: "number" }],
    items: false
  }),
  false,
  "prefixItems + items:false closed tuple must reject 4th element"
);

const presetValid = validateJsonSchema2020Preset("valid-rag-structured-output");
assert.equal(presetValid.valid, true);
const presetBoolInvalid = validateJsonSchema2020Preset("invalid-bool-as-integer");
assert.equal(presetBoolInvalid.valid, false);
assert.equal(presetBoolInvalid.violations[0].keyword, "type");
const presetTupleInvalid = validateJsonSchema2020Preset("invalid-tuple-overflow");
assert.equal(presetTupleInvalid.valid, false);
assert.equal(presetTupleInvalid.violations[0].keyword, "items");
const presetOneOfInvalid = validateJsonSchema2020Preset("invalid-oneof-collision");
assert.equal(presetOneOfInvalid.valid, false);
assert.equal(presetOneOfInvalid.violations[0].keyword, "oneOf");

let fakeClock = 1000;
const cancelReg = new RequestCancellationRegistry({
  maxTombstones: 4,
  tombstoneTtlMs: 5000,
  nowFn: () => fakeClock
});
assert.equal(cancelReg.cancel("42", "Bearer secretTok123456789 cancel string").status, "recorded_prearrival_tombstone");
const int42Tok = cancelReg.begin(42);
assert.equal(int42Tok.isCancelled, false, "String '42' tombstone must not cancel integer 42");
const str42Tok = cancelReg.begin("42");
assert.equal(str42Tok.isCancelled, true, "String '42' tombstone must cancel string '42'");
assert.ok(!str42Tok.reason.includes("secretTok123456789"), "Cancellation reason must scrub Bearer token");
cancelReg.finish(42, int42Tok);

cancelReg.cancel(1, "Try cancel initialize");
const initTok = cancelReg.begin(1, { nonCancellable: true });
assert.equal(initTok.isCancelled, false, "initialize nonCancellable token must ignore tombstone");
assert.equal(cancelReg.cancel(1, "In-flight cancel initialize").status, "non_cancellable");
cancelReg.finish(1, initTok);
assert.equal(cancelReg.snapshot().ignoredNonCancellable, 2);

const v14Batch = runMcpV14ContractAndCancellationLab("structured-output-and-batch-cancel", { wasmExports });
assert.equal(v14Batch.engine, "wasm32-unknown-unknown");
assert.equal(v14Batch.httpStatus, 200);
assert.equal(v14Batch.notificationsElided, 1);
assert.equal(v14Batch.cancelledElided, 1);
assert.equal(v14Batch.responseCount, 2);
assert.equal(v14Batch.structuredOutputsValidated, 1);
assert.ok(v14Batch.body[1].result.structuredContent.primaryExpert.length > 2);
assert.equal(v14Batch.tracedAuditCorrelatedSlots, 3);

const v14Tombstone202 = runMcpV14ContractAndCancellationLab("prearrival-tombstone-202-abort", { wasmExports });
assert.equal(v14Tombstone202.httpStatus, 202);
assert.equal(v14Tombstone202.body, null);
assert.equal(v14Tombstone202.cancelledElided, 1);

const v14Immunity = runMcpV14ContractAndCancellationLab("initialize-immunity-and-id-isolation", { wasmExports });
assert.equal(v14Immunity.httpStatus, 200);
assert.equal(v14Immunity.responseCount, 2, "Expected initialize(1) and integer(42) to succeed while string('42') is elided");
assert.equal(v14Immunity.cancelledElided, 1);
assert.equal(v14Immunity.registrySnapshot.ignoredNonCancellable, 1);

const v14Breach = runMcpV14ContractAndCancellationLab("input-32602-and-output-32603-breach", { wasmExports });
assert.equal(v14Breach.httpStatus, 200);
assert.equal(v14Breach.inputSchemaRejections, 1);
assert.equal(v14Breach.outputSchemaBreaches, 1);
assert.equal(v14Breach.body[0].error.code, -32602);
assert.equal(v14Breach.body[1].error.code, -32603);

// 6. Measure warm 100-query p50 / p95 client simulator latency
const simLatencies = [];
const sampleQueries = [
  "64-byte cache-line C11 CRC32C telemetry ring",
  "SQLite WAL FTS5 Okapi BM25 cosine Reciprocal Rank Fusion",
  "Node 22 SSE token streaming and sliding-window circuit breaker",
  "Sparse Top-2 MoE quantized GPU VRAM routing",
  "Deterministic IEEE-754 Black-Scholes convexity solver"
];
for (let w = 0; w < 25; w += 1) {
  runPipelineSimulation(sampleQueries[w % sampleQueries.length], 6.0, 450);
}
for (let i = 0; i < 100; i += 1) {
  const out = runPipelineSimulation(sampleQueries[i % sampleQueries.length], 6.0 + (i % 8), 450);
  simLatencies.push(out.elapsedMs);
}
simLatencies.sort((a, b) => a - b);
const p50SimMs = simLatencies[49];
const p95SimMs = simLatencies[94];
assert.ok(p95SimMs < 5.0, `Expected p95 < 5.0ms under parallel CI load, got ${p95SimMs}ms`);

console.log(
  JSON.stringify(
    {
      site: "nahianakhtar.github.io",
      version: "1.4.0",
      v14StructuredValidated: v14Batch.structuredOutputsValidated,
      v14CancelledElided: v14Batch.cancelledElided,
      wasmTraceContextBytes: vecWasm.traceContextBytes,
      crossLangTraceVectorsMatched: vecWasm.vectors.length,
      v13BatchCorrelatedSlots: batchMixed.tracedAuditCorrelatedSlots,
      verifiedRepoLinks: requiredRepoLinks.length,
      competencyCards: cardMatches.length,
      wasmBinaryBytes: wasmBytes.byteLength,
      wasmStateBytes: p2Wasm.stateBytes,
      wasmBucketStateBytes: v12Wasm.bucketStateBytes,
      wasmAuditSlotBytes: v12Wasm.auditSlotBytes,
      wasmObsPerSec: p2Wasm.obsPerSec,
      abDiffScenariosVerified: 3,
      v12WaterfallSpans: v12Wasm.waterfallSpans.length,
      sim100QueriesP50Ms: p50SimMs,
      sim100QueriesP95Ms: p95SimMs,
      topHitRustQuery: r1.hits[0].id,
      topHitRagQuery: r2.hits[0].id,
      ok: true
    },
    null,
    2
  )
);
