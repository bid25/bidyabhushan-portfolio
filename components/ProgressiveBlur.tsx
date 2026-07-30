"use client";

import { useEffect, useRef } from "react";

interface ProgressiveBlurProps {
  /** Height of the blur band in pixels. */
  height?: number;
  /** Number of stacked blur layers. More layers = smoother ramp, more GPU cost. */
  layers?: number;
  /** Strongest blur radius, in pixels, at the top of the band. */
  maxBlur?: number;
  /** Scroll distance over which the band fades in. */
  fadeInOver?: number;
  /** Also render a mirrored band at the bottom of the viewport. */
  bottom?: boolean;
  className?: string;
}

/**
 * A fixed "progressive glass" band: several stacked backdrop-filter layers,
 * each masked to a different slice of the band, so blur ramps smoothly from
 * strong at the edge to zero in the reading area — rather than the hard cutoff
 * a single backdrop-filter produces.
 *
 * Sits at z-40, below the sticky Nav (z-50), so the Nav's solid background
 * still reads as solid and this only affects content below it.
 *
 * Opacity is driven directly from scrollY on rAF rather than through React
 * state — this runs on every scroll frame and must not re-render the tree.
 */
export function ProgressiveBlur({
  height = 170,
  layers = 4,
  maxBlur = 14,
  fadeInOver = 140,
  bottom = false,
  className = "",
}: ProgressiveBlurProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The band is decorative. Users who prefer reduced motion get it pinned
    // on at a constant opacity instead of reacting to scroll.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      if (topRef.current) topRef.current.style.opacity = "1";
      if (bottomRef.current) bottomRef.current.style.opacity = "1";
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      if (topRef.current) {
        topRef.current.style.opacity = String(Math.min(y / fadeInOver, 1));
      }

      if (bottomRef.current) {
        const remaining =
          document.documentElement.scrollHeight - window.innerHeight - y;
        bottomRef.current.style.opacity = String(
          Math.min(remaining / fadeInOver, 1)
        );
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fadeInOver]);

  const band = (dir: "top" | "bottom") =>
    Array.from({ length: layers }, (_, i) => {
      const blur = maxBlur / 2 ** (layers - 1 - i);
      // Each layer is masked to an overlapping slice, so the layers sum into a
      // smooth ramp instead of banding at the seams.
      const start = (i / layers) * 100;
      const mid = ((i + 1) / layers) * 100;
      const end = ((i + 2) / layers) * 100;
      const to = dir === "top" ? "to bottom" : "to top";

      return (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            maskImage: `linear-gradient(${to}, rgba(0,0,0,1) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,0) ${end}%)`,
            WebkitMaskImage: `linear-gradient(${to}, rgba(0,0,0,1) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,0) ${end}%)`,
          }}
        />
      );
    });

  return (
    <>
      <div
        ref={topRef}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 ${className}`}
        style={{ height, opacity: 0 }}
      >
        {band("top")}
      </div>

      {bottom && (
        <div
          ref={bottomRef}
          aria-hidden="true"
          className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 ${className}`}
          style={{ height, opacity: 0 }}
        >
          {band("bottom")}
        </div>
      )}
    </>
  );
}

export default ProgressiveBlur;
