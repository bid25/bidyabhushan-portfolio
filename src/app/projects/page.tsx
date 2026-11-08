import type { Metadata } from "next";
import Link from "next/link";
import { PixelBroccoli } from "@/components/PixelBroccoli";
import { PixelZucchini } from "@/components/PixelZucchini";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Systems and software built from bare silicon to production apps. Case studies and technical postmortems.",
  alternates: {
    canonical: "/projects",
  },
};

const projects = [
  {
    slug: "broccoli",
    title: "BROCCOLI",
    badge: "LIVE ON PLAY STORE",
    badgeClass: "bg-[#0B3D2E] text-[#FFD93B]",
    description:
      "Caloric & body composition tracker built with precision. Shipped to Google Play worldwide.",
    tags: ["REACT NATIVE", "REANIMATED", "SQLITE"],
    cta: "VIEW PRODUCT →",
    graphic: <PixelBroccoli width={90} height={90} />,
  },
  {
    slug: "zucchini-linux",
    title: "ZUCCHINI-LINUX",
    badge: "ACTIVE // HARDWARE",
    badgeClass: "bg-[#FF5C8A] text-[#0B3D2E] border-3 border-[#0B3D2E]",
    description:
      "SM-T295 tablet reverse engineered for bare-metal dual-boot of Arch Linux and LineageOS.",
    tags: ["ARM64", "ARCH LINUX", "LINEAGEOS"],
    cta: "READ BRING-UP LOG →",
    graphic: <PixelZucchini width={180} height={75} rotate={-6} />,
  },
  {
    slug: "hoshcare-client",
    title: "HOSHCARE CLIENT (FRONTEND)",
    badge: "ACTIVE // PRE-PILOT",
    badgeClass: "bg-[#0B3D2E] text-[#FFD93B]",
    description:
      "React Native app for medical records: document upload, AI-assisted field extraction, review-before-save. Merged browser prototype & design foundations.",
    tags: ["REACT NATIVE", "GEMINI API", "EXPO"],
    cta: "READ CASE STUDY →",
  },
  {
    slug: "hoshcare-api",
    title: "HOSHCARE API (BACKEND)",
    badge: "SUPERSEDED JUL 2026",
    badgeClass: "bg-[#FF5C8A] text-[#0B3D2E] border-3 border-[#0B3D2E]",
    description:
      "Node/Express/Prisma backend: auth, uploads, extraction pipeline with retry and record locking. Replaced by a shared NestJS backend.",
    tags: ["NODE", "PRISMA", "POSTGRESQL", "NESTJS"],
    cta: "READ CASE STUDY →",
  },
];

export default function ProjectsPage() {
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
          className="absolute right-[10%] top-14 pointer-events-none hidden sm:block"
        >
          <path
            d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
            fill="none"
            stroke="#FF5C8A"
            strokeWidth="6"
          />
        </svg>

        {/* Decorative Triangle */}
        <svg
          aria-hidden="true"
          width="56"
          height="56"
          viewBox="0 0 64 64"
          className="absolute right-[2%] top-24 pointer-events-none hidden sm:block"
        >
          <polygon
            points="32,4 60,58 4,58"
            fill="#FFF6C2"
            stroke="#0B3D2E"
            strokeWidth="5"
          />
        </svg>

        <h1 className="gl m-0 font-pixel text-2xl sm:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          PROJECTS
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[620px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          Things I’ve built, shipped and sometimes replaced. Each one has a case
          study.
        </p>
      </div>

      {/* Grid of Projects (4 Projects) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 pt-10">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="card flex flex-col justify-between border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-7 relative"
            style={{ backgroundColor: "#FFF6C2", opacity: 1 }}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span
                  className={`font-pixel text-[10px] px-2.5 py-1.5 inline-block ${project.badgeClass}`}
                >
                  {project.badge}
                </span>
                {project.graphic && (
                  <div className="hidden sm:block shrink-0 -my-3">{project.graphic}</div>
                )}
              </div>

              <h2 className="font-pixel text-xl leading-snug my-3 text-[#0B3D2E]">
                {project.title}
              </h2>

              <p className="m-0 mb-4 font-mono text-sm leading-relaxed text-[#0B3D2E]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-pixel text-[10px] bg-[#FFF6C2] text-[#0B3D2E] px-2 py-1 border-3 border-[#0B3D2E]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-bold border-t-3 border-dashed border-[#0B3D2E] pt-3 text-sm flex items-center justify-between text-[#0B3D2E]">
              <span>{project.cta}</span>
              <span className="font-pixel text-xs">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
