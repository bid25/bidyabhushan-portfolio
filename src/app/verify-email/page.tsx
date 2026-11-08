import type { Metadata } from "next";
import Link from "next/link";
import { PixelBroccoli } from "@/components/PixelBroccoli";

export const metadata: Metadata = {
  title: "Confirm your email - Broccoli",
  description: "Open your Broccoli confirmation link on the phone where the app is installed.",
  robots: { index: false, follow: false },
};

/**
 * Fallback for Broccoli email-confirmation links.
 *
 * Mirrors `app/reset-password/page.tsx` exactly - same structure, same reason.
 * Confirmation emails link to https://www.bidyabhushan.in/verify-email?token=…
 * as a verified App Link, so on a phone with Broccoli installed the app catches
 * it and this page never renders. It appears only on a laptop, or a phone
 * without the app.
 *
 * Server-rendered with no client JavaScript, and it never reads the ?token=
 * parameter - that is a live single-use credential and rendering it into HTML
 * would leak it into browser history and analytics referrers.
 *
 * The copy assumes Broccoli 4J semantics: registration writes to
 * `pending_registrations` and the `users` row is created only when this link is
 * opened. So there is no account to sign into, and no Settings → Account to
 * reach, until confirmation happens - an earlier draft of this page said
 * otherwise and sent expired users to a screen they could not open. If that
 * ever changes on the API side, this page changes with it.
 */
