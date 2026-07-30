import type { MDXComponents } from "mdx/types";
import {
  ProximityH2,
  ProximityH3,
  ProximityH4,
} from "@/components/paper/ProximityArticle";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ── Paragraphs: justified, full-width, no proximity ─────────────
    p: ({ children }) => (
      <p className="mb-6 font-body text-base leading-relaxed text-bone text-justify">
        {children}
      </p>
    ),

    // ── Headings: left-aligned, proximity effect ─────────────────────
    h2: ({ children }) => (
      <ProximityH2 className="mb-6 mt-12 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] text-bone text-left">
        {children}
      </ProximityH2>
    ),
    h3: ({ children }) => (
      <ProximityH3 className="mb-4 mt-8 font-display text-xl font-semibold text-bone text-left">
        {children}
      </ProximityH3>
    ),
    h4: ({ children }) => (
      <ProximityH4 className="mb-3 mt-8 font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-ash text-left">
        {children}
      </ProximityH4>
    ),

    // ── Lists ────────────────────────────────────────────────────────
    ul: ({ children }) => (
      <ul className="mb-6 list-outside list-disc space-y-2 pl-6 font-body text-base text-bone">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 list-outside list-decimal space-y-3 pl-6 font-body text-sm leading-relaxed text-ash marker:font-mono marker:text-ash/60">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // ── Inline ───────────────────────────────────────────────────────
    strong: ({ children }) => (
      <strong className="font-semibold text-bone">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-bone">{children}</em>,
    hr: () => <hr className="my-12 border-0 border-t border-ash/20" />,
    blockquote: ({ children }) => (
      <blockquote className="mb-6 border-l-2 border-amber pl-5 font-body text-base italic text-ash">
        {children}
      </blockquote>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-amber underline-offset-4 hover:underline"
      >
        {children}
      </a>
    ),
    ...components,
  };
}
