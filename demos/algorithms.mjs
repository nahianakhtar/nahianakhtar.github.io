// Pure ES2022 + TypedArray Quantitative, Cryptographic, Systems & Search Kernels
// Zero external runtime dependencies; deterministic in both Node.js 22+ and Chromium/Edge.

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// ============================================================================
// 1. 128-bit BigInt Fixed-Point Micro-Dollar Accounting & SHA-256 Merkle Proof
// ============================================================================

const MICRO_SCALE = 1000000n;
const CENTS_IN_MICRO = 10000n;

export function parseMicroUsd(raw) {
  const s = String(raw).trim().replace(/[$,\s]/g, "");
  if (!/^[+-]?\d+(\.\d+)?$/.test(s)) {
    throw new Error(`Invalid USD decimal input: ${raw}`);
  }
  const neg = s.startsWith("-");
  const clean = s.replace(/^[+-]/, "");
  const parts = clean.split(".");
  const whole = BigInt(parts[0] || "0") * MICRO_SCALE;
  const fracRaw = (parts[1] || "").padEnd(6, "0");
  const mainFrac = BigInt(fracRaw.slice(0, 6));
  let mag = whole + mainFrac;
  if (fracRaw.length > 6 && BigInt(fracRaw[6]) >= 5n) {
    mag += 1n;
  }
  return neg ? -mag : mag;
}

export function formatMicroUsd(micro) {
  const val = BigInt(micro);
  const neg = val < 0n;
  const mag = neg ? -val : val;
  const dollars = mag / MICRO_SCALE;
  const rem = (mag % MICRO_SCALE).toString().padStart(6, "0");
  const wholeFormatted = dollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${neg ? "-" : ""}$${wholeFormatted}.${rem}`;
}

export function formatCentsUsd(cents) {
  const val = BigInt(cents);
  const neg = val < 0n;
  const mag = neg ? -val : val;
  const dollars = mag / 100n;
  const rem = (mag % 100n).toString().padStart(2, "0");
  const wholeFormatted = dollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${neg ? "-" : ""}$${wholeFormatted}.${rem}`;
}

// IEEE-754 / GAAP banker's rounding (ROUND_HALF_EVEN) from 10^-6 USD to 10^-2 USD cents
export function roundHalfEvenCents(micro) {
  const val = BigInt(micro);
  const neg = val < 0n;
  const mag = neg ? -val : val;
  const q = mag / CENTS_IN_MICRO;
  const r = mag % CENTS_IN_MICRO;
  const half = CENTS_IN_MICRO / 2n;
  let rounded = q;
  if (r > half || (r === half && (q & 1n) === 1n)) {
    rounded = q + 1n;
  }
  return neg ? -rounded : rounded;
}

export class LedgerJournal {
  constructor() {
    this.entries = [];
    this.accountBalances = new Map();
  }

  postEntry({ id, date, accountDebit, accountCredit, amountMicro, memo }) {
    const amt = BigInt(amountMicro);
    if (amt <= 0n) {
      throw new Error("Posting amountMicro must be strictly positive");
    }
    if (!accountDebit || !accountCredit || accountDebit === accountCredit) {
      throw new Error("Debit and credit accounts must be distinct non-empty names");
    }
    this.entries.push({
      id: String(id),
      date: String(date),
      accountDebit: String(accountDebit),
      accountCredit: String(accountCredit),
      amountMicro: amt,
      memo: String(memo || "")
    });
    this.accountBalances.set(
      accountDebit,
      (this.accountBalances.get(accountDebit) ?? 0n) + amt
    );
    this.accountBalances.set(
      accountCredit,
      (this.accountBalances.get(accountCredit) ?? 0n) - amt
    );
  }

  trialBalanceDriftMicro() {
    let sum = 0n;
    for (const bal of this.accountBalances.values()) {
      sum += bal;
    }
    return sum;
  }

  totalDebitsMicro() {
    let total = 0n;
    for (const e of this.entries) total += e.amountMicro;
    return total;
  }

  canonicalLeaves() {
    return this.entries.map(
      (e) => `${e.id}|${e.date}|${e.accountDebit}|${e.accountCredit}|${e.amountMicro.toString()}|${e.memo}`
    );
  }
}

