"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface Milestone {
  id: string;
  label: string;
  x: number;
  y: number;
  year: string;
  role: string;
  desc: string;
  tags?: string[];
}

const CANVAS_W = 2850;
const CANVAS_H = 760;

const MILESTONES: Milestone[] = [
  {
    id: "mait",
    label: "01 · MAIT",
    x: 110,
    y: 360,
    year: "AUG 2025",
    role: "DAY ONE",
    desc: "B.Tech Electronics, Maharaja Agrasen Institute of Technology",
    tags: ["Electronics", "Circuits", "Signals", "Hardware Foundations"],
  },
  {
    id: "aerostars",
    label: "02 · AEROSTARS",
    x: 480,
    y: 200,
    year: "SEP 2025 – PRESENT",
    role: "CORE MEMBER",
    desc: "IoT, Embedded Systems, AI/ML Scope & Hardware Assembly",
    tags: ["IoT Development", "Embedded Systems", "Hardware Assembly", "ML Training"],
  },
  {
    id: "intern",
    label: "03 · INTERN",
    x: 880,
    y: 460,
    year: "JUN 2026 – JUL 2026",
    role: "BACKEND INTERN",
    desc: "AB Connectz: Node.js, NestJS, PostgreSQL, Redis, REST APIs",
    tags: ["Node.js", "NestJS", "PostgreSQL", "Redis", "REST APIs", "Prisma"],
  },
  {
    id: "fulltime",
    label: "04 · FULL-TIME",
    x: 1320,
    y: 280,
    year: "JUL 2026 – PRESENT",
    role: "FULL-STACK ENG",
    desc: "AB Connectz: Three.js, React Native, Supabase RLS, Gemini API",
    tags: ["React Native", "Three.js", "Gemini API", "Supabase RLS", "Expo EAS"],
  },
  {
    id: "broccoli",
    label: "05 · BROCCOLI",
    x: 1780,
    y: 440,
    year: "AUG 2026 – PRESENT",
    role: "SOLO FLAGSHIP",
    desc: "Broccoli: Calorie & Body-Comp Platform on Play Store · Offline SQLite, NestJS, Skia, Gemini Vision",
    tags: ["SQLite FTS5", "Offline-First", "Reanimated 3", "Skia Canvas", "NestJS"],
  },
  {
    id: "zucchini",
    label: "06 · ZUCCHINI",
    x: 2280,
    y: 280,
    year: "OCT 2026 – PRESENT",
    role: "BARE-METAL BRINGUP",
    desc: "Zucchini Linux: Bare-Metal Bringup on Samsung Tab A · Reverse Eng sboot, Mainline Arch ARM64 + LineageOS",
    tags: ["Samsung sboot", "EDL 9008", "ARM64 Kernel", "AVB 2.0 Bypass", "Device Tree"],
  },
  {
    id: "next",
    label: "07 · NEXT",
    x: 2720,
    y: 360,
    year: "FUTURE",
    role: "UNWRITTEN",
    desc: "Next chapter: Systems architecture, frontier AI/ML & embedded engineering.",
    tags: ["Systems Architecture", "Frontier AI/ML", "Kernel Bringup", "Open Systems"],
  },
];

