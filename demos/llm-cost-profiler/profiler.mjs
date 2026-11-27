// Browser port of llmprof's core: exact cost in BigInt picodollars, nearest rank quantiles,
// and the same OpenTelemetry GenAI attribute rules as the Rust binary.

export function parseUsdMicros(input) {
  const s = String(input).trim().replace(/^\$/, "");
  if (!/^\d*(\.\d{0,6})?$/.test(s) || s === "" || s === ".") {
    throw new Error(`"${input}" is not a plain amount with at most 6 decimals`);
  }
  const [whole, frac = ""] = s.split(".");
  return BigInt(whole || "0") * 1000000n + BigInt((frac + "000000").slice(0, 6));
}

export function formatUsd(pico) {
  const micros = (pico + 500000n) / 1000000n;
  return `${micros / 1000000n}.${String(micros % 1000000n).padStart(6, "0")}`;
}

export function parsePrices(csv) {
  const exact = new Map();
  const prefix = [];
  let headerSeen = false;
  csv.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith("#")) return;
    const cols = line.split(",").map((c) => c.trim());
    if (!headerSeen) {
      headerSeen = true;
      if (cols[0].toLowerCase() === "model") return;
    }
    if (cols.length < 3) throw new Error(`prices line ${i + 1}: need model,input,output`);
    const num = (k) => (cols[k] ? parseUsdMicros(cols[k]) : null);
    const input = num(1);
    const price = { input, output: num(2), cacheRead: num(3) ?? input, cacheWrite: num(4) ?? input };
    if (cols[0].endsWith("*")) prefix.push([cols[0].slice(0, -1), price]);
    else exact.set(cols[0], price);
  });
  prefix.sort((a, b) => b[0].length - a[0].length);
  return {
    lookup(model) {
      if (exact.has(model)) return exact.get(model);
      const hit = prefix.find(([p]) => model.startsWith(p));
      return hit ? hit[1] : null;
    },
  };
}