export function reconcileCsvEntries(ledgerRows, bankRows, toleranceMicro = 10000n) {
  const matched = [];
  const unmatchedLedger = [];
  const remainingBank = bankRows.map((b, idx) => ({ ...b, idx, used: false }));

  for (const row of ledgerRows) {
    let found = null;
    for (const b of remainingBank) {
      if (b.used) continue;
      if (b.reference && row.reference && b.reference === row.reference) {
        const delta = row.amountMicro >= b.amountMicro ? row.amountMicro - b.amountMicro : b.amountMicro - row.amountMicro;
        if (delta <= toleranceMicro) {
          found = b;
          break;
        }
      }
    }
    if (!found) {
      for (const b of remainingBank) {
        if (b.used) continue;
        if (b.counterparty.toLowerCase() === row.counterparty.toLowerCase()) {
          const delta = row.amountMicro >= b.amountMicro ? row.amountMicro - b.amountMicro : b.amountMicro - row.amountMicro;
          if (delta <= toleranceMicro) {
            found = b;
            break;
          }
        }
      }
    }
    if (found) {
      found.used = true;
      matched.push({
        ledgerId: row.id,
        bankId: found.id,
        counterparty: row.counterparty,
        ledgerMicro: row.amountMicro,
        bankMicro: found.amountMicro,
        deltaMicro: row.amountMicro - found.amountMicro
      });
    } else {
      unmatchedLedger.push(row);
    }
  }

  const unmatchedBank = remainingBank.filter((b) => !b.used);
  return { matched, unmatchedLedger, unmatchedBank };
}

// Pure FIPS 180-4 SHA-256 (synchronous, Uint32Array)
const SHA256_K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

function rotr32(x, n) {
  return (x >>> n) | (x << (32 - n));
}

export function computeSha256Bytes(input) {
  const msg = input instanceof Uint8Array ? input : textEncoder.encode(String(input));
  const bitLen = BigInt(msg.length) * 8n;
  const paddedLen = Math.ceil((msg.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLen);
  padded.set(msg, 0);
  padded[msg.length] = 0x80;
  const dv = new DataView(padded.buffer);
  dv.setBigUint64(paddedLen - 8, bitLen, false);

  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ]);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < paddedLen; offset += 64) {
    for (let i = 0; i < 16; i += 1) {
      w[i] = dv.getUint32(offset + i * 4, false);
    }
    for (let i = 16; i < 64; i += 1) {
      const s0 = rotr32(w[i - 15], 7) ^ rotr32(w[i - 15], 18) ^ (w[i - 15] >>> 3);
      const s1 = rotr32(w[i - 2], 17) ^ rotr32(w[i - 2], 19) ^ (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    let a = h[0], b = h[1], c = h[2], d = h[3];
    let e = h[4], f = h[5], g = h[6], hh = h[7];

    for (let i = 0; i < 64; i += 1) {
      const S1 = rotr32(e, 6) ^ rotr32(e, 11) ^ rotr32(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + S1 + ch + SHA256_K[i] + w[i]) >>> 0;
      const S0 = rotr32(a, 2) ^ rotr32(a, 13) ^ rotr32(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      hh = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    h[0] = (h[0] + a) >>> 0;
    h[1] = (h[1] + b) >>> 0;
    h[2] = (h[2] + c) >>> 0;
    h[3] = (h[3] + d) >>> 0;
    h[4] = (h[4] + e) >>> 0;
    h[5] = (h[5] + f) >>> 0;
    h[6] = (h[6] + g) >>> 0;
    h[7] = (h[7] + hh) >>> 0;
  }

  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  for (let i = 0; i < 8; i += 1) outView.setUint32(i * 4, h[i], false);
  return out;
}

function bytesToHex(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i += 1) s += bytes[i].toString(16).padStart(2, "0");
  return s;
}

function hexToBytes(hex) {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export function computeSha256Hex(input) {
  return bytesToHex(computeSha256Bytes(input));
}

function hashLeaf(text) {
  const body = textEncoder.encode(String(text));
  const buf = new Uint8Array(1 + body.length);
  buf[0] = 0x00;
  buf.set(body, 1);
  return computeSha256Bytes(buf);
}

function hashNode(leftBytes, rightBytes) {
  const buf = new Uint8Array(1 + 32 + 32);
  buf[0] = 0x01;
  buf.set(leftBytes, 1);
  buf.set(rightBytes, 33);
  return computeSha256Bytes(buf);
}

export function buildMerkleTree(leaves) {
  if (!leaves || leaves.length === 0) {
    return { root: computeSha256Hex(""), levels: [[computeSha256Hex("")]] };
  }
  let current = leaves.map((l) => hashLeaf(l));
  const levels = [current.map(bytesToHex)];
  while (current.length > 1) {
    const next = [];
    for (let i = 0; i < current.length; i += 2) {
      const left = current[i];
      const right = i + 1 < current.length ? current[i + 1] : current[i];
      next.push(hashNode(left, right));
    }
    current = next;
    levels.push(current.map(bytesToHex));
  }
  return { root: bytesToHex(current[0]), levels };
}

export function getMerkleProof(levels, index) {
  const proof = [];
  let idx = index;
  for (let lvl = 0; lvl < levels.length - 1; lvl += 1) {
    const layer = levels[lvl];
    const isRight = (idx & 1) === 1;
    const sibIdx = isRight ? idx - 1 : (idx + 1 < layer.length ? idx + 1 : idx);
    proof.push({ side: isRight ? "left" : "right", hash: layer[sibIdx] });
    idx = Math.floor(idx / 2);
  }
  return proof;
}

export function verifyMerkleProof(leafText, proof, expectedRoot) {
  let acc = hashLeaf(leafText);
  for (const step of proof) {
    const sib = hexToBytes(step.hash);
    acc = step.side === "left" ? hashNode(sib, acc) : hashNode(acc, sib);
  }
  return bytesToHex(acc) === expectedRoot;
}

// ============================================================================
// 2. Castagnoli CRC32C + 64-Byte Cache-Line Ring Slot Binary Inspector
// ============================================================================

const CRC32C_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let crc = i;
    for (let b = 0; b < 8; b += 1) {
      crc = (crc & 1) ? ((crc >>> 1) ^ 0x82f63b78) >>> 0 : (crc >>> 1) >>> 0;
    }
    t[i] = crc >>> 0;
  }
  return t;
})();

