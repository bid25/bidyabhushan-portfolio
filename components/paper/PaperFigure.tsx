"use client";

import { useEffect, useRef, useState } from "react";

type Accent = "amber" | "cyan" | "ash";

interface Datum {
  label: string;
  value: number;
  display: string;
  accent: Accent;
}

interface PaperFigureProps {
  figure: string;
  title: string;
  source: string;
  note?: string;
  kind: "column" | "bar" | "log";
  /** Axis maximum for column/bar. Ignored for log. */
  max?: number;
  data: Datum[];
}

const FILL: Record<Accent, string> = {
  amber: "bg-amber",
  cyan: "bg-cyan",
  ash: "bg-ash/40",
};

const TEXT: Record<Accent, string> = {
  amber: "text-amber",
  cyan: "text-cyan",
  ash: "text-ash",
};

/**
 * Figures for the research paper. Bars grow on first scroll into view.
 *
 * Deliberately CSS/DOM rather than canvas: it inherits the theme tokens, so it
 * reads correctly in both light and dark mode without a second palette, and
 * the underlying numbers stay in the DOM for screen readers and for search.
 */
export function PaperFigure({
  figure,
  title,
  source,
  note,
  kind,
  max = 100,
  data,
}: PaperFigureProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion is handled in CSS via `motion-reduce:transition-none` —
    // the bars snap to size instead of growing, so there is no need to branch
    // here (and no synchronous setState in the effect body).
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Log scale spans $30 to $300M so the $100 point is visible above the axis.
  const LOG_MIN = Math.log10(30);
  const LOG_MAX = Math.log10(3e8);
  const pct = (v: number) =>
    kind === "log"
      ? ((Math.log10(v) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100
      : (Math.abs(v) / max) * 100;

  const summary = data.map((d) => `${d.label}: ${d.display}`).join("; ");

  return (
    <figure
      ref={ref}
      className="my-8 sm:my-14 border-t border-ash/25 pt-4 sm:pt-6"
      aria-label={`${figure}. ${title}. ${summary}`}
    >
      <figcaption className="mb-7">
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-amber">
          {figure}
        </span>
        <span className="mt-2 block font-display text-[15px] font-semibold leading-snug text-bone">
          {title}
        </span>
        <span className="mt-1.5 block font-mono text-[10.5px] leading-relaxed text-ash">
          {source}
        </span>
      </figcaption>

      {kind === "column" && (
        <div className="flex h-[160px] sm:h-[210px] items-end gap-2 sm:gap-4 lg:gap-10 border-b border-ash/25 pt-4 sm:pt-8 overflow-x-auto">
          {data.map((d) => (
            <div
              key={d.label}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <span 
                className="mb-1 sm:mb-2 font-mono text-sm sm:text-base font-bold tabular-nums text-bone lg:text-lg transition-opacity duration-1000 ease-out"
                style={{ opacity: shown ? 1 : 0 }}
              >
                {d.display}
              </span>
              <div
                className="w-full max-w-[96px]"
                style={{ height: `${pct(d.value)}%` }}
              >
                <div 
                  className={`w-full h-full origin-bottom ${FILL[d.accent]} transition-transform duration-1000 ease-out motion-reduce:transition-none`}
                  style={{ transform: shown ? 'scaleY(1)' : 'scaleY(0)' }}
                />
              </div>
              <span className="mt-2 sm:mt-3 text-center font-mono text-[9px] sm:text-[10.5px] leading-tight text-ash">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {kind === "bar" && (
        <div className="space-y-4">
          {data.map((d) => (
            <div key={d.label}>
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <span className="font-mono text-[11px] leading-tight text-ash">
                  {d.label}
                </span>
                <span
                  className={`font-mono text-sm font-bold tabular-nums ${TEXT[d.accent]}`}
                >
                  {d.display}
                </span>
              </div>
              <div className="relative h-[22px] w-full bg-ash/10">
                <div
                  className={`absolute inset-y-0 left-0 h-full origin-left ${FILL[d.accent]} transition-transform duration-1000 ease-out motion-reduce:transition-none`}
                  style={{ 
                    width: `${pct(d.value)}%`,
                    transform: shown ? 'scaleX(1)' : 'scaleX(0)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {kind === "log" && (
        <>
          <div className="flex h-[170px] sm:h-[230px] items-end border-b border-ash/25 pt-5 sm:pt-9">
            {data.map((d) => (
              <div
                key={d.label}
                className="flex h-full flex-1 flex-col justify-end"
              >
                <div
                  className="relative flex w-full justify-center"
                  style={{ height: `${pct(d.value)}%` }}
                >
                  <div 
                    className="absolute inset-y-0 left-0 border-l border-ash/20 origin-bottom transition-transform duration-1000 ease-out motion-reduce:transition-none"
                    style={{ transform: shown ? 'scaleY(1)' : 'scaleY(0)' }}
                  />
                  <span 
                    className="absolute -top-7 whitespace-nowrap font-mono text-xs font-bold tabular-nums text-bone transition-opacity duration-1000 ease-out"
                    style={{ opacity: shown ? 1 : 0 }}
                  >
                    {d.display}
                  </span>
                  <span
                    className={`absolute -top-[5px] h-2.5 w-2.5 ${FILL[d.accent]} transition-opacity duration-1000 ease-out`}
                    style={{ opacity: shown ? 1 : 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            {data.map((d) => (
              <span
                key={d.label}
                className="flex-1 pt-3 text-center font-mono text-[10px] leading-tight text-ash"
              >
                {d.label}
              </span>
            ))}
          </div>
        </>
      )}

      {note && (
        <p className="mt-6 border-l border-ash/25 pl-4 font-mono text-[10.5px] italic leading-relaxed text-ash">
          {note}
        </p>
      )}
    </figure>
  );
}

export default PaperFigure;
