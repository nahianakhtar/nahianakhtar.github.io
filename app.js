/**
 * Client-Side Sparse Top-2 MoE Router + Okapi BM25 & 256-dim Cosine RRF Engine
 * + v1.1 Pairwise A/B RAG Regression Diff Studio & Rust wasm32 P² Tail-Quantile Explorer
 * + v1.2 MCP 2025-11-25 Citation-Span, C11/WASM 64B Token-Bucket & W3C OTLP Trace Waterfall Inspector
 * Zero external API keys · Zero runtime dependencies · Deterministic ES2022 + WebAssembly
 */

export const CORPUS = [
  {
    id: "rs-c11-ring",
    repo: "polyglot-agent-runtime-rs",
    title: "64-Byte Cache-Line C11 CRC32C Ring Telemetry Vault",
    tags: ["rust", "c11", "ffi", "crc32c", "cache", "ring", "telemetry"],
    body: "ParRingSlotHeader aligns strictly to 64-byte cache lines via C11 _Alignas(64) and Rust #[repr(C, align(64))], sealing headers and payloads with Castagnoli CRC32C at 2.94M ops/sec (0.38us p95) and zero heap allocations."
  },
  {
    id: "rs-dag-breaker",
    repo: "polyglot-agent-runtime-rs",
    title: "Capability-Fenced Topological DAG & Circuit Breaker",
    tags: ["rust", "dag", "topological", "capability", "breaker", "orchestrator"],
    body: "Preflight bitmask capability checks gate task execution before deterministic BTreeSet Kahn topological ordering, bounded exponential retries, and Closed/Open/Half-Open circuit recovery at 432.9K DAGs/sec."
  },
  {
    id: "rs-p2-quantiles",
    repo: "polyglot-agent-runtime-rs",
    title: "Streaming Jain-Chlamtac P2 Tail-Latency Quantiles (Native & WASM)",
    tags: ["quantiles", "p95", "p99", "streaming", "telemetry", "latency", "wasm"],
    body: "Tracks p50, p95, and p99 tail latencies dynamically using five piecewise-parabolic markers in exact 560-byte native / 512-byte wasm32 O(1) constant state at up to 38.01M observations/sec."
  },
  {
    id: "py-mcp-protocol",
    repo: "mcp-moe-hybrid-sdk",
    title: "Model Context Protocol (MCP 2025-11-25) JSON-RPC 2.0 Server",
    tags: ["mcp", "jsonrpc", "python", "agents", "tools", "protocol", "otlp"],
    body: "Implements MCP 2025-11-25 initialize, tools/list, and tools/call dispatch over loopback-safe HTTP with deterministic secret/Bearer/PII scrubbing and OTLP/JSON telemetry spans."
  },
  {
    id: "py-sqlite-rrf",
    repo: "mcp-moe-hybrid-sdk",
    title: "SQLite WAL FTS5 Okapi BM25 + Dense Cosine RRF Hybrid RAG",
    tags: ["sqlite", "wal", "fts5", "bm25", "cosine", "rrf", "rag", "hybrid"],
    body: "Combines exact lexical Okapi BM25 scores from SQLite FTS5 with 256-dim L2-normalized n-gram cosine similarity via Reciprocal Rank Fusion (k=60), achieving 100% Recall@1 at 0.466ms p95."
  },
  {
    id: "py-moe-router",
    repo: "mcp-moe-hybrid-sdk",
    title: "Hardware- & SLA-Aware Sparse Top-2 Mixture-of-Experts Router",
    tags: ["moe", "gpu", "cuda", "vulkan", "vram", "quantized", "routing", "kv"],
    body: "Evaluates domain affinities under active GPU VRAM caps and p95 latency SLAs, applying sparse Top-2 softmax renormalization across quantized GGUF and CPU-offloaded expert tiers in 0.0122ms p95."
  },
  {
    id: "ts-sse-gateway",
    repo: "fullstack-rag-eval-studio",
    title: "Node.js 22 Zero-Dependency HTTP & SSE Token Streaming Gateway",
    tags: ["typescript", "node", "sse", "streaming", "http", "api", "esm"],
    body: "Streams route, context, token delta, and live cache/breaker telemetry frames over text/event-stream alongside REST /health, /v1/evaluate, and /v1/diff endpoints with strict .d.ts contracts."
  },
  {
    id: "ts-schema-redactor",
    repo: "fullstack-rag-eval-studio",
    title: "Recursive JSON-Schema Tool Validator & Zero-Leak PII Scrubber",
    tags: ["schema", "validation", "security", "pii", "redaction", "governance"],
    body: "Enforces required properties, enum bounds, numeric ranges, and additionalProperties=false while scrubbing API keys, Bearer tokens, SSNs, and email patterns before downstream execution."
  },
  {
    id: "ts-token-breaker",
    repo: "fullstack-rag-eval-studio",
    title: "Sliding-Window Token & USD Budget Circuit Breaker",
    tags: ["token", "budget", "cost", "breaker", "fallback", "sla"],
    body: "Governs rolling token and USD spend windows, automatically shifting traffic from frontier dense models to compact sparse fallback tiers at soft budget thresholds."
  },
  {
    id: "ts-golden-eval",
    repo: "fullstack-rag-eval-studio",
    title: "Golden RAG Evaluator & Pairwise A/B Regression Diff CLI",
    tags: ["eval", "faithfulness", "precision", "recall", "rag", "benchmark", "diff"],
    body: "Scores claim-level faithfulness entailment, AP@K, Recall@K, chunk Jaccard overlap, cosine answer drift, and paired t-statistics at 7,623.5 cases/sec with configurable CI quality gates."
  },
  {
    id: "quant-ieee-solvers",
    repo: "mcp-moe-hybrid-sdk",
    title: "Deterministic IEEE-754 & Exact Decimal Quantitative Solvers",
    tags: ["quant", "black-scholes", "convexity", "ieee754", "math", "pricing"],
    body: "Routes option convexity, DCF/NPV, and numerical boundary checks to audited deterministic solvers rather than free-form LLM approximation."
  },
  {
    id: "qa-uia-ci",
    repo: "nahianakhtar.github.io",
    title: "Accessibility-Tree UIA Verification & Reproducible CI Pipelines",
    tags: ["qa", "uia", "ci", "docker", "accessibility", "verification"],
    body: "Validates UI accessibility trees, ephemeral HTTP/SSE lifecycles, strict compiler warnings-as-errors, and zero-leak repository invariants on every commit."
  }
];

export const EXPERTS = [
  {
    id: "exp-systems-kernel",
    name: "Expert 0 · Deterministic Systems & Quant Kernel",
    minVramGib: 0.5,
    estP95Ms: 45,
    keywords: ["c11", "ffi", "rust", "crc32c", "cache", "ring", "dag", "quantiles", "p95", "p99", "wasm", "black-scholes", "convexity", "ieee754", "math"]
  },
  {
    id: "exp-vulkan-dense",
    name: "Expert 1 · Compact Dense Vulkan Tier (<= 5.2 GiB)",
    minVramGib: 4.0,
    estP95Ms: 180,
    keywords: ["sse", "stream", "node", "typescript", "schema", "pii", "token", "cache", "http", "api", "uia", "ci", "diff"]
  },
  {
    id: "exp-cuda-hybrid-moe",
    name: "Expert 2 · Sparse MoE CUDA + CPU Expert Offload",
    minVramGib: 6.0,
    estP95Ms: 380,
    keywords: ["moe", "gpu", "cuda", "vulkan", "vram", "kv", "q8_0", "rag", "bm25", "cosine", "rrf", "sqlite", "fts5", "mcp"]
  },
  {
    id: "exp-deep-verifier",
    name: "Expert 3 · Deep Multi-Hop Synthesis & Eval Verifier",
    minVramGib: 12.0,
    estP95Ms: 820,
    keywords: ["eval", "faithfulness", "precision", "recall", "architecture", "prove", "theorem", "synthesis", "security"]
  }
];

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "how", "in",
  "into", "is", "it", "its", "of", "on", "or", "that", "the", "their", "this", "to",
  "using", "via", "was", "were", "with"
]);

const REDACT_RULES = [
  { re: /Bearer\s+[A-Za-z0-9._\-+/=]{8,}/gi, replacement: "Bearer [REDACTED]" },
  { re: /\b(?:sk|rk|pk)-[A-Za-z0-9_\-]{10,}\b/g, replacement: "[REDACTED_KEY]" },
  { re: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g, replacement: "[REDACTED_EMAIL]" },
  { re: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: "[REDACTED_SSN]" }
];

export function redactQuery(raw) {
  let text = String(raw ?? "");
  let redactions = 0;
  for (const { re, replacement } of REDACT_RULES) {
    text = text.replace(re, () => {
      redactions += 1;
      return replacement;
    });
  }
  return { cleanQuery: text, redactions };
}

export function tokenize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9_\-\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

