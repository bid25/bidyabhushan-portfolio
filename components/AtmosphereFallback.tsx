"use client";

import { useMemo } from "react";
import { createSeededRandom } from "@/lib/trajectoryLayout";

const STAR_COUNT = 90;

/**
 * Static (no animation — Rules.md's no-ambient-motion rule) starfield used as
 * the mobile fallback for LiquidEther. Same seeded-dot vocabulary as
 * Trajectory's Starfield, so mobile reads as "the same design system, lighter
 * weight" rather than an empty box behind an omitted WebGL effect.
 */
export function AtmosphereFallback() {
  const stars = useMemo(() => {
    const rnd = createSeededRandom("mobile-atmosphere");
    return Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: (1 + rnd() * 1.6) * 1.15,
      opacity: (0.12 + rnd() * 0.22) * 1.15,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="relative h-full w-full overflow-hidden bg-void">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-none bg-bone"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
          suppressHydrationWarning
        />
      ))}
    </div>
  );
}
