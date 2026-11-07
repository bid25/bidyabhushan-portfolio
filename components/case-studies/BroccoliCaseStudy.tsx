"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PixelBroccoli } from "@/components/PixelBroccoli";

interface StageInfo {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  code: string;
  invariant: string;
  failureGuard: string;
}

const broccoliStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Natural Language Input Intent",
    subtitle: "Zero-Latency Client Parser",
    role: "On-device natural language text tokenization. Parses food items, quantities, and metric units on the client UI thread with zero cloud roundtrips.",
    code: `> parseIntent("2 large boiled eggs + 80g rolled oats")\n[TOKEN_01] entity: "boiled egg", qty: 2, unit: "large", cal: 144, p: 12.6g\n[TOKEN_02] entity: "rolled oats", qty: 80, unit: "g", cal: 311, p: 13.5g\n[STATS] Parse duration: 0.74ms · Network roundtrips: 0 · Battery impact: negligible`,
    invariant: "Instant UI responsiveness; user never stares at loading spinners while logging meals.",
    failureGuard: "Offline subway mode; zero network dependency during daily data entry."
  },
  {
    id: "stage-2",
    title: "Local SQLite FTS5 Database",
    subtitle: "Sub-1.4ms In-Memory Full-Text Search",
    role: "Embedded SQLite database with full-text search index (FTS5) over 14,000 verified USDA and generic nutritional records.",
    code: `SELECT rowid, name, brand, calories, protein, carbs, fat, fts5_rank\nFROM foods_fts\nWHERE foods_fts MATCH 'oats*'\nORDER BY rank LIMIT 8;\n-- Execution time: 1.18ms · Resident heap: 38.4MB (budget: <42MB)`,
    invariant: "Database transactions execute strictly on local flash memory with zero cloud synchronization blockers.",
    failureGuard: "Memory spikes prevented via virtualized list windowing and normalized index tokens."
  },
  {
    id: "stage-3",
    title: "Statistical Uncertainty Corridor",
    subtitle: "Biological Variance & Habit Modeling",
    role: "Calculates realistic standard error corridors (±10% to ±15%) over macronutrient estimates rather than displaying false single-integer certainty.",
    code: `Logged Daily Intake: 2,240 kcal\nConfidence Interval (95% CI): [ 1,980 kcal - 2,500 kcal ] (±11.6% biological band)\nProtein Floor: 165g verified · Macro Ratio: 32% P / 42% C / 26% F\nHabit Corridor Compliance: 94.2% (In-range stability)`,
    invariant: "Exposes honest biological variance to eliminate anxiety over meaningless decimal-point noise.",
    failureGuard: "Prevents eating disorder trigger patterns caused by hyper-rigid single-integer targets."
  },
  {
    id: "stage-4",
    title: "Hardware Mechanical Dial Physics",
    subtitle: "Reanimated 3 UI Thread Worklets",
    role: "Custom circular instrument dial computed directly on the native GPU UI thread with spring physics, inertial dampening, and haptic feedback.",
    code: `const dialGesture = useAnimatedGestureHandler({\n  onActive: (event) => {\n    'worklet';\n    const angle = Math.atan2(event.y - CY, event.x - CX);\n    dialRotation.value = withSpring(angle, { damping: 20, stiffness: 150 });\n  }\n});\n// Target FPS: 60.0 locked · UI Thread Dropped Frames: 0`,
    invariant: "Zero React Native bridge crossings during touch gestures; math runs 100% in native UI worklets.",
    failureGuard: "Eliminates low-end Android frame drops by bypassing the JavaScript event loop."
  }
];

const broccoliChecklist = [
  "1.4ms SQLite FTS5 search",
  "offline subway mode",
  "<42MB steady RAM footprint",
  "uncertainty corridor",
  "tactile haptic clicks",
  "reactive macro engine",
  "60 FPS UI thread physics",
  "zero cloud spinners"
];

