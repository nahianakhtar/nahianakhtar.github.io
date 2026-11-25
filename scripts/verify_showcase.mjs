import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  CANONICAL_TRACE_VECTORS,
  CancellationToken,
  ContentAnnotationGuard,
  ElicitationSchemaGuard,
  HumanApprovalRegistry,
  JsonSchema2020Validator,
  MCP_V14_TOOL_CONTRACTS,
  RequestCancellationRegistry,
  SamplingGovernanceGuard,
  StreamableSessionRegistry,
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
  MCP_V15_TOOL_ANNOTATIONS,
  McpCursorCodec,
  ProgressTokenRegistry,
  WorkspaceRootsGuard,
  runMcpV14ContractAndCancellationLab,
  runMcpV15CompletionAndSubscriptionLab,
  runMcpV15CursorLab,
  runMcpV16ProgressLab,
  runMcpV16RootsGuardLab,
  runMcpV17ElicitationSchemaLab,
  runMcpV17SamplingAndApprovalLab,
  runMcpV18ResourceLinkProvenanceLab,
  runMcpV18SessionResumabilityLab,
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
assert.equal(wasmBytes.byteLength, 68842, "v1.8.0 WASM binary must equal 68,842 bytes");
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


// 5C. Headless verification of v1.5 MCP 16B CRC32C Cursor Codec, Completions, Subscriptions & RFC 5424 Logging Lab
assert.ok(html.includes("sim-tab-btn-v15"), "v1.5 MCP Cursor Tamper, Completions & Subscriptions tab missing");
const v15Canon = runMcpV15CursorLab("canonical-valid", { pageSize: 3, flipBit: 37, wasmExports });
assert.equal(v15Canon.engine, "wasm32-unknown-unknown");
assert.equal(v15Canon.canonicalCursor, "Q1ABAjIAAACDkgbjJBoL9w");
assert.equal(v15Canon.canonicalSeal, 0xf70b1a24);
assert.equal(v15Canon.bitFlipRejectedCount, 128, "All 128 single-bit flips must reject with -17");
assert.equal(v15Canon.nonCanonRejectedCount, 15, "All 15 non-canonical trailing sextet mutations must reject with -13");
assert.equal(v15Canon.pagesWalked, 6, "16 resources at pageSize=3 must walk 6 pages");
assert.equal(v15Canon.tracedAuditSlots, 1);

assert.equal(runMcpV15CursorLab("bitflip-seal-tamper", { wasmExports }).activeCode, McpCursorCodec.ERR_SEAL);
assert.equal(runMcpV15CursorLab("cross-scope-replay", { wasmExports }).activeCode, McpCursorCodec.ERR_SCOPE);
assert.equal(runMcpV15CursorLab("snapshot-epoch-drift", { wasmExports }).activeCode, McpCursorCodec.ERR_SNAPSHOT);
assert.equal(runMcpV15CursorLab("noncanonical-b64-tail", { wasmExports }).activeCode, McpCursorCodec.ERR_B64);

const v15Cap = runMcpV15CompletionAndSubscriptionLab({
  target: "resource-115-cap",
  prefix: "spec-",
  logLevel: "warning",
  emitEvents: true
});
assert.equal(v15Cap.completion.values.length, 100, "MCP completion/complete must cap values at <= 100");
assert.equal(v15Cap.completion.total, 115);
assert.equal(v15Cap.completion.hasMore, true);
assert.equal(v15Cap.notifications.length, 2, "Expected 1 subscribed resource update + 1 >=warning log notification");
assert.equal(v15Cap.notifications[0].method, "notifications/resources/updated");
assert.equal(v15Cap.notifications[1].method, "notifications/message");
assert.ok(!JSON.stringify(v15Cap.notifications).includes("sk-proj1234567890"));
assert.ok(!JSON.stringify(v15Cap.notifications).includes("dev@corp.io"));
assert.equal(v15Cap.silencedAfterUnsubscribe, true);

const v15PiiPrompt = runMcpV15CompletionAndSubscriptionLab({
  target: "prompt-runbook-pii",
  prefix: "us-east"
});
assert.ok(!JSON.stringify(v15PiiPrompt.completion.values).includes("ops@corp.io"));
assert.equal(MCP_V15_TOOL_ANNOTATIONS.length, 4);

// 5D. Headless verification of v1.6 Monotonic Progress SSE & RFC 8089 Workspace Roots Guard Lab
assert.ok(html.includes("sim-tab-btn-v16"), "v1.6 Monotonic Progress SSE & RFC 8089 Roots Guard tab missing");
assert.ok(html.includes("sim-pane-v16"), "v1.6 simulator pane missing");
assert.equal(wasmExports.par_progress_table_bytes(), 2112, "WASM ParProgressTable must equal 2,112 bytes");

