import type { CareerNode } from "@/data/trajectory";

export type Routing = "octilinear" | "organic";

// Spacing constants — the only "magic numbers" in the layout. None of these
// are per-node; every coordinate below is a formula over node index / count.
export const LAYOUT = {
  paddingX: 88,
  paddingY: 48,
  trunkGapDesktop: 280,
  trunkGapTablet: 200,
  verticalGap: 132,
  leafRowBase: 36,
  leafGap: 42,
  leafLabelHeight: 16,
  leafColumnOffset: 110,
  // Approx px-per-character for the leaf label font (0.65rem mono + tracking)
  // used to size the gap before a second leaf column, so long labels in
  // column 0 (e.g. "Embedded engineering") can't collide with column 1.
  leafCharWidth: 7.2,
  leafColumnPadding: 28,
  diagStub: 14,
  cornerRadius: 5,
  nodeRadius: 7,
  // Ring/label offset share this one constant so they can't drift apart again
  // (v1 bug: amber ring visually overlapped its own date text on two nodes).
  nodeLabelGap: 14,
  mobileTrunkX: 30,
  // Horizontal reach of a branch stub off the mobile trunk, and the extra
  // clearance before the text column starts — keeps the stub visually
  // touching the label instead of stopping short or overlapping it.
  leafColumnOffsetVertical: 30,
  contentGutter: 14,
  // Seeded organic-trunk jitter magnitudes (px). Anchor jitter moves each
  // node's own position; waypoint jitter is intentionally smaller so the
  // wander reads as "cable laid with slack," not a zigzag.
  anchorJitterDesktop: 16,
  anchorJitterTablet: 12,
  waypointJitterDesktop: 9,
  waypointJitterTablet: 7,
  mobileAnchorJitter: 8,
  mobileWaypointJitter: 4,
  arcSampleSteps: 20,
  // Fraction of total trunk scroll-progress a single node's branch reveal
  // spans, keyed to that node's arc-length position (see §7 of the brief).
  revealRange: 0.08,
} as const;

const LEAF_COLUMN_THRESHOLD = 4;

export function columnsForLeafCount(count: number): number {
  return count > LEAF_COLUMN_THRESHOLD ? 2 : 1;
}

/**
 * Gap to leave before the second leaf column, sized to the longest label
 * that actually lands in column 0 — not a fixed width, so a node with short
 * column-0 labels sits tighter and one with long labels (e.g. "Embedded
 * engineering") never lets column 1 collide into it.
 */
function columnWidthFor(labels: string[], columns: number): number {
  if (columns <= 1) return 0;
  const col0 = labels.filter((_, i) => i % columns === 0);
  const maxLen = col0.reduce((m, l) => Math.max(m, l.length), 1);
  return maxLen * LAYOUT.leafCharWidth + LAYOUT.leafColumnPadding;
}

// ---------------------------------------------------------------------------
// Seeded PRNG — deterministic per-id jitter, stable across reloads. Not
// Math.random(): the layout must be identical on every render/screenshot.
// ---------------------------------------------------------------------------

function hashStringToSeed(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^= h >>> 16) >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic PRNG seeded from a string — stable across reloads/screenshots. */
export function createSeededRandom(seed: string): () => number {
  return mulberry32(hashStringToSeed(seed));
}

/** Seeded value in [-magnitude, magnitude]. */
function jitter(seed: string, magnitude: number): number {
  if (magnitude === 0) return 0;
  const rnd = createSeededRandom(seed)();
  return (rnd * 2 - 1) * magnitude;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

// ---------------------------------------------------------------------------
// Organic path construction — Catmull-Rom through node anchors + seeded
// waypoints, converted to cubic beziers. Control-point handles are clamped to
// each segment's own primary-axis span so the curve cannot double back
// (the monotonicity constraint from §6).
// ---------------------------------------------------------------------------

interface Point {
  x: number;
  y: number;
}

interface PathResult {
  d: string;
  length: number;
}

/** Sample a cubic bezier into points, for arc-length + monotonicity checks. */
function sampleCubic(p0: Point, c1: Point, c2: Point, p3: Point, steps: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const x = mt * mt * mt * p0.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * p3.x;
    const y = mt * mt * mt * p0.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * p3.y;
    pts.push({ x, y });
  }
  return pts;
}

function polylineLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
}

/**
 * Build a single wandering path through `points` (Catmull-Rom → cubic bezier),
 * plus its sampled polyline (for arc-length lookups) and total length.
 * `axis` is the primary (monotonic) axis — 'x' for horizontal trunks, 'y' for
 * vertical ones.
 */
function organicPath(points: Point[], axis: "x" | "y", steps: number): PathResult & { samples: Point[] } {
  if (points.length < 2) return { d: "", length: 0, samples: points };

  let d = `M ${points[0].x},${points[0].y}`;
  const samples: Point[] = [points[0]];
  let length = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    let c1: Point = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    let c2: Point = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

    // Clamp control points to this segment's own span on the primary axis so
    // neighbor-driven tangents can never pull the curve backward — the
    // monotonicity constraint holds regardless of jitter.
    const lo = Math.min(p1[axis], p2[axis]);
    const hi = Math.max(p1[axis], p2[axis]);
    c1 = { ...c1, [axis]: clamp(c1[axis], lo, hi) };
    c2 = { ...c2, [axis]: clamp(c2[axis], lo, hi) };

    d += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;

    const segSamples = sampleCubic(p1, c1, c2, p2, steps);
    length += polylineLength(segSamples);
    samples.push(...segSamples.slice(1));
  }

  return { d, length, samples };
}

function assertMonotonic(samples: Point[], axis: "x" | "y", label: string) {
  if (process.env.NODE_ENV === "production") return;
  for (let i = 1; i < samples.length; i++) {
    if (samples[i][axis] < samples[i - 1][axis] - 0.01) {
      console.warn(
        `[Trajectory] organic trunk path "${label}" is not monotonic on the ${axis}-axis at sample ${i} ` +
          `(${samples[i - 1][axis].toFixed(2)} → ${samples[i][axis].toFixed(2)}). Reduce jitter magnitude.`
      );
      return;
    }
  }
}

/**
 * Seeded control-point sequence for one node-to-node span: the two anchors
 * plus 2 intermediate waypoints at the 1/3 and 2/3 marks, each with its own
 * smaller jitter — the "gentle wandering S-curve" from §6.
 */
function spanControlPoints(
  a: Point,
  b: Point,
  axis: "x" | "y",
  seedPrefix: string,
  waypointJitterMag: number,
  perpBounds: [number, number]
): Point[] {
  const perp = axis === "x" ? "y" : "x";
  const wp = (frac: number, idx: number): Point => {
    const base: Point = { x: a.x + (b.x - a.x) * frac, y: a.y + (b.y - a.y) * frac };
    const j = jitter(`${seedPrefix}-wp${idx}`, waypointJitterMag);
    const next = clamp(base[perp] + j, perpBounds[0], perpBounds[1]);
    return { ...base, [perp]: next } as Point;
  };
  return [a, wp(1 / 3, 1), wp(2 / 3, 2), b];
}

export interface LeafGeometry {
  id: string;
  label: string;
  d: string;
  length: number;
  labelX: number;
  labelY: number;
  column: number;
}

export interface BranchGroup {
  nodeIndex: number;
  direction: 1 | -1;
  items: LeafGeometry[];
}