const broccoliProblems = [
  {
    tag: "A",
    title: "js bridge gesture stutter",
    summary:
      "Calculating rotation physics and gesture dampening across the React Native bridge dropped frames on Snapdragon 400 test devices. Fix: ported the entire gesture pipeline onto the native UI thread using Reanimated 3 worklets and shared memory values.",
    codeDiff: `- // JS Thread Event Loop (Dropped frames under heavy load)\n- const onPan = (e) => setAngle(computeAngle(e.nativeEvent.x, e.nativeEvent.y));\n+ // Reanimated 3 Native Worklet (Runs directly on GPU UI thread)\n+ const onPan = useAnimatedGestureHandler({\n+   onActive: (e) => {\n+     'worklet';\n+     angle.value = withSpring(computeAngle(e.x, e.y), { damping: 18 });\n+   }\n+ });`,
    takeaway: "Real-time gestures must never cross the asynchronous JavaScript bridge; use worklets."
  },
  {
    tag: "B",
    title: "fts5 tokenizer collision",
    summary:
      "Food names containing mixed units and metric measurements (e.g. 100g, 2.5oz) broke standard SQLite tokenizers. Fix: created a normalized fts5 prefix tokenizer with custom unicode folding.",
    codeDiff: `- CREATE VIRTUAL TABLE foods USING fts5(name, brand);\n- # Query '100g oats' splits on '100g' as single unrecognized token\n+ CREATE VIRTUAL TABLE foods USING fts5(\n+   name, brand,\n+   tokenize='unicode61 remove_diacritics 2 "tokenchars -_."'\n+ );\n+ # Tokenizer now properly extracts numeric and metric boundaries`,
    takeaway: "FTS5 default tokenizers mangle alphanumeric quantities; explicit tokenchars configuration is mandatory."
  },
  {
    tag: "C",
    title: "android oem low-memory kills",
    summary:
      "Aggressive Android task killers terminated the app during food search over heavy lists. Fix: authored an aggressive virtualized windowing layer that strictly caps resident memory heap below 42MB, eliminating OEM background terminations.",
    codeDiff: `- <FlatList data={foodCatalog} windowSize={21} maxToRenderPerBatch={50} />\n- # Memory footprint climbed to 134MB on rapid search queries\n+ <FlashList\n+   data={foodCatalog}\n+   estimatedItemSize={54}\n+   drawDistance={300}\n+   overrideItemLayout={(layout) => { layout.size = 54; }}\n+ />\n+ # Resident memory capped at steady 38.4MB`,
    takeaway: "OEM Android memory killers require aggressive view cell recycling and fixed layout height hints."
  },
  {
    tag: "D",
    title: "play signing key mismatch",
    summary:
      "Google Play App Signing generated an internal key fingerprint that conflicted with initial local release builds, blocking automated tracks. Fix: configured automated eas build credentials with pinned SHA-256 fingerprint verification in assetlinks.",
    codeDiff: `- # Local upload key conflicted with Google Play Cloud Key\n- uploadKey: SHA256:4a:39:1f:... (rejected on Play Store submit)\n+ # eas.json automated release profile with Google Play App Signing key\n+ {\n+   "production": {\n+     "android": { "buildType": "app-bundle" },\n+     "autoSubmit": true\n+   }\n+ }`,
    takeaway: "Modern Google Play Console pipelines require automated cloud signing workflows via EAS Build."
  }
];

