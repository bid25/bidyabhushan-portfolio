"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent, useTransform, useMotionTemplate } from "motion/react";
import { careerGraph, type CareerNode } from "@/data/trajectory";
import {
  computeHorizontalLayout,
  computeVerticalLayout,
  createSeededRandom,
  verticalSlotHeight,
  LAYOUT,
  type GraphLayout,
  type Routing,
} from "@/lib/trajectoryLayout";
import { useMediaQuery, PREFERS_REDUCED_MOTION, IS_TABLET_DOWN, IS_MOBILE } from "@/hooks/useMediaQuery";
import "./Trajectory.css";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAR_COUNT = 56;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(ym: string): string {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  if (!m) return y;
  const idx = parseInt(m, 10) - 1;
  return `${MONTHS[idx] ?? ""} ${y}`.trim();
}

function dateRangeLabel(node: CareerNode): string {
  if (node.kind === "future") return "unwritten";
  const startLabel = formatMonth(node.start);
  if (node.end === null) return `${startLabel} – present`;
  if (node.end === undefined) return startLabel;
  return `${startLabel} – ${formatMonth(node.end)}`;
}

function nodeAriaLabel(node: CareerNode): string {
  if (node.kind === "future") return "Next node, unwritten";
  const parts = [node.label];
  if (node.detail) parts.push(node.detail);
  parts.push(dateRangeLabel(node));
  return parts.join(", ");
}

/** Per-element scroll-scrub CSS vars: an intermediate --lp (local progress,
 * 0..1) computed from the shared --progress var via calc/clamp, so every
 * consumer (opacity, transform, stroke-dashoffset) reads one number. This is
 * what lets the reveal scale to an arbitrary node count without calling a
 * Motion hook per node (which `.map()` can't do under rules-of-hooks). */
function revealVars(start: number, range: number): React.CSSProperties {
  const clampedRange = Math.max(range, 0.001);
  // A node whose arc fraction sits at/near 1 would otherwise get a reveal
  // window like [1, 1.08] — entirely past the max achievable --progress, so
  // its local progress could never leave 0. Clamp the window's start so
  // every node's reveal actually completes by the time scrubbing reaches 1.
  const clampedStart = Math.min(start, 1 - clampedRange);
  return {
    // React's SSR serializer and its client-side prop diff disagree on
    // number-vs-string for custom properties (hydration mismatch) unless
    // these are passed as strings explicitly.
    ["--ns" as string]: String(clampedStart),
    ["--nr" as string]: String(clampedRange),
    ["--lp" as string]: "clamp(0, calc((var(--progress) - var(--ns)) / var(--nr)), 1)",
  } as React.CSSProperties;
}

const STATIC_LP: React.CSSProperties = { ["--lp" as string]: "1" } as React.CSSProperties;

interface TrajectoryProps {
  routing?: Routing;
}

