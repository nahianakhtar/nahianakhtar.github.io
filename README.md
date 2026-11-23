# nahianakhtar.github.io

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Architecture](https://img.shields.io/badge/UI-Dark%20Bento%20%2B%20Terminal-cyan.svg)](index.html)
[![Engine](https://img.shields.io/badge/Client%20Engine-Sparse%20MoE%20%2B%20RRF%20%2B%20A%2FB%20Diff%20%2B%20Rust%20WASM32-brightgreen.svg)](app.js)

Live interactive engineering portfolio and client-side Applied AI & Systems showcase (**v1.2.0**) for **Nahian Akhtar - Systems, Polyglot SDK & Applied AI Engineer (New York, NY)**.

---

## Interactive Browser Lab Modes (Zero External APIs · Zero Runtime Dependencies)

1. **Mode 01 - Sparse Top-2 MoE Router + Okapi BM25 / Cosine RRF (`k=60`)**: Real-time Bearer/API-key/PII scrubbing, VRAM & `p95` SLA-masked Sparse Top-2 softmax gating, and hybrid lexical + 256-dim signed n-gram retrieval (`< 0.80 ms` warm `p95`).
2. **Mode 02 (`v1.1`) - Pairwise A/B RAG Regression Diff & Rust `wasm32` `P²` Tail-Quantile Explorer**:
   - **Pairwise A/B Prompt & Chunking Diff Gate**: Evaluates paired Baseline vs. Candidate suites on Faithfulness, Context Precision (`AP@K`), `Recall@K`, chunk ID Jaccard overlap, chunk length $\Delta$, 256-dim answer cosine similarity, and paired $t$-statistics with live CI gate sliders (`PASS` vs. `REGRESSION_DETECTED`).
   - **Rust `wasm32-unknown-unknown` `P²` Tail-Quantile & CRC32C Explorer**: Executes [`assets/polyglot_agent_runtime.wasm`](assets/polyglot_agent_runtime.wasm) (`33.5 KB`, exact `512 B` `O(1)` 32-bit linear state) across `5,000-100,000` latency observations, comparing streaming `p50 / p95 / p99` estimates against exact `O(N)` sorted quantiles alongside RFC 3720 Castagnoli `CRC32C` frame sealing (`0xE3069283`).
3. **Mode 03 (`v1.2`) - MCP `2025-11-25` Citation-Span, C11/WASM `64B` Rational Token-Bucket & W3C `OTLP/JSON` Trace Waterfall Inspector**:
   - **MCP `2025-11-25` Capability Negotiation & Citation Spans**: Negotiates protocol versions (`2025-11-25` down to `2024-11-05` with automatic fallback), lists `14` structured MCP resources (`vault://documents/{doc_id}`), and computes XSS-safe `<mark>` highlighted snippets with exact 0-based `[start, end)` character offsets.
   - **Rust `wasm32` `64B` Rational Token-Bucket, `256B` Audit Ring & W3C `OTLP/JSON` Waterfall**: Executes `par_bucket_*` (`0` float drift across `1,000 x 1 ms` prime steps) and `par_audit_ring_*` (`-8` `PAR_ERR_PAYLOAD_CRC` 1-bit tamper detection) in WebAssembly linear memory while rendering a 6-span W3C `traceparent` + `OTLP/JSON` trace waterfall.

---

## Featured Flagship Repositories (`v1.2.0` Parity)

| Repository | Stack | Highlighted Empirical Metrics |
| :--- | :--- | :--- |
| [**`mcp-moe-hybrid-sdk`**](https://github.com/nahianakhtar/mcp-moe-hybrid-sdk) | Python 3.10+ · `MCP 2025-11-25` · SQLite `WAL + FTS5` | **`100%` Recall@1** (`0.361 ms` $p_{95}$), **`0.014 ms`** MoE Router $p_{95}$, FTS5 `[start,end)` citation spans, `0` external deps |
| [**`polyglot-agent-runtime-rs`**](https://github.com/nahianakhtar/polyglot-agent-runtime-rs) | Rust 2021 · ISO C11 FFI (`-Werror`) · `wasm32` | **`3.14M ops/s`** CRC32C Ring, **`12.76M ops/s`** `64B` Rational Token Bucket (`0` float drift), **`30.78M obs/s`** WASM `P²` |
| [**`fullstack-rag-eval-studio`**](https://github.com/nahianakhtar/fullstack-rag-eval-studio) | TypeScript · Node.js 22 ESM · HTTP + SSE + `/v1/traces` | **`100%` Faithfulness**, **`97.5%` AP@2**, W3C `traceparent` `OTLP/JSON` spans, `SlidingWindowTokenRateLimiter` |
| [**`nahianakhtar.github.io`**](https://github.com/nahianakhtar/nahianakhtar.github.io) | Vanilla ES2022 + Rust `wasm32` (`33.5 KB`) | **`< 0.80 ms`** MoE + RRF, A/B RAG Diff, `512 B` WASM `P²`, MCP Citation Spans & `64B` WASM Token-Bucket + OTLP Waterfall |

---

## Local Verification

```bash
node --check app.js
node scripts/verify_showcase.mjs
```

---

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Nahian Akhtar.