export function BroccoliCaseStudy() {
  const [replayKey, setReplayKey] = useState<number>(1);
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const schematicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.15 }
    );
    if (schematicRef.current) {
      observer.observe(schematicRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="w-full">
      <div className="un w-full max-w-[1000px] mx-auto">
        <div
          className="relative bg-[#FFF0B3] border-3 sm:border-4 border-[#0B3D2E] p-4 sm:p-8 md:p-12 shadow-[6px_6px_0_#0B3D2E] sm:shadow-[12px_12px_0_#0B3D2E] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(#0B3D2E14 1.5px,transparent 1.5px),linear-gradient(90deg,#0B3D2E14 1.5px,transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        >


          {/* Sheet Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "12px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "11px",
              lineHeight: "1.8",
              color: "#0B3D2E",
            }}
          >
            <span>DRAFT</span>
            <span>FIG. BROCCOLI-APK</span>
          </div>

          {/* Badges */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0B3D2E",
                color: "#FFD93B",
                border: "2px solid #0B3D2E",
                padding: "3px 10px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
              title="Open Broccoli on Google Play Store"
            >
              LIVE ON PLAY STORE ↗
            </a>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              React Native
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              SQLite FTS5
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Reanimated 3
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Offline-First
            </span>
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Expo EAS Build
            </span>
          </div>

          {/* Title with circled BROCCOLI, pink swoosh, and official logo stamp */}
          <div className="my-5 flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="m-0 font-hand font-semibold text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-[#0B3D2E] break-words">
                <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                  BROCCOLI
                </span>{" "}
                - Nutrition Instrument
              </h1>
              <svg
                viewBox="0 0 460 20"
                fill="none"
                className="w-full max-w-[460px] h-auto block mt-1"
              >
                <path
                  className="dw"
                  pathLength="1"
                  d="M4 12 C120 4, 260 18, 450 10"
                  stroke="#FF5C8A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <div className="flex sm:flex-col items-center gap-2 self-start shrink-0">
              <Image
                src="/images/broccoli-icon-dark.png"
                alt="Broccoli official logo"
                width={76}
                height={76}
                className="w-14 h-14 sm:w-[76px] sm:h-[76px] block object-contain"
              />
              <div className="font-pixel text-[7px] text-center text-[#0B3D2E]">
                APP ICON
              </div>
            </div>
          </div>

          {/* 1. the problem */}
          <h2
            style={{
              margin: "24px 0 8px",
              fontFamily: "'Caveat', cursive",
              fontSize: "38px",
              fontWeight: "700",
              color: "#0B3D2E",
            }}
          >
            1. the problem
          </h2>
          <p
            style={{
              margin: "0 0 20px",
              fontFamily: "'Caveat', cursive",
              fontSize: "22px",
              lineHeight: "1.45",
              color: "#0B3D2E",
            }}
          >
            Most fitness trackers deceive users with pseudo-mathematical certainty: claiming a chicken breast is "165.2 calories". In reality, biological variance, cooking evaporation, and human portion estimation carry a natural &plusmn;10% to &plusmn;15% standard error. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>False precision is a bug: when an app claims four decimal places on biology, it trains users to optimize noise over habits.</span>
          </p>

          {/* ── 4 BOXES SCHEMATIC CONTAINER WITH INTERACTIVE INSPECTOR ── */}
          <div
            ref={schematicRef}
            style={{
              margin: "20px 0 36px",
              border: "3px solid #0B3D2E",
              background: "#FFF8D6",
              padding: "16px 20px 20px",
              boxShadow: "4px 4px 0 #0B3D2E",
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "2px dashed #0B3D2E33",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                    background: "#0B3D2E",
                    color: "#FFD93B",
                    padding: "3px 6px",
                  }}
                >
                  INTERACTIVE PIPELINE
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#0B3D2E",
                  }}
                >
                  Click any box to inspect architecture
                </span>
              </div>
              <button
                type="button"
                onClick={handleReplay}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "9px",
                  background: "#FF5C8A",
                  color: "#0B3D2E",
                  border: "2px solid #0B3D2E",
                  padding: "4px 10px",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 #0B3D2E",
                }}
                className="hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                ↺ REPLAY DRAWING
              </button>
            </div>

            {/* SVG Schematic */}
            <div key={replayKey} className={!isIntersecting ? "pipeline-paused" : ""}>
              <svg
                role="img"
                aria-label="Schematic: Food Entry to Local SQLite DB, Tolerance Matrix, and Mechanical Dial"
                viewBox="0 0 940 230"
                style={{ width: "100%", display: "block" }}
              >
                {/* Subtle architectural guideline */}


                {/* ── Box 1: food entry (x: 24 to 184) ── */}
                <g
                  onClick={() => setSelectedStage(0)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 0 && (
                    <rect
                      x="20"
                      y="20"
                      width="168"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M24 24 L184 24 L184 170 L24 170 Z"
                    fill={selectedStage === 0 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 0 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <text
                    className="fi"
                    x="38"
                    y="64"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 0 ? "bold" : "normal"}
                    style={{ animationDelay: "0.8s" }}
                  >
                    food entry
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="94"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "1.0s" }}
                  >
                    natural language
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="126"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "1.2s" }}
                  >
                    zero network wait
                  </text>
                  <text
                    className="fi"
                    x="104"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "1.4s" }}
                  >
                    input intent
                  </text>
                </g>

                {/* Arrow 1 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M194 96 C214 88 234 104 256 96 M256 96 L246 88 M256 96 L246 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "1.8s" }}
                />

                {/* ── Box 2: local sqlite db (x: 266 to 476) ── */}
                <g
                  onClick={() => setSelectedStage(1)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 1 && (
                    <rect
                      x="262"
                      y="20"
                      width="218"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M266 24 L476 24 L476 170 L266 170 Z"
                    fill={selectedStage === 1 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 1 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "2.6s" }}
                  />
                  <text
                    className="fi"
                    x="280"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 1 ? "bold" : "normal"}
                    style={{ animationDelay: "3.2s" }}
                  >
                    local sqlite db
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.4s" }}
                  >
                    • FTS5 search index
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.6s" }}
                  >
                    • sub-1.4ms lookups
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.8s" }}
                  >
                    • 100% offline autonomy
                  </text>
                  <text
                    className="fi"
                    x="371"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "4.0s" }}
                  >
                    embedded storage
                  </text>
                </g>

                {/* Arrow 2 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M486 96 C506 88 526 104 548 96 M548 96 L538 88 M548 96 L538 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "4.4s" }}
                />

                {/* ── Box 3: tolerance matrix (x: 558 to 768) ── */}
                <g
                  onClick={() => setSelectedStage(2)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 2 && (
                    <rect
                      x="554"
                      y="20"
                      width="218"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M558 24 L768 24 L768 170 L558 170 Z"
                    fill={selectedStage === 2 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 2 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "5.1s" }}
                  />
                  <text
                    className="fi"
                    x="572"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 2 ? "bold" : "normal"}
                    style={{ animationDelay: "5.6s" }}
                  >
                    tolerance matrix
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "5.8s" }}
                  >
                    confidence corridor
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "6.0s" }}
                  >
                    macro band computations
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "6.2s" }}
                  >
                    honest statistics
                  </text>
                  <text
                    className="fi"
                    x="663"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "6.4s" }}
                  >
                    uncertainty math
                  </text>
                </g>

                {/* Arrow 3 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M778 96 C796 88 812 104 828 96 M828 96 L818 88 M828 96 L818 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "6.8s" }}
                />

                {/* ── Box 4: mechanical dial (x: 838 to 924) ── */}
                <g
                  onClick={() => setSelectedStage(3)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 3 && (
                    <rect
                      x="834"
                      y="20"
                      width="94"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M838 24 L924 24 L924 170 L838 170 Z"
                    fill={selectedStage === 3 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 3 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "7.4s" }}
                  />
                  {/* Dial circle */}
                  <circle
                    className="dw"
                    pathLength="1"
                    cx="881"
                    cy="88"
                    r="30"
                    fill="none"
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth="2.5"
                    style={{ animationDelay: "7.8s" }}
                  />
                  <line
                    className="dw"
                    pathLength="1"
                    x1="881"
                    y1="88"
                    x2="898"
                    y2="72"
                    stroke="#FF5C8A"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ animationDelay: "8.1s" }}
                  />
                  <text
                    className="fi"
                    x="881"
                    y="146"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "8.3s" }}
                  >
                    60 FPS!
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="18"
                    fill={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "8.5s" }}
                  >
                    dial physics
                  </text>
                </g>
              </svg>
            </div>

            {/* ── INTERACTIVE BLUEPRINT INSPECTOR ── */}
            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                background: "#06231A",
                color: "#FFD93B",
                border: "2px solid #0B3D2E",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #FFD93B33",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {broccoliStages.map((stg, i) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setSelectedStage(i)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontFamily: "'Press Start 2P', monospace",
                        background: selectedStage === i ? "#FF5C8A" : "#0B3D2E",
                        color: selectedStage === i ? "#0B3D2E" : "#FFD93B",
                        border: "1px solid #FFD93B",
                        cursor: "pointer",
                      }}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "#FF5C8A", fontWeight: "bold" }}>
                  STAGE 0{selectedStage + 1} // {broccoliStages[selectedStage].title}
                </span>
              </div>

              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {broccoliStages[selectedStage].role}
                </p>

                <div
                  style={{
                    background: "#03140F",
                    border: "1px solid #0B3D2E",
                    padding: "10px 12px",
                    margin: "8px 0",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "#A7F3D0",
                    overflowX: "auto",
                    whiteSpace: "pre",
                  }}
                >
                  {broccoliStages[selectedStage].code}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginTop: "8px",
                    fontSize: "11px",
                    color: "#FFFDF0",
                  }}
                >
                  <div>
                    <span style={{ color: "#FFD93B", fontWeight: "bold" }}>INVARIANT:</span>{" "}
                    {broccoliStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {broccoliStages[selectedStage].failureGuard}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: WHAT I BUILT ── */}
          <div className="mt-8 mb-2 flex items-baseline justify-between">
            <h2 className="m-0 font-hand text-2xl sm:text-4xl font-bold text-[#0B3D2E]">
              2. what i built
            </h2>
          </div>
          <p className="m-0 mb-4 font-hand text-lg sm:text-2xl text-[#0B3D2E]">
            Caloric and body composition tracking engineered as an honest physical instrument:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3.5 mb-8">
            {broccoliChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 font-hand text-lg sm:text-xl text-[#0B3D2E] py-1 px-1.5"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 border-2 border-[#0B3D2E] bg-[#FFF8D6] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12 L9 18 L20 6"
                      stroke="#FF5C8A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="break-words">{item}</span>
              </div>
            ))}
          </div>

          {/* ── SECTION 3: PROBLEMS I HAD TO CRACK ── */}
          <div className="mt-8 mb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 className="m-0 font-hand text-2xl sm:text-4xl font-bold text-[#0B3D2E]">
              3. problems i had to crack
            </h2>
            <span className="font-mono text-[10px] sm:text-xs text-[#0B3D2E] font-bold">
              Click card to view root cause &amp; code diff
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-10">
            {broccoliProblems.map((prob, i) => {
              const isExpanded = expandedProblem === i;
              return (
                <div
                  key={prob.tag}
                  onClick={() => setExpandedProblem(isExpanded ? null : i)}
                  className={`p-4 sm:p-5 cursor-pointer transition-all ${
                    isExpanded
                      ? "border-3 border-[#FF5C8A] bg-[#FFFDF0] shadow-[4px_4px_0_#FF5C8A]"
                      : "border-2 border-dashed border-[#0B3D2E] bg-[#FFF8D6] hover:bg-[#FFFDF0] hover:border-solid shadow-[2px_2px_0_#0B3D2E]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="inline-flex items-center justify-center w-6 h-6 font-mono text-xs font-bold bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] shrink-0">
                        {prob.tag}
                      </span>
                      <span className="font-hand text-xl sm:text-2xl font-bold text-[#0B3D2E] truncate">
                        {prob.title}
                      </span>
                    </div>
                    <span
                      className="font-pixel text-[8px] sm:text-[9px] px-2 py-1 shrink-0 border border-[#0B3D2E]"
                      style={{
                        background: isExpanded ? "#FF5C8A" : "#0B3D2E",
                        color: isExpanded ? "#0B3D2E" : "#FFD93B",
                      }}
                    >
                      {isExpanded ? "▲ HIDE" : "▼ DIFF"}
                    </span>
                  </div>

                  <p className="m-0 mb-2 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                    {prob.summary}
                  </p>

                  {/* Expandable Engineering Code Diff Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-[#0B3D2E]/25">
                      <span className="block font-mono text-[10px] font-bold text-[#0B3D2E] mb-1.5">
                        FIX DIFF &amp; PERFORMANCE PROFILE:
                      </span>
                      <div className="border-2 border-[#0B3D2E] bg-[#07241A] p-2.5 sm:p-3 text-[#A7F3D0] font-mono text-[10px] sm:text-xs overflow-x-auto max-w-full">
                        <pre className="m-0 leading-relaxed font-mono whitespace-pre">
                          {prob.codeDiff}
                        </pre>
                      </div>
                      <p className="mt-2.5 mb-0 font-mono text-[10px] sm:text-xs text-[#0B3D2E] font-bold leading-normal">
                        <span className="text-[#FF5C8A]">TAKEAWAY:</span> {prob.takeaway}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── FOOTER: TILTED STICKY NOTE & METADATA TABLE ── */}
          <div className="mt-10 pt-6 border-t-3 border-[#0B3D2E] flex flex-col md:flex-row md:items-end justify-between gap-6">
            {/* Interactive Sticky note */}
            <div
              className="w-full max-w-[460px] p-4 sm:p-5 bg-[#FFF8D6] border-3 border-[#FF5C8A] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] -rotate-1 sm:-rotate-2 hover:rotate-0 transition-transform cursor-pointer"
              title="Click to view shipping notes"
            >
              <p className="m-0 font-hand text-xl sm:text-2xl leading-snug text-[#0B3D2E]">
                <strong>SHIPPED PRODUCT.</strong> Available worldwide on{" "}
                <a
                  href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B3D2E] underline font-bold hover:text-[#FF5C8A]"
                >
                  Google Play ↗
                </a>
                . Built with React Native &amp; SQLite.
              </p>
            </div>

            {/* Metadata Table */}
            <div className="w-full md:w-auto overflow-x-auto">
              <table className="w-full border-collapse font-mono text-xs border-2 border-[#0B3D2E] bg-[#FFF8D6]">
                <tbody>
                  <tr>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">PROJECT</td>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">BROCCOLI</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">DRAWN BY</td>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">BIDYA B. NANDA</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">STATUS</td>
                    <td className="border-2 border-[#0B3D2E] px-3 py-1.5 font-bold">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0B3D2E] underline"
                      >
                        LIVE ON PLAY STORE ↗
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
