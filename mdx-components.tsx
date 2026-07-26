import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Basic Terminal Session typography mappings for MDX content
    p: ({ children }) => (
      <p className="mb-6 max-w-[65ch] font-body text-base leading-relaxed text-bone">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-6 mt-12 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] text-bone">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-8 font-display text-xl font-semibold text-bone">
        {children}
      </h3>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 list-outside list-disc space-y-2 pl-6 font-body text-base text-bone">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-bone">{children}</strong>
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
