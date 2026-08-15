import type { Metadata } from "next";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Confirm your new email — Broccoli",
  description: "Open your Broccoli email-change link on the phone where the app is installed.",
  robots: { index: false, follow: false },
};

/**
 * Fallback for Broccoli email-CHANGE links.
 *
 * Distinct from `/verify-email`, which finishes a signup. This one finishes a
 * change of address on an account that already exists, and the wording has to
 * make that difference obvious — someone who lands here from the wrong email
 * should be able to tell immediately which flow they are in.
 *
 * Same constraints as the others: server-rendered, no client JavaScript, and it
 * never reads the ?token= parameter, which is a live single-use credential.
 */
export default function ConfirmEmailPage() {
  return (
    <div className="text-bone">
      <section className="relative min-h-screen pt-24 pb-16">
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-16">
          <header className="mb-16">
            <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
              Broccoli
            </p>
            <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">
              Confirm your new email
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
                  <span>Open this email on the phone that has Broccoli installed.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-6 shrink-0 font-display text-sm text-cyan">02</span>
                  <span>Tap the link there. The app switches your account to this address.</span>
                </li>
              </ol>
            </div>

            <div className="border-t border-ash/20 pt-6">
              <p className="mb-3 font-body text-xs font-medium uppercase tracking-[0.05em] text-ash">
                Worth knowing
              </p>
              <ul className="space-y-3 font-body text-sm leading-[1.6] text-ash">
                <li>The link works for 24 hours, and works once.</li>
                <li>
                  Until you open it, your account keeps its previous address — nothing has
                  changed yet.
                </li>
                <li>
                  If the link has expired, start the change again from Settings → Account in the
                  app.
                </li>
                <li>
                  If you didn&apos;t ask to change a Broccoli account&apos;s email to this
                  address, ignore this — nothing will happen. The account&apos;s current address
                  has also been told a change was requested.
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
