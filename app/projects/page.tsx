import type { Metadata } from "next";
import Link from "next/link";
import BlurText from "@/components/BlurText";

export const metadata: Metadata = {
  title: "Projects — Bidya Bhushan Nanda",
  description: "Case studies from Bidya Bhushan Nanda's engineering work.",
};

const allProjects = [
  { 
    slug: "hoshcare-mobile", 
    title: "HOSHCARE — Mobile App",
    description: "React Native app for medical records: document upload, AI-assisted field extraction, review-before-save. Pre-pilot.",
    status: "Active, pre-pilot"
  },
  { 
    slug: "hoshcare-api", 
    title: "HOSHCARE — Backend API",
    description: "Node/Express/Prisma backend: auth, uploads, an extraction pipeline with retry and record locking. Superseded by a shared NestJS backend, July 2026.",
    status: "Superseded"
  },
  { 
    slug: "hoshcare-web", 
    title: "HOSHCARE — Records Web App",
    description: "The first working version of HOSHCARE in the browser, featuring row-level security for data isolation.",
    status: "Archived"
  },
  { 
    slug: "hoshcare-marketing", 
    title: "HOSHCARE — Marketing Site",
    description: "Eight pages with a WebGL homepage driven by scroll position. Established the design system used by the app.",
    status: "Archived"
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <BlurText
            text="Projects"
            as="h1"
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
          />
          <BlurText
            text="Case studies from confidential engineering work. Descriptions cover architecture, contribution, and the specific problems solved. Code isn't public — see each page for how to go deeper."
            className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash"
            delay={30}
            animateBy="words"
            direction="bottom"
            stepDuration={0.3}
          />
        </header>

        <div className="mt-16 w-full max-w-[800px] border-t border-ash/30">
          {allProjects.map((project, idx) => (
            <article 
              key={project.slug} 
              className="group relative flex flex-col items-start justify-between border-b border-ash/30 py-10 sm:flex-row sm:items-center sm:gap-8"
            >
              <div className="flex flex-1 flex-col items-start gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl font-bold tracking-tight text-bone sm:text-2xl">
                    {project.title}
                  </h2>
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.05em] text-cyan border border-cyan/30 px-2 py-0.5 rounded-sm bg-cyan/5">
                    {project.status}
                  </span>
                </div>
                <p className="max-w-[65ch] font-body text-sm leading-relaxed text-ash">
                  {project.description}
                </p>
              </div>
              <div className="mt-6 shrink-0 sm:mt-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-block font-body text-sm font-medium tracking-wide text-amber transition-colors hover:text-amber/80"
                >
                  Read case study <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
