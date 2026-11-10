"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface ResumeTrack {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  pages: string;
  pdfUrl: string;
  filename: string;
  accent: string;
}

const RESUME_TRACKS: ResumeTrack[] = [
  {
    id: "bsp",
    badge: "TRACK 01 // SYSTEMS",
    title: "BSP & Embedded Systems",
    subtitle: "ARM64 Linux, Bootloaders, PX4/ArduPilot, Rust UAV",
    pages: "1 PAGE",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_BSP_Embedded_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_BSP_Embedded_Resume.pdf",
    accent: "#FF5C8A",
  },
  {
    id: "fullstack",
    badge: "TRACK 02 // PRODUCT",
    title: "Full-Stack & AI Integration",
    subtitle: "React Native, NestJS, HOSHCARE AI, Broccoli",
    pages: "1 PAGE",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_FullStack_AI_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_FullStack_AI_Resume.pdf",
    accent: "#FFD93B",
  },
  {
    id: "comprehensive",
    badge: "TRACK 03 // MASTER",
    title: "Comprehensive Master CV",
    subtitle: "Silicon to software, proof matrix, app screenshots",
    pages: "2 PAGES",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_Comprehensive_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_Comprehensive_Resume.pdf",
    accent: "#A7F3D0",
  },
];

export function ResumeHeroSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block w-full sm:w-auto">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select from 3 specialized resume tracks"
        style={{ backgroundColor: isOpen ? "#FFF6C2" : "transparent", color: "#0B3D2E" }}
        className="btn w-full inline-flex items-center justify-between sm:justify-center gap-2 min-h-[48px] px-3 sm:px-5 py-3 font-bold font-mono border-4 border-[#FF5C8A] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] text-center text-xs sm:text-base cursor-pointer hover:bg-[#FFF6C2] transition-colors"
      >
        <span>RESUME [3]</span>
        <span className="font-pixel text-[10px] transform transition-transform duration-150 inline-block">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          role="menu"
          aria-label="Resume Tracks"
          className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-[calc(100vw-32px)] sm:w-[380px] max-w-[390px] bg-[#FFFDF0] border-4 border-[#0B3D2E] shadow-[8px_8px_0_#0B3D2E] p-3 sm:p-4 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-[#0B3D2E]/40 pb-2 mb-3">
            <span className="font-pixel text-[9px] text-[#0B3D2E] font-bold">
              SELECT RECRUITMENT TRACK
            </span>
            <span className="font-mono text-[9px] bg-[#0B3D2E] text-[#FFD93B] px-1.5 py-0.5 font-bold">
              3 VERSIONS
            </span>
          </div>

          {/* Track Options */}
          <div className="space-y-2">
            {RESUME_TRACKS.map((track) => (
              <a
                key={track.id}
                href={track.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="group block p-2.5 border-2 border-[#0B3D2E] bg-[#FFF6C2] hover:bg-[#0B3D2E] text-[#0B3D2E] hover:text-[#FFFDF0] transition-all shadow-[3px_3px_0_#0B3D2E] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#0B3D2E]"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className="font-pixel text-[8px] px-1.5 py-0.5 border border-[#0B3D2E] font-bold text-[#0B3D2E]"
                    style={{ background: track.accent }}
                  >
                    {track.badge}
                  </span>
                  <span className="font-mono text-[9px] font-bold opacity-80 group-hover:text-[#FFD93B]">
                    {track.pages} ↗
                  </span>
                </div>
                <div className="font-pixel text-xs sm:text-sm font-bold leading-tight group-hover:text-[#FFD93B]">
                  {track.title}
                </div>
                <div className="font-mono text-[10px] leading-relaxed opacity-85 mt-1 group-hover:text-[#FFFDF0]/90">
                  {track.subtitle}
                </div>
              </a>
            ))}
          </div>

          {/* Footer: Link to full /resume hub */}
          <div className="mt-3 pt-2.5 border-t-2 border-dashed border-[#0B3D2E]/40 flex items-center justify-between">
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="w-full text-center font-pixel text-[9px] sm:text-[10px] text-[#0B3D2E] bg-[#FFD93B] hover:bg-[#FF5C8A] border-2 border-[#0B3D2E] py-2 px-3 font-bold transition-colors shadow-[2px_2px_0_#0B3D2E]"
            >
              OPEN RESUME DOSSIER HUB (/resume) →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
