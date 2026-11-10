"use client";

import { useState } from "react";

interface Track {
  id: string;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  pages: string;
  targetRole: string;
  pdfUrl: string;
  filename: string;
  accent: string;
  highlights: string[];
}

const TRACKS: Track[] = [
  {
    id: "bsp",
    number: "01",
    category: "SYSTEMS",
    title: "BSP & Embedded Systems",
    subtitle: "ARM64 Linux, Bootloaders, UAV Systems",
    pages: "1 PAGE",
    targetRole: "Firmware, Embedded Linux, Robotics, UAV, Low-Level Systems",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_BSP_Embedded_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_BSP_Embedded_Resume.pdf",
    accent: "#FF5C8A",
    highlights: [
      "Bare-metal Linux 7.1.3 bringup on locked Samsung SDM429 tablet (Zucchini Linux).",
      "Reverse-engineered S-Boot chain with LK2ND bootloader; root-caused vbmeta bootloop.",
      "Kestrel: 50 Hz lock-free UAV ground station in Rust & Tokio for PX4 and ArduPilot.",
      "IoT QR scanner on Arduino, ESP32 (C++), and Raspberry Pi 3B (Python).",
    ],
  },
  {
    id: "fullstack",
    number: "02",
    category: "PRODUCT",
    title: "Full-Stack & AI Integration",
    subtitle: "React Native, Node.js, AI Integration",
    pages: "1 PAGE",
    targetRole: "Product Engineering, React Native Mobile, Backend APIs, Local AI Agents",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_FullStack_AI_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_FullStack_AI_Resume.pdf",
    accent: "#FFD93B",
    highlights: [
      "HOSHCARE: React Native app (~19 screens), NestJS backend, and Supabase RLS security.",
      "AI extraction pipeline turning handwritten prescriptions into structured JSON (500+ docs).",
      "Broccoli founder: offline-first Android nutrition tracker on Google Play with SQLite.",
      "Habanero: local compound AI engine on Apple Silicon Metal with 8-gate verification.",
    ],
  },
  {
    id: "comprehensive",
    number: "03",
    category: "MASTER",
    title: "Comprehensive Master CV",
    subtitle: "Mobile, Systems, AI Integration",
    pages: "2 PAGES",
    targetRole: "Founders, Engineering Leadership, Generalist Technical Deep-Dives",
    pdfUrl: "/resumes/Bidya_Bhushan_Nanda_Comprehensive_Resume.pdf",
    filename: "Bidya_Bhushan_Nanda_Comprehensive_Resume.pdf",
    accent: "#A7F3D0",
    highlights: [
      "Complete 'Proof at a Glance' matrix from bare silicon up to shipped user software.",
      "Full professional apprenticeships, technical skill taxonomy, and academic credentials.",
      "Detailed project breakdowns with embedded production screenshots of shipped software.",
      "Dual-page technical scope designed for deep technical evaluations.",
    ],
  },
];

