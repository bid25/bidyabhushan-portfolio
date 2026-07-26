import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Bidyabhushan Nanda",
  description: "Case studies from Bidyabhushan Nanda's engineering work.",
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

export default function ProjectsIndexPage() {
  return (
    <div className="min-h-screen bg-void text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
            Projects
          </h1>
          <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash">
            Case studies from confidential engineering work. Descriptions cover architecture, contribution, and the specific problems solved. Code isn't public — see each page for how to go deeper.
          </p>
        </header>

        <div className="space-y-10">
          {allProjects.map((project, i) => (
            <Link
              key={`${project.slug}-${i}`}
              href={`/projects/${project.slug}`}
              className="group block border-b border-ash/20 pb-10 last:border-b-0 last:pb-0"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <h2 className="font-display text-xl font-semibold text-bone group-hover:text-amber">
                  {project.title}
                </h2>
                <span className="shrink-0 font-mono text-xs text-ash">
                  {project.status}
                </span>
              </div>
              <p className="max-w-[65ch] font-body text-sm leading-relaxed text-ash">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
