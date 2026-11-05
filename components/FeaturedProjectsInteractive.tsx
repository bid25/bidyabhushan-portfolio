"use client";

import { useState } from "react";
import Link from "next/link";
import { PixelBroccoli } from "@/components/PixelBroccoli";
import { PixelZucchini } from "@/components/PixelZucchini";

type TabId = "broccoli" | "zucchini-linux" | "hoshcare-client";

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

  // Hoshcare Client Interactive State: Rx Extraction Simulator
  const [selectedRx, setSelectedRx] = useState<"amox" | "metformin" | "atorvastatin">("amox");
  const [extractionStatus, setExtractionStatus] = useState<"staging" | "locked">("staging");

  const rxPresets = {
    amox: {
      doc: "Dr. Vikram Sethi (Cardiology)",
      date: "14-Oct-2026",
      rx: "Amoxicillin 500mg TID · 7 days",
      confidence: "99.1%",
      diagnosis: "Post-op prophylactic course",
    },
    metformin: {
      doc: "Dr. Ananya Roy (Endocrinology)",
      date: "28-Sep-2026",
      rx: "Metformin 850mg BID · 90 days",
      confidence: "98.4%",
      diagnosis: "Type 2 Glycemic regulation",
    },
    atorvastatin: {
      doc: "Dr. K. S. Verma (Internal Med)",
      date: "03-Nov-2026",
      rx: "Atorvastatin 20mg QHS · 30 days",
      confidence: "97.8%",
      diagnosis: "Lipid panel optimization",
    },
  };

  const activeRxData = rxPresets[selectedRx];

  return (
    <section className="pt-20 pb-16 relative">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
        <div className="flex flex-wrap items-end gap-4">
          <h2 className="m-0 font-pixel text-xl sm:text-2xl bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] text-[#0B3D2E]">
            FEATURED PROJECTS
          </h2>
          <span className="font-hand text-2xl sm:text-3xl -rotate-2 text-[#0B3D2E]">
            ← click card to preview · click details to read case study
          </span>
        </div>
        <div className="font-pixel text-[11px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-2 border-2 border-[#0B3D2E]">
          MODE: INTERACTIVE_RUNNER
        </div>
      </div>

      {/* ── 3-CARD PROJECT SELECTOR (AT TOP) ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
          className={`group block border-4 border-[#0B3D2E] p-5 cursor-pointer transition-all relative ${
            activeTab === "broccoli"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[8px_8px_0_#FF5C8A] -translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[5px_5px_0_#0B3D2E] hover:bg-[#2F9E5E] hover:text-[#FFFDF0]"
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
          className={`group block border-4 border-[#0B3D2E] p-5 cursor-pointer transition-all relative ${
            activeTab === "zucchini-linux"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[8px_8px_0_#FF5C8A] -translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[5px_5px_0_#0B3D2E] hover:bg-[#FF5C8A] hover:text-[#0B3D2E]"
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

        {/* Card 3: Hoshcare Client */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setActiveTab("hoshcare-client")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveTab("hoshcare-client");
            }
          }}
          className={`group block border-4 border-[#0B3D2E] p-5 cursor-pointer transition-all relative ${
            activeTab === "hoshcare-client"
              ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[8px_8px_0_#FF5C8A] -translate-y-1"
              : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[5px_5px_0_#0B3D2E] hover:bg-[#FFD93B] hover:text-[#0B3D2E]"
          }`}
        >
          <span
            className={`absolute -top-3.5 right-4 font-pixel text-[9px] px-2 py-1 border border-[#0B3D2E] ${
              activeTab === "hoshcare-client"
                ? "bg-[#FFD93B] text-[#0B3D2E]"
                : "bg-[#0B3D2E] text-[#FFD93B]"
            }`}
          >
            03 · VAULT
          </span>
          <div
            className={`font-pixel text-[11px] inline-block px-2 py-0.5 mb-2 ${
              activeTab === "hoshcare-client"
                ? "bg-[#FF5C8A] text-[#0B3D2E] font-bold"
                : "bg-[#0B3D2E] text-[#FF5C8A] group-hover:bg-[#0B3D2E] group-hover:text-[#FF5C8A]"
            }`}
          >
            CLIENT (FRONTEND)
          </div>
          <h3
            className={`my-1 font-pixel text-lg ${
              activeTab === "hoshcare-client" ? "text-[#FFFDF0]" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]"
            }`}
          >
            3. HOSHCARE CLIENT
          </h3>
          <p
            className={`m-0 mb-4 font-mono text-xs leading-relaxed ${
              activeTab === "hoshcare-client" ? "text-[#FFFDF0]/90" : "text-[#0B3D2E] group-hover:text-[#0B3D2E]/90"
            }`}
          >
            Medical records vault app: Gemini vision extraction, staging buffer and zero silent writes.
          </p>
          <div
            className={`font-bold border-t-2 border-dashed pt-3 text-xs flex items-center justify-between ${
              activeTab === "hoshcare-client"
                ? "border-[#FFD93B]/50 text-[#FFD93B]"
                : "border-[#0B3D2E] text-[#0B3D2E] group-hover:border-[#0B3D2E]/50"
            }`}
          >
            <span className="font-pixel text-[10px]">
              {activeTab === "hoshcare-client" ? "● ACTIVE PREVIEW" : "ACTIVATE OCR"}
            </span>
            <Link
              href="/projects/hoshcare-client"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: activeTab === "hoshcare-client" ? "#FFD93B" : "#0B3D2E",
                color: activeTab === "hoshcare-client" ? "#0B3D2E" : "#FFD93B",
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
          <div className="card border-4 border-[#0B3D2E] bg-[#0B3D2E] text-[#FFD93B] shadow-[12px_12px_0_#FF5C8A] p-6 sm:p-9 relative">
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
                <h3 className="m-0 font-pixel text-3xl sm:text-4xl text-[#FFD93B] leading-tight">
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
                      <strong>Honest Range:</strong> {minTolerance} – {maxTolerance} kcal (±4% error tolerance)
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
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A]"
                  >
                    READ CASE STUDY →
                  </Link>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: "#FFF6C2", color: "#0B3D2E" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FFD93B]"
                  >
                    GET ON GOOGLE PLAY ↗
                  </a>
                </div>
              </div>

              {/* Graphic Display */}
              <div className="flex flex-col items-center justify-center">
                <PixelBroccoli width={180} height={180} />
              </div>
            </div>
          </div>
        )}

        {/* 2. ZUCCHINI-LINUX STAGE */}
        {activeTab === "zucchini-linux" && (
          <div className="card border-4 border-[#0B3D2E] bg-[#06231A] text-[#FFD93B] shadow-[12px_12px_0_#FFD93B] p-6 sm:p-9 relative overflow-hidden">
            {/* Window bar */}
            <div className="flex justify-between items-center bg-[#FFD93B] text-[#06231A] font-pixel text-[10px] px-4 py-2 border-2 border-[#0B3D2E] mb-6">
              <span>ZUCCHINI-LINUX // TTY1 CONSOLE · SM-T295 DUAL-BOOT</span>
              <span>[ _ ][ X ]</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center relative z-10 font-mono">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-2 py-1 font-bold">
                    ACTIVE // HARDWARE BRING-UP
                  </span>
                  <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1 border border-[#FFD93B]">
                    QUALCOMM SNAPDRAGON 429
                  </span>
                </div>

                <h3 className="m-0 font-pixel text-3xl sm:text-4xl text-[#FFD93B] leading-tight">
                  ZUCCHINI-LINUX<span className="bl text-[#FF5C8A]">_</span>
                </h3>
                <p className="mt-3 mb-5 text-sm sm:text-base text-[#FFD93B]/90 leading-relaxed">
                  Samsung Galaxy Tab A 8.0 (SM-T295) reverse engineered for bare-metal dual-booting of Arch Linux ARM and LineageOS 20 via Qualcomm EDL firehose exploitation.
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
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#FFD93B] shadow-[6px_6px_0_#FFD93B]"
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

        {/* 3. HOSHCARE CLIENT STAGE */}
        {activeTab === "hoshcare-client" && (
          <div className="card border-4 border-[#0B3D2E] bg-[#FFF8D6] text-[#0B3D2E] shadow-[12px_12px_0_#0B3D2E] p-6 sm:p-9 relative">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-[#0B3D2E]/20 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1">
                  PROJECT 03 OF 03
                </span>
                <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-2 py-1 font-bold">
                  ACTIVE // PRE-PILOT
                </span>
                <span className="font-mono text-xs text-[#0B3D2E]/80 ml-2">
                  // REACT NATIVE · EXPO 56 · GEMINI OCR
                </span>
              </div>
              <div className="font-pixel text-xs text-[#0B3D2E] hidden sm:block">
                INTERACTIVE OCR STAGING RUNNER ↓
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 items-center">
              <div>
                <h3 className="m-0 font-pixel text-3xl sm:text-4xl text-[#0B3D2E] leading-tight">
                  HOSHCARE CLIENT<span className="bl text-[#FF5C8A]">_</span>
                </h3>
                <p className="mt-3 mb-5 text-sm sm:text-base font-mono text-[#0B3D2E]/90 leading-relaxed">
                  Medical records vault for iOS &amp; Android. Document scanning turns physical prescriptions into structured fields with strict human-in-the-loop verification before permanent write locking.
                </p>

                {/* Interactive Rx Extraction Simulator */}
                <div className="bg-[#FFF0B3] border-3 border-[#0B3D2E] p-4 sm:p-5 shadow-[6px_6px_0_#0B3D2E] mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b-2 border-dashed border-[#0B3D2E]/30 pb-2">
                    <span className="font-pixel text-[11px] text-[#0B3D2E]">
                      [ SIMULATE PRESCRIPTION EXTRACTION ]
                    </span>
                    <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-[#FF5C8A] text-[#0B3D2E] font-bold">
                      GEMINI VISION 1.5
                    </span>
                  </div>

                  {/* Document Presets */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { key: "amox", label: "📄 Rx: Cardioprotective" },
                      { key: "metformin", label: "📄 Rx: Endocrine" },
                      { key: "atorvastatin", label: "📄 Rx: Lipid Panel" },
                    ].map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => {
                          setSelectedRx(item.key as any);
                          setExtractionStatus("staging");
                        }}
                        className={`font-mono text-xs px-2.5 py-1.5 border-2 border-[#0B3D2E] cursor-pointer transition-colors ${
                          selectedRx === item.key
                            ? "bg-[#0B3D2E] text-[#FFD93B] font-bold"
                            : "bg-[#FFF8D6] text-[#0B3D2E] hover:bg-[#FFD93B]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Extraction Review Card */}
                  <div className="bg-[#FFF8D6] border-2 border-[#0B3D2E] p-3 text-xs font-mono space-y-2 mb-4">
                    <div className="flex justify-between border-b border-[#0B3D2E]/20 pb-1">
                      <span className="text-[#0B3D2E]/70">PRESCRIBING PHYSICIAN:</span>
                      <strong className="text-[#0B3D2E]">{activeRxData.doc}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#0B3D2E]/20 pb-1">
                      <span className="text-[#0B3D2E]/70">DATE OF RECORD:</span>
                      <strong className="text-[#0B3D2E]">{activeRxData.date}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#0B3D2E]/20 pb-1">
                      <span className="text-[#0B3D2E]/70">DIAGNOSIS NOTE:</span>
                      <strong className="text-[#0B3D2E]">{activeRxData.diagnosis}</strong>
                    </div>
                    <div className="flex justify-between border-b border-[#0B3D2E]/20 pb-1">
                      <span className="text-[#0B3D2E]/70">EXTRACTED DOSAGE:</span>
                      <strong className="text-[#0B3D2E]">{activeRxData.rx}</strong>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[#0B3D2E]/70">CONFIDENCE SCORE:</span>
                      <span className="font-pixel text-[10px] bg-[#2F9E5E] text-white px-1.5 py-0.5">
                        {activeRxData.confidence} MATCH
                      </span>
                    </div>
                  </div>

                  {/* Verification action */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="font-mono text-[11px] text-[#0B3D2E]">
                      {extractionStatus === "staging" ? (
                        <span className="text-[#FF5C8A] font-bold">
                          ● STATUS: UNCOMMITTED STAGING BUFFER
                        </span>
                      ) : (
                        <span className="text-[#2F9E5E] font-bold">
                          ✓ STATUS: RECORD COMMITTED &amp; IMMUTABLE
                        </span>
                      )}
                    </div>
                    {extractionStatus === "staging" ? (
                      <button
                        type="button"
                        onClick={() => setExtractionStatus("locked")}
                        className="btn font-pixel text-[10px] px-3 py-1.5 bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] shadow-[3px_3px_0_#0B3D2E] font-bold"
                      >
                        CONFIRM &amp; LOCK RECORD 🔒
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setExtractionStatus("staging")}
                        className="font-pixel text-[10px] px-2 py-1 bg-white border border-[#0B3D2E] text-[#0B3D2E]"
                      >
                        RESET STAGING
                      </button>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3.5">
                  <Link
                    href="/projects/hoshcare-client"
                    style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
                    className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A]"
                  >
                    READ CASE STUDY →
                  </Link>
                </div>
              </div>

              {/* Graphic Display: Architectural Pill Breakdown */}
              <div className="flex flex-col gap-3 font-mono text-xs">
                <div className="border-3 border-[#0B3D2E] bg-[#FFF0B3] p-4 shadow-[6px_6px_0_#0B3D2E] space-y-3">
                  <div className="font-pixel text-[11px] text-[#0B3D2E] border-b-2 border-[#0B3D2E] pb-2">
                    KEY CLIENT GUARANTEES
                  </div>
                  <div>
                    <span className="font-bold text-[#0B3D2E]">1. Zero Client Secrets:</span>
                    <p className="m-0 text-[#0B3D2E]/80 text-[11px]">
                      Short-lived access tokens with automated refresh interceptors. No API credentials stored in client bundle.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B3D2E]">2. Offline SQLite Queue:</span>
                    <p className="m-0 text-[#0B3D2E]/80 text-[11px]">
                      Prescriptions taken with zero cellular coverage are buffered locally with checksum verification before sync.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#0B3D2E]">3. Review-Before-Save:</span>
                    <p className="m-0 text-[#0B3D2E]/80 text-[11px]">
                      Human-in-the-loop requirement eliminates hallucinated dosages from corrupting permanent EHR state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
