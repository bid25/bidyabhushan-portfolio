"use client";

import React, { useState, useEffect, useRef } from "react";

interface StageInfo {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  code: string;
  invariant: string;
  failureGuard: string;
}

const habaneroStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Chief Architect Intent DAG",
    subtitle: "Topological Work-Order Decomposition",
    role: "Decomposes high-level intent into strongly typed Work Orders, maps topological dependency waves, and computes SHA-256 contract hashes to freeze schemas.",
    code: `// Chief Architect: Topological DAG wave resolution\nconst manifest = {\n  work_order_id: "WO-SYS-041",\n  target: "src/ring_buffer.c",\n  contract_hash: "4e9f7a22b8c9d1...", // Frozen SHA-256\n  dependencies: ["include/ring_buffer.h"],\n  invariants: ["_Alignas(64)", "memory_order_acquire/release"]\n};`,
    invariant: "Contracts frozen at Chief Architect wave cannot be mutated by downstream worker agents.",
    failureGuard: "Gate G0 halts pipeline immediately upon contract drift or schema interface divergence."
  },
  {
    id: "stage-2",
    title: "Parallel Specialized Workers",
    subtitle: "C11 Systems & High-Craft Studio Workers",
    role: "Independent specialized agents executing in concurrent waves: bare-metal C11 with atomics, single-file airgapped web apps, and parametric vector math.",
    code: `// C11 Worker: Cache-line aligned SPSC lock-free ring buffer\ntypedef struct {\n    _Alignas(64) atomic_size_t head;\n    _Alignas(64) atomic_size_t tail;\n    _Alignas(64) uint8_t buffer[BUFFER_CAPACITY];\n} spsc_ring_buffer_t;\n// Formal memory_order_acquire and memory_order_release pairing`,
    invariant: "Zero cloud network dependencies: 100% local Apple Silicon Metal execution.",
    failureGuard: "Dynamic Metal memory governor caps active model RAM at <=7.5 GB, preventing OS swap thrashing."
  },
  {
    id: "stage-3",
    title: "G0-G7 Hardware Gate Gauntlet",
    subtitle: "Apple Clang & Headless Playwright Audits",
    role: "Executes real native tooling sequentially: xcrun clang -Werror, WCAG AAA 14:1 contrast ratio verification, and headless Playwright mobile layout shift tests.",
    code: `$ xcrun clang -std=c11 -Wall -Wextra -Werror -Wpedantic \\\n    -Wstrict-prototypes -Wmissing-prototypes -c src/ring_buffer.c\n[PASS] Bare-metal compilation certified (0 errors, 0 warnings)\n$ npx playwright test tests/mobile_audit.spec.ts\n[PASS] Viewport 375x812: 0px overflow, CLS = 0.0000`,
    invariant: "Code fails to certify if any gate fails or produces a single compiler warning.",
    failureGuard: "Closed-loop AST repair engine intercepts compiler stderr and auto-synthesizes missing prototypes."
  },
  {
    id: "stage-4",
    title: "Sovereign Airgap Certification",
    subtitle: "Cryptographic Tamper-Proof Audit Seal",
    role: "Stamps a unique local Sovereignty Seal (SOV-WH-*) backed by a SHA-256 audit manifest hash, certifying zero-defect, zero-telemetry local delivery.",
    code: `// Tamper-proof Sovereignty Certificate\n{\n  "seal_id": "SOV-WH-2026-M5-0421",\n  "audit_hash": "e3b0c44298fc1c149afbf4c8996fb92427...",\n  "gates_passed": ["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7"],\n  "outbound_requests": 0,\n  "status": "SOVEREIGN_CERTIFIED"\n}`,
    invariant: "Delivery certified only when all 8 gates pass sequentially on local silicon.",
    failureGuard: "Cryptographic seal invalidated if any output byte is mutated post-verification."
  }
];

