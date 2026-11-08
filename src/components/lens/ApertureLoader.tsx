"use client";

import React, { useEffect, useState } from "react";

interface ApertureLoaderProps {
  durationMs?: number;
  onComplete: () => void;
}

const F_STOPS = ["f/1.4", "f/2.0", "f/2.8", "f/4.0", "f/5.6", "f/8.0", "f/11", "f/16", "f/1.4"];

export function ApertureLoader({ durationMs = 2400, onComplete }: ApertureLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [fStopIdx, setFStopIdx] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(pct);

      // Cycle f-stops according to progress
      const idx = Math.min(
        F_STOPS.length - 1,
        Math.floor((elapsed / durationMs) * F_STOPS.length)
      );
      setFStopIdx(idx);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        // Trigger shutter flash
        setIsFlashing(true);
        setTimeout(() => {
          onComplete();
        }, 220);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  // Aperture pupil radius: starts wide (42), contracts down to pinhole (14) at 70%, snaps open to 48 at 100%
  const pupilRadius =
    progress < 70
      ? 42 - (progress / 70) * 28 // 42 -> 14
      : 14 + ((progress - 70) / 30) * 34; // 14 -> 48

  // Blade rotation angle: smoothly rotates as iris stops down
  const bladeAngle = progress * 0.9;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070B0C] flex flex-col items-center justify-center p-6 text-[#EDE6D8] font-mono select-none overflow-hidden">
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(#EDE6D8 1px, transparent 1px), linear-gradient(90deg, #EDE6D8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Camera Shutter Flash */}
      {isFlashing && (
        <div className="absolute inset-0 bg-[#FFF6C2] z-50 pointer-events-none animate-ping duration-150" />
      )}

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-col items-center mb-6 sm:mb-8 text-center">
        <div className="flex items-center gap-2 border-2 border-[#C99A55] bg-[#0F1517] px-3.5 py-1.5 shadow-[4px_4px_0_#C99A55]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C8A] animate-pulse" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#C99A55] uppercase">
            Aperture Calibrating // 35mm Prime
          </span>
        </div>
        <div className="text-[11px] sm:text-xs text-[#EDE6D8]/60 tracking-widest uppercase mt-2.5">
          Initializing Optical Light Chamber · Copal Synchro 1/500s
        </div>
      </div>

      {/* Central Circular Lens Aperture Mechanism */}
      <div className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
        {/* Outer Heavy Brass & Graphite Lens Barrel */}
        <div className="absolute inset-0 rounded-full border-4 sm:border-5 border-[#C99A55] shadow-[0_0_0_8px_#0F1517,0_0_0_12px_#25353C,0_0_30px_rgba(201,154,85,0.25)]" />

        {/* F-Stop Engravings around perimeter */}
        <div className="absolute inset-2 sm:inset-3 rounded-full pointer-events-none">
          {["1.4", "2", "2.8", "4", "5.6", "8", "11", "16"].map((stop, i) => {
            const angle = i * 45 - 90;
            const rad = (angle * Math.PI) / 180;
            // Place along circle
            const r = 44; // percent
            const left = 50 + r * Math.cos(rad);
            const top = 50 + r * Math.sin(rad);
            const isCurrent = F_STOPS[fStopIdx].includes(stop);
            return (
              <span
                key={stop}
                style={{ left: `${left}%`, top: `${top}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] font-bold tracking-tighter transition-colors duration-150 ${
                  isCurrent ? "text-[#FF5C8A] scale-125" : "text-[#EDE6D8]/40"
                }`}
              >
                {stop}
              </span>
            );
          })}
        </div>

        {/* Inner Glass Optical Barrel */}
        <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full overflow-hidden bg-[#0A1012] border-3 sm:border-4 border-[#1F4A4F] shadow-inner flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <defs>
              {/* Optical Glint Gradient */}
              <radialGradient id="glassGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF6C2" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#C99A55" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0B1316" stopOpacity="1" />
              </radialGradient>
              <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E2B30" />
                <stop offset="100%" stopColor="#0D1619" />
              </linearGradient>
            </defs>

            {/* Glass Chamber Backing */}
            <circle cx="100" cy="100" r="96" fill="#0A1012" />
            <circle cx="100" cy="100" r="85" fill="none" stroke="#1F4A4F" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* 8 Interlocking Titanium Aperture Blades */}
            <g transform={`rotate(${bladeAngle}, 100, 100)`}>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <path
                  key={i}
                  d="M100 12 C145 12 182 48 188 95 L138 102 C128 72 112 55 100 45 Z"
                  fill="url(#bladeGrad)"
                  stroke="#070B0C"
                  strokeWidth="2.5"
                  transform={`rotate(${deg}, 100, 100)`}
                />
              ))}

              {/* Central Glowing Optical Aperture Pupil */}
              <circle cx="100" cy="100" r={pupilRadius} fill="url(#glassGlow)" />
              <circle
                cx="100"
                cy="100"
                r={Math.max(6, pupilRadius - 6)}
                fill="#FFFCEB"
              />

              {/* Optical Focus Crosshair */}
              <line
                x1={100 - pupilRadius * 0.4}
                y1="100"
                x2={100 + pupilRadius * 0.4}
                y2="100"
                stroke="#070B0C"
                strokeWidth="1.5"
              />
              <line
                x1="100"
                y1={100 - pupilRadius * 0.4}
                x2="100"
                y2={100 + pupilRadius * 0.4}
                stroke="#070B0C"
                strokeWidth="1.5"
              />
            </g>

            {/* Viewfinder Corner Reticles */}
            <path
              d="M75 75 H85 M75 75 V85 M125 75 H115 M125 75 V85 M75 125 H85 M75 125 V115 M125 125 H115 M125 125 V115"
              stroke="#EDE6D8"
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Stepped Progress Bar */}
      <div className="relative z-10 w-[280px] sm:w-[340px] mt-8">
        <div className="flex justify-between text-xs tracking-wider font-bold mb-1.5">
          <span className="text-[#C99A55]">CALIBRATING</span>
          <span>{progress}%</span>
        </div>
        <div className="h-4 border-3 border-[#EDE6D8] bg-[#0F1517] p-0.5 shadow-[4px_4px_0_#EDE6D8]">
          <div
            className="h-full bg-[#C99A55] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Telemetry Matrix Readouts */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-5 text-[11px] sm:text-xs tracking-widest uppercase">
        <div className="border border-[#25353C] bg-[#0F1517] px-3 py-1.5">
          APERTURE: <span className="text-[#FF5C8A] font-bold">{F_STOPS[fStopIdx]}</span>
        </div>
        <div className="border border-[#25353C] bg-[#0F1517] px-3 py-1.5">
          SYNCHRO: <span className="text-[#EDE6D8] font-bold">1/500S</span>
        </div>
        <div className="border border-[#25353C] bg-[#0F1517] px-3 py-1.5">
          FOCAL: <span className="text-[#C99A55] font-bold">35.0 MM</span>
        </div>
      </div>

      {/* Quick Skip button in bottom right corner */}
      <button
        type="button"
        onClick={onComplete}
        className="absolute bottom-6 right-6 text-xs text-[#EDE6D8]/50 hover:text-[#EDE6D8] underline tracking-widest uppercase"
      >
        [Skip Intro →]
      </button>
    </div>
  );
}
