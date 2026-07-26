import type { Metadata } from "next";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyEvilEye as EvilEye } from "@/components/LazyComponents";

export const metadata: Metadata = {
  title: "About — Bidyabhushan Nanda",
  description: "Background and context for Bidyabhushan Nanda.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-void text-bone overflow-hidden">
      
      {/* EvilEye background effect */}
      <div 
        className="pointer-events-none absolute right-[-20%] top-[-10%] h-[120%] w-[140%] opacity-30 mix-blend-screen lg:w-[1000px] lg:right-[-10%]"
        style={{ 
          maskImage: 'radial-gradient(circle at center, black 20%, transparent 60%)', 
          WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 60%)' 
        }}
      >
        <HeavyComponentWrapper fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/20 to-transparent"></div>}>
          <EvilEye />
        </HeavyComponentWrapper>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
            Background
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
            About
          </h1>
        </header>

        <div className="space-y-6">
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
  );
}
