import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runPipelineSimulation } from "../app.js";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const css = readFileSync(resolve(root, "styles.css"), "utf8");
const js = readFileSync(resolve(root, "app.js"), "utf8");

assert.ok(html.startsWith("<!DOCTYPE html>"), "index.html must start with <!DOCTYPE html>");
assert.ok(html.includes("Nahian Akhtar"), "Portfolio owner name missing");
assert.ok(html.includes("New York, NY"), "Location badge missing");

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
assert.ok(js.length > 1000, "app.js simulator bundle unexpectedly small");

// Headless functional test of live Sparse Top-2 MoE + BM25/Cosine RRF simulator
const r1 = runPipelineSimulation("64-byte cache-line C11 CRC32C telemetry ring", 6.0, 450);
assert.equal(r1.hits.length, 3);
assert.equal(r1.hits[0].id, "rs-c11-ring");
const activeGates = r1.moe.gates.filter((g) => g.active);
assert.equal(activeGates.length, 2);
const weightSum = activeGates.reduce((acc, g) => acc + g.gateWeight, 0);
assert.ok(Math.abs(weightSum - 1.0) < 1e-3, "Top-2 sparse softmax weights must sum to 1.0");

const r2 = runPipelineSimulation("SQLite WAL FTS5 Okapi BM25 cosine Reciprocal Rank Fusion", 8.0, 600);
assert.equal(r2.hits[0].id, "py-sqlite-rrf");

// Measure warm 100-query p50 / p95 client simulator latency
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
      verifiedRepoLinks: requiredRepoLinks.length,
      competencyCards: cardMatches.length,
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
