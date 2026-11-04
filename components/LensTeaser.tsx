"use client";

import Link from "next/link";

export function LensTeaser() {
  return (
    <section className="pt-12 pb-16">
      {/* Section Header */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-5 mb-8">
        <h2 className="m-0 font-pixel text-xl sm:text-2xl bg-[#0B3D2E] text-[#FFD93B] px-4 py-3 shadow-[6px_6px_0_#FF5C8A]">
          LENS
        </h2>
        <span className="font-pixel text-[10px] border-3 border-[#0B3D2E] bg-[#FFF6C2] px-2.5 py-2 text-[#0B3D2E]">
          CODE TO CAMERA
        </span>
        <span className="font-hand text-2xl sm:text-3xl -rotate-2 text-[#0B3D2E]">
          stories in 24 frames per second →
        </span>
      </div>

      {/* Main Terminal & Portal Box */}
      <div className="card border-4 border-[#0B3D2E] bg-[#06231A] text-[#EDE6D8] shadow-[12px_12px_0_#0B3D2E] p-6 sm:p-9 relative overflow-hidden">
        {/* Window Top Bar */}
        <div className="flex justify-between items-center bg-[#FFD93B] text-[#06231A] font-pixel text-[10px] px-4 py-2 border-2 border-[#0B3D2E] mb-6">
          <span>BN.TERMINAL // TRANSITION · CODE_TO_CAMERA.EXE</span>
          <span>[ _ ][ X ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
          {/* Left Column: Terminal Output */}
          <div className="flex flex-col justify-between bg-[#041711] border-3 border-[#0B3D2E] p-5 sm:p-6 font-mono text-xs sm:text-sm shadow-[6px_6px_0_#0B3D2E]">
            <div className="space-y-3">
              <div className="text-[#FFD93B]/70 font-pixel text-[10px]">
                // INDEX.TS &middot; THE OTHER HALF
              </div>
              <div className="text-[#EDE6D8]/80 leading-relaxed font-mono">
                <span className="text-[#FF5C8A]">const</span> engineer = &#123;
                <br />
                &nbsp;&nbsp;role: <span className="text-[#FFD93B]">'full-stack'</span>,
                <br />
                &nbsp;&nbsp;tools: [<span className="text-[#FFD93B]">'rn'</span>, <span className="text-[#FFD93B]">'node'</span>, <span className="text-[#FFD93B]">'postgres'</span>],
                <br />
                &nbsp;&nbsp;nightShift: <span className="text-[#FF5C8A]">'director & cinematographer'</span>,
                <br />
                &#125;;
              </div>

              <div className="border-t border-[#0B3D2E]/60 pt-3 text-xs leading-relaxed text-[#EDE6D8]/70">
                <span className="text-[#00F0FF]">$</span> npm run build
                <br />
                <span className="text-[#FFD93B]">✓ 0 errors &middot; 0 warnings</span>
                <br />
                <span className="text-[#FF5C8A]/90">// still, something unrendered.</span>
                <br />
                <span className="text-[#00F0FF]">&gt;</span> lens.open()
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 font-pixel text-[10px] text-[#FFD93B]">
              <span className="inline-block w-2.5 h-2.5 bg-[#FF5C8A] animate-pulse"></span>
              <span>STANDBY: APERTURE OPEN</span>
            </div>
          </div>

          {/* Right Column: Neo-Brutalist Lens Card */}
          <div className="flex flex-col justify-between bg-[#EDE6D8] text-[#0F1517] border-4 border-[#0B3D2E] shadow-[8px_8px_0_#FF5C8A] p-6 sm:p-8 relative">
            {/* Top Bar with REC status */}
            <div className="flex items-center justify-between border-b-3 border-[#0F1517] pb-3 mb-4">
              <div className="flex items-center gap-2 font-mono font-bold text-xs">
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                </span>
                <span className="text-red-700 font-pixel text-[10px] tracking-wider">REC</span>
              </div>
              <span className="font-pixel text-[9px] bg-[#1F4A4F] text-[#EDE6D8] px-2 py-1">
                24 FPS // 4K LOG
              </span>
            </div>

            {/* Title & Tagline */}
            <div>
              <div className="font-pixel text-4xl sm:text-5xl text-[#0F1517] leading-none mb-3">
                LENS
              </div>
              <div className="font-pixel text-xs sm:text-sm text-[#1F4A4F] tracking-wide mb-4">
                STORIES, IN FRAMES.
              </div>
              <p className="font-mono text-sm leading-relaxed text-[#0F1517] m-0 mb-6">
                Photographer and videographer by passion, with the editing skills
                to finish what I shoot. The other half of the engineer.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/lens"
                style={{ backgroundColor: "#C99A55", color: "#0F1517" }}
                className="btn w-full inline-flex items-center justify-center min-h-[50px] px-6 py-3 font-bold font-mono text-sm sm:text-base border-4 border-[#0F1517] shadow-[6px_6px_0_#0F1517] hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                ENTER THE LENS →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

