"use client";

import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";

interface PaperHeroProps {
  kicker: string;
  title: string;
  subtitle: string;
  meta: string[];
  pdf?: string;
  docRef?: string;
}

export function PaperHero({
  kicker,
  title,
  subtitle,
  meta,
  pdf,
  docRef = "DOC. REF: WP-2026-07 // NBER RECOMPOSITION",
}: PaperHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      {/* Document Series Kicker */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 border-2 border-[#0B3D2E]">
          <span>▍</span>
          <span>{kicker}</span>
        </div>

        <div className="font-pixel text-[10px] text-[#0B3D2E]/70">
          {docRef}
        </div>
      </div>

      {/* Main Title with Variable Proximity */}
      <h1 className="font-mono text-[clamp(1.75rem,4.5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-[#0B3D2E]">
        <VariableProximity
          label={title}
          fromFontVariationSettings="'wght' 800"
          toFontVariationSettings="'wght' 400"
          containerRef={containerRef}
          radius={130}
          falloff="gaussian"
        />
      </h1>

      {/* Wavy Underline SVG */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 12"
        className="w-full max-w-[480px] my-4 block"
      >
        <path
          className="dw"
          pathLength="1"
          d="M2 6 C40 0 80 12 120 6 C160 0 200 12 240 6 C280 0 320 12 360 6 C400 0 440 12 480 6 C520 0 560 12 598 6"
          fill="none"
          stroke="#FF5C8A"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Subtitle */}
      <p className="mt-3 max-w-[54ch] font-mono text-[clamp(0.95rem,2vw,1.3rem)] leading-[1.5] text-[#0B3D2E]/90 font-medium">
        <VariableProximity
          label={subtitle}
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 700"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </p>

      {/* Author & Document Metadata */}
      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs text-[#0B3D2E]/80">
        <div className="border-2 border-[#0B3D2E] bg-[#FFF8D6] px-3 py-1 font-bold">
          AUTHOR: BIDYA BHUSHAN NANDA
        </div>
        {meta.map((m, i) => (
          <span
            key={m}
            className="border-2 border-[#0B3D2E]/40 bg-[#FFFDF0] px-2.5 py-1"
          >
            {m}
          </span>
        ))}
      </div>

      {/* Download PDF button with neo-brutalist styling */}
      {pdf && (
        <div className="mt-7">
          <a
            href={pdf}
            download
            className="btn inline-flex items-center gap-2.5 bg-[#FF5C8A] text-[#0B3D2E] font-pixel text-xs px-4 py-3 border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] font-bold"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DOWNLOAD FULL PREPRINT PDF (24 PAGES)
          </a>
        </div>
      )}
    </div>
  );
}

export default PaperHero;