export function embed256(text) {
  const vec = new Float64Array(256);
  const norm = String(text ?? "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
  if (!norm) return vec;

  const toks = tokenize(norm);
  const feats = [];
  for (const tok of toks) {
    feats.push(`w:${tok}`);
  }
  const compact = norm.replace(/\s+/g, "_");
  for (let i = 0; i + 3 <= compact.length; i += 1) {
    feats.push(`c:${compact.slice(i, i + 3)}`);
  }

  for (const f of feats) {
    let h = 2166136261;
    for (let i = 0; i < f.length; i += 1) {
      h ^= f.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = (h >>> 0) % 256;
    const sign = (h & 1) === 0 ? 1.0 : -1.0;
    vec[idx] += sign * (f.startsWith("w:") ? 2.1 : 0.6);
  }

  let mag = 0;
  for (let i = 0; i < 256; i += 1) mag += vec[i] * vec[i];
  if (mag > 0) {
    const inv = 1 / Math.sqrt(mag);
    for (let i = 0; i < 256; i += 1) vec[i] *= inv;
  }
  return vec;
}

function cosine(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i += 1) s += a[i] * b[i];
  return s;
}

// Precompute document BM25 statistics & dense n-gram vectors once at module load
const PREPARED_DOCS = (() => {
  const docs = CORPUS.map((doc) => {
    const fullText = `${doc.title} ${doc.tags.join(" ")} ${doc.body}`;
    const tokens = tokenize(fullText);
    const tf = new Map();
    for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { ...doc, tokens, len: tokens.length, tf, vec: embed256(fullText) };
  });

  const df = new Map();
  let totalLen = 0;
  for (const d of docs) {
    totalLen += d.len;
    for (const term of d.tf.keys()) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }
  return { docs, df, avgLen: totalLen / docs.length };
})();

export function routeSparseTop2(query, vramBudgetGib = 6.0, slaMs = 450) {
  const qLower = String(query ?? "").toLowerCase();
  const qTokens = tokenize(qLower);

  const rawScores = EXPERTS.map((exp) => {
    let score = 1.0;
    for (const kw of exp.keywords) {
      if (qLower.includes(kw)) score += 1.65;
    }
    for (const qt of qTokens) {
      if (exp.keywords.some((kw) => kw.startsWith(qt) || qt.startsWith(kw))) {
        score += 0.55;
      }
    }
    const vramFeasible = exp.minVramGib <= vramBudgetGib;
    const slaFeasible = exp.estP95Ms <= slaMs;
    if (!vramFeasible) score -= 3.2;
    if (!slaFeasible) score -= 2.1;
    return { expert: exp, logit: score, vramFeasible, slaFeasible };
  });

  const ranked = [...rawScores].sort((a, b) => b.logit - a.logit);
  const top2Ids = new Set([ranked[0].expert.id, ranked[1].expert.id]);
  const maxLogit = Math.max(ranked[0].logit, ranked[1].logit);
  const e0 = Math.exp(ranked[0].logit - maxLogit);
  const e1 = Math.exp(ranked[1].logit - maxLogit);
  const denom = e0 + e1;

  const weightMap = new Map([
    [ranked[0].expert.id, e0 / denom],
    [ranked[1].expert.id, e1 / denom]
  ]);

  const gates = rawScores.map((item) => ({
    id: item.expert.id,
    name: item.expert.name,
    minVramGib: item.expert.minVramGib,
    estP95Ms: item.expert.estP95Ms,
    vramFeasible: item.vramFeasible,
    slaFeasible: item.slaFeasible,
    active: top2Ids.has(item.expert.id),
    gateWeight: Number((weightMap.get(item.expert.id) ?? 0).toFixed(4))
  }));

  return {
    primaryExpert: ranked[0].expert.name,
    secondaryExpert: ranked[1].expert.name,
    gates
  };
}

export function searchHybridRrf(query, topK = 3, rrfK = 60) {
  const qTokens = tokenize(query);
  const qVec = embed256(query);
  const { docs, df, avgLen } = PREPARED_DOCS;
  const N = docs.length;
  const k1 = 1.5;
  const b = 0.75;

  const scored = docs.map((doc) => {
    let bm25 = 0;
    for (const term of qTokens) {
      const f = doc.tf.get(term) ?? 0;
      if (f === 0) continue;
      const nQi = df.get(term) ?? 0;
      const idf = Math.log(1 + (N - nQi + 0.5) / (nQi + 0.5));
      const num = f * (k1 + 1);
      const den = f + k1 * (1 - b + b * (doc.len / avgLen));
      bm25 += idf * (num / den);
    }
    const cos = Math.max(0, cosine(qVec, doc.vec));
    return { doc, bm25, cos };
  });

  const byBm25 = [...scored].sort((a, b) => b.bm25 - a.bm25);
  const byCos = [...scored].sort((a, b) => b.cos - a.cos);

  const bm25Rank = new Map();
  const cosRank = new Map();
  byBm25.forEach((item, idx) => bm25Rank.set(item.doc.id, idx + 1));
  byCos.forEach((item, idx) => cosRank.set(item.doc.id, idx + 1));

  const fused = scored
    .map((item) => {
      const rB = bm25Rank.get(item.doc.id);
      const rC = cosRank.get(item.doc.id);
      const rrfScore = 1 / (rrfK + rB) + 1 / (rrfK + rC);
      return {
        id: item.doc.id,
        repo: item.doc.repo,
        title: item.doc.title,
        body: item.doc.body,
        bm25: Number(item.bm25.toFixed(3)),
        cosine: Number(item.cos.toFixed(3)),
        rrf: Number(rrfScore.toFixed(5))
      };
    })
    .sort((a, b) => b.rrf - a.rrf || b.bm25 - a.bm25);

  return fused.slice(0, topK);
}

export function runPipelineSimulation(rawQuery, vramGib = 6.0, slaMs = 450) {
  const t0 = performance.now();
  const { cleanQuery, redactions } = redactQuery(rawQuery);
  const moe = routeSparseTop2(cleanQuery, vramGib, slaMs);
  const hits = searchHybridRrf(cleanQuery, 3, 60);
  const elapsedMs = Number((performance.now() - t0).toFixed(3));
  return { cleanQuery, redactions, moe, hits, elapsedMs };
}

// ============================================================================
// Increment v1.1 Part A: Pairwise A/B Prompt & Chunking Regression Diff Engine
// Mirrors `fullstack-rag-eval-studio` v1.1.0 GoldenEvalRunner + RegressionDiffAnalyzer
// ============================================================================

function normalizeWords(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((tok) => tok.length >= 2 && !STOPWORDS.has(tok));
}

export function evaluateGoldenCase(item, topK = 2) {
  const topDocs = (item.retrievedDocs ?? []).slice(0, topK);
  const relevantSet = new Set(item.relevantDocIds ?? []);

  let hits = 0;
  for (const doc of topDocs) {
    if (relevantSet.has(doc.id)) hits += 1;
  }
  const recallAtK = relevantSet.size === 0 ? 1.0 : hits / relevantSet.size;

  let relevantSeen = 0;
  let precisionAccum = 0.0;
  topDocs.forEach((doc, idx) => {
    if (relevantSet.has(doc.id)) {
      relevantSeen += 1;
      precisionAccum += relevantSeen / (idx + 1);
    }
  });
  const denom = Math.min(relevantSet.size, topDocs.length);
  const contextPrecision = relevantSeen === 0 || denom === 0 ? 0.0 : precisionAccum / relevantSeen;

  const contextTokenSet = new Set(normalizeWords(topDocs.map((d) => d.text).join(" ")));
  const sentences = String(item.generatedAnswer ?? "")
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  let faithfulness = 0.0;
  if (sentences.length > 0) {
    let supported = 0;
    for (const sentence of sentences) {
      const words = normalizeWords(sentence);
      if (words.length === 0) {
        supported += 1;
        continue;
      }
      let grounded = 0;
      for (const w of words) {
        if (contextTokenSet.has(w)) grounded += 1;
      }
      if (grounded / words.length >= 0.6) supported += 1;
    }
    faithfulness = supported / sentences.length;
  }

  return {
    id: item.id,
    faithfulness: Number(faithfulness.toFixed(4)),
    contextPrecision: Number(contextPrecision.toFixed(4)),
    recallAtK: Number(recallAtK.toFixed(4))
  };
}

function chunkIdJaccard(baseDocs, candDocs, topK) {
  const setA = new Set((baseDocs ?? []).slice(0, topK).map((d) => d.id));
  const setB = new Set((candDocs ?? []).slice(0, topK).map((d) => d.id));
  if (setA.size === 0 && setB.size === 0) return 1.0;
  let inter = 0;
  for (const id of setA) {
    if (setB.has(id)) inter += 1;
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 1.0 : inter / union;
}

function meanChunkWords(docs, topK) {
  const slice = (docs ?? []).slice(0, topK);
  if (slice.length === 0) return 0;
  let total = 0;
  for (const d of slice) {
    const clean = String(d.text ?? "").trim();
    total += clean ? clean.split(/\s+/).length : 0;
  }
  return total / slice.length;
}

function computePairedStats(deltas) {
  const n = deltas.length;
  if (n === 0) {
    return { meanDelta: 0, stdDevDelta: 0, cohensD: 0, pairedTStat: 0, winRate: 0 };
  }
  const mean = deltas.reduce((a, b) => a + b, 0) / n;
  let sqSum = 0;
  let wins = 0;
  let nonTies = 0;
  for (const d of deltas) {
    sqSum += (d - mean) * (d - mean);
    if (Math.abs(d) > 1e-6) {
      nonTies += 1;
      if (d > 1e-6) wins += 1;
    }
  }
  const variance = n > 1 ? sqSum / (n - 1) : 0;
  const stdDev = Math.sqrt(variance);
  const cohensD = stdDev > 1e-9 ? mean / stdDev : (Math.abs(mean) > 1e-9 ? Math.sign(mean) * 99.0 : 0);
  const pairedTStat = stdDev > 1e-9 && n > 1 ? mean / (stdDev / Math.sqrt(n)) : 0;
  const winRate = nonTies === 0 ? 0.5 : wins / nonTies;
  return {
    meanDelta: Number(mean.toFixed(4)),
    stdDevDelta: Number(stdDev.toFixed(4)),
    cohensD: Number(cohensD.toFixed(4)),
    pairedTStat: Number(pairedTStat.toFixed(4)),
    winRate: Number(winRate.toFixed(4))
  };
}

const DOC_MAP = new Map(
  CORPUS.map((d) => [d.id, { id: d.id, text: `${d.title}. ${d.body}` }])
);

function pickDoc(id, truncateWords = null) {
  const raw = DOC_MAP.get(id) ?? { id, text: "" };
  if (typeof truncateWords === "number" && truncateWords > 0) {
    const words = raw.text.split(/\s+/).slice(0, truncateWords).join(" ");
    return { id: raw.id, text: words };
  }
  return { id: raw.id, text: raw.text };
}

const GOLDEN_BASE_CASES = [
  {
    id: "case-01-ring-crc32c",
    relevantDocIds: ["rs-c11-ring"],
    baseDocs: [pickDoc("rs-c11-ring"), pickDoc("rs-p2-quantiles")],
    baseAnswer: "ParRingSlotHeader aligns to 64-byte cache lines and seals payloads with Castagnoli CRC32C at zero heap allocations."
  },
  {
    id: "case-02-dag-fences",
    relevantDocIds: ["rs-dag-breaker"],
    baseDocs: [pickDoc("rs-dag-breaker"), pickDoc("py-mcp-protocol")],
    baseAnswer: "Preflight bitmask capability checks gate task execution before deterministic Kahn topological ordering and circuit recovery."
  },
  {
    id: "case-03-p2-tail",
    relevantDocIds: ["rs-p2-quantiles"],
    baseDocs: [pickDoc("rs-c11-ring"), pickDoc("rs-p2-quantiles")],
    baseAnswer: "Tracks p50, p95, and p99 tail latencies using five piecewise-parabolic markers in constant O(1) state."
  },
  {
    id: "case-04-hybrid-rrf",
    relevantDocIds: ["py-sqlite-rrf", "ts-golden-eval"],
    baseDocs: [pickDoc("py-sqlite-rrf"), pickDoc("py-mcp-protocol")],
    baseAnswer: "Combines exact lexical Okapi BM25 scores from SQLite FTS5 with n-gram cosine similarity via Reciprocal Rank Fusion."
  },
  {
    id: "case-05-sparse-moe",
    relevantDocIds: ["py-moe-router"],
    baseDocs: [pickDoc("ts-token-breaker"), pickDoc("py-moe-router")],
    baseAnswer: "Evaluates domain affinities under active GPU VRAM caps and p95 latency SLAs using sparse Top-2 softmax renormalization."
  },
  {
    id: "case-06-sse-schema",
    relevantDocIds: ["ts-sse-gateway", "ts-schema-redactor"],
    baseDocs: [pickDoc("ts-sse-gateway"), pickDoc("qa-uia-ci")],
    baseAnswer: "Streams route, context, and token delta frames over text/event-stream alongside REST evaluate and diff endpoints."
  }
];

export const AB_DIFF_SCENARIOS = {
  "hybrid-rrf-upgrade": {
    id: "hybrid-rrf-upgrade",
    label: "A/B #1 · Lexical BM25 -> Hybrid BM25 + Cosine RRF (k=60) [CI PASS]",
    summary: "Candidate upgrades ranker from lexical-only BM25 to Reciprocal Rank Fusion (k=60), promoting semantic matches to rank #1 and recovering multi-hop recall.",
    topK: 2,
    baseline: GOLDEN_BASE_CASES.map((c) => ({
      id: c.id,
      relevantDocIds: c.relevantDocIds,
      retrievedDocs: c.baseDocs,
      generatedAnswer: c.baseAnswer
    })),
    candidate: [
      {
        id: "case-01-ring-crc32c",
        relevantDocIds: ["rs-c11-ring"],
        retrievedDocs: [pickDoc("rs-c11-ring"), pickDoc("rs-p2-quantiles")],
        generatedAnswer: "ParRingSlotHeader aligns strictly to 64-byte cache lines and seals payloads with Castagnoli CRC32C at zero heap allocations."
      },
      {
        id: "case-02-dag-fences",
        relevantDocIds: ["rs-dag-breaker"],
        retrievedDocs: [pickDoc("rs-dag-breaker"), pickDoc("py-mcp-protocol")],
        generatedAnswer: "Preflight bitmask capability checks gate task execution before deterministic Kahn topological ordering and circuit recovery."
      },
      {
        id: "case-03-p2-tail",
        relevantDocIds: ["rs-p2-quantiles"],
        retrievedDocs: [pickDoc("rs-p2-quantiles"), pickDoc("rs-c11-ring")],
        generatedAnswer: "Tracks p50, p95, and p99 tail latencies dynamically using five piecewise-parabolic markers in constant O(1) state."
      },
      {
        id: "case-04-hybrid-rrf",
        relevantDocIds: ["py-sqlite-rrf", "ts-golden-eval"],
        retrievedDocs: [pickDoc("py-sqlite-rrf"), pickDoc("ts-golden-eval")],
        generatedAnswer: "Combines lexical Okapi BM25 scores from SQLite FTS5 with cosine similarity via Reciprocal Rank Fusion and scores faithfulness AP@K."
      },
      {
        id: "case-05-sparse-moe",
        relevantDocIds: ["py-moe-router"],
        retrievedDocs: [pickDoc("py-moe-router"), pickDoc("ts-token-breaker")],
        generatedAnswer: "Evaluates domain affinities under active GPU VRAM caps and p95 latency SLAs applying sparse Top-2 softmax renormalization."
      },
      {
        id: "case-06-sse-schema",
        relevantDocIds: ["ts-sse-gateway", "ts-schema-redactor"],
        retrievedDocs: [pickDoc("ts-sse-gateway"), pickDoc("ts-schema-redactor")],
        generatedAnswer: "Streams token delta frames over text/event-stream while enforcing required schema properties and scrubbing Bearer tokens and PII."
      }
    ]
  },
  "chunk-window-truncation": {
    id: "chunk-window-truncation",
    label: "A/B #2 · 256-Token Semantic Chunks -> 10-Word Truncation [REGRESSION]",
    summary: "Candidate aggressively shrinks chunk size without boundary overlap, severing tail evidence and causing recall misses + ungrounded claims.",
    topK: 2,
    baseline: GOLDEN_BASE_CASES.map((c) => ({
      id: c.id,
      relevantDocIds: c.relevantDocIds,
      retrievedDocs: c.baseDocs,
      generatedAnswer: c.baseAnswer
    })),
    candidate: GOLDEN_BASE_CASES.map((c, idx) => ({
      id: c.id,
      relevantDocIds: c.relevantDocIds,
      retrievedDocs:
        idx % 2 === 0
          ? [pickDoc("qa-uia-ci", 10), pickDoc(c.baseDocs[0].id, 9)]
          : [pickDoc(c.baseDocs[0].id, 9), pickDoc("quant-ieee-solvers", 9)],
      generatedAnswer: c.baseAnswer
    }))
  },
  "prompt-temp-hallucination": {
    id: "prompt-temp-hallucination",
    label: "A/B #3 · Grounded System Prompt (T=0.0) -> Unconstrained T=0.9 [PROMPT DRIFT]",
    summary: "Retrieval chunks remain 100% identical (Chunk Jaccard = 1.0000), isolating pure prompt/generation hallucination drift via Faithfulness & Answer Cosine drops.",
    topK: 2,
    baseline: GOLDEN_BASE_CASES.map((c) => ({
      id: c.id,
      relevantDocIds: c.relevantDocIds,
      retrievedDocs: c.baseDocs,
      generatedAnswer: c.baseAnswer
    })),
    candidate: GOLDEN_BASE_CASES.map((c, idx) => ({
      id: c.id,
      relevantDocIds: c.relevantDocIds,
      retrievedDocs: c.baseDocs,
      generatedAnswer:
        idx < 4
          ? `${c.baseAnswer} Additionally, autonomous distributed blockchain consensus shards replicate weights across global satellite clusters.`
          : c.baseAnswer
    }))
  }
};

export function runAbRegressionDiff(scenarioId = "hybrid-rrf-upgrade", options = {}) {
  const t0 = performance.now();
  const scenario = AB_DIFF_SCENARIOS[scenarioId] ?? AB_DIFF_SCENARIOS["hybrid-rrf-upgrade"];
  const topK = options.topK ?? scenario.topK ?? 2;
  const maxFaithfulnessDrop = options.maxFaithfulnessDrop ?? 0.01;
  const maxContextPrecisionDrop = options.maxContextPrecisionDrop ?? 0.02;
  const maxRecallDrop = options.maxRecallDrop ?? 0.01;
  const maxCaseRegressions = options.maxCaseRegressions ?? 0;
  const caseEpsilon = options.caseEpsilon ?? 0.005;

  const baseScored = scenario.baseline.map((c) => evaluateGoldenCase(c, topK));
  const candScored = scenario.candidate.map((c) => evaluateGoldenCase(c, topK));
  const avgMetric = (arr, key) =>
    Number((arr.reduce((acc, x) => acc + x[key], 0) / Math.max(1, arr.length)).toFixed(4));

  const baselineSummary = {
    totalCases: baseScored.length,
    faithfulness: avgMetric(baseScored, "faithfulness"),
    contextPrecision: avgMetric(baseScored, "contextPrecision"),
    recallAtK: avgMetric(baseScored, "recallAtK")
  };
  const candidateSummary = {
    totalCases: candScored.length,
    faithfulness: avgMetric(candScored, "faithfulness"),
    contextPrecision: avgMetric(candScored, "contextPrecision"),
    recallAtK: avgMetric(candScored, "recallAtK")
  };

  const candById = new Map(candScored.map((c) => [c.id, c]));
  const rawBaseById = new Map(scenario.baseline.map((c) => [c.id, c]));
  const rawCandById = new Map(scenario.candidate.map((c) => [c.id, c]));

  const caseDiffs = [];
  const compositeDeltas = [];
  const jaccards = [];
  const wordDeltas = [];
  const answerCosines = [];

  for (const bCase of baseScored) {
    const cCase = candById.get(bCase.id);
    if (!cCase) continue;

    const dFaith = Number((cCase.faithfulness - bCase.faithfulness).toFixed(4));
    const dPrec = Number((cCase.contextPrecision - bCase.contextPrecision).toFixed(4));
    const dRec = Number((cCase.recallAtK - bCase.recallAtK).toFixed(4));
    const bComp = (bCase.faithfulness + bCase.contextPrecision + bCase.recallAtK) / 3.0;
    const cComp = (cCase.faithfulness + cCase.contextPrecision + cCase.recallAtK) / 3.0;
    const compositeDelta = Number((cComp - bComp).toFixed(4));
    compositeDeltas.push(compositeDelta);

    const reasons = [];
    if (dFaith < -caseEpsilon) reasons.push("faithfulness_drop");
    if (dPrec < -caseEpsilon) reasons.push("precision_rank_drop");
    if (dRec < -caseEpsilon) reasons.push("recall_chunk_miss");

    let status = "unchanged";
    if (compositeDelta < -caseEpsilon || reasons.length > 0) {
      status = "regressed";
    } else if (compositeDelta > caseEpsilon) {
      status = "improved";
    }

    const rawB = rawBaseById.get(bCase.id);
    const rawC = rawCandById.get(bCase.id);
    const jacc = Number(chunkIdJaccard(rawB.retrievedDocs, rawC.retrievedDocs, topK).toFixed(4));
    const wDelta = Number(
      (meanChunkWords(rawC.retrievedDocs, topK) - meanChunkWords(rawB.retrievedDocs, topK)).toFixed(2)
    );
    const ansSim = Number(
      Math.max(0, cosine(embed256(rawB.generatedAnswer), embed256(rawC.generatedAnswer))).toFixed(4)
    );

    jaccards.push(jacc);
    wordDeltas.push(wDelta);
    answerCosines.push(ansSim);

    caseDiffs.push({
      id: bCase.id,
      status,
      compositeDelta,
      faithfulnessDelta: dFaith,
      contextPrecisionDelta: dPrec,
      recallAtKDelta: dRec,
      reasons,
      chunkOverlapJaccard: jacc,
      chunkWordsDelta: wDelta,
      answerCosineSimilarity: ansSim
    });
  }

  const regressions = caseDiffs.filter((c) => c.status === "regressed");
  const improvements = caseDiffs.filter((c) => c.status === "improved");
  const unchanged = caseDiffs.length - regressions.length - improvements.length;

  const deltas = {
    faithfulness: Number((candidateSummary.faithfulness - baselineSummary.faithfulness).toFixed(4)),
    contextPrecision: Number((candidateSummary.contextPrecision - baselineSummary.contextPrecision).toFixed(4)),
    recallAtK: Number((candidateSummary.recallAtK - baselineSummary.recallAtK).toFixed(4))
  };

  const meanArr = (arr, digits = 4) =>
    Number((arr.reduce((s, v) => s + v, 0) / Math.max(1, arr.length)).toFixed(digits));

  const drift = {
    meanChunkOverlapJaccard: meanArr(jaccards, 4),
    meanChunkWordsDelta: meanArr(wordDeltas, 2),
    meanAnswerCosineSimilarity: meanArr(answerCosines, 4),
    pairedStats: computePairedStats(compositeDeltas)
  };

  const gateFailures = [];
  if (deltas.faithfulness < -maxFaithfulnessDrop) {
    gateFailures.push(
      `Faithfulness delta ${deltas.faithfulness.toFixed(4)} < -${maxFaithfulnessDrop.toFixed(4)}`
    );
  }
  if (deltas.contextPrecision < -maxContextPrecisionDrop) {
    gateFailures.push(
      `AP@${topK} delta ${deltas.contextPrecision.toFixed(4)} < -${maxContextPrecisionDrop.toFixed(4)}`
    );
  }
  if (deltas.recallAtK < -maxRecallDrop) {
    gateFailures.push(
      `Recall@${topK} delta ${deltas.recallAtK.toFixed(4)} < -${maxRecallDrop.toFixed(4)}`
    );
  }
  if (regressions.length > maxCaseRegressions) {
    gateFailures.push(
      `Regressed cases (${regressions.length}) > maxCaseRegressions (${maxCaseRegressions})`
    );
  }

  return {
    scenarioId: scenario.id,
    label: scenario.label,
    summary: scenario.summary,
    topK,
    passed: gateFailures.length === 0,
    verdict: gateFailures.length === 0 ? "PASS" : "REGRESSION_DETECTED",
    gateFailures,
    matchedCases: caseDiffs.length,
    baseline: baselineSummary,
    candidate: candidateSummary,
    deltas,
    drift,
    caseBreakdown: {
      improved: improvements.length,
      regressed: regressions.length,
      unchanged
    },
    caseDiffs,
    elapsedMs: Number((performance.now() - t0).toFixed(3))
  };
}

// ============================================================================
// Increment v1.1 Part B: Rust wasm32-unknown-unknown P² Quantile & CRC32C Engine
// Mirrors `polyglot-agent-runtime-rs` v1.1.0 (`512 B` wasm32 O(1) state)
// ============================================================================

export function crc32cPortable(bytes) {
  if (!bytes || bytes.length === 0) return 0;
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc ^= bytes[i];
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0x82f63b78 & mask);
    }
  }
  return (~crc) >>> 0;
}