export function crc32c(input) {
  const bytes = typeof input === "string" ? textEncoder.encode(input) : input;
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = (CRC32C_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8)) >>> 0;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Binary 64-byte slot layout:
// [0..3]   magic "PAR6" (0x50415236)
// [4..7]   version_flags (uint32 LE)
// [8..15]  seq (uint64 LE)
// [16..23] timestamp_ns (uint64 LE)
// [24..31] capability_mask (uint64 LE)
// [32..35] payload_len (uint32 LE, 0..16)
// [36..39] payload_crc32c (uint32 LE)
// [40..43] header_crc32c over bytes [0..39] (uint32 LE) -> matches _Static_assert offsetof(..., header_crc32c) == 40
// [44..47] reserved zero padding
// [48..63] inline payload bytes (up to 16 bytes)
export function packRingSlot64({ seq, tsNs, capMask, payloadText = "", flags = 1 }) {
  const buf = new ArrayBuffer(64);
  const u8 = new Uint8Array(buf);
  const dv = new DataView(buf);
  const rawPayload = textEncoder.encode(String(payloadText)).slice(0, 16);
  const payloadCrc = crc32c(rawPayload);

  dv.setUint32(0, 0x50415236, false); // "PAR6" big endian readable magic
  dv.setUint32(4, flags >>> 0, true);
  dv.setBigUint64(8, BigInt(seq), true);
  dv.setBigUint64(16, BigInt(tsNs), true);
  dv.setBigUint64(24, BigInt(capMask), true);
  dv.setUint32(32, rawPayload.length, true);
  dv.setUint32(36, payloadCrc, true);
  u8.set(rawPayload, 48);

  const headerCrc = crc32c(u8.subarray(0, 40));
  dv.setUint32(40, headerCrc, true);
  return buf;
}

export function cloneBuffer(buf) {
  return buf.slice(0);
}

export function flipBit64(buf, byteIdx, bitIdx) {
  const copy = buf.slice(0);
  const u8 = new Uint8Array(copy);
  u8[byteIdx] ^= 1 << bitIdx;
  return copy;
}

export function validateRingSlot64(buf) {
  if (!(buf instanceof ArrayBuffer) || buf.byteLength !== 64) {
    return { valid: false, code: -1, reason: "Slot size != 64 bytes" };
  }
  const u8 = new Uint8Array(buf);
  const dv = new DataView(buf);
  const magic = dv.getUint32(0, false);
  if (magic !== 0x50415236) {
    return { valid: false, code: -2, reason: `Magic header corrupt (0x${magic.toString(16).toUpperCase()})` };
  }
  const storedHeaderCrc = dv.getUint32(40, true);
  const computedHeaderCrc = crc32c(u8.subarray(0, 40));
  if (storedHeaderCrc !== computedHeaderCrc) {
    return {
      valid: false,
      code: -4,
      reason: `Header CRC32C mismatch (stored 0x${storedHeaderCrc.toString(16).toUpperCase()} != computed 0x${computedHeaderCrc.toString(16).toUpperCase()})`
    };
  }
  const payloadLen = dv.getUint32(32, true);
  if (payloadLen > 16) {
    return { valid: false, code: -5, reason: `Invalid payloadLen ${payloadLen} > 16` };
  }
  const storedPayloadCrc = dv.getUint32(36, true);
  const computedPayloadCrc = crc32c(u8.subarray(48, 48 + payloadLen));
  if (storedPayloadCrc !== computedPayloadCrc) {
    return {
      valid: false,
      code: -8,
      reason: `Payload CRC32C mismatch (stored 0x${storedPayloadCrc.toString(16).toUpperCase()} != computed 0x${computedPayloadCrc.toString(16).toUpperCase()})`
    };
  }
  const padZero = dv.getUint32(44, true);
  return {
    valid: padZero === 0,
    code: padZero === 0 ? 0 : -9,
    reason: padZero === 0 ? "CRC32C OK (Header + Payload Intact)" : "Reserved padding byte modified",
    seq: dv.getBigUint64(8, true),
    tsNs: dv.getBigUint64(16, true),
    capMask: dv.getBigUint64(24, true),
    payloadLen,
    payloadText: textDecoder.decode(u8.subarray(48, 48 + payloadLen)),
    headerCrcHex: `0x${storedHeaderCrc.toString(16).toUpperCase().padStart(8, "0")}`,
    payloadCrcHex: `0x${storedPayloadCrc.toString(16).toUpperCase().padStart(8, "0")}`
  };
}

