"use client";

import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  type CSSProperties,
  type RefObject,
} from "react";
import { useAnimationFrame } from "motion/react";

type Falloff = "linear" | "exponential" | "gaussian";

interface VariableProximityProps {
  /** The text to render. Split into per-character spans. */
  label: string;
  /** Font-variation-settings at rest, e.g. "'wght' 400". */
  fromFontVariationSettings: string;
  /** Font-variation-settings at the pointer, e.g. "'wght' 800". */
  toFontVariationSettings: string;
  /** Element the pointer position is measured against. */
  containerRef: RefObject<HTMLElement | null>;
  /** Pixel radius of pointer influence. */
  radius?: number;
  falloff?: Falloff;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

/** Parse "'wght' 400, 'opsz' 12" into [{ axis: "wght", value: 400 }, ...]. */
function parseSettings(settings: string) {
  return new Map(
    settings
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => {
        const [rawAxis, rawValue] = s.split(/\s+/);
        return [rawAxis.replace(/['"]/g, ""), parseFloat(rawValue)] as const;
      })
  );
}

function calcFalloff(distance: number, radius: number, falloff: Falloff) {
  const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
  if (falloff === "exponential") return norm ** 2;
  if (falloff === "gaussian")
    return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
  return norm;
}

/**
 * Text whose variable-font axes respond to pointer proximity, per character.
 *
 * Requires a variable font. This site loads JetBrains Mono via next/font/google,
 * which ships the `wght` axis (100–800) — so `'wght' N` works out of the box.
 * Axes the loaded font does not expose are silently ignored by the browser.
 *
 * Degrades safely: with no pointer (touch devices, keyboard-only) every
 * character simply renders at `fromFontVariationSettings`.
 */
const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>(
  function VariableProximity(
    {
      label,
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className = "",
      style,
      onClick,
    },
    ref
  ) {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const lastPositionRef = useRef<{ x: number | null; y: number | null }>({
      x: null,
      y: null,
    });
    const pointerInsideRef = useRef(false);

    const parsedFrom = useMemo(
      () => parseSettings(fromFontVariationSettings),
      [fromFontVariationSettings]
    );
    const parsedTo = useMemo(
      () => parseSettings(toFontVariationSettings),
      [toFontVariationSettings]
    );

    // Axes present in both maps, paired for interpolation.
    const axes = useMemo(
      () =>
        [...parsedFrom.entries()].map(([axis, fromValue]) => ({
          axis,
          fromValue,
          toValue: parsedTo.get(axis) ?? fromValue,
        })),
      [parsedFrom, parsedTo]
    );

    useEffect(() => {
      // Pointer tracking is a progressive enhancement — skip it entirely for
      // users who prefer reduced motion or have no fine pointer.
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (!fine || reduced) return;

      const onMove = (e: globalThis.MouseEvent) => {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
        pointerInsideRef.current = true;
      };
      const onLeave = () => {
        pointerInsideRef.current = false;
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      };
    }, []);

    useAnimationFrame(() => {
      const container = containerRef?.current;
      if (!container) return;

      const { x, y } = mousePositionRef.current;

      // Nothing moved and nothing to reset — skip the layout reads entirely.
      if (
        lastPositionRef.current.x === x &&
        lastPositionRef.current.y === y &&
        pointerInsideRef.current
      ) {
        return;
      }
      lastPositionRef.current = { x, y };

      const containerRect = container.getBoundingClientRect();

      letterRefs.current.forEach((letterEl, index) => {
        if (!letterEl) return;

        if (!pointerInsideRef.current) {
          letterEl.style.fontVariationSettings = fromFontVariationSettings;
          interpolatedSettingsRef.current[index] = fromFontVariationSettings;
          return;
        }

        const rect = letterEl.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const dx = x - containerRect.left - letterCenterX;
        const dy = y - containerRect.top - letterCenterY;
        const distance = Math.hypot(dx, dy);

        if (distance >= radius) {
          letterEl.style.fontVariationSettings = fromFontVariationSettings;
          interpolatedSettingsRef.current[index] = fromFontVariationSettings;
          return;
        }

        const t = calcFalloff(distance, radius, falloff);
        const next = axes
          .map(
            ({ axis, fromValue, toValue }) =>
              `'${axis}' ${fromValue + (toValue - fromValue) * t}`
          )
          .join(", ");

        interpolatedSettingsRef.current[index] = next;
        letterEl.style.fontVariationSettings = next;
      });
    });

    // Preserve word boundaries so the text still wraps naturally.
    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        className={className}
        onClick={onClick}
        style={{ display: "inline", ...style }}
      >
        {/* Screen readers get the clean string; the spans are decorative. */}
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.split("").map((letter) => {
                const currentIndex = letterIndex++;
                return (
                  <span
                    key={currentIndex}
                    ref={(el) => {
                      letterRefs.current[currentIndex] = el;
                    }}
                    style={{
                      display: "inline-block",
                      fontVariationSettings:
                        interpolatedSettingsRef.current[currentIndex] ??
                        fromFontVariationSettings,
                    }}
                  >
                    {letter}
                  </span>
                );
              })}
              {wordIndex < words.length - 1 && (
                <span style={{ display: "inline-block" }}>&nbsp;</span>
              )}
            </span>
          ))}
        </span>
      </span>
    );
  }
);

export default VariableProximity;
