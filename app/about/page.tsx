import type { Metadata } from "next";
import BlurText from "@/components/BlurText";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyLanyard } from "@/components/LazyComponents";

export const metadata: Metadata = {
  title: "About — Bidya Bhushan Nanda",
  description: "Background and context for Bidya Bhushan Nanda.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-bone overflow-hidden">

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <BlurText
            text="Background"
            as="p"
            className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash"
            delay={80}
            animateBy="letters"
            direction="top"
            stepDuration={0.3}
          />
          <BlurText
            text="About"
            as="h1"
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
          />
        </header>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 relative z-10">
          <div className="space-y-6 lg:w-1/2">
            <p className="max-w-[65ch] font-body text-base leading-relaxed text-bone">
              Developer working mainly in TypeScript across React Native and Node. B.Tech Electronics at Maharaja Agrasen Institute of Technology, graduating 2029 — most of what I know about software I went and learned outside the syllabus.
            </p>
            <p className="max-w-[65ch] font-body text-base leading-relaxed text-bone">
              Most of that learning came from things breaking: a library update that moved a token one level deeper in a response object, a runtime polyfill that quietly corrupted file uploads, a schema that drifted out of sync with its database. The work I'm most interested in is usually the diagnosis, not the fix.
            </p>
            <p className="max-w-[65ch] font-body text-base leading-relaxed text-bone">
              I care most about authentication and data isolation. In health records, a user seeing another user's data isn't a bug — it's the end of the product.
            </p>
            <p className="max-w-[65ch] font-body text-base leading-relaxed text-bone">
              Looking for full-stack internships.
            </p>
          </div>
        </div>
      </div>

      {/* Lanyard rendered absolutely to span full height so the string falls from the actual top bar */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-screen pointer-events-none z-20 flex justify-center items-center">
        <div className="w-full h-full pointer-events-auto">
          <HeavyComponentWrapper fallback={null}>
            <LazyLanyard 
              frontImage="/id.jpg" 
              backImage="/id.jpg" 
              containerClassName="w-full h-full"
              position={[0, 0, 15]} // Brings camera closer (makes it bigger)
              lanyardWidth={1.5}
            />
          </HeavyComponentWrapper>
        </div>
      </div>
    </div>
  );
}