export interface TrunkPath {
  d: string;
  length: number;
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface GraphLayout {
  orientation: "horizontal" | "vertical";
  width: number;
  height: number;
  nodePositions: NodePosition[];
  /** Cumulative arc-length fraction (0..1) of each node's anchor along the full trunk. */
  nodeArcFractions: number[];
  /** The live (real-history) portion of the trunk, cyan wire. */
  trunkLive: TrunkPath;
  /** The dead (unpowered, leads to the future node) portion — ash, dashed. */
  trunkDead: TrunkPath;
  /** trunkLive.length / (trunkLive.length + trunkDead.length) */
  liveFraction: number;
  branchGroups: BranchGroup[];
}

function branchPath(
  nodeX: number,
  nodeY: number,
  rowY: number,
  columnX: number,
  routing: Routing
): { d: string; length: number } {
  if (routing === "organic") {
    const c1 = { x: nodeX + (columnX - nodeX) * 0.35, y: nodeY };
    const c2 = { x: nodeX + (columnX - nodeX) * 0.65, y: rowY };
    const d = `M ${nodeX},${nodeY} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${columnX},${rowY}`;
    const length = polylineLength(sampleCubic({ x: nodeX, y: nodeY }, c1, c2, { x: columnX, y: rowY }, 16));
    return { d, length };
  }
  const dir: 1 | -1 = rowY < nodeY ? -1 : 1;
  const diagX = nodeX + LAYOUT.diagStub;
  const diagY = nodeY + dir * LAYOUT.diagStub;
  const points: Point[] = [
    { x: nodeX, y: nodeY },
    { x: diagX, y: diagY },
    { x: diagX, y: rowY },
    { x: columnX, y: rowY },
  ];
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L ${points[i].x},${points[i].y}`;
  return { d, length: polylineLength(points) };
}

function extentFor(maxCount: number, columns: number): number {
  if (maxCount === 0) return 0;
  const rows = Math.ceil(maxCount / columns);
  return LAYOUT.leafRowBase + (rows - 1) * LAYOUT.leafGap + LAYOUT.leafLabelHeight;
}

export function computeHorizontalLayout(
  nodes: CareerNode[],
  opts: { trunkGap: number; bothSides: boolean; routing: Routing; tablet?: boolean }
): GraphLayout {
  let maxAbove = 0;
  let maxBelow = 0;

  nodes.forEach((n, i) => {
    const count = n.branches?.length ?? 0;
    if (count === 0) return;

    // Determine alternating direction if none specified, respecting bothSides
    const dir: 1 | -1 = opts.bothSides ? (i % 2 === 0 ? 1 : -1) : 1;
    const columns = columnsForLeafCount(count);

    if (dir === 1) maxBelow = Math.max(maxBelow, extentFor(count, columns));
    else maxAbove = Math.max(maxAbove, extentFor(count, columns));
  });

  const baselineY = LAYOUT.paddingY + maxAbove;
  const height = baselineY + maxBelow + LAYOUT.paddingY;
  const width = LAYOUT.paddingX + (nodes.length - 1) * opts.trunkGap + LAYOUT.paddingX;

  // Keep the wire clear of the first leaf row and the section bounds
  // regardless of jitter direction — "clamp, don't hope" (§6.5).
  const perpLo = LAYOUT.paddingY - baselineY + LAYOUT.nodeRadius + 6;
  const perpHi = height - LAYOUT.paddingY - baselineY - LAYOUT.nodeRadius - 6;

  const anchorJitterMag = opts.tablet ? LAYOUT.anchorJitterTablet : LAYOUT.anchorJitterDesktop;
  const waypointJitterMag = opts.tablet ? LAYOUT.waypointJitterTablet : LAYOUT.waypointJitterDesktop;

  if (opts.routing === "octilinear") {
    return computeHorizontalOctilinear(nodes, opts, baselineY, height, width);
  }

  // Anchors: evenly spaced on x (strictly monotonic by construction), with
  // a seeded perpendicular jitter on y, clamped within the safe band.
  const anchors: Point[] = nodes.map((n, i) => {
    const x = LAYOUT.paddingX + i * opts.trunkGap;
    const y = baselineY + clamp(jitter(`${n.id}-anchor`, anchorJitterMag), perpLo, perpHi);
    return { x, y };
  });

  const futureIndex = nodes.findIndex((n) => n.kind === "future");
  // Index of the last LIVE node (one before the future node), not the future
  // node's own index — off this by one and the "dead" segment leading into
  // the future node silently merges into the live cyan path instead of
  // rendering as the ash-dashed unpowered wire.
  const liveEnd = futureIndex > 0 ? futureIndex - 1 : nodes.length - 1;

  const buildSpan = (fromIdx: number, toIdx: number) => {
    const pts: Point[] = [anchors[fromIdx]];
    for (let i = fromIdx; i < toIdx; i++) {
      const span = spanControlPoints(
        anchors[i],
        anchors[i + 1],
        "x",
        `${nodes[i].id}-${nodes[i + 1].id}`,
        waypointJitterMag,
        [perpLo, perpHi]
      );
      pts.push(span[1], span[2], span[3]);
    }
    return pts;
  };

  const livePts = buildSpan(0, liveEnd);
  const live = organicPath(livePts, "x", LAYOUT.arcSampleSteps);
  assertMonotonic(live.samples, "x", "live");

  const deadPts = liveEnd < nodes.length - 1 ? buildSpan(liveEnd, nodes.length - 1) : [];
  const dead = deadPts.length >= 2 ? organicPath(deadPts, "x", LAYOUT.arcSampleSteps) : { d: "", length: 0, samples: [] };
  if (deadPts.length) assertMonotonic(dead.samples, "x", "dead");

  const totalLength = live.length + dead.length || 1;
  const liveFraction = live.length / totalLength;

  // Arc-length fraction of each node anchor, by nearest sample index.
  const allSamples = [...live.samples, ...dead.samples];
  const cum: number[] = [0];
  for (let i = 1; i < allSamples.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(allSamples[i].x - allSamples[i - 1].x, allSamples[i].y - allSamples[i - 1].y));
  }
  const samplesPerSpan = LAYOUT.arcSampleSteps * 3; // 3 cubic pieces per node-to-node span
  const nodeArcFractions: number[] = nodes.map((_, i) => {
    if (i === 0) return 0;
    if (i >= liveEnd) {
      const intoDead = i - liveEnd;
      const idx = live.samples.length - 1 + intoDead * samplesPerSpan;
      return (cum[Math.min(idx, cum.length - 1)] ?? cum[cum.length - 1]) / totalLength;
    }
    const idx = i * samplesPerSpan;
    return (cum[Math.min(idx, cum.length - 1)] ?? 0) / totalLength;
  });
  nodeArcFractions[nodeArcFractions.length - 1] = 1;

  const branchGroups: BranchGroup[] = nodes.flatMap((n, i) => {
    const count = n.branches?.length ?? 0;
    if (count === 0) return [];
    const dir: 1 | -1 = opts.bothSides ? (i % 2 === 0 ? 1 : -1) : 1;
    const { x: nodeX, y: nodeY } = anchors[i];
    const columns = columnsForLeafCount(count);
    const labels = n.branches!.map((b) => b.label);
    const columnWidth = columnWidthFor(labels, columns);
    const items: LeafGeometry[] = n.branches!.map((leaf, k) => {
      const col = k % columns;
      const row = Math.floor(k / columns);
      const columnX = nodeX + LAYOUT.leafColumnOffset + col * columnWidth;
      const rowY = nodeY + dir * (LAYOUT.leafRowBase + row * LAYOUT.leafGap);
      const { d, length } = branchPath(nodeX, nodeY, rowY, columnX, opts.routing);
      return { id: leaf.id, label: leaf.label, d, length, labelX: columnX + 10, labelY: rowY, column: col };
    });
    return [{ nodeIndex: i, direction: dir, items }];
  });

  return {
    orientation: "horizontal",
    width,
    height,
    nodePositions: anchors,
    nodeArcFractions,
    trunkLive: { d: live.d, length: live.length },
    trunkDead: { d: dead.d, length: dead.length },
    liveFraction,
    branchGroups,
  };
}

/** Octilinear fallback — kept as a one-line revert per §6. */
function computeHorizontalOctilinear(
  nodes: CareerNode[],
  opts: { trunkGap: number; bothSides: boolean; routing: Routing },
  baselineY: number,
  height: number,
  width: number
): GraphLayout {
  const nodeXs = nodes.map((_, i) => LAYOUT.paddingX + i * opts.trunkGap);
  const futureIndex = nodes.findIndex((n) => n.kind === "future");
  // Index of the last LIVE node (one before the future node), not the future
  // node's own index — off this by one and the "dead" segment leading into
  // the future node silently merges into the live cyan path instead of
  // rendering as the ash-dashed unpowered wire.
  const liveEnd = futureIndex > 0 ? futureIndex - 1 : nodes.length - 1;

  let liveLen = 0;
  let deadLen = 0;
  let liveD = `M ${nodeXs[0]},${baselineY}`;
  let deadD = "";
  for (let i = 0; i < nodes.length - 1; i++) {
    const seglen = nodeXs[i + 1] - nodeXs[i];
    if (i < liveEnd) {
      liveD += ` L ${nodeXs[i + 1]},${baselineY}`;
      liveLen += seglen;
    } else {
      if (!deadD) deadD = `M ${nodeXs[i]},${baselineY}`;
      deadD += ` L ${nodeXs[i + 1]},${baselineY}`;
      deadLen += seglen;
    }
  }
  const totalLength = liveLen + deadLen || 1;
  const nodeArcFractions = nodeXs.map((x) => (x - nodeXs[0]) / (nodeXs[nodeXs.length - 1] - nodeXs[0] || 1));
  nodeArcFractions[nodeArcFractions.length - 1] = 1;

  const branchGroups: BranchGroup[] = nodes.flatMap((n, i) => {
    const count = n.branches?.length ?? 0;
    if (count === 0) return [];
    const dir: 1 | -1 = opts.bothSides ? (i % 2 === 0 ? 1 : -1) : 1;
    const nodeX = nodeXs[i];
    const columns = columnsForLeafCount(count);
    const labels = n.branches!.map((b) => b.label);
    const columnWidth = columnWidthFor(labels, columns);
    const items: LeafGeometry[] = n.branches!.map((leaf, k) => {
      const col = k % columns;
      const row = Math.floor(k / columns);
      const columnX = nodeX + LAYOUT.leafColumnOffset + col * columnWidth;
      const rowY = baselineY + dir * (LAYOUT.leafRowBase + row * LAYOUT.leafGap);
      const { d, length } = branchPath(nodeX, baselineY, rowY, columnX, opts.routing);
      return { id: leaf.id, label: leaf.label, d, length, labelX: columnX + 10, labelY: rowY, column: col };
    });
    return [{ nodeIndex: i, direction: dir, items }];
  });

  return {
    orientation: "horizontal",
    width,
    height,
    nodePositions: nodeXs.map((x) => ({ x, y: baselineY })),
    nodeArcFractions,
    trunkLive: { d: liveD, length: liveLen },
    trunkDead: { d: deadD, length: deadLen },
    liveFraction: liveLen / totalLength,
    branchGroups,
  };
}

/**
 * Vertical space one node's slot needs: room for its label/date block plus,
 * if it has branches, a single-column stack of branch rows beneath it. Never
 * less than the default `verticalGap` so unbranched nodes keep their usual
 * breathing room.
 */
export function verticalSlotHeight(branchCount: number): number {
  if (branchCount === 0) return LAYOUT.verticalGap;
  const needed = LAYOUT.leafRowBase + branchCount * LAYOUT.leafGap + LAYOUT.paddingY / 2;
  return Math.max(LAYOUT.verticalGap, needed);
}

export function computeVerticalLayout(nodes: CareerNode[], routing: Routing = "organic"): GraphLayout {
  const width = 340;
  const centerX = width / 2;
  const jitterMag = LAYOUT.mobileAnchorJitter;
  const waypointJitterMag = LAYOUT.mobileWaypointJitter;
  const perpLo = -centerX + LAYOUT.nodeRadius + 4;
  const perpHi = centerX - LAYOUT.nodeRadius - 4;

  const branchCounts = nodes.map((n) => n.branches?.length ?? 0);
  const nodeYs: number[] = [LAYOUT.paddingY];
  for (let i = 1; i < nodes.length; i++) {
    nodeYs.push(nodeYs[i - 1] + verticalSlotHeight(branchCounts[i - 1]));
  }
  const trailing = verticalSlotHeight(branchCounts[branchCounts.length - 1]);
  const height = nodeYs[nodeYs.length - 1] + trailing;

  const anchors: Point[] = nodes.map((n, i) => ({
    x: centerX + clamp(jitter(`${n.id}-anchor-v`, jitterMag), perpLo, perpHi),
    y: nodeYs[i],
  }));

  const futureIndex = nodes.findIndex((n) => n.kind === "future");
  // Index of the last LIVE node (one before the future node), not the future
  // node's own index — off this by one and the "dead" segment leading into
  // the future node silently merges into the live cyan path instead of
  // rendering as the ash-dashed unpowered wire.
  const liveEnd = futureIndex > 0 ? futureIndex - 1 : nodes.length - 1;

  const buildSpan = (fromIdx: number, toIdx: number) => {
    const pts: Point[] = [anchors[fromIdx]];
    for (let i = fromIdx; i < toIdx; i++) {
      const span = spanControlPoints(
        anchors[i],
        anchors[i + 1],
        "y",
        `${nodes[i].id}-${nodes[i + 1].id}-v`,
        waypointJitterMag,
        [perpLo + centerX, perpHi + centerX]
      );
      pts.push(span[1], span[2], span[3]);
    }
    return pts;
  };

  const livePts = buildSpan(0, liveEnd);
  const live = organicPath(livePts, "y", LAYOUT.arcSampleSteps);
  assertMonotonic(live.samples, "y", "live-vertical");

  const deadPts = liveEnd < nodes.length - 1 ? buildSpan(liveEnd, nodes.length - 1) : [];
  const dead = deadPts.length >= 2 ? organicPath(deadPts, "y", LAYOUT.arcSampleSteps) : { d: "", length: 0, samples: [] };
  if (deadPts.length) assertMonotonic(dead.samples, "y", "dead-vertical");

  const totalLength = live.length + dead.length || 1;
  const liveFraction = live.length / totalLength;

  const allSamples = [...live.samples, ...dead.samples];
  const cum: number[] = [0];
  for (let i = 1; i < allSamples.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(allSamples[i].x - allSamples[i - 1].x, allSamples[i].y - allSamples[i - 1].y));
  }
  const samplesPerSpan = LAYOUT.arcSampleSteps * 3;
  const nodeArcFractions: number[] = nodes.map((_, i) => {
    if (i === 0) return 0;
    if (i >= liveEnd) {
      const intoDead = i - liveEnd;
      const idx = live.samples.length - 1 + intoDead * samplesPerSpan;
      return (cum[Math.min(idx, cum.length - 1)] ?? cum[cum.length - 1]) / totalLength;
    }
    const idx = i * samplesPerSpan;
    return (cum[Math.min(idx, cum.length - 1)] ?? 0) / totalLength;
  });
  nodeArcFractions[nodeArcFractions.length - 1] = 1;

  const branchGroups: BranchGroup[] = nodes.flatMap((n, i) => {
    const count = branchCounts[i];
    if (count === 0) return [];
    const { x: nodeX, y: nodeY } = anchors[i];
    const dir: 1 | -1 = i % 2 === 0 ? 1 : -1;
    const branchReach = 60;

    const items: LeafGeometry[] = n.branches!.map((leaf, k) => {
      const rowCenterY = nodeY + LAYOUT.leafRowBase + k * LAYOUT.leafGap + LAYOUT.leafGap / 2;
      const endX = nodeX + dir * branchReach;
      const { d, length } = branchPath(nodeX, nodeY, rowCenterY, endX, routing);
      const labelX = endX + (dir === 1 ? 8 : -8);
      return { id: leaf.id, label: leaf.label, d, length, labelX, labelY: rowCenterY, column: 0 };
    });
    return [{ nodeIndex: i, direction: dir, items }];
  });

  return {
    orientation: "vertical",
    width,
    height,
    nodePositions: anchors,
    nodeArcFractions,
    trunkLive: { d: live.d, length: live.length },
    trunkDead: { d: dead.d, length: dead.length },
    liveFraction,
    branchGroups,
  };
}
