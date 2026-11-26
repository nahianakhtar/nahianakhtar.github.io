import test from "node:test";
import assert from "node:assert/strict";
import {
  AhoCorasickAutomaton,
  LedgerJournal,
  P2QuantileEstimator,
  RationalTokenBucket,
  SECRET_PII_PATTERNS,
  buildMerkleTree,
  computeSha256Hex,
  computeSimHash64,
  crc32c,
  flipBit64,
  formatMicroUsd,
  getMerkleProof,
  hammingDistance64,
  hybridRrfSearch,
  kahnTopoSort,
  logicalToPhysicalPoint,
  packRingSlot64,
  parseMicroUsd,
  physicalToLogicalPoint,
  reconcileCsvEntries,
  roundHalfEvenCents,
  routeSparseTop2Moe,
  runGuardrailBenchmark120,
  scanAndRedactWithAutomaton,
  solveMonitorTransition,
  validateRingSlot64,
  verifyBoundingBoxHitTest,
  verifyMerkleProof
} from "./algorithms.mjs";

function makeRng(seed = 1337) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s;
  };
}

test("128-bit micro-dollar ledger maintains 0.000000 drift across 1,000 postings + Merkle tamper check", () => {
  const rng = makeRng(20261126);
  const journal = new LedgerJournal();
  const accounts = ["Cash", "StripeACH", "UpworkEscrow", "ServiceRevenue", "TaxReserve35"];
  for (let i = 0; i < 1000; i += 1) {
    const a = accounts[rng() % accounts.length];
    let b = accounts[rng() % accounts.length];
    if (a === b) b = accounts[(accounts.indexOf(a) + 1) % accounts.length];
    const amt = BigInt((rng() % 500000) + 1) * 100n;
    journal.postEntry({
      id: `J-${i}`,
      date: "2026-11-26",
      accountDebit: a,
      accountCredit: b,
      amountMicro: amt,
      memo: `batch_${i}`
    });
  }
  assert.equal(journal.trialBalanceDriftMicro(), 0n);
  assert.equal(formatMicroUsd(parseMicroUsd("1234.567890")), "$1,234.567890");
  assert.equal(roundHalfEvenCents(parseMicroUsd("10.005000")), 1000n);
  assert.equal(roundHalfEvenCents(parseMicroUsd("10.015000")), 1002n);

  const leaves = journal.canonicalLeaves().slice(0, 16);
  const tree = buildMerkleTree(leaves);
  const proof = getMerkleProof(tree.levels, 5);
  assert.equal(verifyMerkleProof(leaves[5], proof, tree.root), true);
  assert.equal(verifyMerkleProof(`${leaves[5]}_tampered`, proof, tree.root), false);

  const rec = reconcileCsvEntries(
    [{ id: "INV-1", counterparty: "Acme Corp", reference: "REF-99", amountMicro: parseMicroUsd("450.00") }],
    [{ id: "BNK-9", counterparty: "Acme Corp", reference: "REF-99", amountMicro: parseMicroUsd("450.00") }]
  );
  assert.equal(rec.matched.length, 1);
  assert.equal(rec.matched[0].deltaMicro, 0n);
});

test("Castagnoli CRC32C canonical vector & 1,000 single-bit flip detections in 64-byte ring slot", () => {
  assert.equal(crc32c("123456789"), 0xe3069283);
  const slot = packRingSlot64({
    seq: 42n,
    tsNs: 1764172800000000000n,
    capMask: 0x0fn,
    payloadText: "crc_ring_ok"
  });
  assert.equal(slot.byteLength, 64);
  const clean = validateRingSlot64(slot);
  assert.equal(clean.valid, true);
  assert.equal(clean.payloadText, "crc_ring_ok");

  const rng = makeRng(4242);
  for (let i = 0; i < 1000; i += 1) {
    // Flip any byte in [0..47] or active payload bytes [48..58]
    const bIdx = i % 59;
    const bit = rng() % 8;
    const corrupted = flipBit64(slot, bIdx, bit);
    const out = validateRingSlot64(corrupted);
    assert.equal(out.valid, false, `Expected tamper detection at byte=${bIdx}, bit=${bit}`);
  }
});