export function TrajectorySketchBox() {
  const containerRef = useRef<HTMLDivElement>(null);

  // View mode: interactive CAD canvas vs mobile-friendly structured list
  const [viewMode, setViewMode] = useState<"cad" | "list">("cad");

  // Pan & Zoom state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeMilestone, setActiveMilestone] = useState<string>("mait");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Jump to specific milestone node
  const jumpToMilestone = useCallback((m: Milestone) => {
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;

    const targetScale = W < 640 ? 0.68 : 0.92;
    const targetX = W / 2 - m.x * targetScale;
    const targetY = H / 2 - m.y * targetScale;

    setIsTransitioning(true);
    setScale(targetScale);
    setPan({ x: targetX, y: targetY });
    setActiveMilestone(m.id);

    setTimeout(() => setIsTransitioning(false), 380);
  }, []);

  // Fit whole schematic into view (or current milestone on mobile)
  const fitToView = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;

    if (W < 640) {
      // On small phone screens, don't shrink to 0.1x! Center the active milestone at legible scale
      const current = MILESTONES.find((m) => m.id === activeMilestone) || MILESTONES[0];
      jumpToMilestone(current);
      return;
    }

    const padding = 20;
    const scaleX = (W - padding * 2) / CANVAS_W;
    const scaleY = (H - padding * 2) / CANVAS_H;
    const targetScale = Math.min(scaleX, scaleY, 1);

    const targetX = (W - CANVAS_W * targetScale) / 2;
    const targetY = (H - CANVAS_H * targetScale) / 2;

    setIsTransitioning(true);
    setScale(targetScale);
    setPan({ x: targetX, y: targetY });
    setActiveMilestone("overview");

    setTimeout(() => setIsTransitioning(false), 380);
  }, [activeMilestone, jumpToMilestone]);

  // Stepper helpers
  const currentIndex = MILESTONES.findIndex((m) => m.id === activeMilestone);
  const activeIdx = currentIndex >= 0 ? currentIndex : 0;
  const currentMilestone = MILESTONES[activeIdx];

  const handlePrevMilestone = useCallback(() => {
    const prevIdx = (activeIdx - 1 + MILESTONES.length) % MILESTONES.length;
    jumpToMilestone(MILESTONES[prevIdx]);
  }, [activeIdx, jumpToMilestone]);

  const handleNextMilestone = useCallback(() => {
    const nextIdx = (activeIdx + 1) % MILESTONES.length;
    jumpToMilestone(MILESTONES[nextIdx]);
  }, [activeIdx, jumpToMilestone]);

  // Center on mount and on resize
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (container && container.clientWidth < 640) {
        // On mobile, focus on the first milestone at readable scale
        jumpToMilestone(MILESTONES[0]);
      } else {
        fitToView();
      }
    }, 60);

    const handleResize = () => {
      const container = containerRef.current;
      if (container && container.clientWidth < 640) {
        // Keep active milestone centered on mobile resize without resetting
        setActiveMilestone((curr) => {
          const current = MILESTONES.find((m) => m.id === curr) || MILESTONES[0];
          jumpToMilestone(current);
          return curr;
        });
      } else {
        fitToView();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zoom controls (+ / -)
  const handleZoom = (direction: "in" | "out") => {
    const factor = direction === "in" ? 1.25 : 0.8;
    const container = containerRef.current;
    if (!container) return;
    const W = container.clientWidth;
    const H = container.clientHeight;

    const newScale = Math.min(Math.max(scale * factor, 0.32), 2.4);
    const centerCanvasX = (W / 2 - pan.x) / scale;
    const centerCanvasY = (H / 2 - pan.y) / scale;

    const newPanX = W / 2 - centerCanvasX * newScale;
    const newPanY = H / 2 - centerCanvasY * newScale;

    setIsTransitioning(true);
    setScale(newScale);
    setPan({ x: newPanX, y: newPanY });
    setTimeout(() => setIsTransitioning(false), 200);
  };

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => setIsDragging(false);

  return (
    <div className="w-full flex flex-col border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] select-none overflow-hidden font-mono">
      {/* ── SKETCH BOX CAD HEADER BAR ─────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#0B3D2E] text-[#FFD93B] px-3 sm:px-4 py-2 border-b-3 border-[#0B3D2E]">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <span className="w-2.5 h-2.5 bg-[#2F9E5E] animate-pulse rounded-none shrink-0" />
          <span className="font-pixel text-[10px] sm:text-xs tracking-wider">
            SKETCH_BOX // SIGNAL_TRAJECTORY.CAD
          </span>
          <span className="hidden md:inline font-mono text-[10px] bg-[#FFD93B]/20 text-[#FFD93B] px-2 py-0.5 border border-[#FFD93B]/40">
            DRAFTING_CANVAS
          </span>
        </div>

        {/* View Mode Toggle: CAD SCHEMATIC vs TIMELINE LIST */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode("cad")}
            className={`px-2.5 py-1 font-pixel text-[9px] sm:text-[10px] border transition-colors cursor-pointer ${
              viewMode === "cad"
                ? "bg-[#FFD93B] text-[#0B3D2E] border-[#FFD93B] font-bold"
                : "bg-[#06231A] text-[#FFF6C2] border-[#0B3D2E] hover:bg-[#FFD93B] hover:text-[#0B3D2E]"
            }`}
          >
            📐 CAD CANVAS
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-2.5 py-1 font-pixel text-[9px] sm:text-[10px] border transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-[#FF5C8A] text-[#0B3D2E] border-[#FFD93B] font-bold"
                : "bg-[#06231A] text-[#FFF6C2] border-[#0B3D2E] hover:bg-[#FFD93B] hover:text-[#0B3D2E]"
            }`}
          >
            📜 TIMELINE LIST
          </button>
        </div>
      </div>

      {/* ── INTERACTION / TOOLBAR TAPE (CAD MODE) ─────────── */}
      {viewMode === "cad" && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FFD93B] text-[#0B3D2E] px-3 sm:px-4 py-1.5 border-b-3 border-[#0B3D2E] text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-pixel text-[9px] sm:text-[10px] bg-[#0B3D2E] text-[#FFF6C2] px-2 py-0.5 border border-[#0B3D2E]">
              <span className="w-1.5 h-3 bg-[#FF5C8A] inline-block" />
              DRAG TO PAN
            </span>
            <span className="hidden sm:inline font-mono text-[10px] sm:text-[11px] text-[#0B3D2E]/80">
              ZOOM: <strong>{Math.round(scale * 100)}%</strong>
            </span>
          </div>

          {/* Viewport Control Buttons + Mobile Stepper */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={handlePrevMilestone}
              className="pop px-2 py-0.5 bg-[#0B3D2E] hover:bg-[#FF5C8A] text-[#FFD93B] hover:text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] cursor-pointer"
              title="Previous Milestone"
            >
              ◀ PREV
            </button>
            <button
              type="button"
              onClick={handleNextMilestone}
              className="pop px-2 py-0.5 bg-[#0B3D2E] hover:bg-[#FF5C8A] text-[#FFD93B] hover:text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] cursor-pointer"
              title="Next Milestone"
            >
              NEXT ▶
            </button>

            <span className="text-[#0B3D2E]/40 mx-0.5 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={() => handleZoom("out")}
              className="pop px-2 py-0.5 bg-[#FFF6C2] hover:bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] sm:text-[10px] shadow-[2px_2px_0_#0B3D2E] cursor-pointer hidden sm:inline-block"
              title="Zoom Out"
            >
              －
            </button>
            <button
              type="button"
              onClick={fitToView}
              className="pop px-2.5 py-0.5 bg-[#FFF6C2] hover:bg-[#2F9E5E] hover:text-[#FFF6C2] text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] sm:text-[10px] shadow-[2px_2px_0_#0B3D2E] cursor-pointer"
              title="Fit to View"
            >
              FIT
            </button>
            <button
              type="button"
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                setIsTransitioning(true);
                const targetS = container.clientWidth < 640 ? 0.68 : 1;
                setScale(targetS);
                setPan({
                  x: (container.clientWidth - CANVAS_W * targetS) / 2,
                  y: (container.clientHeight - CANVAS_H * targetS) / 2,
                });
                setTimeout(() => setIsTransitioning(false), 200);
              }}
              className="pop px-2.5 py-0.5 bg-[#FFF6C2] hover:bg-[#FFD93B] text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] sm:text-[10px] shadow-[2px_2px_0_#0B3D2E] cursor-pointer hidden sm:inline-block"
              title="Reset 100%"
            >
              100%
            </button>
            <button
              type="button"
              onClick={() => handleZoom("in")}
              className="pop px-2 py-0.5 bg-[#FFF6C2] hover:bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] font-pixel text-[9px] sm:text-[10px] shadow-[2px_2px_0_#0B3D2E] cursor-pointer hidden sm:inline-block"
              title="Zoom In"
            >
              ＋
            </button>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE CANVAS VIEWPORT ──────────────────── */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-[380px] sm:h-[620px] bg-[#FFF6C2] overflow-hidden touch-pan-y ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          display: viewMode === "cad" ? "block" : "none",
          backgroundImage: `
            radial-gradient(#0B3D2E 1.2px, transparent 1.2px),
            linear-gradient(to right, rgba(11, 61, 46, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(11, 61, 46, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px, 140px 140px, 140px 140px",
        }}
      >
        {/* CAD Coordinate Markers */}
        <div className="absolute top-2 left-2 text-[#0B3D2E]/40 font-mono text-[9px] pointer-events-none">
          + [000, 000]
        </div>
        <div className="absolute top-2 right-2 text-[#0B3D2E]/40 font-mono text-[9px] pointer-events-none">
          + [{CANVAS_W}, 000]
        </div>
        <div className="absolute bottom-2 left-2 text-[#0B3D2E]/40 font-mono text-[9px] pointer-events-none">
          + [000, {CANVAS_H}]
        </div>
        <div className="absolute bottom-2 right-2 text-[#0B3D2E]/40 font-mono text-[9px] pointer-events-none">
          + [{CANVAS_W}, {CANVAS_H}]
        </div>

        {/* Transform Canvas Layer */}
        <div
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
            transformOrigin: "0 0",
            transition: isTransitioning
              ? "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            width: `${CANVAS_W}px`,
            height: `${CANVAS_H}px`,
          }}
          className="relative origin-top-left pointer-events-auto"
        >
          {/* SVG TIMELINE SCHEMATIC */}
          <svg
            className="w-[2850px] h-[760px] block"
            role="img"
            aria-label="Career path: MAIT, Aerostars, AB Connectz intern, AB Connectz full-time, Broccoli solo flagship, Zucchini Linux bare-metal bringup, then next unwritten."
            viewBox="0 0 2850 760"
          >
            {/* Bus Shadow Path */}
            <path
              d="M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350"
              fill="none"
              stroke="#0B3D2E"
              strokeWidth="5"
              opacity=".25"
              transform="translate(0 5)"
            />
            {/* Main Bus Path */}
            <path
              d="M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350"
              fill="none"
              stroke="#0B3D2E"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Dash Pulse Route (Marching ants animation) */}
            <path
              className="mr"
              d="M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350"
              fill="none"
              stroke="#FFD93B"
              strokeWidth="2"
              strokeDasharray="4 12"
            />

            {/* ── STAGE 1: MAIT (DAY ONE) ─────────────────────── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[0])}
            >
              <rect
                x="97"
                y="347"
                width="26"
                height="26"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "110px 360px",
                  animationDuration: "3s",
                }}
              />
              <rect
                x="97"
                y="347"
                width="26"
                height="26"
                fill="#FFD93B"
                stroke="#0B3D2E"
                strokeWidth="4"
              />
              <rect x="105" y="355" width="10" height="10" fill="#0B3D2E" />
              <text x="110" y="420" textAnchor="middle">
                <tspan
                  x="110"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  MAIT
                </tspan>
                <tspan
                  x="110"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  AUG 2025
                </tspan>
              </text>
              <text
                x="30"
                y="320"
                fontFamily="Caveat,cursive"
                fontSize="28"
                fill="#0B3D2E"
                transform="rotate(-4 30 320)"
              >
                day one...
              </text>
            </g>

            {/* ── STAGE 2: AEROSTARS (BRANCH UP) ──────────────── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[1])}
            >
              {/* Branch connecting lines (46px vertical spacing) */}
              <path
                d="M380 350 C460 350 410 46 490 46"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M380 350 C460 350 410 92 490 92"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M380 350 C460 350 410 138 490 138"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M380 350 C460 350 410 184 490 184"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M380 350 C460 350 410 230 490 230"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M380 350 C460 350 410 276 490 276"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Skill chips in ONE column (14px clean gap) */}
              <g>
                <rect x="493" y="33" width="135" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="30"
                  width="135"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="51"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  AI/ML SCOPE
                </text>
              </g>

              <g>
                <rect x="493" y="79" width="135" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="76"
                  width="135"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="97"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  ML TRAINING
                </text>
              </g>

              <g>
                <rect x="493" y="125" width="165" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="122"
                  width="165"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="143"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  IOT DEVELOPMENT
                </text>
              </g>

              <g>
                <rect x="493" y="171" width="205" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="168"
                  width="205"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="189"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  EMBEDDED ENGINEERING
                </text>
              </g>

              <g>
                <rect x="493" y="217" width="170" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="214"
                  width="170"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="235"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  EMBEDDED SYSTEMS
                </text>
              </g>

              <g>
                <rect x="493" y="263" width="185" height="32" fill="#0B3D2E" />
                <rect
                  x="490"
                  y="260"
                  width="185"
                  height="32"
                  fill="#FFD93B"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="502"
                  y="281"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  HARDWARE ASSEMBLY
                </text>
              </g>

              {/* Milestone Marker & Label */}
              <rect
                x="367"
                y="337"
                width="26"
                height="26"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "380px 350px",
                  animationDuration: "3s",
                  animationDelay: "0.4s",
                }}
              />
              <rect
                x="367"
                y="337"
                width="26"
                height="26"
                fill="#FFD93B"
                stroke="#0B3D2E"
                strokeWidth="4"
              />
              <rect x="375" y="345" width="10" height="10" fill="#0B3D2E" />
              <text x="380" y="420" textAnchor="middle">
                <tspan
                  x="380"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  AEROSTARS
                </tspan>
                <tspan
                  x="380"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  SEP 2025 - PRESENT
                </tspan>
              </text>
            </g>

            {/* ── STAGE 3: AB CONNECTZ INTERN (BRANCH DOWN) ───── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[2])}
            >
              {/* Branch connecting lines (46px vertical spacing) */}
              <path
                d="M780 370 C860 370 810 426 890 426"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 472 890 472"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 518 890 518"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 564 890 564"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 610 890 610"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 656 890 656"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M780 370 C860 370 810 702 890 702"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Skill chips in ONE column (14px clean gap, generous width) */}
              <g>
                <rect x="893" y="413" width="180" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="410"
                  width="180"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="431"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  NODE.JS &amp; NESTJS
                </text>
              </g>

              <g>
                <rect x="893" y="459" width="220" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="456"
                  width="220"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="477"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  REST APIS ARCHITECTURE
                </text>
              </g>

              <g>
                <rect x="893" y="505" width="205" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="502"
                  width="205"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="523"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  POSTGRESQL &amp; PRISMA
                </text>
              </g>

              <g>
                <rect x="893" y="551" width="155" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="548"
                  width="155"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="569"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  REDIS CACHING
                </text>
              </g>

              <g>
                <rect x="893" y="597" width="205" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="594"
                  width="205"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="615"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  REACT NATIVE CLIENT
                </text>
              </g>

              <g>
                <rect x="893" y="643" width="210" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="640"
                  width="210"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="661"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  VERSION CONTROL / CI
                </text>
              </g>

              <g>
                <rect x="893" y="689" width="205" height="32" fill="#0B3D2E" />
                <rect
                  x="890"
                  y="686"
                  width="205"
                  height="32"
                  fill="#FFF6C2"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="902"
                  y="707"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  BACKEND API TESTING
                </text>
              </g>

              {/* Milestone Marker & Label */}
              <rect
                x="767"
                y="357"
                width="26"
                height="26"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "780px 370px",
                  animationDuration: "3s",
                  animationDelay: "0.8s",
                }}
              />
              <rect
                x="767"
                y="357"
                width="26"
                height="26"
                fill="#FFF6C2"
                stroke="#0B3D2E"
                strokeWidth="4"
              />
              <rect x="775" y="365" width="10" height="10" fill="#0B3D2E" />
              <text x="780" y="250" textAnchor="middle">
                <tspan
                  x="780"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  AB CONNECTZ
                </tspan>
                <tspan
                  x="780"
                  dy="22"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  BACKEND INTERN
                </tspan>
                <tspan
                  x="780"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  JUN 2026 - JUL 2026
                </tspan>
              </text>
            </g>

            {/* ── STAGE 4: AB CONNECTZ FULL-TIME (BRANCH UP) ─── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[3])}
            >
              {/* Branch connecting lines (46px vertical spacing) */}
              <path
                d="M1220 350 C1300 350 1250 46 1330 46"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1220 350 C1300 350 1250 92 1330 92"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1220 350 C1300 350 1250 138 1330 138"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1220 350 C1300 350 1250 184 1330 184"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1220 350 C1300 350 1250 230 1330 230"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1220 350 C1300 350 1250 276 1330 276"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Skill chips in ONE column */}
              <g>
                <rect x="1333" y="33" width="215" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="30"
                  width="215"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="51"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  THREE.JS 3D VIEWPORTS
                </text>
              </g>

              <g>
                <rect x="1333" y="79" width="200" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="76"
                  width="200"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="97"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  SUPABASE RLS &amp; AUTH
                </text>
              </g>

              <g>
                <rect x="1333" y="125" width="230" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="122"
                  width="230"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="143"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  GEMINI API INTEGRATION
                </text>
              </g>

              <g>
                <rect x="1333" y="171" width="180" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="168"
                  width="180"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="189"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  EXPO / EAS BUILDS
                </text>
              </g>

              <g>
                <rect x="1333" y="217" width="215" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="214"
                  width="215"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="235"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  STRUCTURED PROMPTING
                </text>
              </g>

              <g>
                <rect x="1333" y="263" width="235" height="32" fill="#0B3D2E" />
                <rect
                  x="1330"
                  y="260"
                  width="235"
                  height="32"
                  fill="#FF5C8A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1342"
                  y="281"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  TYPESCRIPT ARCHITECTURE
                </text>
              </g>

              {/* Milestone Marker & Label */}
              <rect
                x="1207"
                y="337"
                width="26"
                height="26"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "1220px 350px",
                  animationDuration: "3s",
                  animationDelay: "1.2s",
                }}
              />
              <rect
                x="1207"
                y="337"
                width="26"
                height="26"
                fill="#FF5C8A"
                stroke="#0B3D2E"
                strokeWidth="4"
              />
              <rect x="1215" y="345" width="10" height="10" fill="#0B3D2E" />
              <text x="1220" y="420" textAnchor="middle">
                <tspan
                  x="1220"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  AB CONNECTZ
                </tspan>
                <tspan
                  x="1220"
                  dy="22"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  FULL-TIME
                </tspan>
                <tspan
                  x="1220"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  JUL 2026 - PRESENT
                </tspan>
              </text>
            </g>

            {/* ── STAGE 5: BROCCOLI (BRANCH DOWN) ─────────────── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[4])}
            >
              {/* Branch connecting lines (46px vertical spacing) */}
              <path
                d="M1680 370 C1760 370 1710 426 1790 426"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 472 1790 472"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 518 1790 518"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 564 1790 564"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 610 1790 610"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 656 1790 656"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M1680 370 C1760 370 1710 702 1790 702"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Skill chips in ONE column (14px clean gap, generous width) */}
              <g>
                <rect x="1793" y="413" width="255" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="410"
                  width="255"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="431"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  REACT NATIVE (EXPO SDK 57)
                </text>
              </g>

              <g>
                <rect x="1793" y="459" width="235" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="456"
                  width="235"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="477"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  OFFLINE SQLITE + DRIZZLE
                </text>
              </g>

              <g>
                <rect x="1793" y="505" width="255" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="502"
                  width="255"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="523"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  NESTJS + POSTGRESQL + REDIS
                </text>
              </g>

              <g>
                <rect x="1793" y="551" width="220" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="548"
                  width="220"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="569"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  GEMINI AI FOOD VISION
                </text>
              </g>

              <g>
                <rect x="1793" y="597" width="225" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="594"
                  width="225"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="615"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  SHOPIFY RN SKIA CHARTS
                </text>
              </g>

              <g>
                <rect x="1793" y="643" width="225" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="640"
                  width="225"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="661"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  ADAPTIVE BAYESIAN TDEE
                </text>
              </g>

              <g>
                <rect x="1793" y="689" width="255" height="32" fill="#0B3D2E" />
                <rect
                  x="1790"
                  y="686"
                  width="255"
                  height="32"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="3"
                />
                <text
                  x="1802"
                  y="707"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  PLAY STORE RELEASE &amp; EAS
                </text>
              </g>

              {/* Milestone Marker & Label */}
              <rect
                x="1667"
                y="357"
                width="26"
                height="26"
                fill="none"
                stroke="#B9D94A"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "1680px 370px",
                  animationDuration: "3s",
                  animationDelay: "1.6s",
                }}
              />
              <rect
                x="1667"
                y="357"
                width="26"
                height="26"
                fill="#B9D94A"
                stroke="#0B3D2E"
                strokeWidth="4"
              />
              <rect x="1675" y="365" width="10" height="10" fill="#0B3D2E" />

              {/* Official Broccoli App Icon (Centered directly above BROCCOLI) */}
              <g transform="translate(1680 175)">
                <rect
                  x="-16"
                  y="-16"
                  width="32"
                  height="32"
                  rx="9"
                  fill="#B9D94A"
                  stroke="#0B3D2E"
                  strokeWidth="2.5"
                />
                <text
                  x="-10.5"
                  y="5"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="800"
                  fontSize="13"
                  letterSpacing="-0.8"
                  fill="#262D1C"
                >
                  Br
                </text>
                <circle cx="7" cy="1" r="3.5" fill="#262D1C" />
              </g>

              {/* Broccoli Title Above Node */}
              <text x="1680" y="228" textAnchor="middle">
                <tspan
                  x="1680"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  BROCCOLI
                </tspan>
                <tspan
                  x="1680"
                  dy="22"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#2F9E5E"
                >
                  SOLO FLAGSHIP
                </tspan>
                <tspan
                  x="1680"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  AUG 2026 - PRESENT
                </tspan>
              </text>

              {/* Handwritten Note placed directly below AUG 2026 - PRESENT */}
              <text
                x="1680"
                y="314"
                textAnchor="middle"
                fontFamily="Caveat,cursive"
                fontSize="26"
                fontWeight="700"
                fill="#2F9E5E"
                transform="rotate(-2 1680 314)"
              >
                play store release!
              </text>
            </g>

            {/* ── STAGE 6: ZUCCHINI LINUX (BRANCH UP) ─────────── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[5])}
            >
              {/* Branch connecting lines (46px vertical spacing) */}
              <path
                d="M2180 350 C2260 350 2210 46 2290 46"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 92 2290 92"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 138 2290 138"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 184 2290 184"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 230 2290 230"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 276 2290 276"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M2180 350 C2260 350 2210 322 2290 322"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Skill chips in ONE column (generous width, no text overflow) */}
              <g>
                <rect x="2293" y="33" width="280" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="30"
                  width="280"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="51"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  BOOTLOADER REVERSE ENG (SBOOT)
                </text>
              </g>

              <g>
                <rect x="2293" y="79" width="270" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="76"
                  width="270"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="97"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  MAINLINE LINUX KERNEL (ARM64)
                </text>
              </g>

              <g>
                <rect x="2293" y="125" width="240" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="122"
                  width="240"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="143"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  LK2ND DUAL-BOOT BOOTLOADER
                </text>
              </g>

              <g>
                <rect x="2293" y="171" width="250" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="168"
                  width="250"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="189"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  QUALCOMM SDM429 DTB CONFIG
                </text>
              </g>

              <g>
                <rect x="2293" y="217" width="235" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="214"
                  width="235"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="235"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  FOCALTECH TOUCH &amp; DISPLAY
                </text>
              </g>

              <g>
                <rect x="2293" y="263" width="280" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="260"
                  width="280"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="281"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  QUALCOMM ADSP FIRMWARE DECRYPT
                </text>
              </g>

              <g>
                <rect x="2293" y="309" width="230" height="32" fill="#0B3D2E" />
                <rect
                  x="2290"
                  y="306"
                  width="230"
                  height="32"
                  fill="#0B3D2E"
                  stroke="#EDE6D8"
                  strokeWidth="3"
                />
                <text
                  x="2302"
                  y="327"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFD93B"
                >
                  ARCH LINUX ARM64 ROOTFS
                </text>
              </g>

              {/* Milestone Marker & Label */}
              <rect
                x="2167"
                y="337"
                width="26"
                height="26"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                className="animate-ping origin-center"
                style={{
                  transformOrigin: "2180px 350px",
                  animationDuration: "3s",
                  animationDelay: "2.0s",
                }}
              />
              <rect
                x="2167"
                y="337"
                width="26"
                height="26"
                fill="#0B3D2E"
                stroke="#EDE6D8"
                strokeWidth="3.5"
              />
              <rect x="2175" y="345" width="10" height="10" fill="#FFD93B" />
              <text x="2180" y="420" textAnchor="middle">
                <tspan
                  x="2180"
                  dy="0"
                  fontFamily="'Press Start 2P',monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  ZUCCHINI LINUX
                </tspan>
                <tspan
                  x="2180"
                  dy="22"
                  fontFamily="Space Mono,monospace"
                  fontSize="13"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  BARE-METAL DUAL-BOOT
                </tspan>
                <tspan
                  x="2180"
                  dy="21"
                  fontFamily="Space Mono,monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  OCT 2026 - PRESENT
                </tspan>
              </text>
              <text
                x="2180"
                y="495"
                textAnchor="middle"
                fontFamily="Caveat,cursive"
                fontSize="28"
                fill="#0B3D2E"
                transform="rotate(-2 2180 495)"
              >
                sboot unlocked ⚡
              </text>
            </g>

            {/* ── STAGE 7: NEXT UNWRITTEN ─────────────────────── */}
            <g
              className="cursor-pointer transition-opacity duration-200"
              onClick={() => jumpToMilestone(MILESTONES[6])}
            >
              <path
                d="M2180 350 C2340 350 2520 360 2702 360"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="4"
                strokeDasharray="10 8"
              />
              {/* Opaque cream fill to conceal background grid dots */}
              <rect
                x="2702"
                y="342"
                width="36"
                height="36"
                fill="#FFF6C2"
              />
              {/* Mathematically closed-corner dashed border: 36px side, 6px dash/gap, offset 3 */}
              <rect
                x="2702"
                y="342"
                width="36"
                height="36"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeDasharray="6 6"
                strokeDashoffset="3"
                strokeLinejoin="miter"
              />
              <text
                x="2720"
                y="360"
                dominantBaseline="central"
                textAnchor="middle"
                fontFamily="'Press Start 2P', monospace"
                fontSize="16"
                fill="#0B3D2E"
              >
                ?
              </text>
              <text x="2720" y="408" textAnchor="middle">
                <tspan
                  x="2720"
                  dy="0"
                  fontFamily="'Press Start 2P', monospace"
                  fontSize="11"
                  fontWeight="400"
                  fill="#0B3D2E"
                >
                  NEXT
                </tspan>
                <tspan
                  x="2720"
                  dy="20"
                  fontFamily="Space Mono, monospace"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0B3D2E"
                >
                  UNWRITTEN
                </tspan>
              </text>
            </g>

            {/* ── SIGNAL PACKET: Pulsing square moving from start to current event ── */}
            {/* Pulsing signal aura (square) */}
            <rect
              className="pk animate-ping pointer-events-none origin-center"
              x="-11"
              y="-11"
              width="22"
              height="22"
              fill="#FF5C8A"
              opacity="0.45"
              style={{
                offsetPath:
                  "path('M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350')",
              }}
            />
            {/* Main signal square */}
            <rect
              className="pk pointer-events-none"
              x="-8"
              y="-8"
              width="16"
              height="16"
              fill="#FF5C8A"
              stroke="#0B3D2E"
              strokeWidth="3"
              style={{
                offsetPath:
                  "path('M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350')",
              }}
            />
            {/* Center core light square */}
            <rect
              className="pk pointer-events-none"
              x="-2.5"
              y="-2.5"
              width="5"
              height="5"
              fill="#FFF6C2"
              style={{
                offsetPath:
                  "path('M30 360 L110 360 C220 360 270 350 380 350 C500 350 640 370 780 370 C920 370 1080 350 1220 350 C1360 350 1520 370 1680 370 C1840 370 2020 350 2180 350')",
              }}
            />
          </svg>
        </div>
      </div>

      {/* ── CAD FOOTER RAIL & QUICK JUMP DOCK (CAD MODE) ──── */}
      {viewMode === "cad" && (
        <>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 bg-[#0B3D2E] text-[#FFF6C2] px-3 sm:px-4 py-2.5 sm:py-3 border-t-3 border-[#0B3D2E]">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 flex-nowrap sm:flex-wrap w-full sm:w-auto">
              <span className="font-pixel text-[10px] text-[#FFD93B] mr-1 hidden lg:inline">
                MILESTONES:
              </span>
              {MILESTONES.map((m) => {
                const isActive = activeMilestone === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => jumpToMilestone(m)}
                    className={`pop px-2 sm:px-2.5 py-1 font-pixel text-[9px] sm:text-[10px] border-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[#FF5C8A] text-[#0B3D2E] border-[#FFD93B] shadow-[2px_2px_0_#FFD93B] font-bold"
                        : "bg-[#FFF6C2] text-[#0B3D2E] border-[#0B3D2E] hover:bg-[#FFD93B] shadow-[2px_2px_0_#0B3D2E]"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={fitToView}
                className={`pop px-2 sm:px-2.5 py-1 font-pixel text-[9px] sm:text-[10px] border-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeMilestone === "overview"
                    ? "bg-[#2F9E5E] text-[#FFF6C2] border-[#FFF6C2] shadow-[2px_2px_0_#FFF6C2] font-bold"
                    : "bg-[#0B3D2E] text-[#FFD93B] border-[#FFD93B] hover:bg-[#FFD93B] hover:text-[#0B3D2E] shadow-[2px_2px_0_#FFD93B]"
                }`}
              >
                👁 OVERVIEW
              </button>
            </div>
          </div>

          {/* ── ACTIVE MILESTONE TELEMETRY DRAWER ── */}
          <div
            data-testid="telemetry-drawer"
            className="bg-[#06231A] text-[#FFF6C2] border-t-2 border-[#0B3D2E] p-3 sm:p-4 font-mono"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-[#0B3D2E]/60">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[9px] sm:text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-2 py-0.5 font-bold">
                  NODE 0{activeIdx + 1} / 07
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#FFD93B]">
                  {currentMilestone.label}
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[#FFF6C2]/70">
                  ({currentMilestone.year})
                </span>
              </div>

              <span className="font-mono text-[#A7F3D0] text-[10px] uppercase tracking-wider border border-[#A7F3D0]/40 px-1.5 py-0.5 font-bold">
                {currentMilestone.role}
              </span>
            </div>

            <p className="m-0 font-mono text-xs sm:text-[13px] text-[#FFFDF0] leading-relaxed mb-2.5">
              {currentMilestone.desc}
            </p>

            {currentMilestone.tags && (
              <div className="flex flex-wrap gap-1.5">
                {currentMilestone.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] bg-[#03140F] border border-[#0B3D2E] text-[#A7F3D0] px-1.5 py-0.5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ── TIMELINE LIST VIEW (MOBILE-OPTIMIZED ROADMAP) ── */}
      {viewMode === "list" && (
        <div className="bg-[#FFF6C2] p-3.5 sm:p-7 space-y-3.5 sm:space-y-4 max-h-[560px] sm:max-h-[640px] overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-1 border-b-2 border-dashed border-[#0B3D2E]/30">
            <span className="font-pixel text-[9px] sm:text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1 font-bold">
              CHRONOLOGICAL SIGNAL LOG
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#0B3D2E] font-bold">
              7 ARCHITECTURAL NODES
            </span>
          </div>

          {MILESTONES.map((m, idx) => {
            const isActive = activeMilestone === m.id;
            return (
              <div
                key={m.id}
                className={`p-3.5 sm:p-5 border-3 transition-all ${
                  isActive
                    ? "border-[#FF5C8A] bg-[#FFFDF0] shadow-[3px_3px_0_#FF5C8A] sm:shadow-[4px_4px_0_#FF5C8A]"
                    : "border-[#0B3D2E] bg-[#FFF8D6] shadow-[2px_2px_0_#0B3D2E] sm:shadow-[3px_3px_0_#0B3D2E] hover:bg-[#FFFDF0]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-pixel text-[9px] sm:text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-0.5 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="font-pixel text-xs sm:text-sm text-[#0B3D2E] font-bold">
                      {m.label.replace(/^0\d · /, "")}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs bg-[#FF5C8A] text-[#0B3D2E] px-1.5 py-0.5 font-bold">
                      {m.year}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode("cad");
                      jumpToMilestone(m);
                    }}
                    className="font-pixel text-[9px] bg-[#0B3D2E] text-[#FFD93B] hover:bg-[#FFD93B] hover:text-[#0B3D2E] px-2.5 py-1 border border-[#0B3D2E] cursor-pointer shrink-0"
                  >
                    INSPECT CAD ↗
                  </button>
                </div>

                <div className="font-mono text-[11px] sm:text-xs text-[#0B3D2E] font-bold mb-1.5">
                  ROLE: <span className="text-[#FF5C8A]">{m.role}</span>
                </div>
                <p className="m-0 font-mono text-xs sm:text-[13px] text-[#0B3D2E] leading-relaxed mb-2.5">
                  {m.desc}
                </p>

                {m.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#0B3D2E]/20">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] bg-[#FFF0B3] border border-[#0B3D2E]/40 text-[#0B3D2E] px-1.5 py-0.5 font-bold"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