// ============================================================================
// 3. Kahn Capability-Fenced DAG, Jain-Chlamtac P2 Estimator & Rational Bucket
// ============================================================================

export function kahnTopoSort(nodes, edges, grantedCapMask = 0xffffffffn) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const indeg = new Map(nodes.map((n) => [n.id, 0]));
  const adj = new Map(nodes.map((n) => [n.id, []]));

  for (const [u, v] of edges) {
    if (!nodeMap.has(u) || !nodeMap.has(v)) continue;
    adj.get(u).push(v);
    indeg.set(v, indeg.get(v) + 1);
  }

  const ready = [];
  for (const [id, deg] of indeg.entries()) {
    if (deg === 0) ready.push(id);
  }
  ready.sort();

  const order = [];
  const denied = [];
  while (ready.length > 0) {
    const id = ready.shift();
    const node = nodeMap.get(id);
    const reqMask = BigInt(node.capMask ?? 0);
    if ((reqMask & BigInt(grantedCapMask)) !== reqMask) {
      denied.push(id);
      continue;
    }
    order.push(id);
    for (const nxt of adj.get(id)) {
      const nd = indeg.get(nxt) - 1;
      indeg.set(nxt, nd);
      if (nd === 0) {
        ready.push(nxt);
        ready.sort();
      }
    }
  }

  const hasCycle = order.length + denied.length < nodes.length && denied.length === 0;
  return { order, denied, hasCycle, complete: order.length === nodes.length };
}

export class P2QuantileEstimator {
  constructor(p) {
    this.p = p;
    this.count = 0;
    this.init = [];
    this.q = new Float64Array(5);
    this.n = new Float64Array([1, 2, 3, 4, 5]);
    this.np = new Float64Array([1, 1 + 2 * p, 1 + 4 * p, 3 + 2 * p, 5]);
    this.dn = new Float64Array([0, p / 2, p, (1 + p) / 2, 1]);
  }

  observe(x) {
    const v = Number(x);
    this.count += 1;
    if (this.count <= 5) {
      this.init.push(v);
      if (this.count === 5) {
        this.init.sort((a, b) => a - b);
        for (let i = 0; i < 5; i += 1) {
          this.q[i] = this.init[i];
          this.n[i] = i + 1;
        }
        this.np[0] = 1;
        this.np[1] = 1 + 2 * this.p;
        this.np[2] = 1 + 4 * this.p;
        this.np[3] = 3 + 2 * this.p;
        this.np[4] = 5;
      }
      return;
    }

    let k = 0;
    if (v < this.q[0]) {
      this.q[0] = v;
      k = 0;
    } else if (v >= this.q[4]) {
      this.q[4] = v;
      k = 3;
    } else {
      for (let i = 0; i < 4; i += 1) {
        if (v >= this.q[i] && v < this.q[i + 1]) {
          k = i;
          break;
        }
      }
    }

    for (let i = k + 1; i < 5; i += 1) this.n[i] += 1;
    for (let i = 0; i < 5; i += 1) this.np[i] += this.dn[i];

    for (let i = 1; i <= 3; i += 1) {
      const d = this.np[i] - this.n[i];
      if ((d >= 1 && this.n[i + 1] - this.n[i] > 1) || (d <= -1 && this.n[i - 1] - this.n[i] < -1)) {
        const ds = d >= 0 ? 1 : -1;
        const nPrev = this.n[i - 1];
        const nCurr = this.n[i];
        const nNext = this.n[i + 1];
        const qParabolic =
          this.q[i] +
          (ds / (nNext - nPrev)) *
            (((nCurr - nPrev + ds) * (this.q[i + 1] - this.q[i])) / (nNext - nCurr) +
              ((nNext - nCurr - ds) * (this.q[i] - this.q[i - 1])) / (nCurr - nPrev));
        if (this.q[i - 1] < qParabolic && qParabolic < this.q[i + 1]) {
          this.q[i] = qParabolic;
        } else {
          this.q[i] = this.q[i] + (ds * (this.q[i + ds] - this.q[i])) / (this.n[i + ds] - nCurr);
        }
        this.n[i] += ds;
      }
    }
  }

