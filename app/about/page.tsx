import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ABOUT - Bidya Bhushan Nanda",
  description:
    "Electronics roots, software habits. Full-stack & AI/ML engineer, class of 2029 at MAIT Delhi.",
};

const skillsRow1 = [
  "React Native",
  "TypeScript",
  "Node.js",
  "NestJS",
  "ARM64 Linux Kernel",
  "Bare-Metal Bringup",
  "Prisma",
  "Redis",
  "IoT",
];

const skillsRow2 = [
  "PostgreSQL",
  "SQLite FTS5",
  "Gemini API",
  "Supabase RLS",
  "Expo / EAS",
  "Three.js",
  "Embedded C++",
  "Python",
  "Docker",
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20">
      {/* Header */}
      <div className="relative pt-16 pb-6">
        {/* Dot pattern SVG */}
        <svg
          aria-hidden="true"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="absolute right-[6%] top-10 pointer-events-none hidden sm:block"
        >
          <g fill="#0B3D2E">
            <circle cx="10" cy="10" r="6" />
            <circle cx="40" cy="10" r="6" />
            <circle cx="70" cy="10" r="6" />
            <circle cx="10" cy="40" r="6" />
            <circle cx="40" cy="40" r="6" />
            <circle cx="70" cy="40" r="6" />
          </g>
        </svg>

        {/* Triangle SVG */}
        <svg
          aria-hidden="true"
          width="56"
          height="56"
          viewBox="0 0 64 64"
          className="absolute right-[16%] top-24 pointer-events-none hidden sm:block"
        >
          <polygon
            points="32,4 60,58 4,58"
            fill="#FFF6C2"
            stroke="#0B3D2E"
            strokeWidth="5"
          />
        </svg>

        <h1 className="gl m-0 font-pixel text-2xl sm:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          ABOUT
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[620px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          Electronics roots, software habits. I like the whole path from sensor
          to screen.
        </p>
      </div>

      {/* Main Grid: Portrait on Left, Story on Right */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.35fr] gap-8 md:gap-10 pt-10 items-start">
        {/* Left Column: Portrait Card & Annotation */}
        <div className="flex flex-col gap-3.5 sm:gap-4">
          <div className="pop border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-3.5 sm:p-5 relative">
            <div className="border-3 sm:border-4 border-dashed border-[#0B3D2E] h-[280px] sm:h-[360px] relative overflow-hidden flex items-center justify-center bg-[#FFF0B3]">
              <Image
                src="/images/about-wallpaper.png"
                alt="Bidya Bhushan Nanda"
                fill
                className="object-cover object-center transition-all duration-300"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
              />
            </div>
            <div className="absolute -right-2 -top-6 bg-[#FF5C8A] border-3 border-[#0B3D2E] px-3.5 py-0.5 font-hand text-2xl rotate-6 text-[#0B3D2E] shadow-[2px_2px_0_#0B3D2E]">
              that’s me!
            </div>
          </div>

          {/* Handwritten Annotation with Curving Arrow - under portrait card */}
          <div className="flex items-center gap-2.5 sm:gap-3 pt-1 pl-1 sm:pl-2">
            <svg
              aria-hidden="true"
              width="90"
              height="50"
              viewBox="0 0 110 60"
              style={{ transform: "scaleY(-1)" }}
              className="shrink-0 sm:w-[100px] sm:h-[55px]"
            >
              <path
                d="M4 8 C30 58, 70 58, 100 22 M100 22 L84 24 M100 22 L96 38"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeDasharray="7 5"
              />
            </svg>
            <span className="font-hand text-xl sm:text-2xl lg:text-3xl -rotate-2 text-[#0B3D2E] leading-tight">
              hardware to cloud, it’s all signals
            </span>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="flex flex-col gap-5 font-mono text-[#0B3D2E]">
          {/* Animated Ticker Bar */}
          <div className="font-pixel text-xs sm:text-sm bg-[#0B3D2E] text-[#FFD93B] px-3.5 sm:px-4 py-2.5 sm:py-3 border-4 border-[#0B3D2E] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[6px_6px_0_#FF5C8A] flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center h-[1.7em] leading-none">I BUILD</span>
            <span className="inline-flex h-[1.7em] overflow-hidden text-[#FF5C8A] font-bold">
              <span className="rt">
                <span className="h-[1.7em] flex items-center leading-none">MOBILE APPS</span>
                <span className="h-[1.7em] flex items-center leading-none">AI PIPELINES</span>
                <span className="h-[1.7em] flex items-center leading-none">BACKENDS</span>
                <span className="h-[1.7em] flex items-center leading-none">SYSTEMS</span>
              </span>
            </span>
          </div>

          {/* 3 Narrative Paragraphs - Consistent Font, Size, Weight, and Leading */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <p className="m-0 font-mono text-base sm:text-lg font-medium leading-relaxed text-[#0B3D2E]">
              I am an electronics undergraduate at MAIT, Delhi (class of 2029) who
              fell in love with writing software. I am happiest working where
              physical reality meets code: tracing signals from a sensor, shorting
              test-points on bare silicon, or building offline-first apps that
              people actually rely on every day.
            </p>

            <p className="m-0 font-mono text-base sm:text-lg font-medium leading-relaxed text-[#0B3D2E]">
              Most of what I know came from breaking things at the boundaries:
              silent network drops, schema migrations, and hardware quirks. I care
              about diagnostic rigor, knowing what the system is doing under the
              hood, and building things that stay up.
            </p>

            <p className="m-0 font-mono text-base sm:text-lg font-medium leading-relaxed text-[#0B3D2E]">
              When I am not in a terminal or building software, I am usually behind
              a camera shooting live concert stages, street documentary, and 35mm
              film.
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Skills Section - 2 lines evenly spread on desktop, neatly wrapping on mobile */}
      <div className="w-full pt-3 sm:pt-4">
        <div className="font-pixel text-[11px] sm:text-xs text-[#0B3D2E] mb-2.5 flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#0B3D2E]" />
          <span>TECH STACK &amp; TOOLBOX</span>
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3.5 w-full">
          {/* Line 1 */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-2 sm:gap-3 w-full">
            {skillsRow1.map((skill) => (
              <span
                key={skill}
                className="ch border-3 border-[#0B3D2E] bg-[#FFF6C2] px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-bold text-[11px] sm:text-xs md:text-sm shadow-[2px_2px_0_#0B3D2E] sm:shadow-[3px_3px_0_#0B3D2E] whitespace-nowrap text-center flex-1 min-w-fit hover:bg-[#FFD93B] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-2 sm:gap-3 w-full">
            {skillsRow2.map((skill) => (
              <span
                key={skill}
                className="ch border-3 border-[#0B3D2E] bg-[#FFF6C2] px-2.5 sm:px-3.5 py-1.5 sm:py-2 font-bold text-[11px] sm:text-xs md:text-sm shadow-[2px_2px_0_#0B3D2E] sm:shadow-[3px_3px_0_#0B3D2E] whitespace-nowrap text-center flex-1 min-w-fit hover:bg-[#FFD93B] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Row: LET'S TALK Section */}
      <div className="pt-6 sm:pt-8 flex items-center justify-start">
        <Link
          href="/contact"
          style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
          className="btn w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 font-bold font-mono text-base border-4 border-[#0B3D2E] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[6px_6px_0_#FF5C8A] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform text-center"
        >
          LET'S TALK →
        </Link>
      </div>
    </div>
  );
}
