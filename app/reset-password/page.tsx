import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Reset your password — Broccoli",
  description: "Open your Broccoli password reset link on the phone where the app is installed.",
  // This page exists only as a fallback for a link meant to open an app.
  // There is nothing here worth indexing, and a stray search result for
  // "reset your password" pointing at a portfolio site would be confusing.
  robots: { index: false, follow: false },
};

/**
 * Fallback for Broccoli password-reset links.
 *
 * Reset emails link to https://bidyabhushan.in/reset-password?token=… as a
 * verified Android App Link / iOS Universal Link. When verification is working,
 * the phone hands the link straight to the Broccoli app and this page is never
 * rendered. It only appears when the link is opened somewhere the app can't
 * handle it — a laptop, or a phone without Broccoli installed.
 *
 * Without this page those cases hit a 404, which reads as "the reset flow is
 * broken" rather than "you opened it on the wrong device."
 *
 * Deliberately server-rendered with no client JavaScript: it must work when
 * everything else fails, per DESIGN.md's progressive-enhancement rule. It also
 * never reads the ?token= parameter — the token is single-use and belongs to the
 * app. Rendering it into HTML would leak it into browser history, analytics
 * referrers and any extension on the page, which is precisely the class of leak
 * the App Links work exists to prevent.
 */
export default function ResetPasswordPage() {
  return (
    <div className="text-bone">
      <section className="relative min-h-screen pt-24 pb-16">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-16">
          <header className="mb-16">
            <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
              Broccoli
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
              Reset your password
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
                  <span>Tap the reset link there. The app opens straight to the reset screen.</span>
                </li>
              </ol>
            </div>

            <div className="border-t border-ash/20 pt-6">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
                Worth knowing
              </p>
              <ul className="space-y-3 font-body text-sm leading-[1.6] text-ash">
                <li>Reset links expire 15 minutes after they&apos;re sent, and work once.</li>
                <li>
                  If yours has expired, request a new one from the app: Settings → Account → Sign in
                  → Forgot password.
                </li>
                <li>
                  If you didn&apos;t ask for a password reset, ignore the email. Nothing changes
                  until the link is used.
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
