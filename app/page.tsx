import Link from "next/link";
import { LazyProfileCard } from "@/components/LazyComponents";
import { InteractiveName } from "@/components/InteractiveName";
import { StackMarquee } from "@/components/StackMarquee";
import { FeaturedProjectsInteractive } from "@/components/FeaturedProjectsInteractive";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { LensTeaser } from "@/components/LensTeaser";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* ── HERO CONTAINER ──────────────────────────────── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border">
        <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center pt-28 sm:pt-32 lg:pt-36 pb-14">
          {/* Decorative Zigzag */}
          <svg
            aria-hidden="true"
            width="120"
            height="40"
            viewBox="0 0 120 40"
            className="absolute left-[35%] top-5 sm:top-6 pointer-events-none hidden sm:block"
          >
            <path
              d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
              fill="none"
              stroke="#FF5C8A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Left Column: Hero Copy (order-2 on mobile so Profile Card sits on top) */}
          <div className="flex flex-col items-start z-10 order-2 lg:order-1">
            <div className="font-hand text-3xl sm:text-4xl text-[#0B3D2E] -rotate-3 inline-block border-b-3 border-dashed border-[#0B3D2E] mb-5">
              hello, world - it's me!
            </div>

            <h1 className="m-0">
              <InteractiveName />
            </h1>

            <p className="mt-6 mb-8 text-base sm:text-lg max-w-[560px] border-l-8 border-[#0B3D2E] pl-4 font-mono text-[#0B3D2E] font-medium leading-relaxed">
              Full-Stack &amp; AI/ML Engineer. React Native, Node, and the
              infrastructure behind them. B.Tech Electronics, MAIT, class of
              2029. Currently building HOSHCARE, a mobile app for medical
              records.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 w-full">
              <Link
                href="/projects"
                style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
                className="btn inline-flex items-center justify-center min-h-[48px] px-6 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A]"
              >
                VIEW PROJECTS →
              </Link>
              <Link
                href="/contact"
                style={{ backgroundColor: "#FFF6C2", color: "#0B3D2E" }}
                className="btn inline-flex items-center justify-center min-h-[48px] px-6 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[6px_6px_0_#0B3D2E]"
              >
                GET IN TOUCH
              </Link>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "transparent", color: "#0B3D2E" }}
                className="btn inline-flex items-center justify-center min-h-[48px] px-5 py-3 font-bold font-mono border-4 border-[#FF5C8A] shadow-[6px_6px_0_#0B3D2E]"
              >
                RESUME.PDF
              </a>
            </div>
          </div>

          {/* Right Column: Hero Window with Profile Card (order-1 on mobile to sit on top) */}
          <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto mt-4 lg:mt-0 order-1 lg:order-2">
            {/* Sticker */}
            <div className="absolute right-2 sm:right-4 -top-12 sm:-top-13 font-hand text-2xl sm:text-3xl rotate-2 bg-[#FF5C8A] text-[#0B3D2E] border-3 border-[#0B3D2E] px-4 py-1 z-20 shadow-[4px_4px_0_#0B3D2E] pointer-events-none">
              open to opportunities!
            </div>

            {/* Window Container */}
            <div className="border-4 border-[#0B3D2E] bg-[#0B3D2E] shadow-[12px_12px_0_#0B3D2E] relative z-10 overflow-hidden mt-6">
              {/* Header Bar */}
              <div className="flex justify-between items-center bg-[#0B3D2E] text-[#FFD93B] px-3.5 py-2 font-pixel text-[10px] border-b-4 border-[#0B3D2E]">
                <span>PLAYER_01.EXE</span>
                <span>[ _ ][ X ]</span>
              </div>

              {/* Window Body with Profile Card - Edge to Edge */}
              <div className="w-full aspect-square relative overflow-hidden bg-[#07241A]">
                <LazyProfileCard
                  name="Bidya Bhushan Nanda"
                  showDetails={false}
                  handle="bidyabhushannanda"
                  status="Available for work"
                  contactText="Contact Me"
                  avatarUrl="/avatar.webp"
                  iconUrl="/code-pattern.svg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  behindGlowEnabled={false}
                  innerGradient="linear-gradient(145deg, rgba(11, 61, 46, 0.35) 0%, rgba(7, 36, 26, 0.95) 100%)"
                />
              </div>
            </div>

            {/* Floating Triangle */}
            <svg
              aria-hidden="true"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="absolute -left-7 -bottom-6 pointer-events-none z-20"
            >
              <polygon
                points="32,4 60,58 4,58"
                fill="#FFF6C2"
                stroke="#0B3D2E"
                strokeWidth="5"
              />
            </svg>
          </div>
        </section>
      </div>

      {/* ── STACK STRIP ─────────────────────────────────── */}
      <StackMarquee />

      {/* ── FEATURED PROJECTS (INTERACTIVE CONSOLE) ────────── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border">
        <FeaturedProjectsInteractive />

        {/* ── TRAJECTORY SECTION ──────────────────────────── */}
        <section className="pt-8 sm:pt-10 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
            <h2 className="m-0 font-pixel text-lg sm:text-2xl bg-[#0B3D2E] text-[#FFD93B] px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-[4px_4px_0_#FF5C8A] sm:shadow-[6px_6px_0_#FF5C8A]">
              TRAJECTORY
            </h2>
            <span className="font-pixel text-[9px] sm:text-[10px] border-2 sm:border-3 border-[#0B3D2E] bg-[#FFF6C2] px-2 sm:px-2.5 py-1.5 sm:py-2 text-[#0B3D2E]">
              SIGNAL PATH
            </span>
            <span className="font-hand text-xl sm:text-3xl -rotate-2 text-[#0B3D2E]">
              interactive sketch box · drag &amp; zoom to explore →
            </span>
          </div>

          <div className="relative">
            {/* Corner Decorative Zigzag */}
            <svg
              aria-hidden="true"
              width="90"
              height="34"
              viewBox="0 0 120 40"
              className="absolute right-6 -top-6 pointer-events-none z-10"
            >
              <path
                d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="6"
              />
            </svg>

            {/* Trajectory Interactive Sketch Box */}
            <TrajectoryTimeline />
          </div>
        </section>

        {/* ── LENS SECTION (CODE TO CAMERA) ──────────────── */}
        <LensTeaser />
      </div>
    </div>
  );
}
