import type { Metadata } from "next";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyRadar as Radar } from "@/components/LazyComponents";

export const metadata: Metadata = {
  title: "Contact — Bidyabhushan Nanda",
  description: "Ways to reach Bidyabhushan Nanda.",
};

const channels = [
  { label: "Email", value: "bidyabhushannanda@gmail.com" },
  { label: "GitHub", value: "github.com/bid25" },
  { label: "LinkedIn", value: "linkedin.com/in/bidya-bhushan-nanda-6a0149369" },
  { label: "Résumé", value: "coming soon" },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-void text-bone overflow-hidden">
      
      {/* Radar background effect */}
      <div className="pointer-events-none absolute right-0 bottom-0 h-full w-full opacity-30 lg:w-[800px] lg:opacity-70 mix-blend-screen">
        <HeavyComponentWrapper fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-64 w-64 rounded-full border border-ash/20"></div>
          </div>
        }>
          <Radar />
        </HeavyComponentWrapper>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
            Reach out
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
            Contact
          </h1>
        </header>

        <ul className="max-w-[65ch] space-y-6">
          {channels.map((channel) => (
            <li
              key={channel.label}
              className="flex items-baseline gap-4 border-b border-ash/20 pb-6 last:border-b-0"
            >
              <span className="w-24 shrink-0 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
                {channel.label}
              </span>
              <span className="font-body text-base text-bone">
                {channel.value}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-16 max-w-[65ch] font-body text-sm italic leading-relaxed text-ash">
          Projects referenced on this site are confidential — happy to walk through architecture and code in a call.
        </p>
      </div>
    </div>
  );
}
