import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyLanyard as Lanyard, LazyScrollStack as ScrollStack } from "@/components/LazyComponents";
import { ScrollStackItem } from "@/components/ScrollStack";

const featuredProjects = [
  { 
    slug: "hoshcare-mobile", 
    title: "HOSHCARE — Mobile App",
    description: "React Native app for medical records: document upload, AI-assisted field extraction, review-before-save. Pre-pilot."
  },
  { 
    slug: "hoshcare-api", 
    title: "HOSHCARE — Backend API",
    description: "Node/Express/Prisma backend: auth, uploads, an extraction pipeline with retry and record locking. Superseded by a shared NestJS backend, July 2026."
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-void overflow-hidden">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative isolate flex w-full flex-1 flex-col items-start justify-center px-4 py-32 sm:px-8 lg:px-16 min-h-[80vh]">
        
        {/* Static Dot Grid background effect */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-15 [background-image:radial-gradient(#6E7681_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>

        <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
              Portfolio
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] text-bone">
              BIDYA BHUSHAN NANDA
            </h1>
            <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash">
              Full-stack engineer — React Native, Node, and the infrastructure behind them. B.Tech Electronics, MAIT, class of 2029. Currently building HOSHCARE, a mobile app for medical records.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button nativeButton={false} render={<Link href="/projects" />}>View projects</Button>
              <Button nativeButton={false} variant="outline" render={<Link href="/contact" />}>
                Get in touch
              </Button>
              <Button variant="ghost" disabled>
                Résumé — coming soon
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] w-full lg:h-[600px] pointer-events-none lg:pointer-events-auto">
            {/* Lanyard Showpiece */}
            <HeavyComponentWrapper 
              fallback={
                <div className="flex h-full w-full items-center justify-center rounded-lg border border-ash/10 bg-void/50 backdrop-blur-sm">
                  <span className="font-mono text-xs text-ash">Lanyard.glb loading...</span>
                </div>
              }
            >
              <Lanyard />
            </HeavyComponentWrapper>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────── */}
      <section className="w-full border-t border-ash/30 px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-[1200px]">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] text-bone mb-10">
            Featured Projects
          </h2>

          <div className="w-full max-w-4xl">
            <HeavyComponentWrapper
              fallback={
                <div className="mt-10 space-y-16">
                  {featuredProjects.map((project, i) => (
                    <Link
                      key={`${project.slug}-${i}`}
                      href={`/projects/${project.slug}`}
                      className="group block"
                    >
                      <h3 className="font-display text-lg font-semibold text-bone group-hover:text-amber">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-[65ch] font-body text-sm leading-relaxed text-ash">
                        {project.description}
                      </p>
                    </Link>
                  ))}
                </div>
              }
            >
              <div className="h-[800px]">
                <ScrollStack>
                  {featuredProjects.map((p) => (
                    <ScrollStackItem key={p.slug} itemClassName="py-12 bg-void">
                      <Link href={`/projects/${p.slug}`} className="block h-full w-full group">
                        <h3 className="font-display text-3xl font-semibold text-bone mb-4 group-hover:text-amber transition-colors">{p.title}</h3>
                        <p className="font-body text-lg text-ash leading-relaxed max-w-[65ch]">{p.description}</p>
                        <div className="mt-8 font-mono text-xs text-cyan uppercase tracking-wider group-hover:text-amber transition-colors">Read Case Study →</div>
                      </Link>
                    </ScrollStackItem>
                  ))}
                </ScrollStack>
              </div>
            </HeavyComponentWrapper>
          </div>

          <Link
            href="/projects"
            className="mt-10 inline-block font-body text-sm text-amber underline-offset-4 hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </section>
    </div>
  );
}
