"use client";

import { useMediaQuery, HAS_FINE_POINTER, PREFERS_REDUCED_MOTION } from "@/hooks/useMediaQuery";
import { LazyTargetCursor } from "./LazyComponents";

/**
 * Mounts the custom cursor only where a cursor actually exists and motion is
 * welcome.
 *
 * TargetCursor was previously mounted unconditionally in the root layout, which
 * meant every mobile visitor downloaded and booted `gsap` (plus a gsap.ticker
 * rAF loop) to render a cursor that a touch device cannot display. It also had
 * no prefers-reduced-motion escape hatch, which Rules.md requires of every
 * interactive component.
 *
 * See PERF-PLAN.md §2.3.
 */
export function PointerCursor({ targetSelector }: { targetSelector?: string }) {
  const hasFinePointer = useMediaQuery(HAS_FINE_POINTER);
  const prefersReducedMotion = useMediaQuery(PREFERS_REDUCED_MOTION);

  if (!hasFinePointer || prefersReducedMotion) return null;

  return <LazyTargetCursor targetSelector={targetSelector} />;
}
