import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  instantiateWasmRuntime,
  runAbRegressionDiff,
  runP2QuantileExplorer,
  runPipelineSimulation
} from "../app.js";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const js = readFileSync(resolve(root, "app.js"), "utf8");
const readme = readFileSync(resolve(root, "README.md"), "utf8");
const wasmBytes = readFileSync(resolve(root, "assets/polyglot_agent_runtime.wasm"));

assert.ok(html.startsWith("<!DOCTYPE html>"), "index.html must start with <!DOCTYPE html>");
assert.ok(html.includes("Nahian Akhtar"), "Portfolio owner name missing");
assert.ok(html.includes("New York, NY"), "Location badge missing");
assert.ok(html.includes("sim-tab-btn-lab"), "v1.1 A/B RAG Diff & WASM P2 tab missing");

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

// 4. Measure warm 100-query p50 / p95 client simulator latency
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
      version: "1.1.0",
      verifiedRepoLinks: requiredRepoLinks.length,
      competencyCards: cardMatches.length,
      wasmBinaryBytes: wasmBytes.byteLength,
      wasmStateBytes: p2Wasm.stateBytes,
      wasmObsPerSec: p2Wasm.obsPerSec,
      abDiffScenariosVerified: 3,
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
