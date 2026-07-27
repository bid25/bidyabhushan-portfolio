import BlurText from "@/components/BlurText";

export default function BlogPage() {
  return (
    <div className="min-h-screen text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <BlurText
            text="Writing"
            as="p"
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan"
            delay={80}
            animateBy="letters"
            direction="top"
            stepDuration={0.3}
          />
          <BlurText
            text="Engineering Log"
            as="h1"
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
          />
          <BlurText
            text="Technical deep dives, architectural decisions, and thoughts on building scalable software."
            className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash"
            delay={30}
            animateBy="words"
            direction="bottom"
            stepDuration={0.3}
          />
        </header>
      </div>
    </div>
  );
}
