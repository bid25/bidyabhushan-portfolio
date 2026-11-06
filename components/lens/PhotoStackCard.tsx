"use client";

import React from "react";
import Image from "next/image";
import { Layers, ArrowUpRight } from "lucide-react";
import { LensStack } from "@/data/lensPhotos";

interface PhotoStackCardProps {
  stack: LensStack;
  onSelect: (stack: LensStack) => void;
}

export function PhotoStackCard({ stack, onSelect }: PhotoStackCardProps) {
  const leadPhoto = stack.photos[0];
  const photoCount = stack.photos.length;

  return (
    <div
      onClick={() => onSelect(stack)}
      className="group relative cursor-pointer pt-2.5 pl-2.5 sm:pt-3 sm:pl-3"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(stack);
        }
      }}
    >
      {/* Layer 2: Deepest Stack Layer */}
      <div className="absolute inset-0 bg-[#070B0C] border-3 sm:border-4 border-[#0F1517] translate-x-1.5 translate-y-1.5 sm:translate-x-2.5 sm:translate-y-2.5 group-hover:translate-x-2.5 group-hover:translate-y-2.5 sm:group-hover:translate-x-3.5 sm:group-hover:translate-y-3.5 transition-transform duration-200" />

      {/* Layer 1: Middle Brass Stack Layer */}
      <div className="absolute inset-0 bg-[#C99A55] border-3 sm:border-4 border-[#0F1517] translate-x-1 translate-y-1 sm:translate-x-1.5 sm:translate-y-1.5 group-hover:translate-x-1.5 group-hover:translate-y-1.5 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2 transition-transform duration-200" />

      {/* Front Main Card */}
      <div className="relative border-3 sm:border-5 border-[#0F1517] bg-[#EDE6D8] p-3.5 sm:p-5 shadow-[4px_4px_0_#0F1517] sm:shadow-[6px_6px_0_#0F1517] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">
        {/* Card Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <span className="font-mono font-bold text-[9px] sm:text-xs text-[#0F1517] bg-[#C99A55] px-1.5 sm:px-2 py-0.5 border-2 border-[#0F1517] uppercase tracking-wider">
            STACK [{stack.id}]
          </span>

          <span
            className="font-mono font-bold text-[9px] sm:text-xs !text-[#EDE6D8] bg-[#0F1517] px-1.5 sm:px-2 py-0.5 border-2 border-[#0F1517] flex items-center gap-1"
            style={{ color: "#EDE6D8" }}
          >
            <Layers size={11} className="sm:w-3 sm:h-3" />
            <span style={{ color: "#EDE6D8" }}>{photoCount} FRAMES</span>
          </span>
        </div>

        {/* Lead Photo Display */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] border-2 sm:border-3 border-[#0F1517] overflow-hidden bg-[#070B0C]">
          <Image
            src={leadPhoto.src}
            alt={leadPhoto.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Subtle Aperture Watermark */}
          <div
            className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 px-1 sm:px-1.5 py-0.5 bg-[#0F1517]/80 !text-[#EDE6D8] font-mono text-[8px] sm:text-[9px] border border-[#EDE6D8]/40"
            style={{ color: "#EDE6D8" }}
          >
            {leadPhoto.gear.split("·")[0]}
          </div>
        </div>

        {/* Card Meta Content */}
        <div className="mt-3 sm:mt-4">
          <div className="font-mono text-[9px] sm:text-xs font-bold text-[#C99A55] uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
            {stack.tag}
          </div>
          <h3 className="font-pixel text-xs sm:text-sm text-[#0F1517] uppercase tracking-wide group-hover:text-[#FF5C8A] transition-colors line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] leading-snug">
            {stack.title}
          </h3>
          <p className="font-mono text-xs text-[#0F1517]/70 mt-1 line-clamp-2 leading-relaxed min-h-[2rem] sm:min-h-[2.2rem]">
            {stack.subtitle}
          </p>
        </div>

        {/* Expand Stack Action Footer */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t-2 border-[#0F1517]/20 flex items-center justify-between text-xs font-mono font-bold text-[#0F1517]">
          <span className="tracking-wider text-[11px] sm:text-xs">EXPAND STACK</span>
          <span className="p-1 bg-[#0F1517] text-[#EDE6D8] group-hover:bg-[#FF5C8A] group-hover:text-[#0F1517] transition-colors">
            <ArrowUpRight size={13} className="sm:w-3.5 sm:h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
