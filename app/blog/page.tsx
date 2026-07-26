import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyInfiniteMenu as InfiniteMenu } from "@/components/LazyComponents";

const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%231a1d24'/%3E%3Ctext x='50%25' y='50%25' fill='%236e7681' font-family='monospace' font-size='24' text-anchor='middle' dominant-baseline='middle'%3EPlaceholder%3C/text%3E%3C/svg%3E";

const blogItems = [
  {
    image: placeholderImage,
    link: "/blog",
    title: "Placeholder Item 1",
    description: "Structure awaiting actual content.",
  },
  {
    image: placeholderImage,
    link: "/blog",
    title: "Placeholder Item 2",
    description: "Structure awaiting actual content.",
  },
  {
    image: placeholderImage,
    link: "/blog",
    title: "Placeholder Item 3",
    description: "Structure awaiting actual content.",
  },
  {
    image: placeholderImage,
    link: "/blog",
    title: "Placeholder Item 4",
    description: "Structure awaiting actual content.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-void text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-cyan">
            Writing
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
            Engineering Log
          </h1>
          <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash">
            Technical deep dives, architectural decisions, and thoughts on building scalable software.
          </p>
        </header>

        <div className="h-[600px] w-full rounded-sm border border-ash/20 bg-[#0a0a0a] overflow-hidden">
          <HeavyComponentWrapper
            fallback={<div className="flex h-full w-full items-center justify-center text-ash text-sm">Interactive menu disabled (mobile or loading).</div>}
          >
            <InfiniteMenu items={blogItems} />
          </HeavyComponentWrapper>
        </div>
      </div>
    </div>
  );
}
