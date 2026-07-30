"use client";

import { createContext, useContext, useRef, type RefObject } from "react";
import VariableProximity from "@/components/VariableProximity";

// ── Context ──────────────────────────────────────────────────────────
const ProximityRefContext = createContext<RefObject<HTMLElement | null> | null>(null);

export function useProximityRef() {
  return useContext(ProximityRefContext);
}

/**
 * Wraps the blog article body and provides a shared containerRef for
 * VariableProximity. Every child text element can access this ref via
 * the useProximityRef() hook.
 */
export function ProximityProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ProximityRefContext.Provider value={containerRef}>
      <div ref={containerRef} className="relative">
        {children}
      </div>
    </ProximityRefContext.Provider>
  );
}

// ── MDX component wrappers ───────────────────────────────────────────

/**
 * Heading with VariableProximity — weight responds to cursor proximity.
 * Falls back to plain text when no proximity context is available.
 */
export function ProximityH2({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useProximityRef();
  const text = extractText(children);

  if (!ref) return <h2 className={className}>{children}</h2>;

  return (
    <h2 className={className}>
      <VariableProximity
        label={text}
        fromFontVariationSettings="'wght' 600"
        toFontVariationSettings="'wght' 200"
        containerRef={ref}
        radius={130}
        falloff="gaussian"
      />
    </h2>
  );
}

export function ProximityH3({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useProximityRef();
  const text = extractText(children);

  if (!ref) return <h3 className={className}>{children}</h3>;

  return (
    <h3 className={className}>
      <VariableProximity
        label={text}
        fromFontVariationSettings="'wght' 600"
        toFontVariationSettings="'wght' 200"
        containerRef={ref}
        radius={110}
        falloff="gaussian"
      />
    </h3>
  );
}

export function ProximityH4({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useProximityRef();
  const text = extractText(children);

  if (!ref) return <h4 className={className}>{children}</h4>;

  return (
    <h4 className={className}>
      <VariableProximity
        label={text}
        fromFontVariationSettings="'wght' 600"
        toFontVariationSettings="'wght' 300"
        containerRef={ref}
        radius={100}
        falloff="gaussian"
      />
    </h4>
  );
}

/**
 * Paragraph with VariableProximity — subtle weight shift on hover.
 * Falls back to plain rendering for paragraphs containing complex
 * children (links, images, code blocks).
 */
export function ProximityP({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useProximityRef();
  const text = extractText(children);

  if (!ref || hasComplexChildren(children)) {
    return <p className={className}>{children}</p>;
  }

  return (
    <p className={className}>
      <VariableProximity
        label={text}
        fromFontVariationSettings="'wght' 400"
        toFontVariationSettings="'wght' 700"
        containerRef={ref}
        radius={80}
        falloff="linear"
      />
    </p>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────

/** Recursively extract plain text from React children. */
function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

/** Check if children contain complex React elements (links, images, etc.) */
function hasComplexChildren(children: React.ReactNode): boolean {
  if (typeof children === "string" || typeof children === "number") return false;
  if (!children) return false;

  const simpleTypes = new Set(["strong", "em", "b", "i", "code", "span"]);

  if (Array.isArray(children)) {
    return children.some((child) => {
      if (typeof child === "string" || typeof child === "number") return false;
      if (typeof child === "object" && child !== null && "type" in child) {
        return !simpleTypes.has(child.type as string);
      }
      return false;
    });
  }

  if (typeof children === "object" && children !== null && "type" in children) {
    return !simpleTypes.has((children as { type: unknown }).type as string);
  }

  return false;
}