export function Trajectory({ routing = "organic" }: TrajectoryProps) {
  const nodes = careerGraph.nodes;

  const isTabletDown = useMediaQuery(IS_TABLET_DOWN);
  const isMobile = useMediaQuery(IS_MOBILE);
  const prefersReducedMotion = useMediaQuery(PREFERS_REDUCED_MOTION);

  const orientation: "horizontal" | "vertical" = isMobile ? "vertical" : "horizontal";

  const layout: GraphLayout = useMemo(() => {
    if (orientation === "vertical") return computeVerticalLayout(nodes, routing);
    return computeHorizontalLayout(nodes, {
      trunkGap: isTabletDown ? LAYOUT.trunkGapTablet : LAYOUT.trunkGapDesktop,
      bothSides: !isTabletDown,
      routing,
      tablet: isTabletDown,
    });
  }, [nodes, orientation, isTabletDown, routing]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // hover or focus, drives dimming
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rootRef = useRef<HTMLElement | null>(null);

  // "end start" (section bottom clears viewport top) would need scroll room
  // past the section's own bottom — this component sits last on the page
  // with no trailing footer, so that endpoint is unreachable and progress
  // could never hit 1. "end end" completes as soon as the whole section has
  // scrolled into view, which stays reachable regardless of what follows it.
  const { scrollYProgress } = useScroll({ 
    target: rootRef, 
    offset: orientation === "horizontal" ? ["start end", "end end"] : ["start 75%", "end end"] 
  });
  const slideProgress = useTransform(scrollYProgress, [0.7, 1.0], [0, 1]);

  // Bounded ambient loop: once the trunk is fully drawn, run the traveling
  // spark / breathing ring / terminal rotation for a fixed number of cycles,
  // then hold static. Never an indefinite timer (Rules.md's no-ambient-motion
  // rule), never gated behind continued pointer activity either (per the
  // owner's resolution superseding the earlier interaction-gated approach —
  // see Memory.md). Toggling a class imperatively keeps this off the React
  // render path entirely, so it never fires a re-render per scroll tick.
  const ambientTriggered = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (prefersReducedMotion) return;
    const el = rootRef.current;
    if (!el) return;
    if (v >= 0.90 && !ambientTriggered.current) {
      ambientTriggered.current = true;
      el.classList.remove("trajectory-ambient-play");
      void el.offsetWidth; // restart keyframes if replaying
      el.classList.add("trajectory-ambient-play");
    } else if (v < 0.90 && ambientTriggered.current) {
      ambientTriggered.current = false;
      el.classList.remove("trajectory-ambient-play");
    }
  });

  function focusNode(i: number) {
    const clamped = Math.max(0, Math.min(nodes.length - 1, i));
    setFocusedIndex(clamped);
    buttonRefs.current[clamped]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent, i: number) {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusNode(i + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusNode(i - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setExpandedIndex((prev) => (prev === i ? null : i));
        break;
      case "Escape":
        setExpandedIndex(null);
        break;
    }
  }

  // For horizontal, browsers seem to handle disconnected M commands fine.
  // For vertical, we merge live and dead paths continuously by stripping the redundant "M x,y" from the start of trunkDead.
  const fullTrunkD = orientation === "horizontal"
    ? `${layout.trunkLive.d} ${layout.trunkDead.d}`.trim()
    : (layout.trunkLive.d && layout.trunkDead.d 
        ? `${layout.trunkLive.d} ${layout.trunkDead.d.replace(/^M\s*[\d.-]+,[\d.-]+\s*/, "")}`.trim() 
        : "");

  return (
    <section
      ref={(el) => {
        rootRef.current = el;
      }}
      className="relative w-full border-t border-ash/30 px-4 pt-20 pb-[25vh] sm:px-8 lg:px-16"
    >
      <Starfield />

      <motion.div
        className="relative mx-auto w-full max-w-[1200px]"
        style={prefersReducedMotion ? undefined : { ["--progress" as string]: scrollYProgress }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-cyan">signal path</p>
        <h2 className="mb-10 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] text-bone">
          Trajectory
        </h2>

        {orientation === "horizontal" ? (
          <HorizontalGraph
            nodes={nodes}
            layout={layout}
            fullTrunkD={fullTrunkD}
            reduced={prefersReducedMotion}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
            activeIndex={activeIndex}
            expandedIndex={expandedIndex}
            setActiveIndex={setActiveIndex}
            setExpandedIndex={setExpandedIndex}
            handleKeyDown={handleKeyDown}
            buttonRefs={buttonRefs}
            slideProgress={slideProgress}
          />
        ) : (
          <VerticalGraph
            nodes={nodes}
            layout={layout}
            fullTrunkD={fullTrunkD}
            reduced={prefersReducedMotion}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
            activeIndex={activeIndex}
            expandedIndex={expandedIndex}
            setActiveIndex={setActiveIndex}
            setExpandedIndex={setExpandedIndex}
            handleKeyDown={handleKeyDown}
            buttonRefs={buttonRefs}
          />
        )}

        {/* Accessibility floor: SVG is aria-hidden; this hidden list is the real content. */}
        <ol className="sr-only">
          {nodes.map((node) => (
            <li key={node.id}>
              <h3>
                {node.label}
                {node.detail ? ` — ${node.detail}` : ""}
              </h3>
              {node.org && <p>{node.org}</p>}
              <p>{dateRangeLabel(node)}</p>
              {node.summary && <p>{node.summary}</p>}
              {node.branches && node.branches.length > 0 && (
                <ul>
                  {node.branches.map((b) => (
                    <li key={b.id}>{b.label}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

/** Seeded, fixed-position CSS-only starfield. Sits behind trunk/nodes/leaves. */
function Starfield() {
  const stars = useMemo(() => {
    const rnd = createSeededRandom("trajectory-starfield");
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: (1 + rnd() * 1.5) * 1.15,
      opacity: (0.15 + rnd() * 0.2) * 1.15,
      delay: rnd() * 6,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stars.map((s) => (
        <span
          key={s.id}
          className="trajectory-star absolute rounded-none bg-bone"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: "var(--star-opacity)",
            animationDelay: `${s.delay}s`,
            ["--star-opacity" as string]: String(s.opacity),
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}

interface SharedGraphProps {
  nodes: CareerNode[];
  layout: GraphLayout;
  reduced: boolean;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleKeyDown: (e: React.KeyboardEvent, i: number) => void;
  buttonRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>;
}

function NodeRing({
  node,
  reduced,
  arcFraction,
}: {
  node: CareerNode;
  reduced: boolean;
  arcFraction: number;
}) {
  const vars = reduced ? STATIC_LP : revealVars(arcFraction, LAYOUT.revealRange);
  const style: React.CSSProperties = {
    ...vars,
    opacity: "var(--lp)",
    transform: "scale(calc(0.6 + 0.4 * var(--lp)))",
    transformOrigin: "center",
    transformBox: "fill-box",
  };

  if (node.kind === "future") {
    return (
      <g style={style} suppressHydrationWarning>
        <circle r={LAYOUT.nodeRadius} fill="none" stroke="var(--color-ash)" strokeWidth={1.5} strokeDasharray="3 3" />
        <circle
          r={LAYOUT.nodeRadius + 4}
          fill="none"
          stroke="var(--color-ash)"
          strokeWidth={1}
          strokeDasharray="2 4"
          opacity={0.6}
          className="trajectory-rotate"
        />
      </g>
    );
  }

  return (
    <g style={style} suppressHydrationWarning>
      <circle r={LAYOUT.nodeRadius} fill="var(--color-amber)" fillOpacity={0.15} stroke="var(--color-amber)" strokeWidth={2} />
      {node.status === "active" && (
        <circle
          r={LAYOUT.nodeRadius + 4}
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth={1}
          className="trajectory-breathe"
        />
      )}
    </g>
  );
}

function TrunkPaths({ layout, reduced }: { layout: GraphLayout; reduced: boolean }) {
  const liveVars: React.CSSProperties = reduced
    ? { ["--lp" as string]: "1" }
    : ({
        ["--ns" as string]: "0",
        ["--nr" as string]: String(Math.max(layout.liveFraction, 0.001)),
        ["--lp" as string]: "clamp(0, calc((var(--progress) - var(--ns)) / var(--nr)), 1)",
      } as React.CSSProperties);
  const deadVars: React.CSSProperties = reduced
    ? { ["--lp" as string]: "1" }
    : ({
        ["--ns" as string]: String(layout.liveFraction),
        ["--nr" as string]: String(Math.max(1 - layout.liveFraction, 0.001)),
        ["--lp" as string]: "clamp(0, calc((var(--progress) - var(--ns)) / var(--nr)), 1)",
      } as React.CSSProperties);

  return (
    <>
      {layout.trunkLive.d && (
        <g className="trajectory-glow" style={liveVars} suppressHydrationWarning>
          <path
            d={layout.trunkLive.d}
            stroke="var(--color-cyan)"
            strokeOpacity={0.12}
            strokeWidth={6}
            fill="none"
            style={{
              strokeDasharray: layout.trunkLive.length,
              strokeDashoffset: `calc(${layout.trunkLive.length} * (1 - var(--lp)))`,
            }}
          />
          <path
            d={layout.trunkLive.d}
            stroke="var(--color-cyan)"
            strokeWidth={2.5}
            fill="none"
            style={{
              strokeDasharray: layout.trunkLive.length,
              strokeDashoffset: `calc(${layout.trunkLive.length} * (1 - var(--lp)))`,
            }}
          />
        </g>
      )}
      {layout.trunkDead.d && (
        <path
          d={layout.trunkDead.d}
          stroke="var(--color-ash)"
          strokeWidth={1.5}
          strokeDasharray="4 5"
          fill="none"
          style={{
            ...deadVars,
            strokeDashoffset: `calc(${layout.trunkDead.length} * (1 - var(--lp)))`,
          }}
          suppressHydrationWarning
        />
      )}
    </>
  );
}

function HorizontalGraph({
  nodes,
  layout,
  fullTrunkD,
  reduced,
  focusedIndex,
  setFocusedIndex,
  activeIndex,
  expandedIndex,
  setActiveIndex,
  setExpandedIndex,
  handleKeyDown,
  buttonRefs,
  slideProgress,
}: SharedGraphProps & {
  fullTrunkD: string;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  slideProgress: import("motion/react").MotionValue<number>;
}) {
  const extraRightPadding = 160; // Extra room so long labels don't get clipped by the container edge
  const graphWidth = layout.width + extraRightPadding;
  const transform = useMotionTemplate`translateX(calc(${slideProgress} * min(0px, 100cqw - ${graphWidth}px)))`;

  return (
    <div
      className="relative w-full overflow-hidden @container py-[120px] -my-[120px]"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)",
        pointerEvents: "none", // Prevent the expanded bounding box from blocking other elements
      }}
    >
      <motion.div className="relative pointer-events-auto" style={{ width: graphWidth, height: layout.height, transform }}>
        <svg
          width={graphWidth}
          height={layout.height}
          viewBox={`0 0 ${graphWidth} ${layout.height}`}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
        >
          <TrunkPaths layout={layout} reduced={reduced} />

          {layout.branchGroups.map((group) => {
            const node = nodes[group.nodeIndex];
            const nodeStart = layout.nodeArcFractions[group.nodeIndex];
            const dim = activeIndex !== null && activeIndex !== group.nodeIndex;
            return (
              <g key={node.id} style={{ opacity: dim ? 0.25 : 1, transition: "opacity 180ms ease" }}>
                {group.items.map((leaf, k) => {
                  const stagger = Math.min(k * 0.012, LAYOUT.revealRange * 0.5);
                  const vars = reduced ? STATIC_LP : revealVars(nodeStart + stagger, LAYOUT.revealRange);
                  const brighten = activeIndex === group.nodeIndex;
                  return (
                    <path
                      key={leaf.id}
                      d={leaf.d}
                      fill="none"
                      stroke="var(--color-cyan)"
                      strokeOpacity={brighten ? 0.9 : 0.5}
                      strokeWidth={1.5}
                      style={{
                        ...vars,
                        strokeDasharray: leaf.length,
                        strokeDashoffset: `calc(${leaf.length} * (1 - var(--lp)))`,
                        transition: "stroke-opacity 180ms ease",
                      }}
                      suppressHydrationWarning
                    />
                  );
                })}
              </g>
            );
          })}

          {layout.nodePositions.map((pos, i) => (
            <g key={nodes[i].id} transform={`translate(${pos.x}, ${pos.y})`}>
              <NodeRing node={nodes[i]} reduced={reduced} arcFraction={layout.nodeArcFractions[i]} />
            </g>
          ))}
        </svg>

        {/* Traveling spark — bounded ambient loop, triggers once the trunk is fully revealed. */}
        {fullTrunkD && !reduced && (
          <div
            aria-hidden="true"
            className="trajectory-packet pointer-events-none absolute z-10 h-1.5 w-1.5 rounded-none bg-[var(--color-amber)]"
            style={{
              offsetPath: `path("${fullTrunkD}")`,
              offsetRotate: "0deg",
              boxShadow: "0 0 6px 2px var(--color-amber)",
            }}
          />
        )}

        {layout.nodePositions.map((pos, i) => {
          const node = nodes[i];
          const group = layout.branchGroups.find((g) => g.nodeIndex === i);
          const labelAbove = group ? group.direction === -1 : i % 2 === 1;
          const gap = LAYOUT.nodeRadius + LAYOUT.nodeLabelGap;
          // The first/last node sit close to the section's horizontal edge —
          // center-aligning their label would push half its width into the
          // edge-fade mask and clip it (the v1 bug on the MAIT node). Anchor
          // outward from the edge instead.
          const isFirst = i === 0;
          const isLast = i === nodes.length - 1;
          const hTranslate = isFirst ? "0%" : isLast ? "-100%" : "-50%";
          const hAlignClass = isFirst ? "text-left" : isLast ? "text-right" : "text-center";

          return (
            <div key={node.id} className="z-20">
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                tabIndex={focusedIndex === i ? 0 : -1}
                aria-label={nodeAriaLabel(node)}
                aria-expanded={expandedIndex === i}
                onFocus={() => {
                  setActiveIndex(i);
                  setFocusedIndex(i);
                }}
                onBlur={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                onClick={() => setExpandedIndex((prev) => (prev === i ? null : i))}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="absolute z-20 size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                style={{ left: pos.x, top: pos.y }}
              />

              <div
                className={`pointer-events-none absolute z-20 w-[180px] ${hAlignClass}`}
                style={{
                  left: isFirst ? pos.x - LAYOUT.nodeRadius - 4 : isLast ? pos.x + LAYOUT.nodeRadius + 4 : pos.x,
                  top: labelAbove ? pos.y - gap : pos.y + gap,
                  transform: `translate(${hTranslate}, ${labelAbove ? "-100%" : "0"})`,
                }}
              >
                <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-bone">{node.label}</p>
                <p className="font-mono text-[0.65rem] tabular-nums uppercase tracking-[0.06em] text-ash">
                  {dateRangeLabel(node)}
                </p>
              </div>

              {group && (
                <div className="pointer-events-none absolute z-20">
                  {group.items.map((leaf, k) => {
                    const stagger = Math.min(k * 0.012, LAYOUT.revealRange * 0.5);
                    const vars = reduced ? STATIC_LP : revealVars(layout.nodeArcFractions[i] + stagger, LAYOUT.revealRange);
                    const brighten = activeIndex === i;
                    return (
                      <span
                        key={leaf.id}
                        className="absolute whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.05em]"
                        style={{
                          ...vars,
                          left: leaf.labelX,
                          top: leaf.labelY,
                          transform: "translateY(-50%) translateY(calc((1 - var(--lp)) * 6px))",
                          opacity: "var(--lp)",
                          color: brighten ? "var(--color-cyan)" : "var(--color-ash)",
                          transition: "color 180ms ease",
                        }}
                        suppressHydrationWarning
                      >
                        {leaf.label}
                      </span>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {(activeIndex === i || expandedIndex === i) && (node.org || node.summary) && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: labelAbove ? "6px" : "calc(-100% + 6px)" }}
                    animate={{ opacity: 1, y: labelAbove ? "0%" : "-100%" }}
                    exit={{ opacity: 0, y: labelAbove ? "6px" : "calc(-100% + 6px)" }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="pointer-events-none absolute z-30 w-[240px] border border-ash/30 bg-void px-3 py-2"
                    style={{
                      left: isFirst ? pos.x - LAYOUT.nodeRadius : isLast ? pos.x + LAYOUT.nodeRadius : pos.x,
                      top: labelAbove ? pos.y + gap + 40 : pos.y - gap - 40,
                      x: isFirst ? "0%" : isLast ? "-100%" : "-50%",
                    }}
                  >
                    {node.org && <p className="font-body text-xs text-ash">{node.org}</p>}
                    {node.detail && <p className="font-mono text-[0.65rem] uppercase tracking-[0.06em] text-cyan">{node.detail}</p>}
                    {node.summary && <p className="mt-1 font-body text-xs leading-relaxed text-bone">{node.summary}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function VerticalGraph({
  nodes,
  layout,
  fullTrunkD,
  reduced,
  focusedIndex,
  setFocusedIndex,
  activeIndex,
  expandedIndex,
  setActiveIndex,
  setExpandedIndex,
  handleKeyDown,
  buttonRefs,
}: SharedGraphProps & {
  fullTrunkD: string;
  focusedIndex: number;
  setFocusedIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]" style={{ minHeight: layout.height }}>
      <svg
        width={layout.width}
        height={layout.height}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10"
      >
        <TrunkPaths layout={layout} reduced={reduced} />

        {layout.branchGroups.map((group) => {
          const node = nodes[group.nodeIndex];
          const nodeStart = layout.nodeArcFractions[group.nodeIndex];
          const dim = activeIndex !== null && activeIndex !== group.nodeIndex;
          return (
            <g key={node.id} style={{ opacity: dim ? 0.25 : 1, transition: "opacity 180ms ease" }}>
              {group.items.map((leaf, k) => {
                const stagger = Math.min(k * 0.012, LAYOUT.revealRange * 0.5);
                const vars = reduced ? STATIC_LP : revealVars(nodeStart + stagger, LAYOUT.revealRange);
                const brighten = activeIndex === group.nodeIndex;
                return (
                  <path
                    key={leaf.id}
                    d={leaf.d}
                    fill="none"
                    stroke="var(--color-cyan)"
                    strokeOpacity={brighten ? 0.9 : 0.5}
                    strokeWidth={1.5}
                    style={{
                      ...vars,
                      strokeDasharray: leaf.length,
                      strokeDashoffset: `calc(${leaf.length} * (1 - var(--lp)))`,
                      transition: "stroke-opacity 180ms ease",
                    }}
                    suppressHydrationWarning
                  />
                );
              })}
            </g>
          );
        })}

        {layout.nodePositions.map((pos, i) => (
          <g key={nodes[i].id} transform={`translate(${pos.x}, ${pos.y})`}>
            <NodeRing node={nodes[i]} reduced={reduced} arcFraction={layout.nodeArcFractions[i]} />
          </g>
        ))}
      </svg>

      {fullTrunkD && !reduced && (
        <div
          aria-hidden="true"
          className="trajectory-packet pointer-events-none absolute top-0 left-0 z-10 h-1.5 w-1.5 rounded-none bg-[var(--color-amber)]"
          style={{
            offsetPath: `path("${fullTrunkD}")`,
            offsetRotate: "0deg",
            boxShadow: "0 0 6px 2px var(--color-amber)",
          }}
        />
      )}

      <div className="relative" style={{ height: layout.height }}>
        {layout.nodePositions.map((pos, i) => {
          const node = nodes[i];
          const group = layout.branchGroups.find((g) => g.nodeIndex === i);
          const gap = LAYOUT.nodeRadius + LAYOUT.nodeLabelGap;

          return (
            <div key={node.id} className="z-20">
              <button
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                tabIndex={focusedIndex === i ? 0 : -1}
                aria-label={nodeAriaLabel(node)}
                aria-expanded={expandedIndex === i}
                onFocus={() => {
                  setActiveIndex(i);
                  setFocusedIndex(i);
                }}
                onBlur={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((prev) => (prev === i ? null : prev))}
                onClick={() => setExpandedIndex((prev) => (prev === i ? null : i))}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className="absolute z-20 size-9 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
                style={{ left: pos.x, top: pos.y }}
              />

              <div
                className="pointer-events-none absolute z-20 w-[180px] text-center"
                style={{
                  left: pos.x,
                  top: pos.y - gap,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.08em] text-bone">{node.label}</p>
                <p className="font-mono text-[0.65rem] tabular-nums uppercase tracking-[0.06em] text-ash">
                  {dateRangeLabel(node)}
                </p>
              </div>

              {group && (
                <div className="pointer-events-none absolute z-20">
                  {group.items.map((leaf, k) => {
                    const stagger = Math.min(k * 0.012, LAYOUT.revealRange * 0.5);
                    const vars = reduced ? STATIC_LP : revealVars(layout.nodeArcFractions[i] + stagger, LAYOUT.revealRange);
                    const brighten = activeIndex === i;
                    const hAlignClass = group.direction === 1 ? "text-left" : "text-right";
                    const hTranslate = group.direction === 1 ? "0%" : "-100%";
                    return (
                      <span
                        key={leaf.id}
                        className={`absolute font-mono text-[10px] leading-[1.1] uppercase tracking-[0.05em] w-[90px] ${hAlignClass}`}
                        style={{
                          ...vars,
                          left: leaf.labelX,
                          top: leaf.labelY,
                          transform: `translate(${hTranslate}, -50%) translateY(calc((1 - var(--lp)) * 6px))`,
                          opacity: "var(--lp)",
                          color: brighten ? "var(--color-cyan)" : "var(--color-ash)",
                          transition: "color 180ms ease",
                        }}
                        suppressHydrationWarning
                      >
                        {leaf.label}
                      </span>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {(activeIndex === i || expandedIndex === i) && (node.org || node.summary) && (
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: "6px" }}
                    animate={{ opacity: 1, y: "0%" }}
                    exit={{ opacity: 0, y: "6px" }}
                    transition={{ duration: 0.18, ease: EASE }}
                    className="pointer-events-none absolute z-30 w-[240px] border border-ash/30 bg-void px-3 py-2"
                    style={{
                      left: pos.x,
                      top: pos.y + gap + 20,
                      x: "-50%",
                    }}
                  >
                    {node.org && <p className="font-body text-xs text-ash">{node.org}</p>}
                    {node.detail && <p className="font-mono text-[0.65rem] uppercase tracking-[0.06em] text-cyan">{node.detail}</p>}
                    {node.summary && <p className="mt-1 font-body text-xs leading-relaxed text-bone">{node.summary}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