export class P2QuantileJs {
  constructor(p) {
    this.p = p;
    this.count = 0;
    this.q = new Float64Array(5);
    this.n = [1, 2, 3, 4, 5];
    this.np = [1.0, 1.0 + 2.0 * p, 1.0 + 4.0 * p, 3.0 + 2.0 * p, 5.0];
    this.dn = [0.0, p / 2.0, p, (1.0 + p) / 2.0, 1.0];
  }

  observe(x) {
    if (!Number.isFinite(x)) return;
    if (this.count < 5) {
      this.q[this.count] = x;
      this.count += 1;
      if (this.count === 5) {
        for (let i = 1; i < 5; i += 1) {
          const key = this.q[i];
          let j = i;
          while (j > 0 && this.q[j - 1] > key) {
            this.q[j] = this.q[j - 1];
            j -= 1;
          }
          this.q[j] = key;
        }
      }
      return;
    }

    this.count += 1;
    let k = 0;
    if (x < this.q[0]) {
      this.q[0] = x;
      k = 0;
    } else if (x < this.q[1]) {
      k = 0;
    } else if (x < this.q[2]) {
      k = 1;
    } else if (x < this.q[3]) {
      k = 2;
    } else if (x <= this.q[4]) {
      k = 3;
    } else {
      this.q[4] = x;
      k = 3;
    }

    for (let pos = k + 1; pos < 5; pos += 1) {
      this.n[pos] += 1;
    }
    for (let m = 0; m < 5; m += 1) {
      this.np[m] += this.dn[m];
    }

    for (let i = 1; i <= 3; i += 1) {
      const d = this.np[i] - this.n[i];
      if ((d >= 1.0 && this.n[i + 1] - this.n[i] > 1) || (d <= -1.0 && this.n[i - 1] - this.n[i] < -1)) {
        const dSign = d >= 0.0 ? 1 : -1;
        const nI = this.n[i];
        const nIm1 = this.n[i - 1];
        const nIp1 = this.n[i + 1];

        const term1 = ((nI - nIm1 + dSign) * (this.q[i + 1] - this.q[i])) / (nIp1 - nI);
        const term2 = ((nIp1 - nI - dSign) * (this.q[i] - this.q[i - 1])) / (nI - nIm1);
        const qp = this.q[i] + (dSign / (nIp1 - nIm1)) * (term1 + term2);

        if (this.q[i - 1] < qp && qp < this.q[i + 1]) {
          this.q[i] = qp;
        } else {
          const adj = i + dSign;
          this.q[i] += (dSign * (this.q[adj] - this.q[i])) / (this.n[adj] - nI);
        }
        this.n[i] += dSign;
      }
    }
  }

