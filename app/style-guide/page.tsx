import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Style Guide — Bidyabhushan Nanda",
  description: "Design system reference for the Terminal Session direction.",
};

const colors = [
  {
    name: "Void",
    token: "--color-void",
    hex: "#0A0B0D",
    role: "Background. Near-black, intentional — not default #000.",
    class: "bg-void",
  },
  {
    name: "Ash",
    token: "--color-ash",
    hex: "#6E7681",
    role: "Secondary text, borders, dividers.",
    class: "bg-ash",
  },
  {
    name: "Bone",
    token: "--color-bone",
    hex: "#EDEAE4",
    role: "Primary text. High contrast against Void, not pure white.",
    class: "bg-bone",
  },
  {
    name: "Signal Amber",
    token: "--color-amber",
    hex: "#F5A623",
    role: "Interactive: links, buttons, hover, focus rings.",
    class: "bg-amber",
  },
  {
    name: "Terminal Cyan",
    token: "--color-cyan",
    hex: "#22D3EE",
    role: "Informational: tags, metadata, categories, timestamps.",
    class: "bg-cyan",
  },
];

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-void text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        {/* ── Header ──────────────────────────────────────── */}
        <header className="mb-20">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.05em] text-ash">
            Design System Reference
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
            Style Guide
          </h1>
          <p className="mt-4 max-w-[65ch] font-body text-base leading-relaxed text-ash">
            Terminal Session design tokens rendered in the browser. This page
            exists to sanity-check the type scale, palette, and component states
            before building real pages on top of them.
          </p>
        </header>

        {/* ── Type Scale ──────────────────────────────────── */}
        <section className="mb-20">
          <SectionLabel>Typography</SectionLabel>

          <div className="space-y-10">
            <TypeSample
              level="Display"
              font="JetBrains Mono"
              spec="Bold · clamp(2.5rem, 5vw, 4rem) · line-height 1.1"
            >
              <span className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
                Display Heading
              </span>
            </TypeSample>

            <TypeSample
              level="Headline"
              font="JetBrains Mono"
              spec="Semibold · clamp(1.5rem, 3vw, 2rem) · line-height 1.2"
            >
              <span className="font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2]">
                Headline Text
              </span>
            </TypeSample>

            <TypeSample
              level="Title"
              font="Instrument Sans"
              spec="Medium · 1.125rem · line-height 1.4"
            >
              <span className="font-body text-[1.125rem] font-medium leading-[1.4]">
                Title Level Text
              </span>
            </TypeSample>

            <TypeSample
              level="Body"
              font="Instrument Sans"
              spec="Regular · 1rem · line-height 1.6 · max-width 65ch"
            >
              <span className="font-body text-base font-normal leading-relaxed">
                Body text is set in Instrument Sans at 1rem with a generous 1.6
                line-height. It carries prose — project descriptions, blog
                content, about sections. The max-width constraint at 65
                characters keeps lines comfortable to read without requiring
                explicit column breaks.
              </span>
            </TypeSample>

            <TypeSample
              level="Label"
              font="Instrument Sans"
              spec="Medium · 0.75rem · letter-spacing 0.05em · uppercase"
            >
              <span className="font-body text-xs font-medium uppercase tracking-[0.05em]">
                Label · Tag · Metadata · Navigation
              </span>
            </TypeSample>
          </div>

          <div className="mt-8 border-t border-ash/30 pt-6">
            <p className="font-body text-xs uppercase tracking-[0.05em] text-amber">
              Monospace Threshold Rule
            </p>
            <p className="mt-2 max-w-[65ch] font-body text-sm leading-relaxed text-ash">
              Display and Headline scale use JetBrains Mono. Title and below use
              Instrument Sans. The boundary is semantic: large type establishes
              engineering context, small type prioritizes reading speed.
            </p>
          </div>
        </section>

        {/* ── Colors ──────────────────────────────────────── */}
        <section className="mb-20">
          <SectionLabel>Colors</SectionLabel>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {colors.map((c) => (
              <div key={c.token}>
                <div
                  className={`${c.class} h-24 w-full border border-ash/30`}
                />
                <div className="mt-3">
                  <p className="font-display text-sm font-semibold">
                    {c.name}
                  </p>
                  <p className="font-mono text-xs text-ash">{c.hex}</p>
                  <p className="mt-1 font-body text-xs leading-snug text-ash">
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-ash/30 pt-6">
            <p className="font-body text-xs uppercase tracking-[0.05em] text-amber">
              Two-Signal Rule
            </p>
            <p className="mt-2 max-w-[65ch] font-body text-sm leading-relaxed text-ash">
              Signal Amber and Terminal Cyan never appear on the same element.
              Warm = action (links, buttons, focus). Cool = information (tags,
              metadata, categories). No gradients combining them.
            </p>
          </div>
        </section>

        {/* ── Buttons ─────────────────────────────────────── */}
        <section className="mb-20">
          <SectionLabel>Button States</SectionLabel>

          <div className="space-y-10">
            <ButtonRow label="Primary (default)" variant="default" />
            <ButtonRow label="Outline" variant="outline" />
            <ButtonRow label="Ghost" variant="ghost" />
            <ButtonRow label="Secondary" variant="secondary" />
            <ButtonRow label="Link" variant="link" />
          </div>

          <div className="mt-8 border-t border-ash/30 pt-6">
            <p className="font-body text-xs uppercase tracking-[0.05em] text-amber">
              Design rules enforced
            </p>
            <ul className="mt-2 space-y-1 font-body text-sm leading-relaxed text-ash">
              <li>
                <span className="text-bone">Sharp Edge</span> — border-radius: 0
                on all variants
              </li>
              <li>
                <span className="text-bone">Zero-Shadow</span> — no box-shadow
                anywhere
              </li>
              <li>
                <span className="text-bone">No-Gradient</span> — flat solid
                backgrounds only
              </li>
              <li>
                <span className="text-bone">Focus</span> — 1px ring in Signal
                Amber (tab to preview)
              </li>
            </ul>
          </div>
        </section>

        {/* ── Rules Checklist ─────────────────────────────── */}
        <section className="mb-20">
          <SectionLabel>Rules Verification</SectionLabel>

          <div className="space-y-4 font-body text-sm leading-relaxed">
            <RuleCheck rule="No-Gradient Rule" status="pass">
              Zero gradients on this page. All color fields are flat solid fills.
            </RuleCheck>
            <RuleCheck rule="Zero-Shadow Rule" status="pass">
              No box-shadow in use. Separation via spacing, borders, or
              background shift.
            </RuleCheck>
            <RuleCheck rule="Sharp Edge Rule" status="pass">
              All border-radius set to 0px via --radius token override.
            </RuleCheck>
            <RuleCheck rule="No-Card Rule" status="pass">
              No bordered/shadowed card containers. Sections separated by space
              and type.
            </RuleCheck>
            <RuleCheck rule="No-Icon-Tile Rule" status="pass">
              No rounded-square icon tiles used as section or feature markers.
            </RuleCheck>
            <RuleCheck rule="Two-Signal Rule" status="pass">
              Amber and Cyan never combined on a single element.
            </RuleCheck>
            <RuleCheck rule="Monospace Threshold Rule" status="pass">
              Display/Headline in JetBrains Mono. Title and below in Instrument
              Sans.
            </RuleCheck>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ── Helper components ──────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2]">
      {children}
    </h2>
  );
}