function anyValue(v) {
  if (!v || typeof v !== "object") return null;
  if ("stringValue" in v) return v.stringValue;
  if ("intValue" in v) return Number(v.intValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("boolValue" in v) return Boolean(v.boolValue);
  return null;
}

const first = (attrs, keys) => {
  for (const k of keys) if (attrs.has(k)) return attrs.get(k);
  return undefined;
};

export function callsFromOtlp(doc) {
  const reqs = Array.isArray(doc) ? doc : [doc];
  const calls = [];
  for (const req of reqs) {
    for (const rs of req.resourceSpans ?? []) {
      for (const ss of rs.scopeSpans ?? rs.instrumentationLibrarySpans ?? []) {
        for (const span of ss.spans ?? []) {
          const attrs = new Map((span.attributes ?? []).map((kv) => [kv.key, anyValue(kv.value)]));
          const model = first(attrs, ["gen_ai.response.model", "gen_ai.request.model"]);
          const input = first(attrs, ["gen_ai.usage.input_tokens", "gen_ai.usage.prompt_tokens"]);
          const output = first(attrs, ["gen_ai.usage.output_tokens", "gen_ai.usage.completion_tokens"]);
          if (typeof model !== "string" || (input === undefined && output === undefined)) continue;
          const n = (k) => Math.max(0, Math.round(Number(first(attrs, k) ?? 0)) || 0);
          const ttfc = first(attrs, ["gen_ai.response.time_to_first_chunk"]);
          const start = BigInt(span.startTimeUnixNano ?? 0);
          const end = BigInt(span.endTimeUnixNano ?? 0);
          const code = span.status?.code;
          calls.push({
            provider: first(attrs, ["gen_ai.provider.name", "gen_ai.system"]) ?? "unknown",
            model,
            input: n(["gen_ai.usage.input_tokens", "gen_ai.usage.prompt_tokens"]),
            output: n(["gen_ai.usage.output_tokens", "gen_ai.usage.completion_tokens"]),
            cacheRead: n(["gen_ai.usage.cache_read.input_tokens"]),
            cacheWrite: n(["gen_ai.usage.cache_creation.input_tokens"]),
            durationNs: end > start ? Number(end - start) : 0,
            ttfcNs: typeof ttfc === "number" && ttfc >= 0 ? Math.round(ttfc * 1e9) : null,
            error: code === 2 || code === "STATUS_CODE_ERROR",
          });
        }
      }
    }
  }
  return calls;
}

export function quantile(sorted, q) {
  if (!sorted.length) return 0;
  const rank = Math.ceil(q * sorted.length);
  return sorted[Math.min(Math.max(rank, 1), sorted.length) - 1];
}

export function callCost(c, prices) {
  const p = prices.lookup(c.model);
  if (!p) return null;
  const cached = c.cacheRead + c.cacheWrite;
  const plain = Math.max(0, c.input - cached);
  return (
    BigInt(plain) * p.input +
    BigInt(c.cacheRead) * p.cacheRead +
    BigInt(c.cacheWrite) * p.cacheWrite +
    BigInt(c.output) * p.output
  );
}

export function buildReport(calls, prices) {
  const groups = new Map();
  for (const c of calls) {
    const key = `${c.provider}\u0000${c.model}`;
    if (!groups.has(key)) {
      groups.set(key, { provider: c.provider, model: c.model, calls: 0, errors: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, cost: 0n, priced: true, dur: [], ttfc: [] });
    }
    const g = groups.get(key);
    g.calls += 1;
    g.errors += c.error ? 1 : 0;
    g.input += c.input;
    g.output += c.output;
    g.cacheRead += c.cacheRead;
    g.cacheWrite += c.cacheWrite;
    g.dur.push(c.durationNs);
    if (c.ttfcNs !== null) g.ttfc.push(c.ttfcNs);
    const cost = callCost(c, prices);
    if (cost === null) g.priced = false;
    else g.cost += cost;
  }
  let total = 0n;
  const unpriced = [];
  const rows = [...groups.values()].sort((a, b) => (a.provider + a.model).localeCompare(b.provider + b.model));
  for (const g of rows) {
    g.dur.sort((a, b) => a - b);
    g.ttfc.sort((a, b) => a - b);
    g.cacheHit = g.input ? Math.floor((g.cacheRead * 10000) / g.input) / 10000 : 0;
    g.p50 = quantile(g.dur, 0.5);
    g.p95 = quantile(g.dur, 0.95);
    g.p99 = quantile(g.dur, 0.99);
    g.ttfcP95 = g.ttfc.length ? quantile(g.ttfc, 0.95) : null;
    if (g.priced) total += g.cost;
    else unpriced.push(g.model);
  }
  return { rows, total, unpriced, calls: calls.length, worstP95: Math.max(0, ...rows.map((r) => r.p95)) };
}

export function toCsv(report) {
  const head = "provider,model,calls,errors,input,output,cache_read,cache_write,cache_hit_ratio,cost_usd,p50_ms,p95_ms,p99_ms,ttfc_p95_ms";
  const ms = (ns) => (ns / 1e6).toFixed(3);
  const lines = report.rows.map((g) =>
    [g.provider, g.model, g.calls, g.errors, g.input, g.output, g.cacheRead, g.cacheWrite, g.cacheHit.toFixed(4),
      g.priced ? formatUsd(g.cost) : "", ms(g.p50), ms(g.p95), ms(g.p99), g.ttfcP95 === null ? "" : ms(g.ttfcP95)].join(","),
  );
  return [head, ...lines].join("\n") + "\n";
}

// Deterministic sample traffic: xorshift so every visitor sees the same numbers for the same seed.
export function sampleTraces(seed = 7, count = 240, cacheOn = true) {
  let x = seed >>> 0 || 1;
  const rnd = () => {
    x ^= x << 13; x >>>= 0; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
    return x / 4294967296;
  };
  const models = [
    { name: "example-large-model", share: 0.35, inMin: 6000, inMax: 24000, out: 900, ms: 2400, ttfc: 0.55 },
    { name: "example-small-2", share: 0.55, inMin: 800, inMax: 4000, out: 220, ms: 520, ttfc: 0.12 },
    { name: "example-reasoning-1", share: 0.10, inMin: 3000, inMax: 9000, out: 2600, ms: 9000, ttfc: 2.4 },
  ];
  const spans = [];
  let t = 1764200000000000000n;
  for (let i = 0; i < count; i++) {
    const r = rnd();
    const m = r < models[0].share ? models[0] : r < models[0].share + models[1].share ? models[1] : models[2];
    const input = Math.round(m.inMin + rnd() * (m.inMax - m.inMin));
    const cacheShare = 0.55 + rnd() * 0.35; // always drawn, so cache off changes nothing else
    const cacheRead = cacheOn ? Math.round(input * cacheShare) : 0;
    const output = Math.round(m.out * (0.4 + rnd() * 1.2));
    const tail = rnd() < 0.06 ? 3 + rnd() * 3 : 1;
    const durMs = m.ms * (0.6 + rnd() * 0.8) * tail;
    const ttfc = m.ttfc * (0.7 + rnd() * 0.6) * (tail > 1 ? 2 : 1);
    const start = t;
    t += BigInt(Math.round(durMs * 1e6));
    const attrs = [
      ["gen_ai.provider.name", { stringValue: "example" }],
      ["gen_ai.operation.name", { stringValue: "chat" }],
      ["gen_ai.request.model", { stringValue: m.name }],
      ["gen_ai.usage.input_tokens", { intValue: String(input) }],
      ["gen_ai.usage.output_tokens", { intValue: String(output) }],
      ["gen_ai.usage.cache_read.input_tokens", { intValue: String(cacheRead) }],
      ["gen_ai.response.time_to_first_chunk", { doubleValue: Number(ttfc.toFixed(4)) }],
    ].map(([key, value]) => ({ key, value }));
    const span = { name: `chat ${m.name}`, startTimeUnixNano: String(start), endTimeUnixNano: String(t), attributes: attrs };
    if (rnd() < 0.02) span.status = { code: 2 };
    spans.push(span);
  }
  return { resourceSpans: [{ resource: { attributes: [] }, scopeSpans: [{ scope: { name: "sample" }, spans }] }] };
}

export const SAMPLE_PRICES = `model,input,output,cache_read,cache_write
example-large-model,3.00,15.00,0.30,3.75
example-small-*,0.25,1.25,0.025,0.3125
example-reasoning-1,1.10,4.40,0.275,1.10
`;