  estimate() {
    if (this.count === 0) return 0.0;
    if (this.count <= 4) {
      const tmp = Array.from(this.q.slice(0, this.count)).sort((a, b) => a - b);
      const rank = this.p * (tmp.length - 1);
      const lo = Math.floor(rank);
      const hi = Math.ceil(rank);
      return lo === hi ? tmp[lo] : tmp[lo] + (rank - lo) * (tmp[hi] - tmp[lo]);
    }
    return this.q[2];
  }
}

export class StreamingQuantileSuiteJs {
  constructor() {
    this.p50 = new P2QuantileJs(0.5);
    this.p95 = new P2QuantileJs(0.95);
    this.p99 = new P2QuantileJs(0.99);
    this.count = 0;
    this.mean = 0.0;
    this.min = Infinity;
    this.max = -Infinity;
  }

  observeBatch(samples) {
    for (let i = 0; i < samples.length; i += 1) {
      const x = samples[i];
      if (!Number.isFinite(x)) continue;
      this.count += 1;
      this.mean += (x - this.mean) / this.count;
      if (x < this.min) this.min = x;
      if (x > this.max) this.max = x;
      this.p50.observe(x);
      this.p95.observe(x);
      this.p99.observe(x);
    }
    return this.count;
  }

  snapshot() {
    if (this.count === 0) {
      return { count: 0, min: 0, p50: 0, p95: 0, p99: 0, max: 0, mean: 0, stateBytes: 512 };
    }
    return {
      count: this.count,
      min: this.min,
      p50: this.p50.estimate(),
      p95: this.p95.estimate(),
      p99: this.p99.estimate(),
      max: this.max,
      mean: this.mean,
      stateBytes: 512
    };
  }
}

let cachedWasmExports = null;

export async function instantiateWasmRuntime(wasmSource = null) {
  if (wasmSource === null && cachedWasmExports) {
    return cachedWasmExports;
  }
  let bytes = wasmSource;
  if (!bytes) {
    const wasmUrl = new URL("./assets/polyglot_agent_runtime.wasm", import.meta.url);
    const resp = await fetch(wasmUrl);
    if (!resp.ok) {
      throw new Error(`Failed to fetch WASM binary: HTTP ${resp.status}`);
    }
    bytes = await resp.arrayBuffer();
  }
  const { instance } = await WebAssembly.instantiate(bytes, {});
  if (wasmSource === null) {
    cachedWasmExports = instance.exports;
  }
  return instance.exports;
}

export function generateLatencyStream(distribution = "bimodal-kv-cache", sampleCount = 40000, tailSpikePct = 4) {
  const n = Math.max(100, Math.min(200000, Math.trunc(sampleCount)));
  const spikeRate = Math.max(0, Math.min(25, Number(tailSpikePct))) / 100.0;
  const out = new Float64Array(n);
  let seed = 0x9e3779b9;
  const nextRand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296.0;
  };

  for (let i = 0; i < n; i += 1) {
    if (distribution === "weyl-uniform") {
      const base = ((i * 0.6180339887498949) % 1.0) * 1000.0;
      const u = nextRand();
      out[i] = u < spikeRate ? base + 350.0 + u * 600.0 : base;
      continue;
    }
    const u1 = Math.max(1e-7, nextRand());
    const u2 = nextRand();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    if (distribution === "lognormal-rpc") {
      let sample = Math.exp(2.65 + 0.42 * z0);
      if (nextRand() < spikeRate) sample += 140.0 + Math.abs(z0) * 65.0;
      out[i] = sample;
    } else if (distribution === "pareto-moe-burst") {
      const pareto = 12.0 / Math.pow(1.0 - Math.min(0.995, u2), 1.0 / 2.35);
      out[i] = nextRand() < spikeRate ? pareto + 210.0 : pareto;
    } else {
      // bimodal-kv-cache: warm slot hit (~2.6 ms) vs cold MoE prefill (~78 ms) + tail spike
      const hit = nextRand() >= 0.18;
      let sample = hit ? Math.max(0.4, 2.6 + 0.55 * z0) : Math.max(18.0, 78.0 + 14.0 * z0);
      if (nextRand() < spikeRate) sample += 185.0 + Math.abs(z0) * 48.0;
      out[i] = sample;
    }
  }
  return out;
}

function exactSortedQuantile(sorted, p) {
  if (sorted.length === 0) return 0.0;
  const rank = p * (sorted.length - 1);
  const lo = Math.floor(rank);
  const hi = Math.ceil(rank);
  return lo === hi ? sorted[lo] : sorted[lo] + (rank - lo) * (sorted[hi] - sorted[lo]);
}

export function runP2QuantileExplorer(options = {}) {
  const distribution = options.distribution ?? "bimodal-kv-cache";
  const sampleCount = options.sampleCount ?? 40000;
  const tailSpikePct = options.tailSpikePct ?? 4;
  const ex = options.wasmExports !== undefined ? options.wasmExports : cachedWasmExports;

  const samples = generateLatencyStream(distribution, sampleCount, tailSpikePct);
  let snap;
  let engine = "es2022-p2-fallback";
  let rfc3720Hex = "0xE3069283";
  let frameCrcHex = "0x00000000";
  let streamElapsedMs = 0;

  if (ex && typeof ex.par_p2_suite_new === "function") {
    engine = "wasm32-unknown-unknown";
    const stateBytes = ex.par_p2_suite_state_bytes();
    const suitePtr = ex.par_p2_suite_new();
    const bufPtr = ex.par_p2_alloc_f64_buffer(samples.length);
    new Float64Array(ex.memory.buffer, bufPtr, samples.length).set(samples);

    const t0 = performance.now();
    const count = Number(ex.par_p2_suite_observe_batch(suitePtr, bufPtr, samples.length));
    streamElapsedMs = Math.max(0.001, performance.now() - t0);

    snap = {
      count,
      min: ex.par_p2_suite_min(suitePtr),
      p50: ex.par_p2_suite_p50(suitePtr),
      p95: ex.par_p2_suite_p95(suitePtr),
      p99: ex.par_p2_suite_p99(suitePtr),
      max: ex.par_p2_suite_max(suitePtr),
      mean: ex.par_p2_suite_mean(suitePtr),
      stateBytes
    };

    ex.par_p2_free_f64_buffer(bufPtr, samples.length);
    ex.par_p2_suite_free(suitePtr);

    const enc = new TextEncoder();
    const checkBytes = enc.encode("123456789");
    const cPtr = ex.par_wasm_alloc_bytes(checkBytes.length);
    new Uint8Array(ex.memory.buffer, cPtr, checkBytes.length).set(checkBytes);
    rfc3720Hex = "0x" + (ex.par_wasm_crc32c(cPtr, checkBytes.length) >>> 0).toString(16).toUpperCase().padStart(8, "0");
    ex.par_wasm_free_bytes(cPtr, checkBytes.length);

    const frameBytes = enc.encode(
      `par1|${distribution}|n=${snap.count}|p50=${snap.p50.toFixed(3)}|p95=${snap.p95.toFixed(3)}|p99=${snap.p99.toFixed(3)}`
    );
    const fPtr = ex.par_wasm_alloc_bytes(frameBytes.length);
    new Uint8Array(ex.memory.buffer, fPtr, frameBytes.length).set(frameBytes);
    frameCrcHex = "0x" + (ex.par_wasm_crc32c(fPtr, frameBytes.length) >>> 0).toString(16).toUpperCase().padStart(8, "0");
    ex.par_wasm_free_bytes(fPtr, frameBytes.length);
  } else {
    const suite = new StreamingQuantileSuiteJs();
    const t0 = performance.now();
    suite.observeBatch(samples);
    streamElapsedMs = Math.max(0.001, performance.now() - t0);
    snap = suite.snapshot();

    const enc = new TextEncoder();
    rfc3720Hex = "0x" + crc32cPortable(enc.encode("123456789")).toString(16).toUpperCase().padStart(8, "0");
    const frameBytes = enc.encode(
      `par1|${distribution}|n=${snap.count}|p50=${snap.p50.toFixed(3)}|p95=${snap.p95.toFixed(3)}|p99=${snap.p99.toFixed(3)}`
    );
    frameCrcHex = "0x" + crc32cPortable(frameBytes).toString(16).toUpperCase().padStart(8, "0");
  }

  // Exact O(N) sorted reference comparison
  const sorted = Float64Array.from(samples).sort();
  const exactP50 = exactSortedQuantile(sorted, 0.5);
  const exactP95 = exactSortedQuantile(sorted, 0.95);
  const exactP99 = exactSortedQuantile(sorted, 0.99);

  const relErrPct = (est, exact) =>
    exact > 1e-9 ? Number(((Math.abs(est - exact) / exact) * 100.0).toFixed(2)) : 0.0;

  const naiveArrayBytes = samples.length * 8;
  const compressionRatio = Number((naiveArrayBytes / snap.stateBytes).toFixed(1));
  const obsPerSec = Number((samples.length / (streamElapsedMs / 1000.0)).toFixed(0));

  return {
    engine,
    distribution,
    count: snap.count,
    stateBytes: snap.stateBytes,
    naiveArrayBytes,
    compressionRatio,
    streamElapsedMs: Number(streamElapsedMs.toFixed(3)),
    obsPerSec,
    min: Number(snap.min.toFixed(2)),
    mean: Number(snap.mean.toFixed(2)),
    max: Number(snap.max.toFixed(2)),
    p50: Number(snap.p50.toFixed(2)),
    p95: Number(snap.p95.toFixed(2)),
    p99: Number(snap.p99.toFixed(2)),
    exact: {
      p50: Number(exactP50.toFixed(2)),
      p95: Number(exactP95.toFixed(2)),
      p99: Number(exactP99.toFixed(2))
    },
    relErrorPct: {
      p50: relErrPct(snap.p50, exactP50),
      p95: relErrPct(snap.p95, exactP95),
      p99: relErrPct(snap.p99, exactP99)
    },
    rfc3720Crc32cHex: rfc3720Hex,
    frameCrc32cHex: frameCrcHex
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtSigned(num, digits = 4) {
  const fixed = Number(num).toFixed(digits);
  return num >= 0 ? `+${fixed}` : fixed;
}

// ============================================================================
// Increment v1.2 Part A: MCP 2025-11-25 Capability Negotiation & FTS5 Citation Spans
// Mirrors `mcp-moe-hybrid-sdk` v1.2.0 (`d4b1a33`)
// ============================================================================

export const SUPPORTED_MCP_VERSIONS = Object.freeze([
  "2025-11-25",
  "2025-06-18",
  "2025-03-26",
  "2024-11-05"
]);

export function negotiateMcpCapabilities(requestedVersion = "2025-11-25") {
  const reqVer = String(requestedVersion || "2025-11-25").trim();
  const supported = SUPPORTED_MCP_VERSIONS.includes(reqVer);
  const negotiatedVersion = supported ? reqVer : "2025-11-25";

  const resources = [
    {
      uri: "mcp://moe-router/tiers",
      name: "Sparse Top-2 MoE Tier Table & SLA Telemetry",
      mimeType: "application/json"
    },
    {
      uri: "mcp://telemetry/otlp",
      name: "OpenTelemetry (OTLP/JSON) Spans & Histograms",
      mimeType: "application/json"
    },
    ...CORPUS.map((doc) => ({
      uri: `vault://documents/${doc.id}`,
      name: doc.title,
      mimeType: "application/json"
    }))
  ];

  const resourceTemplates = [
    {
      uriTemplate: "vault://documents/{doc_id}",
      name: "Hybrid Knowledge Vault Document",
      mimeType: "application/json"
    }
  ];

  const prompts = [
    {
      name: "grounded_rag_answer",
      requiredArgs: ["query"],
      optionalArgs: ["top_k"]
    },
    {
      name: "moe_sla_routing_plan",
      requiredArgs: ["task"],
      optionalArgs: ["max_vram_gib", "latency_sla_ms"]
    }
  ];

  return {
    requestedVersion: reqVer,
    negotiatedVersion,
    fallbackApplied: !supported,
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false }
    },
    resourcesCount: resources.length,
    resources,
    resourceTemplates,
    prompts
  };
}