const v16ProgOk = runMcpV16ProgressLab("monotonic-sse-complete", { steps: 4, maxActive: 16, interleaveSse: true, wasmExports });
assert.equal(v16ProgOk.engine, "wasm32-unknown-unknown");
assert.equal(v16ProgOk.progressTableBytes, 2112);
assert.equal(v16ProgOk.allProbesMatched, true, "All 6 WASM & ES2022 ParProgressTable probes must match bit-for-bit");
assert.equal(v16ProgOk.activeCode, 0);
assert.equal(v16ProgOk.reusedCode, 0);
assert.equal(v16ProgOk.emittedNotifications.length, 4);
assert.ok(v16ProgOk.sseWire.includes('"method":"notifications/progress"'));
assert.ok(!v16ProgOk.sseWire.includes("ops.lead@corp.invalid"), "PII in progress message must be redacted");
assert.equal(v16ProgOk.tracedAuditSlots, 1);

assert.equal(
  runMcpV16ProgressLab("non-monotonic-regression", { wasmExports }).activeCode,
  ProgressTokenRegistry.ERR_PROGRESS_NON_MONOTONIC
);
assert.equal(
  runMcpV16ProgressLab("exceeds-or-mutates-total", { wasmExports }).activeCode,
  ProgressTokenRegistry.ERR_PROGRESS_EXCEEDS_TOTAL
);
assert.equal(
  runMcpV16ProgressLab("duplicate-and-type-isolation", { wasmExports }).activeCode,
  ProgressTokenRegistry.ERR_PROGRESS_DUPLICATE
);
const v16ProgCancel = runMcpV16ProgressLab("cancel-suppresses-post-abort", { wasmExports });
assert.equal(v16ProgCancel.activeCode, ProgressTokenRegistry.ERR_PROGRESS_INACTIVE);
assert.equal(v16ProgCancel.httpStatus, 202);

const v16RootsOk = runMcpV16RootsGuardLab({ preset: "canonical-localhost-inside", wasmExports });
assert.equal(v16RootsOk.engine, "wasm32-unknown-unknown");
assert.equal(v16RootsOk.activeCode, 0);
assert.equal(v16RootsOk.canonicalUri, "file:///workspace/rag/docs/arch-spec.md");
assert.equal(v16RootsOk.wasmMatchedJs, true);
assert.equal(v16RootsOk.allMatrixMatched, true, "All 5 RFC 8089 WASM & ES2022 URI confinement vectors must match");

const v16RootsSibling = runMcpV16RootsGuardLab({ preset: "sibling-prefix-escape", wasmExports });
assert.equal(v16RootsSibling.activeCode, WorkspaceRootsGuard.ERR_URI_OUTSIDE_ROOTS);
assert.equal(v16RootsSibling.jsonRpcCode, -32003);

const v16RootsDotDot = runMcpV16RootsGuardLab({ preset: "dotdot-root-escape", wasmExports });
assert.equal(v16RootsDotDot.activeCode, WorkspaceRootsGuard.ERR_URI_TRAVERSAL);
assert.equal(v16RootsDotDot.jsonRpcCode, -32602);

const v16RootsAuth = runMcpV16RootsGuardLab({ preset: "remote-unc-authority", wasmExports });
assert.equal(v16RootsAuth.activeCode, WorkspaceRootsGuard.ERR_URI_AUTHORITY);
assert.equal(v16RootsAuth.jsonRpcCode, -32602);

const v16RootsSmuggle = runMcpV16RootsGuardLab({ preset: "encoded-slash-null-smuggle", wasmExports });
assert.equal(v16RootsSmuggle.activeCode, WorkspaceRootsGuard.ERR_URI_SYNTAX);
assert.equal(v16RootsSmuggle.jsonRpcCode, -32602);

const v16RootsLockdown = runMcpV16RootsGuardLab({
  preset: "canonical-localhost-inside",
  enforceWhenEmpty: true,
  wasmExports
});
assert.equal(v16RootsLockdown.activeCode, WorkspaceRootsGuard.ERR_URI_OUTSIDE_ROOTS);
assert.equal(v16RootsLockdown.jsonRpcCode, -32003);

// 5E. Headless verification of v1.7 Elicitation Flat-Schema & Sampling HITL Approval Fence Lab + DOM ID Integrity
assert.ok(html.includes("sim-tab-btn-v17"), "v1.7 Elicitation & Sampling HITL tab button missing");
assert.ok(html.includes("sim-pane-v17"), "v1.7 simulator pane missing");
assert.equal(wasmExports.par_approval_table_bytes(), 2112, "WASM ParApprovalTable must equal 2,112 bytes");

