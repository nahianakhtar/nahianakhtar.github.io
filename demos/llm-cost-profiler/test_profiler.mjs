import assert from "node:assert/strict";
import test from "node:test";
import { buildReport, callsFromOtlp, formatUsd, parsePrices, parseUsdMicros, quantile, sampleTraces, SAMPLE_PRICES, toCsv } from "./profiler.mjs";

// The same document and expected numbers as the Rust test suite, so both stay in step.
const DOC = {
  resourceSpans: [{ scopeSpans: [{ spans: [
    { name: "chat acme-large", startTimeUnixNano: "1000000000", endTimeUnixNano: "3500000000", attributes: [
      { key: "gen_ai.provider.name", value: { stringValue: "acme" } },
      { key: "gen_ai.request.model", value: { stringValue: "acme-large" } },
      { key: "gen_ai.usage.input_tokens", value: { intValue: "12000" } },
      { key: "gen_ai.usage.output_tokens", value: { intValue: 800 } },
      { key: "gen_ai.usage.cache_read.input_tokens", value: { intValue: "10000" } },
      { key: "gen_ai.response.time_to_first_chunk", value: { doubleValue: 0.5 } },
    ] },
    { name: "chat acme-small", startTimeUnixNano: "0", endTimeUnixNano: "400000000", status: { code: 2 }, attributes: [
      { key: "gen_ai.system", value: { stringValue: "acme" } },
      { key: "gen_ai.response.model", value: { stringValue: "acme-small-2" } },
      { key: "gen_ai.usage.prompt_tokens", value: { intValue: "1000" } },
      { key: "gen_ai.usage.completion_tokens", value: { intValue: "200" } },
    ] },
    { name: "db query", startTimeUnixNano: "0", endTimeUnixNano: "5", attributes: [] },
  ] }] }],
};
const PRICES = "model,input,output,cache_read,cache_write\nacme-large,3.00,15.00,0.30,3.75\nacme-small-*,0.25,1.25,0.025,0.3125\n";

test("matches the Rust implementation on the shared fixture", () => {
  const calls = callsFromOtlp(DOC);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].error, true);
  const r = buildReport(calls, parsePrices(PRICES));
  assert.equal(formatUsd(r.total), "0.021500");
  assert.equal(r.rows[0].cacheHit, 0.8333);
  assert.equal(r.rows[0].ttfcP95, 500000000);
});

test("money parsing is exact and strict", () => {
  assert.equal(parseUsdMicros("15.000125"), 15000125n);
  assert.equal(parseUsdMicros(".5"), 500000n);
  assert.throws(() => parseUsdMicros("1.0000001"));
  assert.throws(() => parseUsdMicros("abc"));
});

test("nearest rank quantiles", () => {
  const v = Array.from({ length: 100 }, (_, i) => i + 1);
  assert.equal(quantile(v, 0.95), 95);
  assert.equal(quantile([7], 0.99), 7);
});

test("sample traffic is deterministic and cache matters", () => {
  const prices = parsePrices(SAMPLE_PRICES);
  const a = buildReport(callsFromOtlp(sampleTraces(7)), prices);
  const b = buildReport(callsFromOtlp(sampleTraces(7)), prices);
  assert.equal(formatUsd(a.total), formatUsd(b.total));
  const off = buildReport(callsFromOtlp(sampleTraces(7, 240, false)), prices);
  assert.ok(off.total > a.total, "turning the cache off must cost more");
  assert.equal(off.worstP95, a.worstP95, "cache off must keep the same traffic");
  assert.equal(off.calls, a.calls);
  assert.ok(toCsv(a).startsWith("provider,model,"));
});
