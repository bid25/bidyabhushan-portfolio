import type { MDXComponents } from "mdx/types";
import {
  ProximityH2,
  ProximityH3,
  ProximityH4,
} from "@/components/paper/ProximityArticle";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ── Paragraphs: clean justified mono ─────────────────────────────
    p: ({ children }) => (
      <p className="mb-6 font-mono text-[15px] sm:text-base leading-relaxed text-[#0B3D2E] text-justify">
        {children}
      </p>
    ),

    // ── Headings: proximity effect with neo-brutalist styling ─────────
    h2: ({ children }) => (
      <ProximityH2 className="mb-6 mt-12 font-mono text-[clamp(1.4rem,2.8vw,1.9rem)] font-extrabold leading-[1.25] text-[#0B3D2E] text-left border-b-2 border-dashed border-[#0B3D2E]/30 pb-2">
        {children}
      </ProximityH2>
    ),
    h3: ({ children }) => (
      <ProximityH3 className="mb-4 mt-8 font-mono text-lg sm:text-xl font-bold text-[#0B3D2E] text-left">
        {children}
      </ProximityH3>
    ),
    h4: ({ children }) => (
      <ProximityH4 className="mb-3 mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#FF5C8A] text-left">
        {children}
      </ProximityH4>
    ),

    // ── Lists ────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="mb-6 list-outside list-disc space-y-2.5 pl-6 font-mono text-sm sm:text-base text-[#0B3D2E]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 list-outside list-decimal space-y-3 pl-6 font-mono text-sm leading-relaxed text-[#0B3D2E] marker:font-bold marker:text-[#FF5C8A]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // ── Inline ───────────────────────────────────────────────────────
    strong: ({ children }) => (
      <strong className="font-bold text-[#0B3D2E] bg-[#FFD93B]/60 px-1">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic text-[#0B3D2E]">{children}</em>,
    hr: () => (
      <hr className="my-12 border-0 border-t-3 border-dashed border-[#0B3D2E]/30" />
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#FF5C8A] bg-[#FFF8D6] p-4 sm:p-5 font-mono text-sm leading-relaxed text-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] -rotate-[0.5deg]">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-bold text-[#0B3D2E] underline decoration-[#FF5C8A] decoration-2 underline-offset-4 hover:bg-[#FF5C8A] hover:text-[#0B3D2E] px-0.5 transition-colors"
      >
        {children}
      </a>
    ),
    ...components,
  };
}