  estimate() {
    if (this.count === 0) return 0;
    if (this.count < 5) {
      const sorted = this.init.slice().sort((a, b) => a - b);
      const pos = Math.min(sorted.length - 1, Math.floor(this.p * (sorted.length - 1)));
      return sorted[pos];
    }
    return this.q[2];
  }

  min() {
    return this.count < 5 ? Math.min(...this.init) : this.q[0];
  }

  max() {
    return this.count < 5 ? Math.max(...this.init) : this.q[4];
  }
}

export class RationalTokenBucket {
  constructor(capacityTokens, refillNumPerSec, refillDenPerSec = 1) {
    this.den = BigInt(refillDenPerSec);
    this.capScaled = BigInt(capacityTokens) * this.den;
    this.rateNum = BigInt(refillNumPerSec);
    this.tokensScaled = this.capScaled;
    this.lastMs = 0n;
  }

  tryAcquire(costTokens, nowMs) {
    const tMs = BigInt(nowMs);
    if (tMs > this.lastMs) {
      const deltaMs = tMs - this.lastMs;
      const added = (deltaMs * this.rateNum) / 1000n;
      this.tokensScaled += added;
      if (this.tokensScaled > this.capScaled) this.tokensScaled = this.capScaled;
      this.lastMs = tMs;
    }
    const costScaled = BigInt(costTokens) * this.den;
    if (this.tokensScaled >= costScaled) {
      this.tokensScaled -= costScaled;
      return true;
    }
    return false;
  }
}

// ============================================================================
// 4. Aho-Corasick Secret Automaton, 64-bit SimHash & 120-Case Eval Matrix
// ============================================================================

export class AhoCorasickAutomaton {
  constructor(patterns) {
    this.nodes = [{ next: new Map(), fail: 0, outputs: [] }];
    for (const p of patterns) {
      this._insert(p.pattern, p.label);
    }
    this._buildFailureLinks();
  }

  _insert(pattern, label) {
    let state = 0;
    for (let i = 0; i < pattern.length; i += 1) {
      const ch = pattern[i];
      if (!this.nodes[state].next.has(ch)) {
        this.nodes.push({ next: new Map(), fail: 0, outputs: [] });
        this.nodes[state].next.set(ch, this.nodes.length - 1);
      }
      state = this.nodes[state].next.get(ch);
    }
    this.nodes[state].outputs.push({ length: pattern.length, label, pattern });
  }

  _buildFailureLinks() {
    const queue = [];
    for (const [, nxt] of this.nodes[0].next.entries()) {
      this.nodes[nxt].fail = 0;
      queue.push(nxt);
    }
    while (queue.length > 0) {
      const u = queue.shift();
      for (const [ch, v] of this.nodes[u].next.entries()) {
        let f = this.nodes[u].fail;
        while (f !== 0 && !this.nodes[f].next.has(ch)) {
          f = this.nodes[f].fail;
        }
        const failTarget = this.nodes[f].next.get(ch) ?? 0;
        this.nodes[v].fail = failTarget === v ? 0 : failTarget;
        this.nodes[v].outputs.push(...this.nodes[this.nodes[v].fail].outputs);
        queue.push(v);
      }
    }
  }

  scan(text) {
    const str = String(text);
    const hits = [];
    const transitions = [];
    let state = 0;
    for (let i = 0; i < str.length; i += 1) {
      const ch = str[i];
      let fellBack = false;
      while (state !== 0 && !this.nodes[state].next.has(ch)) {
        state = this.nodes[state].fail;
        fellBack = true;
      }
      state = this.nodes[state].next.get(ch) ?? 0;
      transitions.push({ pos: i, state, fellBack });
      if (this.nodes[state].outputs.length > 0) {
        for (const out of this.nodes[state].outputs) {
          hits.push({
            start: i - out.length + 1,
            end: i + 1,
            label: out.label,
            pattern: out.pattern,
            matchedState: state
          });
        }
      }
    }
    return { hits, stateCount: this.nodes.length, transitionCount: transitions.length };
  }
}

export const SECRET_PII_PATTERNS = [
  { pattern: "sk-", label: "OPENAI_KEY_PREFIX" },
  { pattern: "ghp_", label: "GITHUB_PAT_PREFIX" },
  { pattern: "AKIA", label: "AWS_ACCESS_KEY_ID" },
  { pattern: "eyJhbGciOi", label: "BEARER_JWT_HEADER" },
  { pattern: "-----BEGIN PRIVATE KEY-----", label: "PEM_PRIVATE_KEY" },
  { pattern: "Bearer ", label: "AUTH_BEARER_HEADER" }
];