export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20 font-mono text-[#0B3D2E]">
      {/* Top back navigation */}
      <div className="pt-8 mb-2">
        <Link
          href="/broccoli"
          className="btn inline-flex items-center gap-2 font-pixel text-xs px-3.5 py-2 bg-[#FFF6C2] text-[#0B3D2E] border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
        >
          ← BROCCOLI OVERVIEW
        </Link>
      </div>

      {/* Hero Header Section */}
      <div className="relative pt-8 pb-6">
        {/* Decorative Dot Matrix SVG */}
        <svg
          aria-hidden="true"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="absolute right-[4%] top-6 pointer-events-none hidden sm:block"
        >
          <g fill="#0B3D2E">
            <circle cx="10" cy="10" r="6" />
            <circle cx="40" cy="10" r="6" />
            <circle cx="70" cy="10" r="6" />
            <circle cx="10" cy="40" r="6" />
            <circle cx="40" cy="40" r="6" />
            <circle cx="70" cy="40" r="6" />
          </g>
        </svg>

        <div className="mb-3">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 border-2 border-[#0B3D2E] inline-block">
            BROCCOLI // APP LINK FALLBACK
          </span>
        </div>
        <h1 className="gl m-0 font-pixel text-2xl sm:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          CONFIRM YOUR EMAIL
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[640px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed font-mono">
          This link opens in the Broccoli app. You&apos;re seeing this page because it was
          opened somewhere the app isn&apos;t installed: a computer, or a different phone.
        </p>
      </div>

      {/* Case Study Styled Body Card */}
      <div className="un w-full max-w-[1000px] mx-auto mt-6">
        <div
          className="relative bg-[#FFF0B3] border-3 sm:border-4 border-[#0B3D2E] p-5 sm:p-8 md:p-12 shadow-[6px_6px_0_#0B3D2E] sm:shadow-[12px_12px_0_#0B3D2E] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(#0B3D2E14 1.5px,transparent 1.5px),linear-gradient(90deg,#0B3D2E14 1.5px,transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        >
          {/* Sheet Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-pixel text-[10px] sm:text-[11px] text-[#0B3D2E] border-b-2 border-dashed border-[#0B3D2E]/30 pb-3 mb-6">
            <span>DRAFT // FALLBACK DISPATCH</span>
            <span>FIG. BROCCOLI-VERIFY</span>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 font-mono text-xs sm:text-[13px] font-bold mb-8">
            <span className="bg-[#0B3D2E] text-[#FFD93B] border-2 border-[#0B3D2E] px-2.5 py-1">
              Broccoli App Link
            </span>
            <span className="bg-[#FFF8D6] text-[#0B3D2E] border-2 border-[#0B3D2E] px-2.5 py-1">
              Single-Use Token
            </span>
            <span className="bg-[#FFF8D6] text-[#0B3D2E] border-2 border-[#0B3D2E] px-2.5 py-1">
              Offline-First Vault
            </span>
          </div>

          {/* Title Stamp with circled badge, pink swoosh, and official app icon */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4 mb-8">
            <div className="min-w-0 flex-1">
              <h2 className="m-0 font-hand font-semibold text-3xl sm:text-5xl leading-[1.15] text-[#0B3D2E] break-words">
                <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-4 -rotate-2">
                  NEW ACCOUNT
                </span>{" "}
                - Email Confirmation
              </h2>
              <svg
                viewBox="0 0 460 20"
                fill="none"
                className="w-full max-w-[460px] h-auto block mt-1"
              >
                <path
                  className="dw"
                  pathLength="1"
                  d="M4 12 C120 4, 260 18, 450 10"
                  stroke="#FF5C8A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <div className="flex sm:flex-col items-center gap-1.5 self-start shrink-0">
              <PixelBroccoli width={64} height={64} />
              <div className="font-pixel text-[7px] text-center text-[#0B3D2E]">
                APP ICON
              </div>
            </div>
          </div>

          {/* 1. what to do */}
          <h3 className="font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E] mt-8 mb-3">
            1. what to do
          </h3>
          <p className="font-hand text-xl sm:text-2xl text-[#0B3D2E] leading-snug mb-5">
            Your offline database awaits verification. Finalize your account from the device running Broccoli:
          </p>

          <div className="space-y-3.5 mb-8">
            <div className="border-3 border-[#0B3D2E] bg-[#FFF8D6] p-4 sm:p-5 shadow-[4px_4px_0_#0B3D2E]">
              <div className="flex items-start gap-3.5">
                <span className="font-pixel text-xs bg-[#0B3D2E] text-[#FFD93B] px-2.5 py-1 border-2 border-[#0B3D2E] shrink-0 mt-0.5">
                  01
                </span>
                <p className="font-hand text-xl sm:text-2xl text-[#0B3D2E] m-0 leading-snug font-bold">
                  Open the same email on the phone that has Broccoli installed.
                </p>
              </div>
            </div>

            <div className="border-3 border-[#0B3D2E] bg-[#FFF8D6] p-4 sm:p-5 shadow-[4px_4px_0_#0B3D2E]">
              <div className="flex items-start gap-3.5">
                <span className="font-pixel text-xs bg-[#0B3D2E] text-[#FFD93B] px-2.5 py-1 border-2 border-[#0B3D2E] shrink-0 mt-0.5">
                  02
                </span>
                <p className="font-hand text-xl sm:text-2xl text-[#0B3D2E] m-0 leading-snug font-bold">
                  Tap the link there. The app confirms the address and creates your account.
                </p>
              </div>
            </div>
          </div>

          {/* 2. worth knowing */}
          <h3 className="font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E] mt-10 mb-3">
            2. worth knowing
          </h3>
          <div className="border-3 border-[#0B3D2E] bg-[#FFF8D6] p-5 sm:p-6 shadow-[4px_4px_0_#0B3D2E] space-y-4 mb-8">
            <div className="flex items-start gap-3 font-hand text-xl sm:text-2xl text-[#0B3D2E] leading-snug">
              <span className="text-[#FF5C8A] font-bold text-2xl leading-none select-none">■</span>
              <span>Confirmation links work for 24 hours, and work once.</span>
            </div>
            <div className="flex items-start gap-3 font-hand text-xl sm:text-2xl text-[#0B3D2E] leading-snug">
              <span className="text-[#FF5C8A] font-bold text-2xl leading-none select-none">■</span>
              <span>
                Your account isn&apos;t created until you tap the link. Until then there is nothing to sign in to.
              </span>
            </div>
            <div className="flex items-start gap-3 font-hand text-xl sm:text-2xl text-[#0B3D2E] leading-snug">
              <span className="text-[#FF5C8A] font-bold text-2xl leading-none select-none">■</span>
              <span>
                If yours has expired, open Broccoli and sign up again with the same address. Nothing was created the first time.
              </span>
            </div>
            <div className="flex items-start gap-3 font-hand text-xl sm:text-2xl text-[#0B3D2E] leading-snug">
              <span className="text-[#FF5C8A] font-bold text-2xl leading-none select-none">■</span>
              <span>
                If you didn&apos;t sign up for Broccoli, ignore this. No account exists, and none is created unless this link is opened.
              </span>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t-3 border-dashed border-[#0B3D2E]/30 flex flex-wrap items-center justify-between gap-4 font-mono text-xs sm:text-sm text-[#0B3D2E]">
            <span>
              Broccoli is an offline-first calorie and nutrition tracker.
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/broccoli"
                className="text-[#0B3D2E] font-bold underline underline-offset-4 hover:bg-[#FF5C8A] px-1 py-0.5 transition-colors"
              >
                Broccoli Landing Page →
              </Link>
              <span className="text-[#0B3D2E]/40">•</span>
              <Link
                href="/projects"
                className="text-[#0B3D2E] font-bold underline underline-offset-4 hover:bg-[#FF5C8A] px-1 py-0.5 transition-colors"
              >
                All Projects →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