const htmlIdList = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
const htmlIdSet = new Set(htmlIdList);
assert.equal(htmlIdSet.size, htmlIdList.length, "Every id attribute in index.html must be unique");
for (const m of js.matchAll(/document\.getElementById\("([^"]+)"\)/g)) {
  assert.ok(htmlIdSet.has(m[1]), `DOM element #${m[1]} referenced in app.js missing from index.html`);
}

const v17SampOk = runMcpV17SamplingAndApprovalLab("governed-accept-and-redact", {
  maxTokens: 256,
  ceilingMaxTokens: 512,
  wasmExports
});
assert.equal(v17SampOk.engine, "wasm32-unknown-unknown");
assert.equal(v17SampOk.approvalTableBytes, 2112);
assert.equal(v17SampOk.allProbesMatched, true, "All 6 WASM & ES2022 ParApprovalTable probes must match bit-for-bit");
assert.equal(v17SampOk.activeCode, 0);
assert.equal(v17SampOk.replayCode, HumanApprovalRegistry.ERR_APPROVAL_INACTIVE);
assert.equal(v17SampOk.jsonRpcCode, 200);
assert.equal(v17SampOk.tracedAuditSlots, 1);
assert.ok(!JSON.stringify(v17SampOk.wire).includes("sk-live1234567890abcdefgh"), "API key in sampling completion must be redacted");
assert.ok(!JSON.stringify(v17SampOk.wire).includes("secretSys999999"), "Bearer secret in sampling prompt must be redacted");

assert.equal(
  runMcpV17SamplingAndApprovalLab("budget-or-priority-breach", { wasmExports }).activeCode,
  SamplingGovernanceGuard.ERR_SAMPLING_BUDGET
);
assert.equal(
  runMcpV17SamplingAndApprovalLab("duplicate-and-type-isolation", { wasmExports }).activeCode,
  HumanApprovalRegistry.ERR_APPROVAL_DUPLICATE
);
assert.equal(
  runMcpV17SamplingAndApprovalLab("ttl-deadline-expired", { wasmExports }).activeCode,
  HumanApprovalRegistry.ERR_APPROVAL_EXPIRED
);
assert.equal(
  runMcpV17SamplingAndApprovalLab("user-declined-or-capability-fence", { wasmExports }).jsonRpcCode,
  -1
);
assert.equal(
  runMcpV17SamplingAndApprovalLab("governed-accept-and-redact", {
    missingClientCapability: true,
    wasmExports
  }).jsonRpcCode,
  -32004
);

const v17ElicitOk = runMcpV17ElicitationSchemaLab("valid-flat-rollout-accept", { wasmExports });
assert.equal(v17ElicitOk.engine, "wasm32-unknown-unknown");
assert.equal(v17ElicitOk.activeCode, 0);
assert.ok(v17ElicitOk.schemaCrc32c > 0);
assert.equal(v17ElicitOk.allMatrixMatched, true, "All 5 elicitation schema security checks must match WASM/ES2022");
assert.ok(!JSON.stringify(v17ElicitOk.wire).includes("sk-proj1234567890abcdefgh"));

assert.equal(
  runMcpV17ElicitationSchemaLab("nested-object-or-array-rejected", { wasmExports }).activeCode,
  ElicitationSchemaGuard.ERR_ELICITATION_SCHEMA
);
assert.equal(
  runMcpV17ElicitationSchemaLab("format-or-additional-prop-breach", { wasmExports }).activeCode,
  ElicitationSchemaGuard.ERR_ELICITATION_SCHEMA
);
assert.equal(
  runMcpV17ElicitationSchemaLab("schema-crc32c-drift", { wasmExports }).activeCode,
  ElicitationSchemaGuard.ERR_ELICITATION_SCHEMA
);
const v17ElicitDecline = runMcpV17ElicitationSchemaLab("decline-cancel-content-guard", { wasmExports });
assert.equal(v17ElicitDecline.declineEmptyCode, 0);
assert.equal(v17ElicitDecline.declineWithContentCode, ElicitationSchemaGuard.ERR_ELICITATION_SCHEMA);

// 5F. Headless verification of v1.8 Mcp-Session-Id SSE Event-Ring Replay & 21B ResourceLink Provenance Seal Lab
assert.ok(html.includes("sim-tab-btn-v18"), "v1.8 Mcp-Session-Id SSE Replay & ResourceLink Seal tab button missing");
assert.ok(html.includes("sim-pane-v18"), "v1.8 simulator pane missing");
assert.equal(wasmExports.par_session_table_bytes(), 2112, "WASM ParSessionTable must equal 2,112 bytes");