test("Kahn DAG topological invariant (1,000 graphs), P2 monotonicity & RationalTokenBucket zero drift", () => {
  const rng = makeRng(9991);
  for (let t = 0; t < 1000; t += 1) {
    const nodes = Array.from({ length: 8 }, (_, i) => ({ id: `N${i}`, capMask: 0x03n }));
    const edges = [];
    for (let u = 0; u < 8; u += 1) {
      for (let v = u + 1; v < 8; v += 1) {
        if ((rng() % 3) === 0) edges.push([`N${u}`, `N${v}`]);
      }
    }
    const res = kahnTopoSort(nodes, edges, 0x03n);
    assert.equal(res.complete, true);
    assert.equal(res.hasCycle, false);
    const pos = new Map(res.order.map((id, idx) => [id, idx]));
    for (const [u, v] of edges) {
      assert.ok(pos.get(u) < pos.get(v), "Edge ordering violated");
    }
  }
  const cyc = kahnTopoSort([{ id: "A", capMask: 1n }, { id: "B", capMask: 1n }], [["A", "B"], ["B", "A"]], 1n);
  assert.equal(cyc.hasCycle, true);

  const p50 = new P2QuantileEstimator(0.5);
  const p95 = new P2QuantileEstimator(0.95);
  const p99 = new P2QuantileEstimator(0.99);
  for (let i = 1; i <= 5000; i += 1) {
    const val = (rng() % 1000) + (i % 7);
    p50.observe(val);
    p95.observe(val);
    p99.observe(val);
  }
  assert.ok(p50.min() <= p50.estimate());
  assert.ok(p50.estimate() <= p95.estimate());
  assert.ok(p95.estimate() <= p99.estimate());
  assert.ok(p99.estimate() <= p99.max());

  const bucket = new RationalTokenBucket(10, 1000, 3);
  assert.equal(bucket.tryAcquire(5, 0), true);
  assert.equal(bucket.tryAcquire(6, 0), false);
  assert.equal(bucket.tryAcquire(1, 50), true);
});

test("Aho-Corasick 100% recall across 1,000 secret payloads, SimHash & 120-case benchmark", () => {
  const auto = new AhoCorasickAutomaton(SECRET_PII_PATTERNS);
  const rng = makeRng(777);
  let detected = 0;
  for (let i = 0; i < 1000; i += 1) {
    const tok = (rng() >>> 0).toString(36).padStart(8, "x");
    const samples = [
      `secret=sk-test${tok}1234`,
      `pat=ghp_token${tok}abcdef`,
      `key=AKIAIOSFODNN7EXAMPLE`,
      `jwt=eyJhbGciOiJIUzI1NiJ9.${tok}.sig`
    ];
    const sample = samples[i % samples.length];
    const out = scanAndRedactWithAutomaton(sample, auto);
    if (!out.clean && out.prefixHits.length > 0) detected += 1;
  }
  assert.equal(detected, 1000);

  const h1 = computeSimHash64("Rust C11 FFI 64 byte CRC32C telemetry ring buffer");
  const h2 = computeSimHash64("Rust C11 FFI 64 byte CRC32C telemetry ring vault");
  const h3 = computeSimHash64("SQLite FTS5 Okapi BM25 dense vector reciprocal rank fusion");
  assert.equal(hammingDistance64(h1, h1), 0);
  assert.ok(hammingDistance64(h1, h2) < hammingDistance64(h1, h3));

  const bench = runGuardrailBenchmark120();
  assert.equal(bench.cases, 120);
  assert.equal(bench.recall, 1.0);
  assert.equal(bench.precision, 1.0);
});

test("Per-Monitor V2 UIA DPI bijection (96..216 DPI) & bounding-box hit-test parity", () => {
  for (const dpi of [96, 120, 144, 168, 192, 216]) {
    const p = logicalToPhysicalPoint({ xCss: 320, yCss: 240, clientOriginPhysX: 100, clientOriginPhysY: 80, dpi });
    const back = physicalToLogicalPoint({ xPhys: p.xPhys, yPhys: p.yPhys, clientOriginPhysX: 100, clientOriginPhysY: 80, dpi });
    assert.ok(Math.abs(back.xCss - 320) <= 1.0);
    assert.ok(Math.abs(back.yCss - 240) <= 1.0);
    const hit = verifyBoundingBoxHitTest({
      xCss: 150,
      yCss: 90,
      boxCss: { x: 100, y: 60, w: 120, h: 80 },
      dpi
    });
    assert.equal(hit.cssHit, true);
    assert.equal(hit.physHit, true);
    assert.equal(hit.parity, true);
  }
  const mon = solveMonitorTransition({
    xCss: 200,
    yCss: 150,
    monitors: [
      { id: "Primary", originPhysX: 0, originPhysY: 0, widthPhys: 2560, heightPhys: 1440, dpi: 120 },
      { id: "Secondary", originPhysX: 2560, originPhysY: 0, widthPhys: 1920, heightPhys: 1080, dpi: 96 }
    ]
  });
  assert.equal(mon.monitorId, "Primary");
  assert.equal(mon.scale, 1.25);
});

test("Hybrid BM25 + Uint32 Bitset + Float32 RRF & Sparse Top-2 MoE gate weights sum to 1.0", () => {
  const hits = hybridRrfSearch("SQLite WAL FTS5 Okapi BM25 cosine RRF", 2);
  assert.ok(hits.length >= 2);
  assert.equal(hits[0].id, "doc-rag");

  const gates = routeSparseTop2Moe("Rust C11 CRC32C 64 byte cache line FFI", 6.0, 200);
  const active = gates.filter((g) => g.active);
  assert.equal(active.length, 2);
  const wSum = active.reduce((a, g) => a + g.gateWeight, 0);
  assert.ok(Math.abs(wSum - 1.0) < 1e-6);

  // Confirm SHA-256 test vector
  assert.equal(
    computeSha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});
