"use client";

import React, { useState, useCallback, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%*+<>/=";

export function InteractiveName() {
  const [line1, setLine1] = useState("BIDYA BHUSHAN");
  const [line2, setLine2] = useState("NANDA");
  const [isScrambling, setIsScrambling] = useState(false);
  const animRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const target1 = "BIDYA BHUSHAN";
    const target2 = "NANDA";
    let iteration = 0;
    const maxIterations = 14;

    if (animRef.current) clearInterval(animRef.current);

    animRef.current = setInterval(() => {
      iteration++;

      setLine1(
        target1
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < (iteration / maxIterations) * target1.length) {
              return target1[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      setLine2(
        target2
          .split("")
          .map((char, index) => {
            if (index < (iteration / maxIterations) * target2.length) {
              return target2[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        if (animRef.current) clearInterval(animRef.current);
        setLine1(target1);
        setLine2(target2);
        setIsScrambling(false);
      }
    }, 35);
  }, [isScrambling]);

  // First 5 chars correspond to BIDYA
  const bidyaPart = line1.slice(0, 5);
  const bhushanPart = line1.slice(5);

  return (
    <div
      onMouseEnter={scramble}
      onClick={scramble}
      className="cursor-target group inline-block select-none py-1"
      title="Hover or click to decrypt"
    >
      {/* Line 1: BIDYA BHUSHAN (Always on a single line in all views) */}
      <div className="whitespace-nowrap font-pixel text-[clamp(16px,4.5vw,42px)] leading-[1.3] tracking-tight uppercase text-[#0B3D2E] transition-colors">
        <span className="bg-[#0B3D2E] text-[#FFD93B] group-hover:bg-[#FF5C8A] group-hover:text-[#0B3D2E] px-2.5 py-1 mr-2 transition-colors inline-block">
          {bidyaPart}
        </span>
        <span className="group-hover:text-[#FF5C8A] transition-colors">
          {bhushanPart}
        </span>
      </div>

      {/* Line 2: NANDA (Always on second line) */}
      <div className="whitespace-nowrap font-pixel text-[clamp(16px,4.5vw,42px)] leading-[1.3] tracking-tight uppercase text-[#0B3D2E] group-hover:text-[#FF5C8A] transition-colors mt-2 sm:mt-3">
        <span>{line2}</span>
        <span
          className="bl text-[#FF5C8A] ml-2 inline-block animate-pulse font-mono font-bold"
          aria-hidden="true"
        >
          _
        </span>
      </div>
    </div>
  );
}

