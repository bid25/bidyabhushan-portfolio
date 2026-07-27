import type { Metadata } from "next";
import BlurText from "@/components/BlurText";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — Bidya Bhushan Nanda",
  description: "Ways to reach Bidya Bhushan Nanda.",
};

const channels = [
  { label: "Email", value: "bidyabhushannanda@gmail.com", href: "mailto:bidyabhushannanda@gmail.com" },
  { label: "GitHub", value: "github.com/bid25", href: "https://github.com/bid25" },
  { label: "LinkedIn", value: "linkedin.com/in/bidya-bhushan-nanda", href: "https://linkedin.com/in/bidya-bhushan-nanda" },
  { label: "Resume", value: "View / Download", href: "/Resume.pdf" },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen text-bone overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <BlurText
            text="Reach out"
            as="p"
            className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash"
            delay={80}
            animateBy="letters"
            direction="top"
            stepDuration={0.3}
          />
          <BlurText
            text="Contact"
            as="h1"
            className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]"
            delay={120}
            animateBy="words"
            direction="top"
            stepDuration={0.4}
          />
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
              {channel.href ? (
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  {channel.value}
                </a>
              ) : (
                <span className="font-body text-base text-bone">
                  {channel.value}
                </span>
              )}
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