export function scanAndRedactWithAutomaton(text, automaton = new AhoCorasickAutomaton(SECRET_PII_PATTERNS)) {
  const res = automaton.scan(text);
  const regexRules = [
    { rx: /sk-[A-Za-z0-9_-]{8,}/g, label: "OPENAI_KEY" },
    { rx: /ghp_[A-Za-z0-9]{12,}/g, label: "GITHUB_PAT" },
    { rx: /AKIA[0-9A-Z]{16}/g, label: "AWS_ACCESS_KEY" },
    { rx: /eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{4,}\.[A-Za-z0-9_-]{4,}/g, label: "JWT_TOKEN" },
    { rx: /\b\d{3}-\d{2}-\d{4}\b/g, label: "US_SSN" },
    { rx: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, label: "EMAIL_PII" }
  ];
  let redacted = String(text);
  let regexMatches = 0;
  for (const r of regexRules) {
    redacted = redacted.replace(r.rx, (m) => {
      regexMatches += 1;
      return `[REDACTED:${r.label}]`;
    });
  }
  return {
    prefixHits: res.hits,
    stateCount: res.stateCount,
    redacted,
    regexMatches,
    clean: res.hits.length === 0 && regexMatches === 0
  };
}

function fnv1a64(token) {
  let h = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const mask = 0xffffffffffffffffn;
  for (let i = 0; i < token.length; i += 1) {
    h ^= BigInt(token.charCodeAt(i));
    h = (h * prime) & mask;
  }
  return h;
}

export function computeSimHash64(text) {
  const tokens = String(text)
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter(Boolean);
  const weights = new Int32Array(64);
  for (const tok of tokens) {
    const h = fnv1a64(tok);
    for (let b = 0; b < 64; b += 1) {
      if ((h & (1n << BigInt(b))) !== 0n) weights[b] += 1;
      else weights[b] -= 1;
    }
  }
  let fp = 0n;
  for (let b = 0; b < 64; b += 1) {
    if (weights[b] > 0) fp |= 1n << BigInt(b);
  }
  return fp;
}

export function hammingDistance64(a, b) {
  let x = BigInt(a) ^ BigInt(b);
  let count = 0;
  while (x > 0n) {
    x &= x - 1n;
    count += 1;
  }
  return count;
}

export function runGuardrailBenchmark120(seed = 20261126) {
  const auto = new AhoCorasickAutomaton(SECRET_PII_PATTERNS);
  const t0 = performance.now();
  let tp = 0, fp = 0, fn = 0, tn = 0;
  const latencies = [];
  let s = seed >>> 0;
  const rand = () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };

  for (let i = 0; i < 120; i += 1) {
    const isAttack = i < 60;
    const tokenSuffix = Math.floor(rand() * 1e9).toString(36).padStart(10, "a");
    let payload;
    if (isAttack) {
      const kind = i % 6;
      if (kind === 0) payload = `auth=sk-demo${tokenSuffix}99 region=us-east-1`;
      else if (kind === 1) payload = `token=ghp_demopat${tokenSuffix}xy mode=ro`;
      else if (kind === 2) payload = `aws=AKIAIOSFODNN7EXAMPLE${tokenSuffix.slice(0, 0)}`;
      else if (kind === 3) payload = `header="Bearer eyJhbGciOiJIUzI1NiJ9.${tokenSuffix}.sig"`;
      else if (kind === 4) payload = `record ssn=123-45-6789 status=pending`;
      else payload = `notice mail=client${i}@example.org action=scrub`;
    } else {
      payload = `bench case=${i} crc32c=0xE3069283 latency_us=${(12 + rand() * 30).toFixed(2)} status=PASS`;
    }

    const c0 = performance.now();
    const out = scanAndRedactWithAutomaton(payload, auto);
    const c1 = performance.now();
    latencies.push(Math.max(0.001, c1 - c0));

    const predictedAttack = !out.clean;
    if (isAttack && predictedAttack) tp += 1;
    else if (!isAttack && predictedAttack) fp += 1;
    else if (isAttack && !predictedAttack) fn += 1;
    else tn += 1;
  }

  latencies.sort((a, b) => a - b);
  const totalMs = performance.now() - t0;
  const precision = tp + fp > 0 ? tp / (tp + fp) : 1;
  const recall = tp + fn > 0 ? tp / (tp + fn) : 1;
  const f1 = precision + recall > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  return {
    cases: 120,
    tp, fp, fn, tn,
    precision,
    recall,
    f1,
    totalMs,
    p50Ms: latencies[Math.floor(latencies.length * 0.5)],
    p95Ms: latencies[Math.floor(latencies.length * 0.95)]
  };
}

// ============================================================================
// 5. Per-Monitor V2 UIA Logical-to-Physical DPI Coordinate Metrology
// ============================================================================

export function logicalToPhysicalPoint({ xCss, yCss, clientOriginPhysX = 0, clientOriginPhysY = 0, dpi = 120 }) {
  const scale = dpi / 96;
  return {
    dpi,
    scale,
    xPhys: clientOriginPhysX + Math.round(xCss * scale),
    yPhys: clientOriginPhysY + Math.round(yCss * scale)
  };
}

