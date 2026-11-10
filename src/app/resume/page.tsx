import type { Metadata } from "next";
import Link from "next/link";
import { ResumeViewer } from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Engineering Resumes & Curriculum Vitae",
  description:
    "Three specialized engineering resume tracks: BSP & Embedded Systems, Full-Stack & AI Integration, and Comprehensive Master CV by Bidya Bhushan Nanda.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Engineering Resumes | Bidya Bhushan Nanda",
    description:
      "Three targeted engineering resume specializations: BSP & Embedded Systems, Full-Stack & AI Integration, and Comprehensive Master CV.",
    url: "https://www.bidyabhushan.in/resume",
    type: "profile",
  },
};

export default function ResumePage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20">
      {/* Top Back Navigation */}
      <div className="pt-8 mb-4">
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 font-pixel text-xs px-4 py-2 bg-[#FFF6C2] text-[#0B3D2E] border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E]"
        >
          ← HOME
        </Link>
      </div>

      {/* Header */}
      <div className="relative pt-6 pb-8">
        {/* Decorative Zigzag */}
        <svg
          aria-hidden="true"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="absolute right-[8%] top-6 pointer-events-none hidden sm:block"
        >
          <path
            d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
            fill="none"
            stroke="#FF5C8A"
            strokeWidth="6"
          />
        </svg>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-0.5 border border-[#0B3D2E]">
            ARCHIVAL DOSSIER // CURRICULUM VITAE
          </span>
        </div>

        <h1 className="gl m-0 font-pixel text-xl sm:text-2xl md:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          ENGINEERING RESUMES
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[680px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          Three focused specializations. Select your recruitment track or inspect the comprehensive silicon-to-software dossier.
        </p>
      </div>

      {/* Main Resume Viewer & Selector */}
      <ResumeViewer />
    </div>
  );
}
