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
  amber: "bg-[#FF5C8A] border-2 border-[#0B3D2E]",
  cyan: "bg-[#0B3D2E] border-2 border-[#0B3D2E]",
  ash: "bg-[#0B3D2E]/25 border-2 border-[#0B3D2E]/40",
};

const TEXT: Record<Accent, string> = {
  amber: "text-[#FF5C8A]",
  cyan: "text-[#0B3D2E]",
  ash: "text-[#0B3D2E]/70",
};

/**
 * Figures for the research paper rendered as an authentic Neo-Brutalist Research Exhibit Artifact.
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
      className="my-10 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-6 sm:p-8 shadow-[8px_8px_0_#0B3D2E] relative"
      aria-label={`${figure}. ${title}. ${summary}`}
    >
      {/* Top Exhibit Banner */}
      <figcaption className="mb-8 border-b-2 border-dashed border-[#0B3D2E]/40 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            EXHIBIT // {figure.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ EMPIRICAL BENCHMARK ]
          </span>
        </div>

        <span className="block font-mono text-base sm:text-lg font-bold leading-snug text-[#0B3D2E]">
          {title}
        </span>
        <span className="mt-1.5 block font-mono text-xs leading-relaxed text-[#0B3D2E]/75">
          {source}
        </span>
      </figcaption>

      {/* Column Chart Variant */}
      {kind === "column" && (
        <div className="flex h-[180px] sm:h-[230px] items-end gap-3 sm:gap-6 lg:gap-12 border-b-3 border-[#0B3D2E] pt-4 sm:pt-8 overflow-x-auto pb-1">
          {data.map((d) => (
            <div
              key={d.label}
              className="flex h-full flex-1 flex-col items-center justify-end min-w-[70px]"
            >
              <span
                className="mb-1.5 font-pixel text-xs sm:text-sm font-bold tabular-nums text-[#0B3D2E] transition-opacity duration-1000 ease-out"
                style={{ opacity: shown ? 1 : 0 }}
              >
                {d.display}
              </span>
              <div
                className="w-full max-w-[90px]"
                style={{ height: `${pct(d.value)}%` }}
              >
                <div
                  className={`w-full h-full origin-bottom ${FILL[d.accent]} shadow-[3px_3px_0_#0B3D2E] transition-transform duration-1000 ease-out motion-reduce:transition-none`}
                  style={{ transform: shown ? "scaleY(1)" : "scaleY(0)" }}
                />
              </div>
              <span className="mt-2.5 sm:mt-3 text-center font-mono text-[10px] sm:text-[11px] font-bold leading-tight text-[#0B3D2E]">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Bar Chart Variant */}
      {kind === "bar" && (
        <div className="space-y-4">
          {data.map((d) => (
            <div key={d.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4 font-mono">
                <span className="text-xs font-bold text-[#0B3D2E]">
                  {d.label}
                </span>
                <span className={`font-pixel text-xs font-bold ${TEXT[d.accent]}`}>
                  {d.display}
                </span>
              </div>
              <div className="relative h-[24px] w-full bg-[#FFF0B3] border-2 border-[#0B3D2E]">
                <div
                  className={`absolute inset-y-0 left-0 h-full origin-left ${FILL[d.accent]} transition-transform duration-1000 ease-out motion-reduce:transition-none`}
                  style={{
                    width: `${pct(d.value)}%`,
                    transform: shown ? "scaleX(1)" : "scaleX(0)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Log Scale Variant */}
      {kind === "log" && (
        <>
          <div className="flex h-[180px] sm:h-[240px] items-end border-b-3 border-[#0B3D2E] pt-5 sm:pt-9">
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
                    className="absolute inset-y-0 left-0 border-l-2 border-dashed border-[#0B3D2E]/40 origin-bottom transition-transform duration-1000 ease-out motion-reduce:transition-none"
                    style={{ transform: shown ? "scaleY(1)" : "scaleY(0)" }}
                  />
                  <span
                    className="absolute -top-7 whitespace-nowrap font-pixel text-[10px] font-bold tabular-nums text-[#0B3D2E] transition-opacity duration-1000 ease-out"
                    style={{ opacity: shown ? 1 : 0 }}
                  >
                    {d.display}
                  </span>
                  <span
                    className={`absolute -top-[6px] h-3.5 w-3.5 ${FILL[d.accent]} shadow-[2px_2px_0_#0B3D2E] transition-opacity duration-1000 ease-out`}
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
                className="flex-1 pt-3 text-center font-mono text-[10.5px] font-bold leading-tight text-[#0B3D2E]"
              >
                {d.label}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Hand-Annotated Note Callout */}
      {note && (
        <div className="mt-6 border-2 border-dashed border-[#0B3D2E] bg-[#FFF0B3] p-3.5 -rotate-[0.5deg]">
          <div className="flex items-start gap-2">
            <span className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] px-1.5 py-0.5 border border-[#0B3D2E] font-bold">
              NOTE
            </span>
            <p className="m-0 font-hand text-xl leading-snug text-[#0B3D2E]">
              {note}
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}

export default PaperFigure;
