"use client";

import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";

interface PaperHeroProps {
  kicker: string;
  title: string;
  subtitle: string;
  meta: string[];
  pdf?: string;
}

/**
 * Paper title block. The h1 and the subtitle use VariableProximity, which needs
 * a container to measure pointer distance against — hence the ref and the
 * client boundary. Everything below the hero stays a server component.
 */
export function PaperHero({
  kicker,
  title,
  subtitle,
  meta,
  pdf,
}: PaperHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
        <span className="text-amber">▍</span> {kicker}
      </p>

      <h1 className="font-display text-[clamp(1.5rem,5vw,3.25rem)] font-extrabold leading-[1.1] tracking-[-0.06em] text-bone lg:whitespace-nowrap">
        <VariableProximity
          label={title}
          fromFontVariationSettings="'wght' 800"
          toFontVariationSettings="'wght' 300"
          containerRef={containerRef}
          radius={130}
          falloff="gaussian"
        />
      </h1>

      <p className="mt-3 sm:mt-4 max-w-full sm:max-w-[46ch] font-body text-[clamp(0.9375rem,2vw,1.375rem)] leading-[1.4] text-ash">
        <VariableProximity
          label={subtitle}
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 700"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </p>

      <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 font-mono text-[10px] sm:text-[11px] text-ash">
        {meta.map((m, i) => (
          <span key={m} className="flex items-center gap-5">
            {i > 0 && <span className="text-ash/40">/</span>}
            {m}
          </span>
        ))}
      </div>

      {pdf && (
        <a
          href={pdf}
          download
          className="cursor-target mt-5 sm:mt-6 inline-flex items-center gap-2.5 border border-amber px-4 sm:px-5 py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.09em] text-amber transition-colors hover:bg-amber hover:text-void focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
        >
          ↓ Download PDF
        </a>
      )}
    </div>
  );
}

export default PaperHero;