const habaneroChecklist = [
  "Multi-agent topological DAG scheduler",
  "SHA-256 contract-hash freezing (Gate G0)",
  "Apple Clang C11 compiler gate (Gate G2)",
  "Headless Playwright mobile audit (Gate G5)",
  "WCAG AAA 14:1 contrast checker (Gate G4)",
  "C11 lock-free ring buffer (_Alignas(64))",
  "Apple Silicon Metal memory governor (<=7.5 GB)",
  "Closed-loop AST compiler self-repair",
  "Tamper-proof Sovereignty Seal (SOV-WH-*)",
  "100% airgapped zero-telemetry loopback",
  "25/25 sovereign benchmark pass rate",
  "Zero layout shift (CLS = 0.0000)"
];

const habaneroProblems = [
  {
    tag: "A",
    title: "interface drift in parallel sub-agents",
    summary:
      "When multiple specialized sub-agents (Systems Worker, UI Worker, Vector Artist) executed in parallel, independent interpretation of schemas caused breaking API divergence at the integration gate. Fix: Implemented Chief Architect contract-hash freezing (Gate G0). All shared interfaces are SHA-256 hashed and frozen before execution waves launch.",
    codeDiff: `- // Monolithic prompt or uncoordinated sub-agents\n- // Sub-agent 1: exports { type: "data", val: 42 }\n- // Sub-agent 2: expects { payload: { value: 42 } }\n- // RESULT: Schema mismatch at integration time!\n+ // Habanero: SHA-256 Contract Freezing at Chief Architect Gate\n+ const contractHash = sha256(JSON.stringify(workOrderSchema));\n+ freezeContract("work_order.json", contractHash);\n+ // Any sub-agent attempting to alter the contract triggers G0 hard halt`,
    takeaway: "Multi-agent pipelines require deterministic schema freezing before parallel execution."
  },
  {
    tag: "B",
    title: "unified memory pressure during 32b reasoning",
    summary:
      "Running DeepSeek R1 32B for deep mathematical reasoning on a 16 GB Apple Silicon machine risked memory eviction and macOS swap thrashing. Fix: Engineered dynamic Metal memory governors that restrict active model RAM to 7.5 GB, leaving 8.0 GB or more dedicated for OS multitasking and headless test runners.",
    codeDiff: `- // Default local model loader: grabs all available unified memory\n- metal_alloc_all_vram(&model_weights); // Uses 14.2 GB of 16 GB RAM -> OS swap stalls\n+ // Habanero dynamic memory governor\n+ const MEMORY_CEILING_MB = 7680; // 7.5 GB hard cap\n+ const governor = new MetalMemoryGovernor({ ceilingMb: MEMORY_CEILING_MB });\n+ await governor.enforceContextWindow({ maxTokens: 4096, quant: "Q4_K_M" });`,
    takeaway: "Local compound AI must treat memory as a scarce, governed resource with strict ceilings."
  },
  {
    tag: "C",
    title: "apple clang missing-prototype stops",
    summary:
      "Quantized LLMs frequently synthesize bare C functions without explicit forward declarations, immediately tripping Apple Clang's -Wmissing-prototypes flag. Fix: Built a closed-loop self-healing AST repair engine that intercepts Clang stderr diagnostics and automatically synthesizes missing header prototypes.",
    codeDiff: `- // LLM generated C without header prototype\n- void process_packet(uint8_t *buf, size_t len) { ... }\n- // Clang stderr: error: no previous prototype for function 'process_packet' [-Werror,-Wmissing-prototypes]\n+ // Closed-loop AST self-healer injects explicit prototype declaration\n+ void process_packet(uint8_t *buf, size_t len);\n+ void process_packet(uint8_t *buf, size_t len) { ... }`,
    takeaway: "Compiler diagnostics should drive automated AST repair loops rather than human trial and error."
  },
  {
    tag: "D",
    title: "horizontal mobile layout shifts",
    summary:
      "Synthesized frontend code frequently suffered from subtle 1px container overflow on 375px mobile viewports, degrading mobile user experience. Fix: Added Gate G5 running headless Playwright at 375x812 viewport, mathematically asserting document.documentElement.scrollWidth === window.innerWidth and CLS === 0.000.",
    codeDiff: `- // Unverified CSS: absolute positioning causes 376px overflow on 375px screens\n- width: 100vw; margin-left: -8px;\n+ // Enforced Gate G5 invariant: 0 horizontal overflow\n+ const isOverflowing = await page.evaluate(() => {\n+   return document.documentElement.scrollWidth > window.innerWidth;\n+ });\n+ expect(isOverflowing).toBe(false);`,
    takeaway: "Frontend synthesis requires headless browser geometry assertions, not just CSS linting."
  }
];

