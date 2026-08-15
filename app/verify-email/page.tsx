import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Confirm your email — Broccoli",
  description: "Open your Broccoli confirmation link on the phone where the app is installed.",
  robots: { index: false, follow: false },
};

/**
 * Fallback for Broccoli email-confirmation links.
 *
 * Mirrors `app/reset-password/page.tsx` exactly — same structure, same reason.
 * Confirmation emails link to https://www.bidyabhushan.in/verify-email?token=…
 * as a verified App Link, so on a phone with Broccoli installed the app catches
 * it and this page never renders. It appears only on a laptop, or a phone
 * without the app.
 *
 * Server-rendered with no client JavaScript, and it never reads the ?token=
 * parameter — that is a live single-use credential and rendering it into HTML
 * would leak it into browser history and analytics referrers.
 */
export default function VerifyEmailPage() {
  return (
    <div className="text-bone">
      <section className="relative min-h-screen pt-24 pb-16">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-16">
          <header className="mb-16">
            <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
              Broccoli
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
              Confirm your email
            </h1>
          </header>

          <div className="max-w-[65ch] space-y-6">
            <p className="font-body text-base leading-[1.6]">
              This link opens in the Broccoli app. You&apos;re seeing this page because it was
              opened somewhere the app isn&apos;t installed — a computer, or a different phone.
            </p>

            <div className="border-t border-ash/20 pt-6">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
                What to do
              </p>
              <ol className="space-y-3 font-body text-base leading-[1.6]">
                <li className="flex gap-4">
                  <span className="w-6 shrink-0 font-display text-sm text-cyan">01</span>
                  <span>Open the same email on the phone that has Broccoli installed.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-6 shrink-0 font-display text-sm text-cyan">02</span>
                  <span>Tap the link there. The app confirms the address and you&apos;re done.</span>
                </li>
              </ol>
            </div>

            <div className="border-t border-ash/20 pt-6">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
                Worth knowing
              </p>
              <ul className="space-y-3 font-body text-sm leading-[1.6] text-ash">
                <li>Confirmation links work for 24 hours, and work once.</li>
                <li>
                  If yours has expired, open Broccoli and send a new one from Settings → Account.
                </li>
                <li>
                  Confirming isn&apos;t required to use the app. It&apos;s what lets this address
                  recover the account if the password is forgotten.
                </li>
                <li>
                  If you didn&apos;t create a Broccoli account, ignore this. An unconfirmed address
                  can&apos;t be used for anything.
                </li>
              </ul>
            </div>

            <p className="border-t border-ash/20 pt-6 font-body text-sm leading-[1.6] text-ash">
              Broccoli is an offline-first calorie tracker.{" "}
              <a
                href="/projects"
                className="text-amber underline underline-offset-4 hover:no-underline"
              >
                More of my work
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