function TypeSample({
  level,
  font,
  spec,
  children,
}: {
  level: string;
  font: string;
  spec: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-ash/20 pb-6">
      <div className="mb-2 flex items-baseline gap-3">
        <span className="font-body text-xs uppercase tracking-[0.05em] text-amber">
          {level}
        </span>
        <span className="font-mono text-xs text-ash">
          {font} · {spec}
        </span>
      </div>
      <div className="text-bone">{children}</div>
    </div>
  );
}

function ButtonRow({
  label,
  variant,
}: {
  label: string;
  variant: "default" | "outline" | "ghost" | "secondary" | "link";
}) {
  return (
    <div>
      <p className="mb-3 font-body text-xs uppercase tracking-[0.05em] text-ash">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant={variant}>Default</Button>
        <Button variant={variant} disabled>
          Disabled
        </Button>
        <span className="font-mono text-xs text-ash">
          hover + focus: interact to preview
        </span>
      </div>
    </div>
  );
}

function RuleCheck({
  rule,
  status,
  children,
}: {
  rule: string;
  status: "pass" | "fail";
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className={`mt-0.5 inline-block h-4 w-4 shrink-0 border ${
          status === "pass"
            ? "border-amber bg-amber/20 text-amber"
            : "border-destructive bg-destructive/20 text-destructive"
        } flex items-center justify-center font-mono text-[10px] leading-none`}
      >
        {status === "pass" ? "✓" : "✗"}
      </span>
      <div>
        <p className="font-display text-sm font-medium text-bone">{rule}</p>
        <p className="text-ash">{children}</p>
      </div>
    </div>
  );
}
