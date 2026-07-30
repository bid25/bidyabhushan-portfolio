import ReactDOM from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyProfileCard, LazyDotField } from "@/components/LazyComponents";
// Imported directly, not via next/dynamic: this renders inside the hero <h1>, so
// it must be in the server HTML with zero Suspense boundary. It shares
// motion/react with BlurText and ScrollReveal on this page, so splitting it out
// bought nothing and cost a round-trip. See PERF-PLAN.md §1.1.
import DecryptedText from "@/components/DecryptedText";
import { ScrollReveal } from "@/components/ScrollReveal";
import BlurText from "@/components/BlurText";
import Noise from "@/components/Noise";
import { Trajectory } from "@/components/Trajectory";
import { Footer } from "@/components/Footer";

const featuredProjects = [
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
];

export default function Home() {
  // Emits <link rel="preload" as="image" fetchpriority="high"> into the streamed
  // HTML <head>. The avatar is the LCP element but lives inside ProfileCard,
  // which is dynamic(ssr:false) — so without this the browser cannot discover it
  // until the chunk downloads and React renders. Measured cost of that blind
  // spot: 460ms "resource load delay" on mobile, 502ms on desktop, out of a
  // 4.1s / 1.2s LCP. Must stay in sync with ProfileCard's `unoptimized` avatar
  // so the preloaded URL matches the requested one. See PERF-PLAN.md §3.1.
  ReactDOM.preload("/avatar.webp", { as: "image", fetchPriority: "high" });

  return (
    <div className="flex flex-1 flex-col overflow-x-clip">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative isolate flex w-full flex-1 flex-col items-center justify-center px-4 py-32 sm:px-8 lg:px-16 min-h-[80vh]">
        
        {/* Interactive DotField background effect */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-100">
          <HeavyComponentWrapper fallback={<div className="h-full w-full pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(#6E7681_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]"></div>}>
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

        {/* Grain keeps its animation (your call), but it now gets the same guards
            every other effect has: skipped entirely on mobile and for
            prefers-reduced-motion, and unmounted once the hero scrolls out of
            view. Its rAF loop regenerates a 1000x1000 ImageData every 2 frames,
            so this is the difference between paying that cost on every device
            forever and paying it only on a desktop viewing the hero.
            See PERF-PLAN.md §2.2. */}
        <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-50">
          <HeavyComponentWrapper fallback={null}>
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={15}
            />
          </HeavyComponentWrapper>
        </div>

        <div className="mx-auto w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="z-10 order-2 lg:order-none flex flex-col items-start text-left w-full gap-y-6 lg:gap-y-8 py-4">
            <BlurText
              text="Portfolio"
              as="p"
              className="font-body text-sm font-medium uppercase tracking-[0.1em] text-ash"
              delay={80}
              animateBy="letters"
              direction="top"
              stepDuration={0.3}
            />
            {/* min-h-[1.1em] is a one-line collapse guard, deliberately NOT a
                reservation for the full wrapped height. Reserving 3 lines on
                mobile / 2 at lg would add visible empty space at any width where
                the text happens to wrap to fewer lines. Since the text is now
                server-rendered the h1 can never be empty, so a single-line floor
                is all that's needed — it can never exceed real content height. */}
            <h1 className="w-full font-display text-[clamp(3rem,5vw,4.5rem)] font-black leading-[1.1] flex flex-wrap items-start justify-start gap-x-3 sm:gap-x-4 min-h-[1.1em] animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both" style={{ animationDelay: '100ms' }}>
              <div className="flex flex-wrap items-start justify-start gap-x-[0.25em]">
                <DecryptedText
                  text="BIDYA"
                  animateOn="hover"
                  speed={80}
                  maxIterations={25}
                  className="text-[#047857] dark:text-[#00FF9D]"
                  parentClassName="text-[#047857] dark:text-[#00FF9D] cursor-target"
                />
                <DecryptedText
                  text="BHUSHAN"
                  animateOn="hover"
                  speed={80}
                  maxIterations={25}
                  className="text-[#047857] dark:text-[#00FF9D]"
                  parentClassName="text-[#047857] dark:text-[#00FF9D] cursor-target"
                />
              </div>
              <DecryptedText
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
          {/* aspect-square lives on the CONTAINER, not the fallback. On mobile
              this column is order-1 — above every word of copy — so anything
              that changes its height moves the whole page. Locking the height
              here makes the column dimensionally fixed no matter what is inside
              it: nothing, the fallback, or the mounted card. See PERF-PLAN.md §1.3b. */}
          <div className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[480px] aspect-square mx-auto order-1 lg:order-none lg:ml-auto lg:mr-0 flex items-center justify-center">
            <HeavyComponentWrapper mobileBypass={false} fallback={<div className="h-full w-full bg-void/50" />}>
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

          <div className="w-full max-w-4xl border-t border-ash/30">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col items-start justify-between gap-6 border-b border-ash/30 py-10 sm:flex-row sm:items-center"
                >
                  <div className="flex flex-1 flex-col items-start gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-bone sm:text-3xl">
                        {project.title}
                      </h3>
                      <span className="rounded-sm border border-cyan/30 bg-cyan/5 px-2 py-0.5 font-body text-[10px] font-medium uppercase tracking-[0.05em] text-cyan">
                        {project.status}
                      </span>
                    </div>
                    <p className="max-w-[65ch] font-body text-base leading-relaxed text-ash">
                      {project.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-mono text-xs uppercase tracking-wider text-cyan transition-colors group-hover:text-amber">
                    Read Case Study →
                  </span>
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
