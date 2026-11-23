/**
 * Client-Side Sparse Top-2 MoE Router + Okapi BM25 & 256-dim Cosine RRF Engine
 * Zero external API keys · Zero runtime dependencies · Deterministic ES2022
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
    title: "Streaming Jain-Chlamtac P2 Tail-Latency Quantiles",
    tags: ["quantiles", "p95", "p99", "streaming", "telemetry", "latency"],
    body: "Tracks p50, p95, and p99 tail latencies dynamically using five piecewise-parabolic markers in exact 560-byte O(1) constant state at 38.01M observations/sec (26.3 ns/obs)."
  },
  {
    id: "py-mcp-protocol",
    repo: "mcp-moe-hybrid-sdk",
    title: "Model Context Protocol (MCP 2025-11-25) JSON-RPC 2.0 Server",
    tags: ["mcp", "jsonrpc", "python", "agents", "tools", "protocol"],
    body: "Implements MCP 2025-11-25 initialize, tools/list, and tools/call dispatch over loopback-safe HTTP with deterministic secret/Bearer/PII scrubbing prior to handler execution."
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
    body: "Streams route, context, token delta, and live cache/breaker telemetry frames over text/event-stream alongside REST /health and /v1/evaluate endpoints with strict .d.ts contracts."
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
    title: "Golden RAG Evaluation Runner (Faithfulness, AP@K, Recall@K)",
    tags: ["eval", "faithfulness", "precision", "recall", "rag", "benchmark"],
    body: "Scores claim-level faithfulness entailment, rank-weighted Average Precision (AP@K), and Recall@K at 7,623.5 cases/sec (0.3362ms p95) with 96.7% cosine n-gram LRU cache hit rate."
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
    keywords: ["c11", "ffi", "rust", "crc32c", "cache", "ring", "dag", "quantiles", "p95", "p99", "black-scholes", "convexity", "ieee754", "math"]
  },
  {
    id: "exp-vulkan-dense",
    name: "Expert 1 · Compact Dense Vulkan Tier (<= 5.2 GiB)",
    minVramGib: 4.0,
    estP95Ms: 180,
    keywords: ["sse", "stream", "node", "typescript", "schema", "pii", "token", "cache", "http", "api", "uia", "ci"]
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
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "how", "in",
  "into", "is", "it", "of", "on", "or", "that", "the", "to", "via", "with"
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

  // Sort to pick Top-2 sparse gates, then softmax-normalize across the active Top-2
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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function initBrowserUi() {
  if (typeof document === "undefined") return;

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

  const render = () => {
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

  runBtn.addEventListener("click", render);
  queryInput.addEventListener("input", render);
  vramSlider.addEventListener("input", render);
  slaSlider.addEventListener("input", render);

  document.querySelectorAll(".preset-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      queryInput.value = chip.getAttribute("data-query") ?? "";
      render();
    });
  });

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
    if (ev.key === "/" && document.activeElement !== queryInput) {
      ev.preventDefault();
      queryInput.focus();
      queryInput.select();
    }
  });

  render();
}

initBrowserUi();