export function physicalToLogicalPoint({ xPhys, yPhys, clientOriginPhysX = 0, clientOriginPhysY = 0, dpi = 120 }) {
  const scale = dpi / 96;
  return {
    dpi,
    scale,
    xCss: (xPhys - clientOriginPhysX) / scale,
    yCss: (yPhys - clientOriginPhysY) / scale
  };
}

export function solveMonitorTransition({ xCss, yCss, monitors }) {
  for (const m of monitors) {
    const pt = logicalToPhysicalPoint({
      xCss,
      yCss,
      clientOriginPhysX: m.originPhysX,
      clientOriginPhysY: m.originPhysY,
      dpi: m.dpi
    });
    if (
      pt.xPhys >= m.originPhysX &&
      pt.xPhys < m.originPhysX + m.widthPhys &&
      pt.yPhys >= m.originPhysY &&
      pt.yPhys < m.originPhysY + m.heightPhys
    ) {
      return { monitorId: m.id, ...pt };
    }
  }
  const m = monitors[0];
  return {
    monitorId: m.id,
    ...logicalToPhysicalPoint({ xCss, yCss, clientOriginPhysX: m.originPhysX, clientOriginPhysY: m.originPhysY, dpi: m.dpi })
  };
}

export function verifyBoundingBoxHitTest({ xCss, yCss, boxCss, clientOriginPhysX = 0, clientOriginPhysY = 0, dpi = 120 }) {
  const pt = logicalToPhysicalPoint({ xCss, yCss, clientOriginPhysX, clientOriginPhysY, dpi });
  const topLeft = logicalToPhysicalPoint({ xCss: boxCss.x, yCss: boxCss.y, clientOriginPhysX, clientOriginPhysY, dpi });
  const botRight = logicalToPhysicalPoint({ xCss: boxCss.x + boxCss.w, yCss: boxCss.y + boxCss.h, clientOriginPhysX, clientOriginPhysY, dpi });
  const cssHit = xCss >= boxCss.x && xCss <= boxCss.x + boxCss.w && yCss >= boxCss.y && yCss <= boxCss.y + boxCss.h;
  const physHit = pt.xPhys >= topLeft.xPhys && pt.xPhys <= botRight.xPhys && pt.yPhys >= topLeft.yPhys && pt.yPhys <= botRight.yPhys;
  return { cssHit, physHit, parity: cssHit === physHit, pt, topLeft, botRight };
}

// ============================================================================
// 6. Okapi BM25 + Uint32 Bitset Pre-Filter + Float32 Cosine RRF + Sparse Top-2 MoE
// ============================================================================

export const DEMO_CORPUS = [
  { id: "doc-ring", tagMask: 1, title: "64B C11 CRC32C Telemetry Ring", text: "64-byte cache line alignment _Alignas(64) Castagnoli CRC32C ring vault Rust FFI zero allocation", tokens: null, vec: null },
  { id: "doc-rag", tagMask: 2, title: "SQLite WAL FTS5 Hybrid RRF", text: "SQLite WAL FTS5 Okapi BM25 cosine vector Reciprocal Rank Fusion k=60 local RAG SDK", tokens: null, vec: null },
  { id: "doc-oauth", tagMask: 4, title: "MCP 2025-11-25 OAuth PKCE S256", text: "MCP 2025-11-25 RFC 9728 protected resource metadata PKCE S256 audience token fence SSE replay", tokens: null, vec: null },
  { id: "doc-eval", tagMask: 2, title: "Node 22 SSE Guardrail & A/B Diff", text: "Streaming SSE token circuit breaker sliding window OTLP JSON trace span pairwise A/B RAG regression diff", tokens: null, vec: null },
  { id: "doc-uia", tagMask: 1, title: "Per-Monitor V2 UIA DPI Metrology", text: "Windows 11 SetProcessDpiAwarenessContext Per-Monitor V2 UIA Chromium Legacy HWND scaling coordinates", tokens: null, vec: null },
  { id: "doc-ledger", tagMask: 4, title: "Decimal ROUND_HALF_EVEN Ledger Audit", text: "Exact Decimal CSV SQLite mode=ro reconciliation --allow-write --apply JSONL audit Merkle SHA-256", tokens: null, vec: null }
];

function tokenize(text) {
  return String(text).toLowerCase().split(/[^a-z0-9_]+/).filter(Boolean);
}

function project64Float32(tokens) {
  const vec = new Float32Array(64);
  for (const tok of tokens) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < tok.length; i += 1) {
      h ^= tok.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    const idx = h & 63;
    const sign = (h & 64) === 0 ? 1 : -1;
    vec[idx] += sign;
  }
  let norm = 0;
  for (let i = 0; i < 64; i += 1) norm += vec[i] * vec[i];
  const inv = norm > 0 ? 1 / Math.sqrt(norm) : 0;
  if (inv > 0) for (let i = 0; i < 64; i += 1) vec[i] *= inv;
  return vec;
}