export function HabaneroCaseStudy() {
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
            <span>FIG. HABANERO-SOV-01</span>
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
            <span
              style={{
                background: "#FFD93B",
                color: "#0B3D2E",
                border: "2px solid #0B3D2E",
                padding: "3px 10px",
              }}
            >
              UNDER DEVELOPMENT
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Apple Silicon Metal
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Local Quantized LLMs
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              C11 Atomics Lock-Free
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Topological DAG
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
              G0-G7 Hardware Gauntlet
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Apple Clang C11
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Playwright 0 CLS
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              0 Cloud Latency
            </span>
          </div>

          {/* Title with circled HABANERO and pink swoosh */}
          <div className="my-5">
            <h1 className="m-0 font-hand font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-[#0B3D2E]">
              <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                HABANERO
              </span>{" "}
              - Sovereign AI Engine
            </h1>
            <svg
              viewBox="0 0 460 20"
              fill="none"
              className="w-full max-w-[460px] h-auto block mt-1"
            >
              <path
                className="dw"
                pathLength="1"
                d="M4 12 C120 4, 270 18, 450 10"
                stroke="#FF5C8A"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
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
            Cloud frontier models (Sonnet 3.5, Opus) require high-latency external APIs, proprietary telemetry, and corporate refusal guardrails that block legitimate low-level systems engineering, firmware analysis, and private data workflows. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>Engineering a 100% offline, airgapped compound AI work-engineer on Apple Silicon that matches frontier model synthesis quality while enforcing deterministic C11 compilation and headless browser verification.</span>
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
            {/* Top Toolbar: Interactive Controls */}
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

            {/* SVG Schematic: Habanero Engine */}
            <div key={replayKey} className={!isIntersecting ? "pipeline-paused" : ""}>
              <svg
                role="img"
                aria-label="Schematic: Chief Architect DAG to Parallel Execution, G0-G7 Gauntlet, and Sovereign Release"
                viewBox="0 0 940 230"
                style={{ width: "100%", display: "block" }}
              >
                {/* ── Box 1: chief architect (x: 24 to 184) ── */}
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
                    chief architect
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
                    topological dag
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
                    sha-256 contract freeze
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
                    wave 0: intent
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

                {/* ── Box 2: parallel workers (x: 266 to 476) ── */}
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
                    style={{ animationDelay: "2.2s" }}
                  />
                  <text
                    className="fi"
                    x="280"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 1 ? "bold" : "normal"}
                    style={{ animationDelay: "2.8s" }}
                  >
                    parallel workers
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.0s" }}
                  >
                    c11 lock-free atomics
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.2s" }}
                  >
                    metal memory governor
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "3.4s" }}
                  >
                    &lt;= 7.5 gb active ram
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
                    wave 1: execution
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

                {/* ── Box 3: g0-g7 gauntlet (x: 558 to 768) ── */}
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
                    g0-g7 hardware audit
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
                    xcrun clang -Werror
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
                    playwright 0 cls
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
                    14:1 contrast gate
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
                    wave 2: gauntlet
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

                {/* ── Box 4: sovereign release (x: 838 to 924) ── */}
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
                  <text
                    className="fi"
                    x="881"
                    y="64"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="19"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 3 ? "bold" : "normal"}
                    style={{ animationDelay: "7.9s" }}
                  >
                    SOV
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="94"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#0B3D2E"
                    style={{ animationDelay: "8.1s" }}
                  >
                    SEAL
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="124"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="15"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "8.3s" }}
                  >
                    AIRGAP
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
                    wave 3: release
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
              {/* Quick Jump Stage Tabs */}
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
                  {habaneroStages.map((stg, i) => (
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
                  STAGE 0{selectedStage + 1} // {habaneroStages[selectedStage].title}
                </span>
              </div>

              {/* Stage Description & Live Monospace Code */}
              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {habaneroStages[selectedStage].role}
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
                  {habaneroStages[selectedStage].code}
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
                    {habaneroStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {habaneroStages[selectedStage].failureGuard}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: WHAT I BUILT ── */}
          <div className="flex flex-wrap items-baseline justify-between mt-8 sm:mt-10 mb-2">
            <h2 className="m-0 font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
              2. what i built
            </h2>
          </div>
          <p className="m-0 mb-4 font-hand text-lg sm:text-xl text-[#0B3D2E]">
            Sovereign compound AI platform and deterministic verification engine on Apple Silicon:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 mb-8">
            {habaneroChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 font-hand text-lg sm:text-xl text-[#0B3D2E] py-1"
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
          <div className="flex flex-wrap items-baseline justify-between gap-2 mt-8 sm:mt-10 mb-3">
            <h2 className="m-0 font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
              3. problems i had to crack
            </h2>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#0B3D2E] font-bold">
              Click card to view root cause & code diff
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
            {habaneroProblems.map((prob, i) => {
              const isExpanded = expandedProblem === i;
              return (
                <div
                  key={prob.tag}
                  onClick={() => setExpandedProblem(isExpanded ? null : i)}
                  className={`p-4 sm:p-5 cursor-pointer transition-all ${
                    isExpanded
                      ? "border-3 border-[#FF5C8A] bg-[#FFFDF0] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] -translate-x-0.5 -translate-y-0.5"
                      : "border-2 border-dashed border-[#0B3D2E] bg-[#FFF8D6] shadow-[2px_2px_0_#0B3D2E22]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF5C8A] text-[#0B3D2E] font-mono font-bold text-base border-2 border-[#0B3D2E] shrink-0">
                        {prob.tag}
                      </span>
                      <span className="font-hand text-xl sm:text-2xl font-bold text-[#0B3D2E] truncate">
                        {prob.title}
                      </span>
                    </div>
                    <span
                      className={`font-pixel text-[8px] px-1.5 py-1 shrink-0 ${
                        isExpanded ? "bg-[#FF5C8A] text-[#0B3D2E]" : "bg-[#0B3D2E] text-[#FFD93B]"
                      }`}
                    >
                      {isExpanded ? "▲ HIDE" : "▼ DIFF"}
                    </span>
                  </div>

                  <p className="m-0 mb-2.5 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                    {prob.summary}
                  </p>

                  {/* Expandable Engineering Code Diff Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-[#0B3D2E44]">
                      <span className="block font-mono text-[10px] font-bold text-[#0B3D2E] mb-1">
                        FIX DIFF & TERMINAL LOGS:
                      </span>
                      <pre className="m-0 p-2.5 sm:p-3 bg-[#06231A] text-[#A7F3D0] font-mono text-[10px] sm:text-[11px] leading-relaxed border border-[#0B3D2E] overflow-x-auto max-w-full whitespace-pre-wrap break-words">
                        {prob.codeDiff}
                      </pre>
                      <p className="mt-2 mb-0 font-mono text-[10px] text-[#0B3D2E] font-bold">
                        <span className="text-[#FF5C8A]">TAKEAWAY:</span> {prob.takeaway}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── FOOTER: TILTED STICKY NOTE & METADATA TABLE ── */}
          <div className="mt-8 sm:mt-11 pt-5 sm:pt-6 border-t-3 border-[#0B3D2E] flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-6">
            <div
              className="bg-[#FFF8D6] border-3 border-[#FF5C8A] p-3 sm:p-4 max-w-full sm:max-w-[460px] -rotate-1 sm:-rotate-2 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] hover:rotate-0 hover:scale-[1.01] transition-transform cursor-pointer"
              title="Click to see sovereign AI notes"
            >
              <p className="m-0 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                <strong>100% AIRGAPPED SOVEREIGN AI.</strong> 0 outbound network requests, 0 external CDN dependencies, 100% local Apple Silicon loopback.
              </p>
            </div>

            <table className="border-collapse font-mono text-[11px] sm:text-xs border-2 border-[#0B3D2E] bg-[#FFF8D6] self-start sm:self-auto w-full sm:w-auto">
              <tbody>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">PROJECT</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    HABANERO ENGINE
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">DRAWN BY</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    BIDYA B. NANDA
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">STATUS</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    UNDER DEVELOPMENT // SOVEREIGN AI
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
