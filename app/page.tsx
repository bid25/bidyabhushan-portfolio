import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyProfileCard, LazyDotField, LazyDecryptedText } from "@/components/LazyComponents";
import { ScrollReveal } from "@/components/ScrollReveal";
import BlurText from "@/components/BlurText";
import Noise from "@/components/Noise";
import { Trajectory } from "@/components/Trajectory";
import { Footer } from "@/components/Footer";

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
    <div className="flex flex-1 flex-col overflow-x-clip">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative isolate flex w-full flex-1 flex-col items-center justify-center px-4 py-32 sm:px-8 lg:px-16 min-h-[80vh]">
        
        {/* Interactive DotField background effect */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-100">
          <HeavyComponentWrapper fallback={<div className="h-full w-full pointer-events-none absolute inset-0 -z-10 opacity-15 [background-image:radial-gradient(#6E7681_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>}>
            <LazyDotField 
              dotRadius={1.5} 
              dotSpacing={20} 
              cursorRadius={180} 
              cursorForce={0.3} 
              color="rgba(110, 118, 129, 0.5)"
              lightGradientFrom="rgba(10, 11, 13, 0.4)"
              lightGradientTo="rgba(10, 11, 13, 0.2)"
              glowColor="var(--dotfield-glow)"
              bulgeOnly={false}
            />
          </HeavyComponentWrapper>
        </div>

        <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-50">
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>

        <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 flex flex-col items-start text-left w-full gap-y-6 lg:gap-y-8 py-4">
            <BlurText
              text="Portfolio"
              as="p"
              className="font-body text-sm font-medium uppercase tracking-[0.1em] text-ash"
              delay={80}
              animateBy="letters"
              direction="top"
              stepDuration={0.3}
            />
            <h1 className="w-full font-display text-[clamp(3rem,5vw,4.5rem)] font-black leading-[1.1] flex flex-wrap items-start justify-start gap-x-3 sm:gap-x-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-wrap items-start justify-start gap-x-[0.25em]">
                <LazyDecryptedText
                  text="BIDYA"
                  animateOn="hover"
                  speed={80}
                  maxIterations={25}
                  className="text-[#047857] dark:text-[#00FF9D]"
                  parentClassName="text-[#047857] dark:text-[#00FF9D] cursor-target"
                />
                <LazyDecryptedText
                  text="BHUSHAN"
                  animateOn="hover"
                  speed={80}
                  maxIterations={25}
                  className="text-[#047857] dark:text-[#00FF9D]"
                  parentClassName="text-[#047857] dark:text-[#00FF9D] cursor-target"
                />
              </div>
              <LazyDecryptedText
                text="NANDA"
                animateOn="hover"
                speed={80}
                maxIterations={25}
                className="text-[#B91C1C] dark:text-[#FF4500]"
                parentClassName="text-[#B91C1C] dark:text-[#FF4500] cursor-target"
              />
            </h1>
            <BlurText
              text="Full-Stack & AI/ML Engineer — React Native, Node, and the infrastructure behind them. B.Tech Electronics, MAIT, class of 2029. Currently building HOSHCARE, a mobile app for medical records."
              className="w-full max-w-[65ch] text-justify font-body text-base leading-relaxed text-ash"
              delay={30}
              animateBy="words"
              direction="bottom"
              stepDuration={0.3}
            />

            <div className="flex flex-wrap items-center gap-4 w-full">
              <Button nativeButton={false} render={<Link href="/projects" />}>View projects</Button>
              <Button nativeButton={false} variant="outline" render={<Link href="/contact" />}>
                Get in touch
              </Button>
              <Button nativeButton={false} variant="ghost" render={<a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" />}>
                View Resume
              </Button>
            </div>
          </div>

          {/* Lazy Loaded ProfileCard */}
          <div className="w-full max-w-[480px] mx-auto lg:ml-auto lg:mr-0 flex items-center justify-center">
            <HeavyComponentWrapper fallback={<div className="h-full w-full bg-void/50 border border-ash/10" />}>
              <LazyProfileCard 
                name="Bidya Bhushan Nanda"
                title="Full-Stack & AI/ML Engineer"
                handle="bidyabhushannanda"
                status="Available for work"
                contactText="Contact Me"
                avatarUrl="/avatar.webp"
                iconUrl="/code-pattern.svg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGlowEnabled={false}
                innerGradient="none"
              />
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

          <div className="w-full max-w-4xl space-y-16">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block py-4"
                >
                  <h3 className="font-display text-3xl font-semibold text-bone mb-4 group-hover:text-amber transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-lg text-ash leading-relaxed max-w-[65ch]">
                    {project.description}
                  </p>
                  <div className="mt-8 font-mono text-xs text-cyan uppercase tracking-wider group-hover:text-amber transition-colors">
                    Read Case Study →
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <Link
            href="/projects"
            className="mt-16 inline-block font-body text-sm text-amber underline-offset-4 hover:underline"
          >
            View all projects →
          </Link>
        </div>
      </section>

      {/* ── Trajectory ─────────────────────────────────── */}
      <Trajectory />
      <Footer />
    </div>
  );
}
