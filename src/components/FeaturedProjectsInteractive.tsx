"use client";

import { useState } from "react";
import Link from "next/link";
import { PixelBroccoli } from "@/components/PixelBroccoli";
import { PixelZucchini } from "@/components/PixelZucchini";
import { PixelHabanero } from "@/components/PixelHabanero";

type TabId = "broccoli" | "zucchini-linux" | "habanero";

export function FeaturedProjectsInteractive() {
  const [activeTab, setActiveTab] = useState<TabId>("broccoli");

  // Broccoli Interactive State: Macro goal calculator & tolerance matrix
  const [macroGoal, setMacroGoal] = useState<"cut" | "maintain" | "bulk">("maintain");
  const [targetWeightKg, setTargetWeightKg] = useState<number>(72);

  // Compute live nutritional targets based on goal & weight
  const calories =
    macroGoal === "cut"
      ? Math.round(targetWeightKg * 29 - 400)
      : macroGoal === "bulk"
      ? Math.round(targetWeightKg * 34 + 350)
      : Math.round(targetWeightKg * 32);

  const proteinGrams = Math.round(targetWeightKg * 2.1);
  const fatsGrams = Math.round((calories * 0.25) / 9);
  const carbsGrams = Math.max(0, Math.round((calories - proteinGrams * 4 - fatsGrams * 9) / 4));
  const minTolerance = Math.round(calories * 0.96);
  const maxTolerance = Math.round(calories * 1.04);

  // Zucchini Linux Interactive State: Command runner
  const [linuxCmd, setLinuxCmd] = useState<"neofetch" | "lsblk" | "dmesg" | "cmdline">("neofetch");

  // Habanero Interactive State: Topological DAG Wave Simulator
  const [selectedHabaneroTask, setSelectedHabaneroTask] = useState<"ring-buffer" | "metal-governor" | "playwright-cls">("ring-buffer");
  const [activeDagWave, setActiveDagWave] = useState<number>(0);
  const [isWaveRunning, setIsWaveRunning] = useState<boolean>(false);

  const habaneroPresets = {
    "ring-buffer": {
      name: "SPSC Lock-Free Ring Buffer",
      target: "src/ring_buffer.c",
      workOrder: "WO-SYS-041",
      contractHash: "4e9f7a22b8c9d18f5043a29b47e29683",
      invariants: "_Alignas(64) cache-line · memory_order_acquire/release",
      ramUsage: "6.85",
      waves: [
        {
          id: 0,
          badge: "TOPOLOGY",
          command: "habanero dag build --spec intent/spsc.yaml",
          log: "Decomposed atomic memory nodes: head_idx, tail_idx, buffer[CAP]",
          status: "Acyclic graph verified: 0 cycles detected across 4 dependency edges",
        },
        {
          id: 1,
          badge: "CONTRACT",
          command: "habanero seal --manifest contract/ring_buffer.h",
          log: "SHA-256 seal: 4e9f7a22b8c9d18f5043a29b47e29683",
          status: "Interface immutable: worker subagents prohibited from header edits",
        },
        {
          id: 2,
          badge: "SYNTHESIS",
          command: "habanero worker dispatch --role systems-c11",
          log: "Synthesized src/ring_buffer.c with _Alignas(64) boundary padding",
          status: "Atomic acquire-release memory orders paired on producer/consumer",
        },
        {
          id: 3,
          badge: "GAUNTLET",
          command: "xcrun clang -std=c11 -Wall -Wextra -Werror",
          log: "xcrun clang C11 -Werror: 0 warnings, 0 errors (100% C11 bare-metal)",
          status: "✓ G0-G7 HARDWARE AUDIT PASSED · 0 CLOUD DEPENDENCY",
        },
      ],
    },
    "metal-governor": {
      name: "Dynamic Metal Memory Governor",
      target: "core/governor.metal",
      workOrder: "WO-MEM-019",
      contractHash: "9b3c4f71a02d8471b3e8c95a02931d84",
      invariants: "Active model RAM <= 7.5 GB on 16 GB Apple Silicon",
      ramUsage: "7.42",
      waves: [
        {
          id: 0,
          badge: "TOPOLOGY",
          command: "habanero dag build --spec intent/metal_governor.yaml",
          log: "Probed Apple Silicon unified memory pool: 16.0 GB total",
          status: "Configured swap protection ceiling: 7.50 GB hard boundary",
        },
        {
          id: 1,
          badge: "CONTRACT",
          command: "habanero seal --manifest contract/governor.metal",
          log: "SHA-256 seal: 9b3c4f71a02d8471b3e8c95a02931d84",
          status: "Clamping rules frozen: zero runtime allocations beyond ceiling",
        },
        {
          id: 2,
          badge: "SYNTHESIS",
          command: "habanero worker dispatch --role metal-kernel",
          log: "Synthesized Metal shading kernel with -O3 optimization",
          status: "Bound device memory pointers to MTLStorageModeShared zero-copy",
        },
        {
          id: 3,
          badge: "GAUNTLET",
          command: "xcrun metal -O3 && habanero audit --telemetry memory",
          log: "Dynamic unified RAM clamp enforced at 7.42 GB: PASS",
          status: "✓ G0-G7 HARDWARE AUDIT PASSED · 0 OS SWAP THRASH",
        },
      ],
    },
    "playwright-cls": {
      name: "Playwright Headless UI & 0 CLS Audit",
      target: "studio/HabaneroStudio.tsx",
      workOrder: "WO-UI-088",
      contractHash: "18e47b92ac039572c815d392817a02c9",
      invariants: "CLS = 0.000 · 14:1 WCAG AAA mechanical contrast",
      ramUsage: "6.10",
      waves: [
        {
          id: 0,
          badge: "TOPOLOGY",
          command: "habanero dag build --spec intent/studio_layout.yaml",
          log: "Parsed component tree: StudioSidebar, WaveTimeline, Telemetry",
          status: "Calculated aspect reservations for dynamic canvas containers",
        },
        {
          id: 1,
          badge: "CONTRACT",
          command: "habanero seal --manifest contract/studio_schema.ts",
          log: "SHA-256 seal: 18e47b92ac039572c815d392817a02c9",
          status: "UI tokens frozen: 0 runtime remote CDN asset loading",
        },
        {
          id: 2,
          badge: "SYNTHESIS",
          command: "habanero worker dispatch --role frontend-ts",
          log: "Synthesized studio/HabaneroStudio.tsx with strict TypeScript",
          status: "Inlined critical font data directly; 0 CDN network calls",
        },
        {
          id: 3,
          badge: "GAUNTLET",
          command: "playwright test --browser=chromium && habanero audit",
          log: "Playwright headless viewport: Cumulative Layout Shift = 0.000",
          status: "✓ G0-G7 HARDWARE AUDIT PASSED · 14:1 AAA CONTRAST",
        },
      ],
    },
  };

  const activeHabaneroData = habaneroPresets[selectedHabaneroTask];
  const currentDagWave = activeHabaneroData.waves[activeDagWave] || activeHabaneroData.waves[0];

  const handleRunFullPipeline = () => {
    setIsWaveRunning(true);
    setActiveDagWave(0);
    setTimeout(() => {
      setActiveDagWave(1);
      setTimeout(() => {
        setActiveDagWave(2);
        setTimeout(() => {
          setActiveDagWave(3);
          setIsWaveRunning(false);
        }, 400);
      }, 400);
    }, 400);
  };

  return (
    <section className="pt-20 pb-16 relative">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-end gap-3 sm:gap-4">
          <h2 className="m-0 font-pixel text-lg sm:text-2xl bg-[#FFF6C2] border-3 sm:border-4 border-[#0B3D2E] px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] text-[#0B3D2E]">
            FEATURED PROJECTS
          </h2>
          <span className="font-hand text-xl sm:text-3xl -rotate-2 text-[#0B3D2E]">
            ← click card to preview · click details to read case study
          </span>
        </div>
        <div className="font-pixel text-[9px] sm:text-[11px] bg-[#0B3D2E] text-[#FFD93B] px-2.5 sm:px-3 py-1.5 sm:py-2 border-2 border-[#0B3D2E]">
          MODE: INTERACTIVE_RUNNER
        </div>
      </div>

      {/* ── 3-CARD PROJECT SELECTOR (AT TOP) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Card 1: Broccoli */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab("broccoli")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveTab("broccoli");
            }
          }}
          className={`group block border-3 sm:border-4 border-[#0B3D2E] p-4 sm:p-5 cursor-pointer transition-all relative ${
            activeTab === "broccoli"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[8px_8px_0_#FF5C8A] -translate-y-0.5 sm:-translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[5px_5px_0_#0B3D2E] hover:bg-[#2F9E5E] hover:text-[#FFFDF0]"
          }`}
        >
          <span
            className={`absolute -top-3.5 right-4 font-pixel text-[9px] px-2 py-1 border border-[#0B3D2E] ${
              activeTab === "broccoli"
                ? "bg-[#FFD93B] text-[#0B3D2E]"
                : "bg-[#0B3D2E] text-[#FFD93B]"
            }`}
          >
            01 · LIVE
          </span>
          <div
            className={`font-pixel text-[11px] inline-block px-2 py-0.5 mb-2 ${
              activeTab === "broccoli"
                ? "bg-[#FF5C8A] text-[#0B3D2E] font-bold"
                : "bg-[#0B3D2E] text-[#FF5C8A] group-hover:bg-[#FFF6C2] group-hover:text-[#0B3D2E]"
            }`}
          >
            NUTRITION INSTRUMENT
          </div>
          <h3
            className={`my-1 font-pixel text-lg ${
              activeTab === "broccoli" ? "text-[#FFFDF0]" : "text-[#0B3D2E] group-hover:text-[#FFFDF0]"
            }`}
          >
            1. BROCCOLI
          </h3>
          <p
            className={`m-0 mb-4 font-mono text-xs leading-relaxed ${
              activeTab === "broccoli" ? "text-[#FFFDF0]/90" : "text-[#0B3D2E] group-hover:text-[#FFFDF0]/90"
            }`}
          >
            Caloric &amp; composition tracker shipped to Google Play. 60 FPS dial physics and offline SQLite.
          </p>
          <div
            className={`font-bold border-t-2 border-dashed pt-3 text-xs flex items-center justify-between ${
              activeTab === "broccoli"
                ? "border-[#FFD93B]/50 text-[#FFD93B]"
                : "border-[#0B3D2E] text-[#0B3D2E] group-hover:text-[#FFFDF0] group-hover:border-[#FFFDF0]/50"
            }`}
          >
            <span className="font-pixel text-[10px]">
              {activeTab === "broccoli" ? "● ACTIVE PREVIEW" : "ACTIVATE SIMULATOR"}
            </span>
            <Link
              href="/projects/broccoli"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: activeTab === "broccoli" ? "#FFD93B" : "#0B3D2E",
                color: activeTab === "broccoli" ? "#0B3D2E" : "#FFD93B",
              }}
              className="btn font-pixel text-xs px-3 py-1.5 border-2 border-[#0B3D2E] transition-all inline-flex items-center gap-1 shadow-[3px_3px_0_#0B3D2E] hover:scale-105"
            >
              DETAILS →
            </Link>
          </div>
        </div>

        {/* Card 2: Zucchini Linux */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab("zucchini-linux")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveTab("zucchini-linux");
            }
          }}
          className={`group block border-3 sm:border-4 border-[#0B3D2E] p-4 sm:p-5 cursor-pointer transition-all relative ${
            activeTab === "zucchini-linux"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[8px_8px_0_#FF5C8A] -translate-y-0.5 sm:-translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[5px_5px_0_#0B3D2E] hover:bg-[#FF5C8A] hover:text-[#0B3D2E]"
          }`}
        >
          <span className="absolute -top-3.5 right-4 bg-[#FF5C8A] text-[#0B3D2E] font-pixel text-[9px] px-2 py-1 border border-[#0B3D2E] font-bold">
            02 · HARDWARE
          </span>
          <div
            className={`font-pixel text-[11px] inline-block px-2 py-0.5 mb-2 ${
              activeTab === "zucchini-linux"
                ? "bg-[#FFD93B] text-[#0B3D2E] font-bold"
                : "bg-[#0B3D2E] text-[#FFD93B] group-hover:bg-[#0B3D2E] group-hover:text-[#FFD93B]"
            }`}
          >
            ARM64 LINUX
          </div>
          <h3
            className={`my-1 font-pixel text-lg ${
              activeTab === "zucchini-linux" ? "text-[#FFFDF0]" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]"
            }`}
          >
            2. ZUCCHINI-LINUX
          </h3>
          <p
            className={`m-0 mb-4 font-mono text-xs leading-relaxed ${
              activeTab === "zucchini-linux" ? "text-[#FFFDF0]/90" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]/90"
            }`}
          >
            SM-T295 tablet reverse engineered for bare-metal dual boot of Arch Linux ARM and LineageOS.
          </p>
          <div
            className={`font-bold border-t-2 border-dashed pt-3 text-xs flex items-center justify-between ${
              activeTab === "zucchini-linux"
                ? "border-[#FFD93B]/50 text-[#FFD93B]"
                : "border-[#0B3D2E] text-[#0B3D2E] group-hover:border-[#0B3D2E]/50"
            }`}
          >
            <span className="font-pixel text-[10px]">
              {activeTab === "zucchini-linux" ? "● ACTIVE PREVIEW" : "ACTIVATE CONSOLE"}
            </span>
            <Link
              href="/projects/zucchini-linux"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: activeTab === "zucchini-linux" ? "#FF5C8A" : "#0B3D2E",
                color: activeTab === "zucchini-linux" ? "#0B3D2E" : "#FFD93B",
              }}
              className="btn font-pixel text-xs px-3 py-1.5 border-2 border-[#0B3D2E] transition-all inline-flex items-center gap-1 shadow-[3px_3px_0_#0B3D2E] hover:scale-105"
            >
              DETAILS →
            </Link>
          </div>
        </div>

        {/* Card 3: Habanero Engine */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab("habanero")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveTab("habanero");
            }
          }}
          className={`group block border-3 sm:border-4 border-[#0B3D2E] p-4 sm:p-5 cursor-pointer transition-all relative ${
            activeTab === "habanero"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[8px_8px_0_#FF5C8A] -translate-y-0.5 sm:-translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[5px_5px_0_#0B3D2E] hover:bg-[#FFD93B] hover:text-[#0B3D2E]"
          }`}
        >
          <span
            className={`absolute -top-3.5 right-4 font-pixel text-[9px] px-2 py-1 border border-[#0B3D2E] ${
              activeTab === "habanero"
                ? "bg-[#FFD93B] text-[#0B3D2E]"
                : "bg-[#0B3D2E] text-[#FFD93B]"
            }`}
          >
            03 · SOVEREIGN AI
          </span>
          <div
            className={`font-pixel text-[11px] inline-block px-2 py-0.5 mb-2 ${
              activeTab === "habanero"
                ? "bg-[#FF5C8A] text-[#0B3D2E] font-bold"
                : "bg-[#0B3D2E] text-[#FF5C8A] group-hover:bg-[#0B3D2E] group-hover:text-[#FF5C8A]"
            }`}
          >
            COMPOUND AI ENGINE
          </div>
          <h3
            className={`my-1 font-pixel text-lg ${
              activeTab === "habanero" ? "text-[#FFFDF0]" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]"
            }`}
          >
            3. HABANERO ENGINE
          </h3>
          <p
            className={`m-0 mb-4 font-mono text-xs leading-relaxed ${
              activeTab === "habanero" ? "text-[#FFFDF0]/90" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]/90"
            }`}
          >
            100% offline compound AI on Apple Silicon Metal. Topological DAG scheduler with 8-stage C11 hardware verification gauntlet.
          </p>
          <div
            className={`font-bold border-t-2 border-dashed pt-3 text-xs flex items-center justify-between ${
              activeTab === "habanero"
                ? "border-[#FFD93B]/50 text-[#FFD93B]"
                : "border-[#0B3D2E] text-[#0B3D2E] group-hover:border-[#0B3D2E]/50"
            }`}
          >
            <span className="font-pixel text-[10px]">
              {activeTab === "habanero" ? "● ACTIVE PREVIEW" : "ACTIVATE GAUNTLET"}
            </span>
            <Link
              href="/projects/habanero"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: activeTab === "habanero" ? "#FFD93B" : "#0B3D2E",
                color: activeTab === "habanero" ? "#0B3D2E" : "#FFD93B",
              }}
              className="btn font-pixel text-xs px-3 py-1.5 border-2 border-[#0B3D2E] transition-all inline-flex items-center gap-1 shadow-[3px_3px_0_#0B3D2E] hover:scale-105"
            >
              DETAILS →
            </Link>
          </div>
        </div>
      </div>

      {/* ── ACTIVE SHOWCASE CONTAINER (CRISP, ZERO DULL FADE TEXTURE) ── */}
      <div className="relative">
        {/* 1. BROCCOLI STAGE */}
        {activeTab === "broccoli" && (
          <div className="card border-3 sm:border-4 border-[#0B3D2E] bg-[#0B3D2E] text-[#FFD93B] shadow-[6px_6px_0_#FF5C8A] sm:shadow-[12px_12px_0_#FF5C8A] p-4 sm:p-7 md:p-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#FFD93B]/30 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[10px] bg-[#FFD93B] text-[#0B3D2E] px-2 py-1">
                  PROJECT 01 OF 03
                </span>
                <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-2 py-1 font-bold">
                  LIVE ON GOOGLE PLAY
                </span>
                <span className="font-mono text-xs text-[#FFD93B]/80 ml-2">
                  // REACT NATIVE · REANIMATED 3 · SQLITE
                </span>
              </div>
              <div className="font-pixel text-xs text-[#FF5C8A] hidden sm:block">
                TAP GOALS TO TEST CALCULATOR ↓
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div>
                <h3 className="m-0 font-pixel text-2xl sm:text-3xl lg:text-4xl text-[#FFD93B] leading-tight">
                  BROCCOLI<span className="bl text-[#FF5C8A]">_</span>
                </h3>
                <p className="mt-3 mb-6 text-sm sm:text-base font-mono text-[#FFD93B]/90 leading-relaxed">
                  Caloric &amp; body composition tracker engineered with mechanical precision. Shipped to Google Play worldwide with local SQLite offline persistence and 60 FPS dial physics.
                </p>

                {/* Interactive Macro & Tolerance Matrix Simulator */}
                <div className="bg-[#FFF6C2] text-[#0B3D2E] border-3 border-[#0B3D2E] p-4 sm:p-5 shadow-[6px_6px_0_#FFD93B] mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-pixel text-[11px] text-[#0B3D2E]">
                      [ LIVE CALCULATOR: MACRO TOLERANCE MATRIX ]
                    </span>
                    <span className="font-mono text-[10px] text-[#0B3D2E]/80">
                      WEIGHT: {targetWeightKg} KG
                    </span>
                  </div>

                  {/* Goal Mode Buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setMacroGoal("cut")}
                      className={`font-pixel text-[10px] sm:text-xs px-3 py-1.5 border-2 border-[#0B3D2E] cursor-pointer transition-colors ${
                        macroGoal === "cut"
                          ? "bg-[#FF5C8A] text-[#0B3D2E] font-bold"
                          : "bg-white text-[#0B3D2E] hover:bg-[#FFD93B]"
                      }`}
                    >
                      [ CUT -400 KCAL ]
                    </button>
                    <button
                      type="button"
                      onClick={() => setMacroGoal("maintain")}
                      className={`font-pixel text-[10px] sm:text-xs px-3 py-1.5 border-2 border-[#0B3D2E] cursor-pointer transition-colors ${
                        macroGoal === "maintain"
                          ? "bg-[#0B3D2E] text-[#FFD93B] font-bold"
                          : "bg-white text-[#0B3D2E] hover:bg-[#FFD93B]"
                      }`}
                    >
                      [ MAINTAIN ]
                    </button>
                    <button
                      type="button"
                      onClick={() => setMacroGoal("bulk")}
                      className={`font-pixel text-[10px] sm:text-xs px-3 py-1.5 border-2 border-[#0B3D2E] cursor-pointer transition-colors ${
                        macroGoal === "bulk"
                          ? "bg-[#FFD93B] text-[#0B3D2E] font-bold"
                          : "bg-white text-[#0B3D2E] hover:bg-[#FFD93B]"
                      }`}
                    >
                      [ BULK +350 KCAL ]
                    </button>

                    {/* Weight steppers */}
                    <div className="flex items-center gap-1 ml-auto">
                      <button
                        type="button"
                        onClick={() => setTargetWeightKg((w) => Math.max(45, w - 2))}
                        className="font-pixel text-[10px] px-2 py-1 bg-white border-2 border-[#0B3D2E] cursor-pointer hover:bg-[#FFD93B]"
                        title="Decrease weight"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetWeightKg((w) => Math.min(130, w + 2))}
                        className="font-pixel text-[10px] px-2 py-1 bg-white border-2 border-[#0B3D2E] cursor-pointer hover:bg-[#FFD93B]"
                        title="Increase weight"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Computed Target & Tolerance Output */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-center mb-3">
                    <div className="bg-white border-2 border-[#0B3D2E] p-2">
                      <div className="font-pixel text-[9px] text-[#0B3D2E]/70">CALORIES</div>
                      <div className="font-pixel text-base text-[#0B3D2E]">{calories}</div>
                      <div className="font-mono text-[9px] text-[#0B3D2E]/60">kcal / day</div>
                    </div>
                    <div className="bg-white border-2 border-[#0B3D2E] p-2">
                      <div className="font-pixel text-[9px] text-[#0B3D2E]/70">PROTEIN</div>
                      <div className="font-pixel text-base text-[#0B3D2E]">{proteinGrams}g</div>
                      <div className="font-mono text-[9px] text-[#0B3D2E]/60">2.1g / kg</div>
                    </div>
                    <div className="bg-white border-2 border-[#0B3D2E] p-2">
                      <div className="font-pixel text-[9px] text-[#0B3D2E]/70">CARBS</div>
                      <div className="font-pixel text-base text-[#0B3D2E]">{carbsGrams}g</div>
                      <div className="font-mono text-[9px] text-[#0B3D2E]/60">complex</div>
                    </div>
                    <div className="bg-white border-2 border-[#0B3D2E] p-2">
                      <div className="font-pixel text-[9px] text-[#0B3D2E]/70">FATS</div>
                      <div className="font-pixel text-base text-[#0B3D2E]">{fatsGrams}g</div>
                      <div className="font-mono text-[9px] text-[#0B3D2E]/60">essential</div>
                    </div>
                  </div>

                  {/* Tolerance band explanation */}
                  <div className="border-t-2 border-dashed border-[#0B3D2E]/40 pt-2 font-mono text-[11px] flex flex-wrap items-center justify-between gap-1 text-[#0B3D2E]">
                    <span>
                      <strong>Honest Range:</strong> {minTolerance} - {maxTolerance} kcal (±4% error tolerance)
                    </span>
                    <span className="font-pixel text-[9px] text-[#0B3D2E] bg-[#FFD93B] px-1">
                      REAL BIOFEEDBACK
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3.5">
                  <Link
                    href="/projects/broccoli"
                    style={{ backgroundColor: "#FFD93B", color: "#0B3D2E" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A] w-full sm:w-auto"
                  >
                    READ CASE STUDY →
                  </Link>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#FFF6C2", color: "#0B3D2E" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FFD93B] w-full sm:w-auto"
                  >
                    GET ON GOOGLE PLAY ↗
                  </a>
                </div>
              </div>

              {/* Graphic Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#FFF8D6] border-4 border-[#0B3D2E] p-6 sm:p-8 shadow-[8px_8px_0_#0B3D2E]">
                  <PixelBroccoli width={180} height={180} />
                </div>
                <div className="mt-3 font-pixel text-[10px] text-[#FFD93B] text-center">
                  CALORIC INSTRUMENT · SHIPPED WORLDWIDE
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ZUCCHINI-LINUX STAGE */}
        {activeTab === "zucchini-linux" && (
          <div className="card border-3 sm:border-4 border-[#0B3D2E] bg-[#06231A] text-[#FFD93B] shadow-[6px_6px_0_#FFD93B] sm:shadow-[12px_12px_0_#FFD93B] p-4 sm:p-7 md:p-8 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#FFD93B]/30 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[10px] bg-[#FFD93B] text-[#06231A] px-2 py-1 font-bold">
                  PROJECT 02 OF 03
                </span>
                <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-2 py-1 font-bold">
                  ACTIVE // HARDWARE BRING-UP
                </span>
                <span className="font-mono text-xs text-[#FFD93B]/80 ml-2">
                  // QUALCOMM SDM429 · ARM64 MAINLINE · LK2ND
                </span>
              </div>
              <div className="font-pixel text-xs text-[#FF5C8A] hidden sm:block">
                CLICK COMMAND TO EXECUTE ↓
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center relative z-10 font-mono">
              <div>
                <h3 className="m-0 font-pixel text-2xl sm:text-3xl lg:text-4xl text-[#FFD93B] leading-tight">
                  ZUCCHINI-LINUX<span className="bl text-[#FF5C8A]">_</span>
                </h3>
                <p className="mt-3 mb-5 text-sm sm:text-base text-[#FFD93B]/90 leading-relaxed">
                  Samsung Galaxy Tab A 8.0 (SM-T295) reverse engineered for bare-metal dual-booting of Arch Linux ARM and LineageOS 21 via Qualcomm EDL firehose exploitation.
                </p>

                {/* Interactive Terminal Command Runner */}
                <div className="bg-[#0B3D2E] border-3 border-[#FFD93B] p-4 sm:p-5 shadow-[6px_6px_0_#FF5C8A] mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#FFD93B]/30 pb-2">
                    <span className="font-pixel text-[11px] text-[#FFD93B]">
                      [ CLICK SHELL COMMAND TO EXECUTE ]
                    </span>
                    <span className="font-mono text-[10px] text-[#FF5C8A]">
                      USER: root@zucchini ~#
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      { cmd: "neofetch", label: "$ neofetch" },
                      { cmd: "lsblk", label: "$ lsblk -f" },
                      { cmd: "dmesg", label: "$ dmesg | grep ft5446" },
                      { cmd: "cmdline", label: "$ cat /proc/cmdline" },
                    ].map((item) => (
                      <button
                        key={item.cmd}
                        type="button"
                        onClick={() => setLinuxCmd(item.cmd as any)}
                        className={`font-mono text-xs px-2.5 py-1 border cursor-pointer transition-colors ${
                          linuxCmd === item.cmd
                            ? "bg-[#FF5C8A] text-[#0B3D2E] border-[#FF5C8A] font-bold"
                            : "bg-[#06231A] text-[#FFD93B] border-[#FFD93B]/60 hover:bg-[#FFD93B] hover:text-[#0B3D2E]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Terminal Screen Output */}
                  <div className="bg-[#041812] border-2 border-[#0B3D2E] p-3 text-xs leading-relaxed overflow-x-auto min-h-[140px] font-mono">
                    {linuxCmd === "neofetch" && (
                      <div className="space-y-1 text-[#FFD93B]">
                        <div className="text-[#FF5C8A]">root@zucchini-samsung-t295</div>
                        <div>---------------------------</div>
                        <div>OS: Arch Linux ARM aarch64</div>
                        <div>Host: Samsung Galaxy Tab A (SM-T295)</div>
                        <div>Kernel: 5.15.148-zucchini-mainline</div>
                        <div>Uptime: 4 days, 18 hours</div>
                        <div>Shell: zsh 5.9</div>
                        <div>CPU: Qualcomm Snapdragon 429 (4) @ 1.95GHz</div>
                        <div>Memory: 412MB / 1952MB (LPDDR3)</div>
                        <div className="text-[#2F9E5E] pt-1">[ OK: DUAL-BOOT ROOTFS READY ]</div>
                      </div>
                    )}

                    {linuxCmd === "lsblk" && (
                      <div className="space-y-1 text-[#FFD93B]">
                        <div className="text-[#FF5C8A]">NAME        FSTYPE LABEL       MOUNTPOINTS</div>
                        <div>mmcblk0                                    </div>
                        <div>├─mmcblk0p1 vfat   MODEM      /firmware    </div>
                        <div>├─mmcblk0p28 ext4  system     /android_sys </div>
                        <div>├─mmcblk0p29 ext4  arch_root  /            </div>
                        <div>└─mmcblk0p30 ext4  userdata   /home        </div>
                        <div className="text-[#2F9E5E] pt-1">[ OK: 32GB EMMC PARTITIONS MOUNTED ]</div>
                      </div>
                    )}

                    {linuxCmd === "dmesg" && (
                      <div className="space-y-1 text-[#FFD93B]">
                        <div>[    0.984120] i2c 2-0038: FocalTech FT5446 Touchscreen found</div>
                        <div>[    1.021004] input: ft5446_ts as /dev/input/event0</div>
                        <div>[    1.021182] ft5446 2-0038: 1280x800 resolution initialized</div>
                        <div className="text-[#2F9E5E]">[    1.024500] fbcon: Deferring console frame buffer: 1280x800</div>
                        <div className="text-[#FF5C8A]">[    1.104200] initramfs: hardware volume key listener armed</div>
                      </div>
                    )}

                    {linuxCmd === "cmdline" && (
                      <div className="space-y-1 text-[#FFD93B]">
                        <div className="text-[#FF5C8A]">$ cat /proc/cmdline</div>
                        <div className="break-all text-[11px] leading-snug">
                          console=ttyMSM0,115200n8 earlycon=msm_geni_serial,0x4a90000 androidboot.hardware=qcom androidboot.bootdevice=7824900.sdhci root=/dev/mmcblk0p29 rw rootwait init=/sbin/init
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3.5">
                  <Link
                    href="/projects/zucchini-linux"
                    style={{ backgroundColor: "#FF5C8A", color: "#0B3D2E" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#FFD93B] shadow-[6px_6px_0_#FFD93B] w-full sm:w-auto"
                  >
                    READ BRING-UP LOG →
                  </Link>
                </div>
              </div>

              {/* Graphic Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#041812] border-4 border-[#FF5C8A] p-6 sm:p-8 shadow-[8px_8px_0_#FF5C8A]">
                  <PixelZucchini width={220} height={90} rotate={-4} />
                </div>
                <div className="mt-3 font-pixel text-[10px] text-[#FF5C8A] text-center">
                  ARM64 BARE-METAL · QUALCOMM FIREHOSE EXPLOIT
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. HABANERO ENGINE STAGE */}
        {activeTab === "habanero" && (
          <div className="card border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF8D6] text-[#0B3D2E] shadow-[6px_6px_0_#0B3D2E] sm:shadow-[12px_12px_0_#0B3D2E] p-4 sm:p-7 md:p-8 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#0B3D2E]/20 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1">
                  PROJECT 03 OF 03
                </span>
                <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] border border-[#0B3D2E] px-2 py-1 font-bold">
                  SOVEREIGN // COMPOUND AI
                </span>
                <span className="font-mono text-xs text-[#0B3D2E]/80 ml-2">
                  // C11 ATOMICS · APPLE SILICON METAL · LOCAL LLM
                </span>
              </div>
              <div className="font-pixel text-xs text-[#0B3D2E] hidden sm:block">
                CLICK GAUNTLET TO AUDIT ↓
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center relative z-10 font-mono">
              <div>
                <h3 className="m-0 font-pixel text-2xl sm:text-3xl lg:text-4xl text-[#0B3D2E] leading-tight">
                  HABANERO ENGINE<span className="bl text-[#FF5C8A]">_</span>
                </h3>
                <p className="mt-3 mb-5 text-sm sm:text-base text-[#0B3D2E]/90 leading-relaxed">
                  100% offline compound AI on Apple Silicon Metal. Topological DAG scheduler with 8-stage deterministic verification gauntlet (G0-G7) and zero telemetry.
                </p>

                {/* Interactive DAG Wave & Telemetry Console */}
                <div className="bg-[#FFF0B3] border-3 border-[#0B3D2E] p-4 sm:p-5 shadow-[6px_6px_0_#0B3D2E] mb-6 font-mono">
                  {/* Top Bar: Selector + Live Run Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-2 border-dashed border-[#0B3D2E]/30 pb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-pixel text-[10px] text-[#0B3D2E] mr-1">
                        WORK-ORDER:
                      </span>
                      {[
                        { key: "ring-buffer", label: "C11 SPSC" },
                        { key: "metal-governor", label: "METAL RAM" },
                        { key: "playwright-cls", label: "0 CLS" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => {
                            setSelectedHabaneroTask(item.key as any);
                            setActiveDagWave(0);
                          }}
                          className={`font-pixel text-[9px] px-2 py-0.5 border cursor-pointer transition-colors ${
                            selectedHabaneroTask === item.key
                              ? "bg-[#0B3D2E] text-[#FFD93B] border-[#0B3D2E] font-bold"
                              : "bg-[#FFF8D6] text-[#0B3D2E] border-[#0B3D2E]/40 hover:bg-[#FFD93B]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleRunFullPipeline}
                      disabled={isWaveRunning}
                      className="btn font-pixel text-[9px] px-2.5 py-1 bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] shadow-[2px_2px_0_#0B3D2E] font-bold hover:scale-105 cursor-pointer disabled:opacity-50"
                    >
                      {isWaveRunning ? "SIMULATING..." : "RUN DAG WAVE ▶"}
                    </button>
                  </div>

                  {/* 4-Wave Pipeline Stepper Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-3">
                    {activeHabaneroData.waves.map((wave, idx) => {
                      const isActive = activeDagWave === idx;
                      const isPast = activeDagWave > idx;
                      return (
                        <button
                          key={wave.id}
                          type="button"
                          onClick={() => {
                            if (!isWaveRunning) setActiveDagWave(idx);
                          }}
                          className={`px-1.5 py-1 text-center border-2 border-[#0B3D2E] font-mono text-[9px] sm:text-[10px] transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#0B3D2E] text-[#FFD93B] font-bold shadow-[2px_2px_0_#FF5C8A]"
                              : isPast
                              ? "bg-[#A7F3D0] text-[#0B3D2E] font-semibold"
                              : "bg-[#FFF8D6] text-[#0B3D2E]/80 hover:bg-[#FFD93B]"
                          }`}
                        >
                          <div className="font-pixel text-[8px] opacity-75">WAVE 0{idx + 1}</div>
                          <div className="font-bold truncate">{wave.badge}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Terminal Screen Output with Integrated Telemetry (min-h-[140px]) */}
                  <div className="bg-[#041812] border-2 border-[#0B3D2E] p-3 text-xs leading-relaxed overflow-x-auto min-h-[140px] font-mono flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] border-b border-[#0B3D2E] pb-1 text-[#FFD93B]">
                        <span>$ {currentDagWave.command}</span>
                        <span className="text-[#FF5C8A] text-[10px]">
                          SHA: {activeHabaneroData.contractHash.slice(0, 10)}...
                        </span>
                      </div>
                      <div className="text-[#A7F3D0] text-[11px]">
                        • {currentDagWave.log}
                      </div>
                      <div className="text-[#FFFDF0]/80 text-[11px]">
                        • {currentDagWave.status}
                      </div>
                    </div>

                    {/* Integrated Compact Telemetry Line */}
                    <div className="pt-2 border-t border-[#0B3D2E]/80 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FFD93B] font-bold">RAM GOVERNOR:</span>
                        <span className="text-[#A7F3D0]">{activeHabaneroData.ramUsage} GB / 16 GB (Clamp &le; 7.5G)</span>
                        <span className="text-[#34D399]">0 SWAP</span>
                      </div>
                      <div className="text-[#34D399] font-bold">
                        ✓ AIRGAP: 0 BYTES SENT (100% LOCAL)
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3.5">
                  <Link
                    href="/projects/habanero"
                    style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A] hover:scale-105 w-full sm:w-auto"
                  >
                    READ CASE STUDY →
                  </Link>
                </div>
              </div>

              {/* Graphic Display */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-[#041812] border-4 border-[#FF5C8A] p-6 sm:p-8 shadow-[8px_8px_0_#FF5C8A]">
                  <PixelHabanero width={170} height={145} rotate={-3} />
                </div>
                <div className="mt-3 font-pixel text-[10px] text-[#0B3D2E] text-center bg-[#FFD93B] px-3 py-1 border-2 border-[#0B3D2E] font-bold">
                  100% AIRGAPPED · APPLE SILICON METAL
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