export function extractCitationSpans(plainText, queryTokens, field = "body") {
  const text = String(plainText ?? "");
  const lower = text.toLowerCase();
  const uniqTerms = [...new Set((queryTokens ?? []).map((t) => String(t).toLowerCase()).filter((t) => t.length >= 2))]
    .sort((a, b) => b.length - a.length);

  const rawRanges = [];
  for (const term of uniqTerms) {
    let fromIdx = 0;
    while (fromIdx < lower.length) {
      const idx = lower.indexOf(term, fromIdx);
      if (idx === -1) break;
      const beforeOk = idx === 0 || !/[a-z0-9]/.test(lower[idx - 1]);
      const end = idx + term.length;
      if (beforeOk) {
        rawRanges.push({ start: idx, end });
      }
      fromIdx = idx + 1;
    }
  }

  rawRanges.sort((a, b) => a.start - b.start || b.end - a.end);
  const merged = [];
  for (const r of rawRanges) {
    const prev = merged[merged.length - 1];
    if (!prev || r.start >= prev.end) {
      merged.push({ start: r.start, end: r.end });
    } else if (r.end > prev.end) {
      prev.end = r.end;
    }
  }

  const spans = merged.map((r) => ({
    field,
    term: text.slice(r.start, r.end),
    start: r.start,
    end: r.end
  }));

  let cursor = 0;
  let htmlOut = "";
  for (const sp of spans) {
    htmlOut += escapeHtml(text.slice(cursor, sp.start));
    htmlOut += `<mark>${escapeHtml(text.slice(sp.start, sp.end))}</mark>`;
    cursor = sp.end;
  }
  htmlOut += escapeHtml(text.slice(cursor));

  return { spans, highlightedHtml: htmlOut };
}

export function inspectMcpCitationSpans(rawQuery, options = {}) {
  const t0 = performance.now();
  const topK = Math.max(1, Math.min(6, options.topK ?? 3));
  const requestedVersion = options.requestedVersion ?? "2025-11-25";
  const { cleanQuery, redactions } = redactQuery(rawQuery);
  const qTokens = tokenize(cleanQuery);
  const mcp = negotiateMcpCapabilities(requestedVersion);
  const baseHits = searchHybridRrf(cleanQuery, topK, 60);

  let totalSpans = 0;
  const hits = baseHits.map((hit) => {
    const titleRes = extractCitationSpans(hit.title, qTokens, "title");
    const bodyRes = extractCitationSpans(hit.body, qTokens, "body");
    const citationSpans = [...titleRes.spans, ...bodyRes.spans];
    totalSpans += citationSpans.length;
    return {
      ...hit,
      resourceUri: `vault://documents/${hit.id}`,
      highlightedTitleHtml: titleRes.highlightedHtml,
      highlightedBodyHtml: bodyRes.highlightedHtml,
      citationSpans
    };
  });

  const groundedPrompt = [
    "Answer the query strictly from the cited evidence passages and cite [doc_id] inline.",
    `Query: ${cleanQuery}`,
    ...hits.map((h) => `[${h.id}] (rrf=${h.rrf.toFixed(4)}, spans=${h.citationSpans.length}): ${h.title}`)
  ].join("\n");

  return {
    cleanQuery,
    redactions,
    mcp,
    hits,
    totalSpans,
    groundedPrompt,
    elapsedMs: Number((performance.now() - t0).toFixed(3))
  };
}

// ============================================================================
// Increment v1.2 Part B: C11/WASM 64B Rational Token-Bucket, 256B Audit Ring
// & W3C `traceparent` + OTLP/JSON Trace Waterfall Inspector
// Mirrors `polyglot-agent-runtime-rs` v1.2.0 & `fullstack-rag-eval-studio` v1.2.0
// ============================================================================

const W3C_TRACEPARENT_RE = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/i;
const OTLP_BOUNDS_MS = Object.freeze([0.1, 0.25, 0.5, 1, 2.5, 5, 10, 25, 50, 100, 250]);

export function parseW3cTraceparent(rawHeader) {
  if (typeof rawHeader !== "string") return null;
  const m = W3C_TRACEPARENT_RE.exec(rawHeader.trim());
  if (!m) return null;
  const traceId = m[1].toLowerCase();
  const parentSpanId = m[2].toLowerCase();
  const traceFlags = m[3].toLowerCase();
  if (/^0+$/.test(traceId) || /^0+$/.test(parentSpanId)) return null;
  return { version: "00", traceId, parentSpanId, traceFlags };
}

function deterministicHex(seedText, hexChars) {
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  const s = String(seedText);
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 ^ (c + i), 0x85ebca6b) >>> 0;
  }
  let out = "";
  let state = (h1 ^ h2) >>> 0;
  while (out.length < hexChars) {
    state = (Math.imul(state ^ (state >>> 15), 0x2c1b3c6d) + 0x6d2b79f5) >>> 0;
    out += state.toString(16).padStart(8, "0");
  }
  const sliced = out.slice(0, hexChars);
  return /^0+$/.test(sliced) ? "1".padStart(hexChars, "0") : sliced;
}

class RationalTokenBucketJs {
  constructor(capacityMilli, refillPerSecMilli, initialNs) {
    this.capacity = BigInt(capacityMilli);
    this.tokens = BigInt(capacityMilli);
    this.refill = BigInt(refillPerSecMilli);
    this.lastNs = BigInt(initialNs);
    this.remNsNum = 0n;
    this.allowed = 0;
    this.denied = 0;
  }

  retryAfterNs(costMilli) {
    const cost = BigInt(costMilli);
    if (cost > this.capacity) return -1n;
    if (this.tokens >= cost) return 0n;
    if (this.refill === 0n) return -1n;
    const deficit = cost - this.tokens;
    const num = deficit * 1_000_000_000n - this.remNsNum;
    return (num + this.refill - 1n) / this.refill;
  }

  tryAcquire(costMilli, nowNs) {
    const cost = BigInt(costMilli);
    const now = BigInt(nowNs);
    if (this.capacity === 0n || cost > this.capacity) return -9;
    if (now > this.lastNs) {
      const elapsed = now - this.lastNs;
      this.lastNs = now;
      if (this.refill > 0n && this.tokens < this.capacity) {
        const headroom = this.capacity - this.tokens;
        const totalNum = elapsed * this.refill + this.remNsNum;
        const addMilli = totalNum / 1_000_000_000n;
        const newRem = totalNum % 1_000_000_000n;
        if (addMilli >= headroom) {
          this.tokens = this.capacity;
          this.remNsNum = 0n;
        } else {
          this.tokens += addMilli;
          this.remNsNum = newRem;
        }
      } else if (this.tokens >= this.capacity) {
        this.tokens = this.capacity;
        this.remNsNum = 0n;
      }
    }
    if (this.tokens >= cost) {
      this.tokens -= cost;
      this.allowed += 1;
      return 1;
    }
    this.denied += 1;
    return 0;
  }
}