const v18SessOk = runMcpV18SessionResumabilityLab("sse-replay-window-resume", {
  ringCapacity: 4,
  totalEvents: 3,
  wasmExports
});
assert.equal(v18SessOk.engine, "wasm32-unknown-unknown");
assert.equal(v18SessOk.sessionTableBytes, 2112);
assert.equal(v18SessOk.allProbesMatched, true, "All 6 WASM & ES2022 ParSessionTable probes must match bit-for-bit");
assert.equal(v18SessOk.activeCode, 0);
assert.equal(v18SessOk.httpStatus, 200);
assert.equal(v18SessOk.replayedCount, 2);
assert.equal(v18SessOk.tracedAuditSlots, 1);

const v18SessTamper = runMcpV18SessionResumabilityLab("sse-replay-window-resume", {
  tamperSeal: true,
  wasmExports
});
assert.equal(v18SessTamper.activeCode, StreamableSessionRegistry.ERR_REPLAY_GAP);
assert.equal(v18SessTamper.httpStatus, 409);

assert.equal(
  runMcpV18SessionResumabilityLab("cross-tenant-binding-hijack", { wasmExports }).activeCode,
  StreamableSessionRegistry.ERR_SESSION_BINDING
);
assert.equal(
  runMcpV18SessionResumabilityLab("evicted-gap-or-tampered-seal", { wasmExports }).activeCode,
  StreamableSessionRegistry.ERR_REPLAY_GAP
);
assert.equal(
  runMcpV18SessionResumabilityLab("delete-204-and-404-terminated", { wasmExports }).activeCode,
  StreamableSessionRegistry.ERR_SESSION_UNKNOWN
);
assert.equal(
  runMcpV18SessionResumabilityLab("ttl-expiry-or-invalid-ascii", { wasmExports }).activeCode,
  StreamableSessionRegistry.ERR_SESSION_EXPIRED
);

const v18ProvOk = runMcpV18ResourceLinkProvenanceLab("canonical-rlnk-seal", { wasmExports });
assert.equal(v18ProvOk.engine, "wasm32-unknown-unknown");
assert.equal(v18ProvOk.activeCode, 0);
assert.equal(v18ProvOk.canonicalSealCrc32c, 0x119980af);
assert.equal(v18ProvOk.canonicalSealHex, "0x119980AF");
assert.equal(v18ProvOk.wire.secondaryVectorArchMcp.sealHex, "0xF28542A7");
assert.equal(v18ProvOk.allMatrixMatched, true, "All 5 WASM & ES2022 ResourceLink / Annotations checks must match");

const v18ProvFile = runMcpV18ResourceLinkProvenanceLab("confined-file-link-redact", { wasmExports });
assert.equal(v18ProvFile.activeCode, 0);
assert.equal(v18ProvFile.wire.uri, "file:///workspace/docs/spec.md");
assert.ok(!JSON.stringify(v18ProvFile.wire).includes("corp.invalid"), "PII email in ResourceLink name must be redacted");

assert.equal(
  runMcpV18ResourceLinkProvenanceLab("non-leap-or-priority-breach", { wasmExports }).activeCode,
  ContentAnnotationGuard.ERR_CONTENT_ANNOTATION
);
assert.equal(
  runMcpV18ResourceLinkProvenanceLab("file-root-escape-blocked", { wasmExports }).activeCode,
  WorkspaceRootsGuard.ERR_URI_OUTSIDE_ROOTS
);
assert.equal(
  runMcpV18ResourceLinkProvenanceLab("canonical-media-base64-guard", { wasmExports }).activeCode,
  0
);

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
      version: "1.8.0",
      wasmSessionTableBytes: v18SessOk.sessionTableBytes,
      v18SessionProbesMatched: v18SessOk.allProbesMatched,
      v18ProvenanceSealHex: v18ProvOk.canonicalSealHex,
      v18ProvenanceMatrixMatched: v18ProvOk.allMatrixMatched,
      wasmApprovalTableBytes: v17SampOk.approvalTableBytes,
      v17SamplingProbesMatched: v17SampOk.allProbesMatched,
      v17ElicitationMatrixMatched: v17ElicitOk.allMatrixMatched,
      wasmProgressTableBytes: v16ProgOk.progressTableBytes,
      v16ProgressProbesMatched: v16ProgOk.allProbesMatched,
      v16RootsVectorsMatched: v16RootsOk.allMatrixMatched,
      v15CanonicalCursor: v15Canon.canonicalCursor,
      v15BitFlipsRejected: v15Canon.bitFlipRejectedCount,
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