export function ResumeViewer() {
  const [activeTrackId, setActiveTrackId] = useState<string>("bsp");
  const activeTrack = TRACKS.find((t) => t.id === activeTrackId) || TRACKS[0];

  return (
    <div className="space-y-10">
      {/* 3 Track Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TRACKS.map((track) => {
          const isSelected = track.id === activeTrackId;
          return (
            <div
              key={track.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveTrackId(track.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveTrackId(track.id);
                }
              }}
              className={`flex flex-col justify-between p-4 sm:p-5 border-3 sm:border-4 border-[#0B3D2E] transition-all cursor-pointer relative ${
                isSelected
                  ? "bg-[#0B3D2E] text-[#FFFDF0] shadow-[6px_6px_0_#FF5C8A] -translate-y-1"
                  : "bg-[#FFF6C2] text-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] hover:bg-[#FFFDF0]"
              }`}
            >
              {/* Header Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 border-b-2 border-dashed border-[#0B3D2E]/30 pb-2">
                  <span
                    className="font-pixel text-[9px] px-2 py-0.5 border-2 border-[#0B3D2E] font-bold text-[#0B3D2E]"
                    style={{ background: track.accent }}
                  >
                    TRACK {track.number} // {track.category}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 ${
                      isSelected
                        ? "bg-[#FFD93B] text-[#0B3D2E]"
                        : "bg-[#0B3D2E] text-[#FFD93B]"
                    }`}
                  >
                    {track.pages}
                  </span>
                </div>

                <h2
                  className={`font-pixel text-base sm:text-lg leading-snug my-2 ${
                    isSelected ? "text-[#FFD93B]" : "text-[#0B3D2E]"
                  }`}
                >
                  {track.title}
                </h2>

                <div
                  className={`font-mono text-xs font-semibold mb-3 ${
                    isSelected ? "text-[#A7F3D0]" : "text-[#0B3D2E]/80"
                  }`}
                >
                  {track.subtitle}
                </div>

                {/* Target Role Pill */}
                <div className="mb-4">
                  <div
                    className={`font-mono text-[11px] leading-relaxed p-2 border ${
                      isSelected
                        ? "bg-[#06231A] border-[#FF5C8A] text-[#FFFDF0]"
                        : "bg-[#FFFDF0] border-[#0B3D2E] text-[#0B3D2E]"
                    }`}
                  >
                    <strong className="text-[#FF5C8A]">BEST FOR:</strong> {track.targetRole}
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-1.5 mb-6 font-mono text-[11px] sm:text-xs leading-relaxed list-none p-0">
                  {track.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#FF5C8A] font-bold">▪</span>
                      <span className={isSelected ? "text-[#FFFDF0]/90" : "text-[#0B3D2E]/90"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t-2 border-dashed border-[#0B3D2E]/30 flex flex-wrap gap-2 mt-auto">
                <a
                  href={track.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 btn inline-flex items-center justify-center font-pixel text-[10px] px-3 py-2.5 border-2 border-[#0B3D2E] font-bold shadow-[2px_2px_0_#0B3D2E] ${
                    isSelected
                      ? "bg-[#FFD93B] text-[#0B3D2E] hover:bg-[#FF5C8A]"
                      : "bg-[#0B3D2E] text-[#FFD93B] hover:bg-[#FF5C8A] hover:text-[#0B3D2E]"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  PREVIEW ↗
                </a>
                <a
                  href={track.pdfUrl}
                  download={track.filename}
                  className={`flex-1 btn inline-flex items-center justify-center font-pixel text-[10px] px-3 py-2.5 border-2 border-[#0B3D2E] font-bold shadow-[2px_2px_0_#0B3D2E] ${
                    isSelected
                      ? "bg-[#FF5C8A] text-[#0B3D2E] hover:bg-[#FFD93B]"
                      : "bg-[#FFFDF0] text-[#0B3D2E] hover:bg-[#FFD93B]"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  DOWNLOAD ↓
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-Browser Document Preview Section */}
      <div className="card border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF8D6] shadow-[6px_6px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#0B3D2E] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1 font-bold">
              INSPECTION CONSOLE
            </span>
            <span className="font-pixel text-xs text-[#0B3D2E] font-bold">
              {activeTrack.title.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeTrack.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-3 py-1.5 border-2 border-[#0B3D2E] font-bold shadow-[2px_2px_0_#0B3D2E]"
            >
              OPEN FULL TAB ↗
            </a>
            <a
              href={activeTrack.pdfUrl}
              download={activeTrack.filename}
              className="btn font-pixel text-[10px] bg-[#FFD93B] text-[#0B3D2E] px-3 py-1.5 border-2 border-[#0B3D2E] font-bold shadow-[2px_2px_0_#0B3D2E]"
            >
              SAVE AS PDF ↓
            </a>
          </div>
        </div>

        {/* Embedded PDF iframe (with fallback on mobile / unsupported browsers) */}
        <div className="w-full bg-[#06231A] border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] overflow-hidden">
          <iframe
            src={`${activeTrack.pdfUrl}#toolbar=0&navpanes=0`}
            title={`Resume Preview: ${activeTrack.title}`}
            className="w-full h-[600px] sm:h-[820px] border-none block bg-white"
          />
        </div>

        {/* Bottom ATS Note */}
        <div className="mt-4 pt-3 border-t-2 border-dashed border-[#0B3D2E]/40 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#0B3D2E]">
          <div>
            <strong>ATS COMPLIANCE:</strong> Single-column standard structure, embedded Helvetica typefaces, 100% text-selectable.
          </div>
          <div className="font-pixel text-[9px] bg-[#A7F3D0] px-2 py-0.5 border border-[#0B3D2E] text-[#0B3D2E]">
            PARSER VERIFIED
          </div>
        </div>
      </div>
    </div>
  );
}
