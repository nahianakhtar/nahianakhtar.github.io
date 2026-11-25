# nahianakhtar.github.io

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Architecture](https://img.shields.io/badge/UI-Dark%20Bento%20%2B%20Terminal-cyan.svg)](index.html)
[![Engine](https://img.shields.io/badge/Client%20Engine-Sparse%20MoE%20%2B%20RRF%20%2B%20A%2FB%20Diff%20%2B%20Rust%20WASM32-brightgreen.svg)](app.js)

Live interactive engineering portfolio and client-side Applied AI & Systems showcase (**v1.8.0**) for **Nahian Akhtar - Systems, Polyglot SDK & Applied AI Engineer (New York, NY)**.

---

## Interactive Browser Lab Modes (Zero External APIs · Zero Runtime Dependencies)

1. **Mode 01 - Sparse Top-2 MoE Router + Okapi BM25 / Cosine RRF (`k=60`)**: Real-time Bearer/API-key/PII scrubbing, VRAM & `p95` SLA-masked Sparse Top-2 softmax gating, and hybrid lexical + 256-dim signed n-gram retrieval (`< 0.80 ms` warm `p95`).
2. **Mode 02 (`v1.1`) - Pairwise A/B RAG Regression Diff & Rust `wasm32` `P²` Tail-Quantile Explorer**:
   - **Pairwise A/B Prompt & Chunking Diff Gate**: Evaluates paired Baseline vs. Candidate suites on Faithfulness, Context Precision (`AP@K`), `Recall@K`, chunk ID Jaccard overlap, chunk length $\Delta$, 256-dim answer cosine similarity, and paired $t$-statistics with live CI gate sliders (`PASS` vs. `REGRESSION_DETECTED`).
   - **Rust `wasm32-unknown-unknown` `P²` Tail-Quantile & CRC32C Explorer**: Executes [`assets/polyglot_agent_runtime.wasm`](assets/polyglot_agent_runtime.wasm) (`67.2 KB`, exact `512 B` `O(1)` 32-bit linear state) across `5,000-100,000` latency observations, comparing streaming `p50 / p95 / p99` estimates against exact `O(N)` sorted quantiles alongside RFC 3720 Castagnoli `CRC32C` frame sealing (`0xE3069283`).
3. **Mode 03 (`v1.2`) - MCP `2025-11-25` Citation-Span, C11/WASM `64B` Rational Token-Bucket & W3C `OTLP/JSON` Trace Waterfall Inspector**:
   - **MCP `2025-11-25` Capability Negotiation & Citation Spans**: Negotiates protocol versions (`2025-11-25` down to `2024-11-05` with automatic fallback), lists `14` structured MCP resources (`vault://documents/{doc_id}`), and computes XSS-safe `<mark>` highlighted snippets with exact 0-based `[start, end)` character offsets.
   - **Rust `wasm32` `64B` Rational Token-Bucket, `256B` Audit Ring & W3C `OTLP/JSON` Waterfall**: Executes `par_bucket_*` (`0` float drift across `1,000 x 1 ms` prime steps) and `par_audit_ring_*` (`-8` `PAR_ERR_PAYLOAD_CRC` 1-bit tamper detection) in WebAssembly linear memory while rendering a 6-span W3C `traceparent` + `OTLP/JSON` trace waterfall.
4. **Mode 04 (`v1.3`) - MCP `2025-11-25` Streamable HTTP Batch/SSE Dispatcher & Cross-Language W3C `CRC32C` Child-Span Lineage Verifier**:
   - **Streamable HTTP JSON-RPC 2.0 Batching & SSE Framing**: Evaluates mixed request/notification arrays (JSON-RPC 2.0 §6 notification elision, `202 Accepted` notification batches, `400 / -32600` `maxBatchSize` DoS guard, non-penalizing `429 / -32029` `SlidingWindowTokenRateLimiter` with `Retry-After`, and `Accept: text/event-stream` SSE framing) while sealing traced `256B` `CapabilityAuditRing` slots correlated by 16-byte binary `trace_id` (`par_audit_ring_count_trace`).
   - **5-Runtime Bit-Identical Castagnoli `CRC32C` Child-Span Lineage**: Executes `par_wasm_trace_derive_child` (`32B` 16B-aligned `ParTraceContext`) in WebAssembly linear memory alongside an ES2022 mirror, proving bit-for-bit `span_id` parity across ISO C11, Rust 2021, `wasm32`, Python 3.12 (`mcp-moe-hybrid-sdk`), and Node.js 22 (`fullstack-rag-eval-studio`).
5. **Mode 05 (`v1.4`) - JSON-Schema Draft `2020-12` `outputSchema` `structuredContent` & Cooperative `notifications/cancelled` Lab**:
   - **Zero-Dependency JSON-Schema Draft `2020-12` Contract Gate**: Enforces strict `boolean` vs `integer`/`number` separation, `prefixItems` + `items: false` closed tuples, `allOf`/`anyOf`/`oneOf`/`not` composition, `-32602` `inputSchema` rejection, and `-32603` post-condition `outputSchema` drift protection across MCP `structuredContent` payloads.
   - **Cooperative `notifications/cancelled` Registry & Pre-Arrival Tombstones**: Evaluates `AbortController`-backed `CancellationToken` lifecycles with pre-arrival tombstones (`202 Accepted` out-of-order stream abort), `initialize` immunity, strict `int` vs `string` `requestId` isolation, sibling batch elision, and traced `256B` WASM `CapabilityAuditRing` cancellation slots.
6. **Mode 06 (`v1.5`) - MCP `2025-11-25` `16B` `CRC32C` Cursor Tamper Matrix, `completion/complete` & Subscriptions Lab**:
   - **5-Runtime Bit-Identical `16B` `ParCursorToken` / `McpCursorCodec`**: Verifies canonical `22`-char RFC 4648 §5 base64url cursor `Q1ABAjIAAACDkgbjJBoL9w` (`0xF70B1A24`), exhaustive `128/128` single-bit flips (`-17`), `15/15` non-canonical trailing sextet mutations (`-13`), cross-scope replay (`-15`), and mid-pagination `rag_upsert_document` snapshot drift (`-16`).
   - **`completion/complete`, `resources/subscribe`, RFC 5424 `logging/setLevel` & `ToolAnnotations`**: Evaluates `<= 100` capped completions (`hasMore`), PII-scrubbed prompt completions, subscribed URI `notifications/resources/updated`, and RFC 5424 8-level log severity filtering.
7. **Mode 07 (`v1.6`) - MCP `2025-11-25` Monotonic `notifications/progress` SSE & RFC 8089 `roots/list` Boundary Confinement Lab**:
   - **WASM `2,112B` `ParProgressTable` & Monotonic `notifications/progress` SSE**: Executes C11/Rust/WASM `par_wasm_progress_*_int` alongside ES2022 `ProgressTokenRegistry` (`int(42)` vs `str("42")` key isolation, duplicate active rejection `-23`, strict monotonicity `-27`, immutable `total` ceiling `-28`, post-cancellation silencing `-26`, and SSE progress frame interleaving).
   - **RFC 8089 `file://` Canonicalizer & `roots/list` Confinement (`-19`..`-22`)**: Executes `par_wasm_uri_normalize_file` and `par_wasm_uri_is_within_root` in WebAssembly linear memory alongside `WorkspaceRootsGuard`, blocking sibling-prefix collisions (`-22` / JSON-RPC `-32003`), `..` root escapes (`-20`), non-local authorities (`-21`), and `%2f`/`%5c`/`%00` smuggling (`-19`).
8. **Mode 08 (`v1.7`) - MCP `2025-11-25` `elicitation/create` Flat-Schema & `sampling/createMessage` Human-in-the-Loop Governance Lab**:
   - **WASM `2,112B` `ParApprovalTable` & `sampling/createMessage` HITL Fence (`-29`..`-34`)**: Executes C11/Rust/WASM `par_wasm_approval_*_int` and `par_wasm_sampling_check_budget` alongside `SamplingGovernanceGuard` and `HumanApprovalRegistry` (`int(77)` vs `str("77")` dual-seeded `CRC32C` key isolation, duplicate pending rejection `-29`, `maxTokens` ceiling / `[0,1]` priority / `includeContext` fence `-34`, single-resolution replay block `-32`, fail-closed TTL expiry `-33`, user decline `-1`, and unnegotiated capability fence `-32004`).
   - **MCP `2025-11-25` `elicitation/create` Flat-Schema & Secret Scrubber (`-35`)**: Enforces flat scalar primitive `requestedSchema` definitions (`string|number|integer|boolean`, `enumNames`, `email|uri|date|date-time`), canonical JSON `CRC32C` schema sealing, rejection of nested objects/arrays/`$ref`/combinators (`-35`), and inline API-key/Bearer redaction on accepted responses.
9. **Mode 09 (`v1.8`) - MCP `2025-11-25` Streamable `Mcp-Session-Id` SSE Event-Ring Replay & `21B` `CRC32C` `ResourceLink` Provenance Lab**:
   - **WASM `2,112B` `ParSessionTable` & `Last-Event-ID` SSE Replay (`-36`..`-41`)**: Executes C11/Rust/WASM `par_wasm_session_*` alongside `StreamableSessionRegistry` (dual-seeded `SID1`/`SID2` `CRC32C` client-bound `Mcp-Session-Id` verification, `SEVT`-sealed `Last-Event-ID` SSE ring replay, `-39` cross-tenant hijack block, `-41` HTTP `409` evicted-cursor gap detection, and `DELETE` `204` -> `-37` HTTP `404` session termination).
   - **`21B` `RLNK` `ResourceLink` Provenance Seal & Leap-Year `Annotations` / Media Guard (`-42`)**: Executes `par_wasm_seal_resource_link` (`0x119980AF` canonical `rs-c11-ring` vector) and `par_wasm_validate_annotations` alongside `ContentAnnotationGuard` (leap-year ISO-8601 UTC calendar checks, RFC 8089 `file://` root confinement, and canonical RFC 4648 Base64 audio/image validation).

---

## Featured Flagship Repositories (`v1.8.0` Parity)

| Repository | Stack | Highlighted Empirical Metrics |
| :--- | :--- | :--- |
| [**`mcp-moe-hybrid-sdk`**](https://github.com/nahianakhtar/mcp-moe-hybrid-sdk) | Python 3.10+ · `MCP 2025-11-25` · SQLite `WAL + FTS5` | **`100%` Recall@1** (`0.291 ms` $p_{95}$), **`0.010 ms`** MoE Router $p_{95}$, `Mcp-Session-Id` SSE replay & `ResourceLink` seal (`40/40` tests), `0` external deps |
| [**`polyglot-agent-runtime-rs`**](https://github.com/nahianakhtar/polyglot-agent-runtime-rs) | Rust 2021 · ISO C11 FFI (`-Werror`) · `wasm32` | **`33.19M ops/s`** `ParApprovalTable`, **`7.64M ops/s`** `2,112B` `ParSessionTable` + `21B` `RLNK` seal, **`13.78M ops/s`** `64B` Rational Token Bucket (`0` float drift) |
| [**`fullstack-rag-eval-studio`**](https://github.com/nahianakhtar/fullstack-rag-eval-studio) | TypeScript · Node.js 22 ESM · HTTP + SSE + `/v1/traces` | **`100%` Faithfulness**, **`97.5%` AP@2**, `Mcp-Session-Id` & `Last-Event-ID` SSE replay (`33/33` `node:test` suites), `WorkspaceRootsGuard`, `SlidingWindowTokenRateLimiter` |
| [**`zero-to-code-systems-lab`**](https://github.com/nahianakhtar/zero-to-code-systems-lab) | Zero-Dep ES5/SVG · Native C# x64 WebView2 · Inno Setup | **100% Air-Gapped (`0` Net Calls)**, `100` CS Concepts (`300+` variants), Scoped Keystroke Dynamics, [Live Lab](https://nahianakhtar.github.io/zero-to-code-systems-lab/) & [Win x64 Installer/Portable](https://github.com/nahianakhtar/zero-to-code-systems-lab/releases/latest) |
| [**`nahianakhtar.github.io`**](https://github.com/nahianakhtar/nahianakhtar.github.io) | Vanilla ES2022 + Rust `wasm32` (`67.2 KB`) | **`< 0.80 ms`** MoE + RRF, 9 interactive systems/MCP lab modes, `68,842 B` Rust `wasm32` runtime, WCAG AA |

---

## Local Verification

```bash
node --check app.js
node scripts/verify_showcase.mjs
```

---

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Nahian Akhtar.
