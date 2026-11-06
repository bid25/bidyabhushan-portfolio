"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { X, ExternalLink, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { LensStack, LensPhoto } from "@/data/lensPhotos";

interface PhotoStackModalProps {
  stack: LensStack | null;
  onClose: () => void;
}

export function PhotoStackModal({ stack, onClose }: PhotoStackModalProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // Reset active photo when stack changes
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [stack]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && stack) {
        setActivePhotoIdx((prev) => (prev + 1) % stack.photos.length);
      }
      if (e.key === "ArrowLeft" && stack) {
        setActivePhotoIdx((prev) => (prev - 1 + stack.photos.length) % stack.photos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, stack]);

  if (!stack) return null;

  const currentPhoto: LensPhoto = stack.photos[activePhotoIdx];

  // Mobile swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    const threshold = 40; // min swipe distance in px
    if (diff > threshold) {
      // swipe left -> next
      setActivePhotoIdx((prev) => (prev + 1) % stack.photos.length);
    } else if (diff < -threshold) {
      // swipe right -> prev
      setActivePhotoIdx((prev) => (prev - 1 + stack.photos.length) % stack.photos.length);
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={stack.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] bg-[#070B0C]/90 backdrop-blur-md flex flex-col justify-between p-2.5 sm:p-5 lg:p-8 select-none overflow-y-auto overflow-x-hidden"
    >
      {/* Top Bar */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4 border-3 sm:border-4 border-[#EDE6D8] bg-[#0F1517] p-2.5 sm:p-3 sm:px-5 shadow-[3px_3px_0_#C99A55] sm:shadow-[6px_6px_0_#C99A55] shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <span className="font-pixel text-[10px] sm:text-xs bg-[#C99A55] text-[#0F1517] px-1.5 sm:px-2 py-0.5 sm:py-1 shrink-0">
            STACK [{stack.id}]
          </span>
          <span
            className="font-mono font-bold text-xs sm:text-sm tracking-wide !text-[#EDE6D8] truncate"
            style={{ color: "#EDE6D8" }}
          >
            {stack.title} · ({activePhotoIdx + 1}/{stack.photos.length})
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 border-2 border-[#EDE6D8] bg-[#070B0C] hover:bg-[#FF5C8A] hover:text-[#0F1517] !text-[#EDE6D8] font-mono font-bold text-[10px] sm:text-xs tracking-wider transition-colors cursor-pointer shrink-0"
          style={{ color: "#EDE6D8" }}
          aria-label="Close modal"
        >
          <X size={15} />
          <span className="hidden sm:inline">CLOSE [ESC]</span>
        </button>
      </div>

      {/* Main Focus Photo Display */}
      <div className="w-full max-w-6xl mx-auto my-auto py-2.5 sm:py-4 flex flex-col lg:flex-row items-center gap-3 sm:gap-5 lg:gap-6">
        {/* Photo Canvas */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full lg:w-3/5 max-h-[50vh] sm:max-h-[60vh] lg:max-h-[65vh] flex items-center justify-center border-3 sm:border-4 border-[#0F1517] bg-[#070B0C] shadow-[4px_4px_0_#0F1517] sm:shadow-[8px_8px_0_#0F1517] lg:shadow-[10px_10px_0_#0F1517] p-1.5 sm:p-2 overflow-hidden group touch-pan-y"
        >
          <div className="relative w-full h-[32vh] sm:h-[44vh] lg:h-[56vh]">
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>

          {/* Quick Prev / Next Arrows */}
          {stack.photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIdx(
                    (prev) => (prev - 1 + stack.photos.length) % stack.photos.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-[#0F1517]/85 hover:bg-[#C99A55] text-[#EDE6D8] hover:text-[#0F1517] border-2 border-[#EDE6D8] shadow-[2px_2px_0_#0F1517] transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIdx((prev) => (prev + 1) % stack.photos.length)
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-[#0F1517]/85 hover:bg-[#C99A55] text-[#EDE6D8] hover:text-[#0F1517] border-2 border-[#EDE6D8] shadow-[2px_2px_0_#0F1517] transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Info & Redirection Sidebar */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between border-3 sm:border-4 border-[#0F1517] bg-[#EDE6D8] p-3.5 sm:p-5 lg:p-7 shadow-[4px_4px_0_#C99A55] sm:shadow-[8px_8px_0_#C99A55] lg:shadow-[10px_10px_0_#C99A55] text-[#0F1517]">
          <div>
            <div className="font-mono text-[10px] sm:text-xs font-bold text-[#C99A55] uppercase tracking-wider mb-1">
              {stack.tag}
            </div>
            <h2 className="font-pixel text-base sm:text-xl lg:text-2xl text-[#0F1517] uppercase tracking-tight mb-2 leading-tight">
              {currentPhoto.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#0F1517]/80 leading-relaxed mb-3">
              {currentPhoto.caption}
            </p>

            <div
              className="border-2 border-[#0F1517] bg-[#070B0C] !text-[#EDE6D8] p-2.5 sm:p-3 font-mono text-xs mb-3 sm:mb-5"
              style={{ color: "#EDE6D8" }}
            >
              <div
                className="text-[#C99A55] font-bold text-[9px] sm:text-[10px] tracking-widest uppercase mb-1 flex items-center gap-1.5"
                style={{ color: "#C99A55" }}
              >
                <Camera size={12} />
                <span>EXIF TELEMETRY</span>
              </div>
              <div className="tracking-wider text-[11px] sm:text-xs truncate" style={{ color: "#EDE6D8" }}>
                {currentPhoto.gear}
              </div>
            </div>
          </div>

          {/* Instagram Post Redirection */}
          <div>
            <a
              href={currentPhoto.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[42px] sm:min-h-[48px] px-3 sm:px-4 py-2 sm:py-2.5 bg-[#FF5C8A] hover:bg-[#0F1517] text-[#0F1517] hover:!text-[#EDE6D8] font-mono font-bold text-[11px] sm:text-xs tracking-wider border-2 sm:border-3 border-[#0F1517] shadow-[3px_3px_0_#0F1517] sm:shadow-[5px_5px_0_#0F1517] flex items-center justify-center gap-2 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <span>VIEW POST ON @unfocused.nerd</span>
              <ExternalLink size={14} />
            </a>
            <div className="font-mono text-[9px] sm:text-[10px] text-center text-[#0F1517]/60 mt-1.5">
              Opens original uncompressed post on @unfocused.nerd
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto py-1 sm:py-2 px-1 max-w-full">
        {stack.photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActivePhotoIdx(i)}
            className={`relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-2 sm:border-3 overflow-hidden transition-all ${
              i === activePhotoIdx
                ? "border-[#FF5C8A] scale-105 shadow-[2px_2px_0_#FF5C8A] sm:shadow-[4px_4px_0_#FF5C8A]"
                : "border-[#EDE6D8] opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
