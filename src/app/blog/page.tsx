import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Papers, Monographs & Writing",
  description:
    "Working papers, bare-metal hardware monographs, and technical postmortems by Bidya Bhushan Nanda. Empirical data on engineering economics and systems bring-up.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Research Papers & Systems Monographs | Bidya Bhushan Nanda",
    description:
      "Empirical research monographs on ARM64 Linux second-stage bootloader bring-up and labour-market economics under AI capability benchmarks.",
    url: "https://www.bidyabhushan.in/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Blog Dossiers | Bidya Bhushan Nanda",
    description:
      "Systems monographs, second-stage bootloaders, and engineering economics papers.",
  },
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
    handwrittenNote: "flagship paper - read this first!",
    topics: ["AI", "LABOUR MARKETS", "SOFTWARE ENGINEERING"],
    status: "PREPRINT DRAFT",
    statusBg: "#FF5C8A",
    isComingSoon: false,
  },
  {
    slug: "sm-t295-linux-bringup",
    dossier: "DOSSIER 02 // SYSTEMS MONOGRAPH",
    date: "NOV 2026",
    title: "DUAL-BOOTING MAINLINE LINUX & ANDROID",
    subtitle:
      "A Second-Stage Bootloader Bring-Up of the Samsung Galaxy Tab A 8.0 (SM-T295)",
    description:
      "Dual-booting near-mainline Linux 7.1.3 and LineageOS 21 on a vendor-locked Qualcomm SDM429 tablet. S-Boot PMIC matching, 199 MiB idle memory, and bare-metal hardware bring-up.",
    readingTime: "16 MIN READ",
    handwrittenNote: "published preprint: read the bring-up paper!",
    topics: ["MOBILE LINUX", "QUALCOMM SDM429", "LK2ND", "DUAL BOOT"],
    status: "PUBLISHED PREPRINT",
    statusBg: "#FF5C8A",
    isComingSoon: false,
  },
  {
    slug: "hoshcare-bringup-notes",
    dossier: "DOSSIER 03 // FIELD LOG",
    date: "JUN 2026",
    title: "BUILDING OFFLINE-FIRST MEDICAL OCR",
    subtitle:
      "WinterCG FormData bugs, SQLite cache invalidation, and immutable health records",
    description:
      "Lessons learned building HOSHCARE: handling unstructured prescription documents, structured output extraction with Gemini, and row-level data isolation.",
    readingTime: "12 MIN READ",
    handwrittenNote: "remedying silent Expo bugs",
    topics: ["REACT NATIVE", "GEMINI API", "EXPO", "SQLITE CACHE"],
    status: "UPCOMING DRAFT",
    statusBg: "#FFD93B",
    isComingSoon: true,
  },
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20">
      {/* Header */}
      <div className="relative pt-16 pb-6">
        {/* Decorative Zigzag */}
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

        <h1 className="gl m-0 font-pixel text-xl sm:text-2xl md:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          RESEARCH &amp; BLOG DOSSIERS
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[640px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          Working papers, system postmortems, and technical field notes. Empirical data on engineering economics and software craft.
        </p>
      </div>

      {/* Grid of Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10 items-stretch">
        {posts.map((post, index) => {
          const cardInner = (
            <div className="flex flex-col justify-between h-full w-full">
              {/* Dossier Tab Header */}
              <div>
                <div className="mb-3 border-b-2 border-dashed border-[#0B3D2E]/40 pb-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-pixel text-[9px] text-[#0B3D2E]/80 font-bold">
                      {post.dossier.split(" // ")[0]} //
                    </span>
                    <span
                      className="font-pixel text-[9px] px-2 py-0.5 border-2 border-[#0B3D2E] font-bold shrink-0 whitespace-nowrap"
                      style={{ background: post.statusBg, color: "#0B3D2E" }}
                    >
                      {post.status}
                    </span>
                  </div>
                  <div className="font-pixel text-[9px] text-[#0B3D2E]/80 font-bold mt-1">
                    {post.dossier.split(" // ")[1]}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2 font-mono text-xs">
                  <span className="font-bold bg-[#0B3D2E] text-[#FFD93B] px-2 py-0.5">
                    {post.date}
                  </span>
                  <span className="text-[#0B3D2E]/70 font-bold">
                    {post.readingTime}
                  </span>
                </div>

                <h2 className="font-pixel text-sm sm:text-base leading-snug my-3 text-[#0B3D2E] min-h-[44px] sm:min-h-[48px] flex items-center">
                  {post.title}
                </h2>

                <p className="m-0 mb-4 font-mono text-xs sm:text-sm leading-relaxed text-[#0B3D2E]/90 min-h-[84px] sm:min-h-[92px]">
                  {post.description}
                </p>

                {/* Handwritten margin note */}
                <div className="mb-4 font-hand text-xl text-[#FF5C8A] -rotate-1 font-bold min-h-[30px] flex items-center">
                  ✎ {post.handwrittenNote}
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-4 min-h-[52px] sm:min-h-[56px] content-start">
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
              <div className="font-bold border-t-3 border-dashed border-[#0B3D2E] pt-3 text-sm flex items-center justify-between text-[#0B3D2E] mt-auto">
                <span className="font-pixel text-[10px]">
                  {post.isComingSoon ? "UPCOMING DRAFT" : "OPEN DOSSIER"}
                </span>
                {post.isComingSoon ? (
                  <span className="font-pixel text-[8px] px-1.5 py-0.5 bg-[#FFD93B] border border-[#0B3D2E] text-[#0B3D2E]">
                    QUEUED
                  </span>
                ) : (
                  <span className="font-pixel text-xs">→</span>
                )}
              </div>
            </div>
          );

          if (post.isComingSoon) {
            return (
              <div
                key={post.slug}
                className="card pop flex flex-col justify-between h-full border-3 sm:border-4 border-[#0B3D2E] bg-[#FFFDF0] shadow-[6px_6px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-6 relative"
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
              className="card pop flex flex-col justify-between h-full border-3 sm:border-4 border-[#0B3D2E] bg-[#FFFDF0] shadow-[6px_6px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-6 relative hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[14px_14px_0_#0B3D2E] transition-all"
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