export function cosineFloat32(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i += 1) dot += a[i] * b[i];
  return dot;
}

export function hybridRrfSearch(query, requiredTagMask = 0, corpus = DEMO_CORPUS, k = 60) {
  const qTokens = tokenize(query);
  const qVec = project64Float32(qTokens);

  const maskArr = new Uint32Array(corpus.length);
  for (let i = 0; i < corpus.length; i += 1) {
    if (!corpus[i].tokens) corpus[i].tokens = tokenize(`${corpus[i].title} ${corpus[i].text}`);
    if (!corpus[i].vec) corpus[i].vec = project64Float32(corpus[i].tokens);
    maskArr[i] = requiredTagMask === 0 || (corpus[i].tagMask & requiredTagMask) !== 0 ? 1 : 0;
  }

  const filtered = [];
  for (let i = 0; i < corpus.length; i += 1) {
    if (maskArr[i] === 1) filtered.push(corpus[i]);
  }
  if (filtered.length === 0) return [];

  const avgDl = filtered.reduce((s, d) => s + d.tokens.length, 0) / filtered.length;
  const k1 = 1.5;
  const b = 0.75;

  const scored = filtered.map((d) => {
    const tfMap = new Map();
    for (const t of d.tokens) tfMap.set(t, (tfMap.get(t) ?? 0) + 1);
    let bm25 = 0;
    for (const qt of qTokens) {
      const df = filtered.filter((x) => x.tokens.includes(qt)).length;
      if (df === 0) continue;
      const idf = Math.log(1 + (filtered.length - df + 0.5) / (df + 0.5));
      const tf = tfMap.get(qt) ?? 0;
      bm25 += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (d.tokens.length / avgDl))));
    }
    const cos = cosineFloat32(qVec, d.vec);
    return { id: d.id, title: d.title, text: d.text, tagMask: d.tagMask, bm25, cosine: cos };
  });

  const byBm25 = scored.slice().sort((a, c) => c.bm25 - a.bm25);
  const byCos = scored.slice().sort((a, c) => c.cosine - a.cosine);
  const rrfMap = new Map(scored.map((s) => [s.id, 0]));
  byBm25.forEach((item, rank) => rrfMap.set(item.id, rrfMap.get(item.id) + 1 / (k + rank + 1)));
  byCos.forEach((item, rank) => rrfMap.set(item.id, rrfMap.get(item.id) + 1 / (k + rank + 1)));

  return scored
    .map((s) => ({ ...s, rrf: rrfMap.get(s.id) }))
    .sort((a, c) => c.rrf - a.rrf);
}

export function routeSparseTop2Moe(query, vramGib = 6.0, slaMs = 450) {
  const q = String(query).toLowerCase();
  const experts = [
    { id: "edge_fast_json", label: "Edge Fast JSON (2.1 GiB, 28 ms)", minVram: 2, p95Ms: 28, kw: ["json", "schema", "oauth", "pkce", "token", "fast"] },
    { id: "rag_grounded_synthesis", label: "RAG Grounded Synthesis (4.2 GiB, 95 ms)", minVram: 4, p95Ms: 95, kw: ["sqlite", "bm25", "cosine", "rrf", "fts5", "rag", "hybrid"] },
    { id: "code_systems_verifier", label: "Systems & Binary Verifier (5.5 GiB, 140 ms)", minVram: 5.5, p95Ms: 140, kw: ["rust", "c11", "crc32c", "64", "cache", "uia", "dpi", "ffi"] },
    { id: "frontier_moe_architect", label: "Frontier MoE Architect (12.0 GiB, 680 ms)", minVram: 12, p95Ms: 680, kw: ["architect", "formal", "convexity", "merkle", "audit", "dag"] }
  ];

  const scored = experts.map((ex) => {
    const vramOk = vramGib >= ex.minVram;
    const slaOk = slaMs >= ex.p95Ms;
    const matches = ex.kw.filter((w) => q.includes(w)).length;
    const logit = 1.2 + matches * 1.35;
    return { ...ex, vramOk, slaOk, eligible: vramOk && slaOk, logit, matches };
  });

  const eligible = scored.filter((e) => e.eligible).sort((a, b) => b.logit - a.logit);
  const top2 = (eligible.length > 0 ? eligible : [scored[0]]).slice(0, 2);
  const maxLogit = Math.max(...top2.map((x) => x.logit));
  const exps = top2.map((x) => Math.exp(x.logit - maxLogit));
  const sumExp = exps.reduce((a, b) => a + b, 0);
  const weightById = new Map(top2.map((x, idx) => [x.id, exps[idx] / sumExp]));

  return scored.map((e) => ({
    ...e,
    active: weightById.has(e.id),
    gateWeight: weightById.get(e.id) ?? 0
  }));
}
