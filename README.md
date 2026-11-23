# nahianakhtar.github.io

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Architecture](https://img.shields.io/badge/UI-Dark%20Bento%20%2B%20Terminal-cyan.svg)](index.html)
[![Engine](https://img.shields.io/badge/Client%20Engine-Sparse%20MoE%20%2B%20BM25%2FCosine%20RRF-brightgreen.svg)](app.js)

Live interactive engineering portfolio and client-side Applied AI systems showcase for **Nahian Akhtar — Systems, Polyglot SDK & Applied AI Engineer (New York, NY)**.

---

## Featured Flagship Repositories

| Repository | Stack | Highlighted Empirical Metrics |
| :--- | :--- | :--- |
| [**`mcp-moe-hybrid-sdk`**](https://github.com/nahianakhtar/mcp-moe-hybrid-sdk) | Python 3.10+ · `MCP 2025-11-25` · SQLite `WAL + FTS5` | **`100%` Recall@1** (`0.4660 ms` $p_{95}$), **`0.0122 ms`** MoE Router $p_{95}$, `0` external deps |
| [**`polyglot-agent-runtime-rs`**](https://github.com/nahianakhtar/polyglot-agent-runtime-rs) | Rust 2021 · ISO C11 FFI (`-Werror`) · `#[repr(C, align(64))]` | **`2.94M ops/s`** CRC32C Ring (`0.3819 µs` $p_{95}$), **`432.9K DAGs/s`**, **`38.01M obs/s`** `P²` (`560 B` `O(1)`) |
| [**`fullstack-rag-eval-studio`**](https://github.com/nahianakhtar/fullstack-rag-eval-studio) | TypeScript · Node.js 22 ESM · HTTP + SSE | **`100%` Faithfulness**, **`97.5%` AP@2**, **`0.3362 ms`** $p_{95}$ (`7,623.5 cases/s`), `0` external deps |
| [**`nahianakhtar.github.io`**](https://github.com/nahianakhtar/nahianakhtar.github.io) | Vanilla ES2022 · Responsive Bento/Terminal | **`< 0.80 ms`** in-browser Sparse Top-2 MoE + BM25/Cosine RRF (`k=60`), `12`-Dimension Competency Matrix |

---

## Local Verification

```bash
node --check app.js
node scripts/verify_showcase.mjs
```

---

## License

Released under the [MIT License](LICENSE). Copyright (c) 2026 Nahian Akhtar.