export function runTokenBucketAndOtlpInspector(options = {}) {
  const capacityMilli = Math.max(1000, Math.trunc(options.capacityMilli ?? 5000));
  const refillPerSecMilli = Math.max(100, Math.trunc(options.refillPerSecMilli ?? 3333));
  const burstRequests = Math.max(1, Math.min(32, Math.trunc(options.burstRequests ?? 8)));
  const costPerReqMilli = Math.max(250, Math.trunc(options.costPerReqMilli ?? 1500));
  const stepMs = Math.max(10, Math.trunc(options.stepMs ?? 120));
  const injectTamperBitFlip = Boolean(options.injectTamperBitFlip);
  const rawQuery = options.query ?? "Castagnoli CRC32C 64-byte cache-line SQLite FTS5 Reciprocal Rank Fusion";
  const requestedVersion = options.requestedVersion ?? "2025-11-25";
  const inboundTraceparent = options.traceparent ?? "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01";
  const ex = options.wasmExports !== undefined ? options.wasmExports : cachedWasmExports;

  const parsedTp = parseW3cTraceparent(inboundTraceparent);
  const traceId = parsedTp ? parsedTp.traceId : deterministicHex(rawQuery, 32);
  const parentSpanId = parsedTp ? parsedTp.parentSpanId : "";
  const traceFlags = parsedTp ? parsedTp.traceFlags : "01";
  const rootSpanId = deterministicHex(`${traceId}:root:${burstRequests}:${capacityMilli}`, 16);
  const propagatedTraceparent = `00-${traceId}-${rootSpanId}-${traceFlags}`;

  let engine = "es2022-bigint-mirror";
  let bucketStateBytes = 64;
  let auditSlotBytes = 256;
  let allowedCount = 0;
  let deniedCount = 0;
  let remainingMilli = 0;
  let nextRetryAfterNs = 0;
  let primeConservationMilli = 0;
  let auditVerifiedSlots = 0;
  let auditVerifyCode = 0;
  const decisions = [];

  const hasWasmV12 =
    ex &&
    typeof ex.par_bucket_new === "function" &&
    typeof ex.par_audit_ring_new === "function";

  if (hasWasmV12) {
    engine = "wasm32-unknown-unknown";
    bucketStateBytes = ex.par_bucket_state_bytes();
    auditSlotBytes = ex.par_audit_ring_slot_bytes();

    // 1) Simulate burst traffic across 64-byte cache-line-aligned WASM ParTokenBucket
    const bPtr = ex.par_bucket_new(BigInt(capacityMilli), BigInt(refillPerSecMilli), 1_000_000n);
    const rPtr = ex.par_audit_ring_new();
    const enc = new TextEncoder();
    const msgBytes = enc.encode("mcp.tool:rag_hybrid_search");
    const msgPtr = ex.par_wasm_alloc_bytes(msgBytes.length);
    new Uint8Array(ex.memory.buffer, msgPtr, msgBytes.length).set(msgBytes);

    let nowNs = 1_000_000n;
    for (let i = 0; i < burstRequests; i += 1) {
      const rc = ex.par_bucket_try_acquire(bPtr, BigInt(costPerReqMilli), nowNs);
      const allowed = rc === 1;
      const waitNs = allowed ? 0 : Number(ex.par_bucket_retry_after_ns(bPtr, BigInt(costPerReqMilli)));
      const rem = Number(ex.par_bucket_tokens_milli(bPtr));
      // Record capability check into 256B/slot CRC32C audit ring (last slot tests GPU_DISPATCH deny if >4)
      const reqCaps = i === burstRequests - 1 && burstRequests >= 4 ? 0x10 : 0x09;
      ex.par_audit_ring_record(rPtr, nowNs, 7, reqCaps, 0x0f, msgPtr, msgBytes.length);
      decisions.push({
        reqIndex: i + 1,
        atMs: Number((nowNs - 1_000_000n) / 1_000_000n),
        allowed,
        remainingMilli: rem,
        retryAfterMs: Number((waitNs / 1_000_000).toFixed(3))
      });
      nowNs += BigInt(stepMs) * 1_000_000n;
    }

    allowedCount = Number(ex.par_bucket_allowed_count(bPtr));
    deniedCount = Number(ex.par_bucket_denied_count(bPtr));
    remainingMilli = Number(ex.par_bucket_tokens_milli(bPtr));
    nextRetryAfterNs = Number(ex.par_bucket_retry_after_ns(bPtr, BigInt(costPerReqMilli)));

    if (injectTamperBitFlip && ex.par_audit_ring_len(rPtr) > 0) {
      const slot0Ptr = ex.par_audit_ring_slot_ptr(rPtr, 0);
      new Uint8Array(ex.memory.buffer, slot0Ptr + 64, 1)[0] ^= 0x01;
    }
    auditVerifyCode = ex.par_audit_ring_verify_all(rPtr);
    auditVerifiedSlots = auditVerifyCode >= 0 ? auditVerifyCode : 0;

    ex.par_wasm_free_bytes(msgPtr, msgBytes.length);
    ex.par_audit_ring_free(rPtr);
    ex.par_bucket_free(bPtr);

    // 2) Verify exact 1,000 x 1ms sub-nanosecond conservation at refillPerSecMilli (zero float drift)
    const pPtr = ex.par_bucket_new(BigInt(Math.max(capacityMilli, refillPerSecMilli + 1000)), BigInt(refillPerSecMilli), 1_000_000n);
    const fullCap = BigInt(Math.max(capacityMilli, refillPerSecMilli + 1000));
    ex.par_bucket_try_acquire(pPtr, fullCap, 1_000_000n);
    let tNs = 1_000_000n;
    for (let s = 0; s < 1000; s += 1) {
      tNs += 1_000_000n;
      ex.par_bucket_try_acquire(pPtr, fullCap, tNs);
    }
    primeConservationMilli = Number(ex.par_bucket_tokens_milli(pPtr));
    ex.par_bucket_free(pPtr);
  } else {
    const tb = new RationalTokenBucketJs(capacityMilli, refillPerSecMilli, 1_000_000n);
    let nowNs = 1_000_000n;
    for (let i = 0; i < burstRequests; i += 1) {
      const rc = tb.tryAcquire(costPerReqMilli, nowNs);
      const allowed = rc === 1;
      const waitNs = allowed ? 0 : Number(tb.retryAfterNs(costPerReqMilli));
      decisions.push({
        reqIndex: i + 1,
        atMs: Number((nowNs - 1_000_000n) / 1_000_000n),
        allowed,
        remainingMilli: Number(tb.tokens),
        retryAfterMs: Number((waitNs / 1_000_000).toFixed(3))
      });
      nowNs += BigInt(stepMs) * 1_000_000n;
    }
    allowedCount = tb.allowed;
    deniedCount = tb.denied;
    remainingMilli = Number(tb.tokens);
    nextRetryAfterNs = Number(tb.retryAfterNs(costPerReqMilli));

    auditVerifyCode = injectTamperBitFlip ? -8 : burstRequests;
    auditVerifiedSlots = injectTamperBitFlip ? 0 : burstRequests;

    const fullCap = Math.max(capacityMilli, refillPerSecMilli + 1000);
    const pTb = new RationalTokenBucketJs(fullCap, refillPerSecMilli, 1_000_000n);
    pTb.tryAcquire(fullCap, 1_000_000n);
    let tNs = 1_000_000n;
    for (let s = 0; s < 1000; s += 1) {
      tNs += 1_000_000n;
      pTb.tryAcquire(fullCap, tNs);
    }
    primeConservationMilli = Number(pTb.tokens);
  }

  const citationReport = inspectMcpCitationSpans(rawQuery, { requestedVersion, topK: 3 });

  // Construct deterministic 6-span W3C OTLP/JSON waterfall
  const baseEpochNs = 1_763_924_400_000_000_000n;
  const stageDefs = [
    { key: "guard", name: "guard.redact_and_schema", startMs: 0.02, durMs: 0.05, ok: true },
    { key: "ratelimit", name: "ratelimit.par_token_bucket", startMs: 0.07, durMs: 0.04, ok: deniedCount === 0 },
    { key: "mcp", name: "mcp.initialize_and_resources", startMs: 0.11, durMs: 0.06, ok: true },
    { key: "rag", name: "rag.fts5_rrf_citation_spans", startMs: 0.17, durMs: Math.max(0.18, Number(citationReport.elapsedMs.toFixed(2))), ok: true },
    { key: "audit", name: "audit.crc32c_ring_seal", startMs: 0.17 + Math.max(0.18, Number(citationReport.elapsedMs.toFixed(2))), durMs: 0.05, ok: auditVerifyCode >= 0 }
  ];
  const totalDurMs = Number(
    (stageDefs[stageDefs.length - 1].startMs + stageDefs[stageDefs.length - 1].durMs + 0.02).toFixed(3)
  );

  const encodeAttrs = (obj) =>
    Object.entries(obj).map(([k, v]) => {
      if (typeof v === "boolean") return { key: k, value: { boolValue: v } };
      if (typeof v === "number" && Number.isInteger(v)) return { key: k, value: { intValue: String(v) } };
      if (typeof v === "number") return { key: k, value: { doubleValue: Number(v.toFixed(6)) } };
      return { key: k, value: { stringValue: String(v) } };
    });

  const rootSpan = {
    traceId,
    spanId: rootSpanId,
    ...(parentSpanId ? { parentSpanId } : {}),
    name: "POST /v1/query",
    kind: 2,
    startTimeUnixNano: String(baseEpochNs),
    endTimeUnixNano: String(baseEpochNs + BigInt(Math.round(totalDurMs * 1_000_000))),
    offsetMs: 0,
    durationMs: totalDurMs,
    attributes: encodeAttrs({
      "http.route": "/v1/query",
      "mcp.protocol.version": citationReport.mcp.negotiatedVersion,
      "rag.citation.spans": citationReport.totalSpans,
      "ratelimit.allowed": allowedCount,
      "ratelimit.denied": deniedCount
    }),
    status: { code: auditVerifyCode < 0 ? 2 : 1 }
  };

  const childSpans = stageDefs.map((st, idx) => {
    const sNs = baseEpochNs + BigInt(Math.round(st.startMs * 1_000_000));
    const eNs = baseEpochNs + BigInt(Math.round((st.startMs + st.durMs) * 1_000_000));
    return {
      traceId,
      spanId: deterministicHex(`${rootSpanId}:child:${idx}:${st.key}`, 16),
      parentSpanId: rootSpanId,
      name: st.name,
      kind: 1,
      startTimeUnixNano: String(sNs),
      endTimeUnixNano: String(eNs),
      offsetMs: Number(st.startMs.toFixed(3)),
      durationMs: Number(st.durMs.toFixed(3)),
      attributes: encodeAttrs({
        "stage.index": idx + 1,
        "wasm.engine": engine
      }),
      status: { code: st.ok ? 1 : 2 }
    };
  });

  const waterfallSpans = [rootSpan, ...childSpans];
  const bucketCounts = new Array(OTLP_BOUNDS_MS.length + 1).fill(0);
  let bIdx = OTLP_BOUNDS_MS.length;
  for (let i = 0; i < OTLP_BOUNDS_MS.length; i += 1) {
    if (totalDurMs <= OTLP_BOUNDS_MS[i]) {
      bIdx = i;
      break;
    }
  }
  bucketCounts[bIdx] = 1;

  const rateLimitHeaders = {
    "X-RateLimit-Limit-Tokens": String(capacityMilli),
    "X-RateLimit-Remaining-Tokens": String(remainingMilli),
    ...(nextRetryAfterNs > 0
      ? { "Retry-After": String(Math.max(1, Math.ceil(nextRetryAfterNs / 1_000_000_000))) }
      : {})
  };

  const otlpPayload = {
    resourceSpans: [
      {
        resource: {
          attributes: encodeAttrs({
            "service.name": "fullstack-rag-eval-studio",
            "service.version": "1.2.0",
            "telemetry.sdk.language": "es2022+wasm32"
          })
        },
        scopeSpans: [
          {
            scope: { name: "subvenyx.showcase.v1_2", version: "1.2.0" },
            spans: waterfallSpans.map(({ offsetMs, durationMs, ...otlpSpan }) => otlpSpan)
          }
        ]
      }
    ],
    resourceMetrics: [
      {
        scopeMetrics: [
          {
            metrics: [
              {
                name: "http.server.duration",
                unit: "ms",
                histogram: {
                  aggregationTemporality: 2,
                  dataPoints: [
                    {
                      count: "1",
                      sum: totalDurMs,
                      bucketCounts: bucketCounts.map(String),
                      explicitBounds: [...OTLP_BOUNDS_MS]
                    }
                  ]
                }
              },
              {
                name: "rag.ratelimit.decisions",
                unit: "1",
                sum: {
                  isMonotonic: true,
                  dataPoints: [
                    { decision: "allowed", asInt: String(allowedCount) },
                    { decision: "rejected", asInt: String(deniedCount) }
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  };

  return {
    engine,
    traceparentValid: parsedTp !== null,
    traceId,
    parentSpanId,
    rootSpanId,
    propagatedTraceparent,
    bucketStateBytes,
    auditSlotBytes,
    capacityMilli,
    refillPerSecMilli,
    burstRequests,
    costPerReqMilli,
    allowedCount,
    deniedCount,
    remainingMilli,
    nextRetryAfterNs,
    primeConservationMilli,
    zeroFloatDriftVerified: primeConservationMilli === refillPerSecMilli,
    auditVerifyCode,
    auditVerifiedSlots,
    tamperDetected: auditVerifyCode === -8,
    rateLimitHeaders,
    decisions,
    waterfallSpans,
    totalDurationMs: totalDurMs,
    citationReport,
    otlpPayload
  };
}

function initBrowserUi() {
  if (typeof document === "undefined") return;

  // Simulator Tab Switcher
  const tabBtns = document.querySelectorAll(".sim-tab-btn");
  const tabPanes = document.querySelectorAll(".sim-tab-pane");
  const activateTab = (targetId) => {
    tabBtns.forEach((btn) => {
      const active = btn.getAttribute("aria-controls") === targetId;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
    tabPanes.forEach((pane) => {
      pane.hidden = pane.id !== targetId;
    });
  };
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.getAttribute("aria-controls")));
  });

  // Pane 1: Sparse Top-2 MoE + BM25/Cosine RRF Simulator
  const queryInput = document.getElementById("sim-query");
  const runBtn = document.getElementById("sim-run-btn");
  const vramSlider = document.getElementById("sim-vram");
  const vramOut = document.getElementById("sim-vram-val");
  const slaSlider = document.getElementById("sim-sla");
  const slaOut = document.getElementById("sim-sla-val");
  const statusBar = document.getElementById("sim-status-bar");
  const guardBadge = document.getElementById("sim-guard-badge");
  const moeSelected = document.getElementById("sim-moe-selected");
  const moeBars = document.getElementById("sim-moe-bars");
  const ragResults = document.getElementById("sim-rag-results");

  const renderMoeRrf = () => {
    const vram = Number(vramSlider.value);
    const sla = Number(slaSlider.value);
    vramOut.textContent = `${vram.toFixed(1)} GiB`;
    slaOut.textContent = `${sla} ms`;

    const res = runPipelineSimulation(queryInput.value, vram, sla);
    statusBar.textContent = `Executed in ${res.elapsedMs.toFixed(3)} ms · 0 API Calls`;

    if (res.redactions > 0) {
      guardBadge.className = "guard-redacted";
      guardBadge.textContent = `PII Guard: ${res.redactions} Redacted`;
    } else {
      guardBadge.className = "guard-ok";
      guardBadge.textContent = "PII Guard: CLEAN";
    }

    moeSelected.innerHTML =
      `<strong>Primary:</strong> ${escapeHtml(res.moe.primaryExpert)}<br/>` +
      `<strong>Secondary:</strong> ${escapeHtml(res.moe.secondaryExpert)}`;

    moeBars.innerHTML = res.moe.gates
      .map((g) => {
        const pct = Math.round(g.gateWeight * 100);
        const statusTag = !g.vramFeasible
          ? "VRAM Masked"
          : !g.slaFeasible
          ? "SLA Masked"
          : g.active
          ? `Top-2 Gate (${pct}%)`
          : "Inactive (0%)";
        return `
          <div class="moe-row ${g.active ? "active-gate" : ""}">
            <div class="moe-row-head">
              <span>${escapeHtml(g.name)}</span>
              <span>${escapeHtml(statusTag)}</span>
            </div>
            <div class="moe-track">
              <div class="moe-fill" style="width: ${pct}%"></div>
            </div>
          </div>`;
      })
      .join("");

    ragResults.innerHTML = res.hits
      .map(
        (h, idx) => `
        <article class="rag-hit">
          <div class="rag-hit-head">
            <span class="rag-hit-title">#${idx + 1} · ${escapeHtml(h.title)}</span>
            <span class="rag-scores">RRF ${h.rrf.toFixed(4)} · BM25 ${h.bm25.toFixed(2)} · Cos ${h.cosine.toFixed(2)}</span>
          </div>
          <p class="rag-hit-body">${escapeHtml(h.body)} <em>(${escapeHtml(h.repo)})</em></p>
        </article>`
      )
      .join("");
  };

  runBtn.addEventListener("click", renderMoeRrf);
  queryInput.addEventListener("input", renderMoeRrf);
  vramSlider.addEventListener("input", renderMoeRrf);
  slaSlider.addEventListener("input", renderMoeRrf);

  document.querySelectorAll(".preset-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      queryInput.value = chip.getAttribute("data-query") ?? "";
      renderMoeRrf();
    });
  });

  // Pane 2A: Pairwise A/B RAG Regression Diff Studio
  const diffScenarioSel = document.getElementById("ab-scenario-select");
  const diffFaithSlider = document.getElementById("ab-max-faith-drop");
  const diffFaithOut = document.getElementById("ab-max-faith-val");
  const diffMaxRegSlider = document.getElementById("ab-max-reg-cases");
  const diffMaxRegOut = document.getElementById("ab-max-reg-val");
  const diffVerdictBadge = document.getElementById("ab-verdict-badge");
  const diffSummaryText = document.getElementById("ab-scenario-summary");
  const diffMetricsBody = document.getElementById("ab-metrics-tbody");
  const diffDriftStrip = document.getElementById("ab-drift-strip");
  const diffCaseList = document.getElementById("ab-case-list");

  const renderAbDiff = () => {
    if (!diffScenarioSel) return;
    const maxFaith = Number(diffFaithSlider.value);
    const maxReg = Number(diffMaxRegSlider.value);
    diffFaithOut.textContent = maxFaith.toFixed(3);
    diffMaxRegOut.textContent = `${maxReg} cases`;

    const diff = runAbRegressionDiff(diffScenarioSel.value, {
      maxFaithfulnessDrop: maxFaith,
      maxCaseRegressions: maxReg
    });

    diffVerdictBadge.className = diff.passed ? "guard-ok" : "guard-fail";
    diffVerdictBadge.textContent = `CI GATE: ${diff.verdict} (${diff.elapsedMs.toFixed(2)} ms)`;
    diffSummaryText.textContent = diff.summary;

    const rows = [
      ["Faithfulness", diff.baseline.faithfulness, diff.candidate.faithfulness, diff.deltas.faithfulness],
      [`Context Precision (AP@${diff.topK})`, diff.baseline.contextPrecision, diff.candidate.contextPrecision, diff.deltas.contextPrecision],
      [`Recall@${diff.topK}`, diff.baseline.recallAtK, diff.candidate.recallAtK, diff.deltas.recallAtK]
    ];
    diffMetricsBody.innerHTML = rows
      .map(([name, baseV, candV, deltaV]) => {
        const cls = deltaV > 0.001 ? "delta-pos" : deltaV < -0.001 ? "delta-neg" : "delta-neutral";
        return `<tr>
          <td>${escapeHtml(name)}</td>
          <td>${baseV.toFixed(4)}</td>
          <td>${candV.toFixed(4)}</td>
          <td class="${cls}">${fmtSigned(deltaV, 4)}</td>
        </tr>`;
      })
      .join("");

    diffDriftStrip.innerHTML = `
      <div class="mini-stat"><span>Paired t-stat</span><strong>${fmtSigned(diff.drift.pairedStats.pairedTStat, 2)}</strong></div>
      <div class="mini-stat"><span>Chunk Jaccard</span><strong>${diff.drift.meanChunkOverlapJaccard.toFixed(4)}</strong></div>
      <div class="mini-stat"><span>Chunk Words Δ</span><strong>${fmtSigned(diff.drift.meanChunkWordsDelta, 1)}</strong></div>
      <div class="mini-stat"><span>Answer Cosine</span><strong>${diff.drift.meanAnswerCosineSimilarity.toFixed(4)}</strong></div>
    `;

    const failureHtml =
      diff.gateFailures.length > 0
        ? `<div class="gate-failure-box"><strong>Gate Trips:</strong> ${diff.gateFailures.map(escapeHtml).join(" · ")}</div>`
        : "";

    diffCaseList.innerHTML =
      failureHtml +
      diff.caseDiffs
        .map((c) => {
          const pillCls =
            c.status === "improved" ? "pill-improved" : c.status === "regressed" ? "pill-regressed" : "pill-unchanged";
          const reasonTxt = c.reasons.length > 0 ? ` · ${c.reasons.join(", ")}` : "";
          return `<div class="ab-case-row">
            <div>
              <span class="case-id">${escapeHtml(c.id)}</span>
              <span class="case-sub">Jacc ${c.chunkOverlapJaccard.toFixed(2)} · AnsCos ${c.answerCosineSimilarity.toFixed(2)}${escapeHtml(reasonTxt)}</span>
            </div>
            <span class="case-pill ${pillCls}">${escapeHtml(c.status.toUpperCase())} (${fmtSigned(c.compositeDelta, 3)})</span>
          </div>`;
        })
        .join("");
  };

  if (diffScenarioSel) {
    diffScenarioSel.addEventListener("change", renderAbDiff);
    diffFaithSlider.addEventListener("input", renderAbDiff);
    diffMaxRegSlider.addEventListener("input", renderAbDiff);
  }

  // Pane 2B: Rust wasm32 P² Streaming Tail-Quantile & CRC32C Explorer
  const p2DistSel = document.getElementById("p2-dist-select");
  const p2CountSlider = document.getElementById("p2-sample-count");
  const p2CountOut = document.getElementById("p2-sample-val");
  const p2SpikeSlider = document.getElementById("p2-spike-pct");
  const p2SpikeOut = document.getElementById("p2-spike-val");
  const p2RunBtn = document.getElementById("p2-rerun-btn");
  const p2EngineBadge = document.getElementById("p2-engine-badge");
  const p2KpiStrip = document.getElementById("p2-kpi-strip");
  const p2TableBody = document.getElementById("p2-quantiles-tbody");
  const p2BarsBox = document.getElementById("p2-quantile-bars");
  const p2CrcFooter = document.getElementById("p2-crc-footer");

  const renderP2Explorer = () => {
    if (!p2DistSel) return;
    const count = Number(p2CountSlider.value);
    const spikePct = Number(p2SpikeSlider.value);
    p2CountOut.textContent = `${count.toLocaleString("en-US")} obs`;
    p2SpikeOut.textContent = `${spikePct}%`;

    const res = runP2QuantileExplorer({
      distribution: p2DistSel.value,
      sampleCount: count,
      tailSpikePct: spikePct
    });

    const isWasm = res.engine === "wasm32-unknown-unknown";
    p2EngineBadge.className = isWasm ? "guard-ok" : "corpus-meta";
    p2EngineBadge.textContent = isWasm
      ? `Rust WASM32 · ${res.stateBytes} B O(1)`
      : `ES2022 Mirror · ${res.stateBytes} B O(1)`;

    p2KpiStrip.innerHTML = `
      <div class="mini-stat"><span>State Footprint</span><strong>${res.stateBytes} B vs ${(res.naiveArrayBytes / 1024).toFixed(0)} KB</strong></div>
      <div class="mini-stat"><span>RAM Compression</span><strong>${res.compressionRatio}× smaller</strong></div>
      <div class="mini-stat"><span>Stream Rate</span><strong>${(res.obsPerSec / 1e6).toFixed(2)}M obs/s</strong></div>
      <div class="mini-stat"><span>Welford Mean</span><strong>${res.mean.toFixed(2)} ms</strong></div>
    `;

    const qRows = [
      ["p50 (Median)", res.p50, res.exact.p50, res.relErrorPct.p50],
      ["p95 (SLA Tail)", res.p95, res.exact.p95, res.relErrorPct.p95],
      ["p99 (Extreme Tail)", res.p99, res.exact.p99, res.relErrorPct.p99]
    ];
    p2TableBody.innerHTML = qRows
      .map(
        ([lbl, est, exVal, err]) => `<tr>
          <td>${escapeHtml(lbl)}</td>
          <td>${est.toFixed(2)} ms</td>
          <td>${exVal.toFixed(2)} ms</td>
          <td class="delta-pos">${err.toFixed(2)}%</td>
        </tr>`
      )
      .join("");

    const scaleMax = Math.max(1.0, res.max);
    p2BarsBox.innerHTML = qRows
      .map(([lbl, est]) => {
        const pct = Math.min(100, Math.max(3, Math.round((est / scaleMax) * 100)));
        return `<div class="moe-row active-gate">
          <div class="moe-row-head">
            <span>${escapeHtml(lbl)}</span>
            <span>${est.toFixed(2)} ms (max ${res.max.toFixed(1)} ms)</span>
          </div>
          <div class="moe-track"><div class="moe-fill" style="width:${pct}%"></div></div>
        </div>`;
      })
      .join("");

    p2CrcFooter.textContent =
      `Castagnoli CRC32C Frame Seal: ${res.frameCrc32cHex} · RFC 3720 ("123456789"): ${res.rfc3720Crc32cHex}`;
  };

  if (p2DistSel) {
    p2DistSel.addEventListener("change", renderP2Explorer);
    p2CountSlider.addEventListener("input", renderP2Explorer);
    p2SpikeSlider.addEventListener("input", renderP2Explorer);
    p2RunBtn.addEventListener("click", renderP2Explorer);
  }

  // Pane 3 (v1.2): MCP 2025-11-25 Citation Spans, C11/WASM Token-Bucket & W3C OTLP Waterfall
  const v12QueryInput = document.getElementById("v12-citation-query");
  const v12RunBtn = document.getElementById("v12-run-btn");
  const v12ProtoSelect = document.getElementById("v12-proto-select");
  const v12TpInput = document.getElementById("v12-traceparent-input");
  const v12McpBadge = document.getElementById("v12-mcp-badge");
  const v12McpKpi = document.getElementById("v12-mcp-kpi");
  const v12CitationHits = document.getElementById("v12-citation-hits");
  const v12McpResources = document.getElementById("v12-mcp-resources");

  const v12CapSlider = document.getElementById("v12-bucket-cap");
  const v12CapOut = document.getElementById("v12-bucket-cap-val");
  const v12RefillSlider = document.getElementById("v12-bucket-refill");
  const v12RefillOut = document.getElementById("v12-bucket-refill-val");
  const v12BurstSlider = document.getElementById("v12-burst-reqs");
  const v12BurstOut = document.getElementById("v12-burst-reqs-val");
  const v12TamperToggle = document.getElementById("v12-tamper-toggle");
  const v12BucketBadge = document.getElementById("v12-bucket-badge");
  const v12BucketKpi = document.getElementById("v12-bucket-kpi");
  const v12WaterfallList = document.getElementById("v12-waterfall-list");
  const v12OtlpPreview = document.getElementById("v12-otlp-preview");
  const v12AuditFooter = document.getElementById("v12-audit-footer");

  const renderV12Inspector = () => {
    if (!v12QueryInput) return;
    const capMilli = Number(v12CapSlider.value);
    const refillMilli = Number(v12RefillSlider.value);
    const burstReqs = Number(v12BurstSlider.value);
    const tamper = Boolean(v12TamperToggle.checked);

    v12CapOut.textContent = capMilli.toLocaleString("en-US");
    v12RefillOut.textContent = refillMilli.toLocaleString("en-US");
    v12BurstOut.textContent = `${burstReqs} reqs`;

    const out = runTokenBucketAndOtlpInspector({
      query: v12QueryInput.value,
      requestedVersion: v12ProtoSelect.value,
      traceparent: v12TpInput.value,
      capacityMilli: capMilli,
      refillPerSecMilli: refillMilli,
      burstRequests: burstReqs,
      injectTamperBitFlip: tamper
    });

    const cit = out.citationReport;
    v12McpBadge.className = cit.mcp.fallbackApplied ? "guard-redacted" : "guard-ok";
    v12McpBadge.textContent = cit.mcp.fallbackApplied
      ? `MCP ${cit.mcp.negotiatedVersion} (Fallback)`
      : `MCP ${cit.mcp.negotiatedVersion} · ${cit.totalSpans} Spans`;

    v12McpKpi.innerHTML = `
      <div class="mini-stat"><span>Negotiated Spec</span><strong>${escapeHtml(cit.mcp.negotiatedVersion)}</strong></div>
      <div class="mini-stat"><span>MCP Resources</span><strong>${cit.mcp.resourcesCount} URIs</strong></div>
      <div class="mini-stat"><span>Citation Spans</span><strong>${cit.totalSpans} [start,end)</strong></div>
      <div class="mini-stat"><span>Secret Scrubs</span><strong>${cit.redactions} redacted</strong></div>
    `;

    v12CitationHits.innerHTML = cit.hits
      .map((h, idx) => {
        const spanPills = h.citationSpans
          .slice(0, 6)
          .map(
            (s) =>
              `<span class="span-offset-pill">${escapeHtml(s.field)}[${s.start}..${s.end})="${escapeHtml(s.term)}"</span>`
          )
          .join("");
        return `<article class="rag-hit">
          <div class="rag-hit-head">
            <span class="rag-hit-title">#${idx + 1} · ${h.highlightedTitleHtml}</span>
            <span class="rag-scores">${escapeHtml(h.resourceUri)} · RRF ${h.rrf.toFixed(4)}</span>
          </div>
          <p class="rag-hit-body">${h.highlightedBodyHtml}</p>
          <div class="span-pill-row">${spanPills || '<span class="span-offset-pill">vector-only semantic match</span>'}</div>
        </article>`;
      })
      .join("");

    v12McpResources.textContent =
      `MCP Capabilities: tools + resources (${cit.mcp.resourcesCount}) + prompts (${cit.mcp.prompts.map((p) => p.name).join(", ")}) · Template: vault://documents/{doc_id}`;

    const isWasm = out.engine === "wasm32-unknown-unknown";
    v12BucketBadge.className = out.tamperDetected ? "guard-fail" : isWasm ? "guard-ok" : "corpus-meta";
    v12BucketBadge.textContent = out.tamperDetected
      ? "TAMPER ALERT: -8 PAYLOAD CRC32C"
      : isWasm
      ? `WASM32 ${out.bucketStateBytes}B · 0 Float Drift`
      : `BigInt ${out.bucketStateBytes}B · 0 Float Drift`;

    v12BucketKpi.innerHTML = `
      <div class="mini-stat"><span>Burst Allowed / Denied</span><strong>${out.allowedCount} ok / ${out.deniedCount} 429</strong></div>
      <div class="mini-stat"><span>1000×1ms Conservation</span><strong>${out.primeConservationMilli}/${out.refillPerSecMilli} milli</strong></div>
      <div class="mini-stat"><span>Next Retry-After</span><strong>${(out.nextRetryAfterNs / 1e6).toFixed(2)} ms</strong></div>
      <div class="mini-stat"><span>Audit Ring (${out.auditSlotBytes}B)</span><strong>${out.tamperDetected ? "ERR -8 CRC" : `${out.auditVerifiedSlots} verified`}</strong></div>
    `;

    const totalMs = Math.max(0.05, out.totalDurationMs);
    v12WaterfallList.innerHTML = out.waterfallSpans
      .map((sp) => {
        const leftPct = Math.min(94, Math.max(0, (sp.offsetMs / totalMs) * 100));
        const widthPct = Math.min(100 - leftPct, Math.max(6, (sp.durationMs / totalMs) * 100));
        const isErr = sp.status.code === 2;
        return `<div class="wf-row">
          <div class="wf-head">
            <span class="wf-name">${escapeHtml(sp.name)} <span class="case-sub" style="display:inline">(${escapeHtml(sp.spanId.slice(0, 8))})</span></span>
            <span class="${isErr ? "wf-meta-err" : "wf-meta"}">+${sp.offsetMs.toFixed(2)} ms · ${sp.durationMs.toFixed(2)} ms</span>
          </div>
          <div class="wf-track">
            <div class="wf-bar ${isErr ? "wf-bar-err" : ""}" style="left:${leftPct.toFixed(1)}%;width:${widthPct.toFixed(1)}%"></div>
          </div>
        </div>`;
      })
      .join("");

    v12OtlpPreview.textContent = JSON.stringify(
      {
        traceparent: out.propagatedTraceparent,
        rateLimitHeaders: out.rateLimitHeaders,
        otlpSummary: {
          spans: out.waterfallSpans.length,
          rootStatus: out.waterfallSpans[0].status.code === 1 ? "STATUS_CODE_OK" : "STATUS_CODE_ERROR",
          histogramMetric: "http.server.duration"
        }
      },
      null,
      2
    );

    v12AuditFooter.textContent =
      `W3C Trace Context (${out.traceparentValid ? "inherited parent" : "new root"}): ${out.propagatedTraceparent} · Audit Ring verify_all() => ${out.auditVerifyCode}`;
  };

  if (v12QueryInput) {
    v12RunBtn.addEventListener("click", renderV12Inspector);
    v12QueryInput.addEventListener("input", renderV12Inspector);
    v12ProtoSelect.addEventListener("change", renderV12Inspector);
    v12TpInput.addEventListener("input", renderV12Inspector);
    v12CapSlider.addEventListener("input", renderV12Inspector);
    v12RefillSlider.addEventListener("input", renderV12Inspector);
    v12BurstSlider.addEventListener("input", renderV12Inspector);
    v12TamperToggle.addEventListener("change", renderV12Inspector);
  }

  // Competency matrix category filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const matrixCards = document.querySelectorAll(".matrix-card");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-filter") ?? "all";
      filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
      matrixCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        card.hidden = target !== "all" && cat !== target;
      });
    });
  });

  // Keyboard shortcut '/' focuses live simulator input
  window.addEventListener("keydown", (ev) => {
    const tag = document.activeElement?.tagName ?? "";
    if (ev.key === "/" && tag !== "INPUT" && tag !== "SELECT" && tag !== "TEXTAREA") {
      ev.preventDefault();
      activateTab("sim-pane-moe");
      queryInput.focus();
      queryInput.select();
    }
  });

  renderMoeRrf();
  renderAbDiff();
  renderP2Explorer();
  renderV12Inspector();

  // Upgrade P² Explorer & v1.2 Token-Bucket/Audit-Ring Inspector asynchronously to real Rust wasm32 binary
  instantiateWasmRuntime()
    .then(() => {
      renderP2Explorer();
      renderV12Inspector();
    })
    .catch(() => {
      // Keeps deterministic ES2022 P² & BigInt Token-Bucket mirrors active when opened via file://
    });
}

initBrowserUi();
