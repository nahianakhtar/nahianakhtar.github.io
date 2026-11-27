import { buildReport, callsFromOtlp, formatUsd, parsePrices, parseUsdMicros, sampleTraces, SAMPLE_PRICES, toCsv } from "./profiler.mjs";

const $ = (id) => document.getElementById(id);
let seed = 7;
let lastReport = null;

function parseTraceText(text) {
  const t = text.trim();
  if (!t) return [];
  try {
    return callsFromOtlp(JSON.parse(t));
  } catch {
    const calls = [];
    t.split(/\r?\n/).forEach((line, i) => {
      if (!line.trim()) return;
      try {
        calls.push(...callsFromOtlp(JSON.parse(line)));
      } catch {
        throw new Error(`Line ${i + 1} is not OTLP JSON`);
      }
    });
    return calls;
  }
}

const ms = (ns) => (ns / 1e6).toFixed(1);
const fmtInt = (n) => n.toLocaleString("en-US");

function render(report, elapsed) {
  $("kCost").textContent = `$${formatUsd(report.total)}`;
  $("kCalls").textContent = fmtInt(report.calls);
  $("kP95").textContent = `${ms(report.worstP95)} ms`;
  $("kTime").textContent = `${elapsed.toFixed(2)} ms`;

  const maxCost = report.rows.reduce((m, r) => (r.cost > m ? r.cost : m), 0n) || 1n;
  const body = $("rows");
  body.replaceChildren();
  for (const r of report.rows) {
    const tr = document.createElement("tr");
    const share = Number((r.cost * 1000n) / maxCost) / 10;
    const cells = [
      null,
      fmtInt(r.calls),
      fmtInt(r.input),
      fmtInt(r.output),
      `${(r.cacheHit * 100).toFixed(1)}%`,
      r.priced ? formatUsd(r.cost) : "no price",
      ms(r.p50),
      ms(r.p95),
      ms(r.p99),
      r.ttfcP95 === null ? "n/a" : ms(r.ttfcP95),
    ];
    cells.forEach((v, i) => {
      const td = document.createElement("td");
      if (i === 0) {
        td.textContent = r.model;
        const bar = document.createElement("div");
        bar.className = "bar";
        const fill = document.createElement("i");
        fill.style.width = `${r.priced ? share : 0}%`;
        bar.append(fill);
        td.append(bar);
      } else {
        td.textContent = v;
      }
      tr.append(td);
    });
    body.append(tr);
  }

  const gate = $("gate");
  const problems = [];
  try {
    const limit = parseUsdMicros($("maxCost").value) * 1000000n;
    if (report.total > limit) problems.push(`cost $${formatUsd(report.total)} is over the $${formatUsd(limit)} budget (exit 3)`);
  } catch (e) {
    problems.push(e.message);
  }
  const p95Raw = $("maxP95").value.trim();
  const p95Limit = Number(p95Raw);
  if (!/^[0-9]+(?:\.[0-9]+)?$/.test(p95Raw) || !Number.isFinite(p95Limit) || p95Limit <= 0 || p95Limit > Number.MAX_SAFE_INTEGER / 1e6) {
    problems.push("p95 budget must be a finite positive number of milliseconds");
  } else if (report.worstP95 > p95Limit * 1e6) {
    problems.push(`worst p95 ${ms(report.worstP95)} ms is over ${p95Limit} ms (exit 4)`);
  }
  if (report.unpriced.length) problems.push(`no price for ${report.unpriced.join(", ")}`);
  gate.className = `gate ${problems.length ? "fail" : "pass"}`;
  gate.textContent = problems.length ? `Over budget: ${problems.join("; ")}` : "Within budget (exit 0)";
  $("cliCost").textContent = $("maxCost").value;
  $("cliP95").textContent = $("maxP95").value;
}

function run() {
  $("err").textContent = "";
  const t0 = performance.now();
  try {
    const calls = parseTraceText($("traces").value);
    const report = buildReport(calls, parsePrices($("prices").value));
    lastReport = report;
    render(report, performance.now() - t0);
  } catch (e) {
    lastReport = null;
    $("err").textContent = e.message;
    $("gate").className = "gate fail";
    $("gate").textContent = "Invalid input — no valid current report";
    $("rows").replaceChildren();
    for (const id of ["kCost", "kCalls", "kP95", "kTime"]) $(id).textContent = "—";
  }
}

function loadSample(cacheOn) {
  $("traces").value = JSON.stringify(sampleTraces(seed, 240, cacheOn));
  run();
}

$("run").addEventListener("click", run);
$("sample").addEventListener("click", () => {
  seed = (seed * 48271) % 2147483647;
  loadSample(true);
});
$("nocache").addEventListener("click", () => loadSample(false));
$("maxCost").addEventListener("input", () => lastReport && render(lastReport, 0));
$("maxP95").addEventListener("input", () => lastReport && render(lastReport, 0));
$("csv").addEventListener("click", () => {
  if (!lastReport) return;
  const url = URL.createObjectURL(new Blob([toCsv(lastReport)], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "llm-cost-report.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
$("file").addEventListener("change", async (ev) => {
  const f = ev.target.files?.[0];
  if (!f) return;
  $("traces").value = await f.text();
  run();
});

$("prices").value = SAMPLE_PRICES;
loadSample(true);
