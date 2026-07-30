import Link from "next/link";
import BlurText from "@/components/BlurText";
import { RetroGrid } from "@/components/ui/retro-grid";

// Add future posts here. Keeping this as a plain array (rather than reading the
// filesystem) matches the explicit-map pattern used for projects and keeps the
// route statically analysable by Turbopack.
const posts = [
  {
    slug: "augmentation-not-obsolescence",
    kind: "Working paper",
    title: "Augmentation, Not Obsolescence",
    subtitle:
      "AI, the Jevons Paradox, and the Bifurcation of the Engineering Labour Market",
    summary:
      "AI will not make engineers obsolete, but it removes the rung of the ladder they used to climb. A synthesis of labour-market data, capability benchmarks and production economics.",
    date: "2026-07-30",
    readingTime: "24 min",
    topics: ["AI", "Labour markets", "VLSI", "Software engineering"],
  },
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-bone">
      <RetroGrid className="absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-10 sm:py-16 sm:px-8 lg:px-16">
        <header className="mb-10 sm:mb-16">
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

        <ul className="border-t border-ash/20">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-ash/20">
                <Link
                  href={`/blog/${post.slug}`}
                  className="cursor-target group block py-6 sm:py-9 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber drop-shadow-[0_2px_10px_rgba(0,0,0,1)]"
                >
                <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ash">
                  <span className="text-amber">{post.kind}</span>
                  <span className="text-ash/40">/</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>

                </div>

                <h2 className="font-display text-[clamp(1.25rem,3vw,1.875rem)] font-bold leading-tight text-bone transition-colors group-hover:text-amber">
                  {post.title}
                </h2>

                <p className="mt-2 max-w-full sm:max-w-[60ch] font-body text-[14px] sm:text-[15px] leading-snug text-ash">
                  {post.subtitle}
                </p>

                <p className="mt-3 sm:mt-4 max-w-full sm:max-w-[65ch] font-body text-[13px] sm:text-sm leading-relaxed text-ash/80">
                  {post.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {post.topics.map((topic) => (
                    <span
                      key={topic}
                      className="border border-ash/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ash"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-block font-mono text-[11px] text-amber">
                  Read paper →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
