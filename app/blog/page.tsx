import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RESEARCH & BLOG DOSSIERS — Bidya Bhushan Nanda",
  description:
    "Working papers, field notes, and technical postmortems on AI, systems, and hardware.",
};

const posts = [
  {
    slug: "augmentation-not-obsolescence",
    dossier: "DOSSIER 01 // WORKING PAPER",
    date: "JUL 2026",
    title: "AUGMENTATION, NOT OBSOLESCENCE",
    subtitle:
      "AI, the Jevons Paradox, and the Bifurcation of the Engineering Labour Market",
    description:
      "AI will not make engineers obsolete, but it removes the rung of the ladder they used to climb. A rigorous synthesis of labour-market data, capability benchmarks, and production economics.",
    readingTime: "24 MIN READ",
    handwrittenNote: "flagship paper — read this first!",
    topics: ["AI", "LABOUR MARKETS", "SOFTWARE ENGINEERING"],
    status: "PREPRINT DRAFT",
    statusBg: "#FF5C8A",
  },
  {
    slug: "hoshcare-bringup-notes",
    dossier: "DOSSIER 02 // FIELD LOG",
    date: "JUN 2026",
    title: "BUILDING OFFLINE-FIRST MEDICAL OCR",
    subtitle:
      "WinterCG FormData bugs, SQLite cache invalidation, and immutable health records",
    description:
      "Lessons learned building HOSHCARE: handling unstructured prescription documents, structured output extraction with Gemini, and row-level data isolation.",
    readingTime: "12 MIN READ",
    handwrittenNote: "remedying silent Expo bugs",
    topics: ["REACT NATIVE", "GEMINI API", "EXPO"],
    status: "UPCOMING DRAFT",
    statusBg: "#FFD93B",
    isComingSoon: true,
  },
  {
    slug: "sm-t295-linux-bringup",
    dossier: "DOSSIER 03 // HARDWARE LOG",
    date: "MAY 2026",
    title: "REVERSING THE SM-T295 BOOTLOADER",
    subtitle:
      "From Qualcomm EDL recovery to dual-booting Arch Linux on a Galaxy Tab",
    description:
      "Deep dive into probing the bootloader, partition maps, kernel UART, and running Arch Linux on bare metal tablet silicon.",
    readingTime: "18 MIN READ",
    handwrittenNote: "bare-metal Qualcomm bring-up",
    topics: ["ARM64", "LINUX", "HARDWARE"],
    status: "IN LAB LOG",
    statusBg: "#FFF6C2",
    isComingSoon: true,
  },
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20">
      {/* Header */}
      <div className="relative pt-16 pb-6">
        <svg
          aria-hidden="true"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="absolute right-[8%] top-14 pointer-events-none hidden sm:block"
        >
          <path
            d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
            fill="none"
            stroke="#FF5C8A"
            strokeWidth="6"
          />
        </svg>

        <span className="font-hand text-2xl sm:text-3xl -rotate-2 text-[#0B3D2E] block mb-3">
          write it down, ship it later
        </span>

        <h1 className="gl m-0 font-pixel text-2xl sm:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          RESEARCH &amp; BLOG DOSSIERS
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[640px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          Working papers, system postmortems, and technical field notes. Empirical data on engineering economics and software craft.
        </p>
      </div>

      {/* Grid of Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
        {posts.map((post, index) => {
          const cardInner = (
            <div className="flex flex-col justify-between h-full">
              {/* Dossier Tab Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 border-b-2 border-dashed border-[#0B3D2E]/40 pb-2.5">
                  <span className="font-pixel text-[9px] text-[#0B3D2E]/80 font-bold">
                    {post.dossier}
                  </span>
                  <span
                    className="font-pixel text-[9px] px-2 py-0.5 border-2 border-[#0B3D2E] font-bold"
                    style={{ background: post.statusBg, color: "#0B3D2E" }}
                  >
                    {post.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="font-bold bg-[#0B3D2E] text-[#FFD93B] px-2 py-0.5">
                    {post.date}
                  </span>
                  <span className="text-[#0B3D2E]/70 font-bold">
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="font-pixel text-base leading-snug my-3 text-[#0B3D2E]">
                  {post.title}
                </h2>

                <p className="m-0 mb-4 font-mono text-xs sm:text-sm leading-relaxed text-[#0B3D2E]/90">
                  {post.description}
                </p>

                {/* Handwritten margin note */}
                <div className="mb-4 font-hand text-xl text-[#FF5C8A] -rotate-1 font-bold">
                  ✎ {post.handwrittenNote}
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.topics.map((t) => (
                    <span
                      key={t}
                      className="font-pixel text-[9px] bg-[#FFF8D6] text-[#0B3D2E] px-1.5 py-0.5 border border-[#0B3D2E]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action footer */}
              <div className="font-bold border-t-3 border-dashed border-[#0B3D2E] pt-3 text-sm flex items-center justify-between text-[#0B3D2E]">
                <span className="font-pixel text-[10px]">
                  {post.isComingSoon ? "UPCOMING DRAFT" : "OPEN DOSSIER"}
                </span>
                <span className="font-pixel text-xs">→</span>
              </div>
            </div>
          );

          if (post.isComingSoon) {
            return (
              <div
                key={post.slug}
                className="card pop border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2]/85 shadow-[5px_5px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] p-4 sm:p-6 relative flex flex-col justify-between"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {cardInner}
              </div>
            );
          }

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card pop block border-3 sm:border-4 border-[#0B3D2E] bg-[#FFFDF0] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-6 relative flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[14px_14px_0_#0B3D2E] transition-all"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {cardInner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
