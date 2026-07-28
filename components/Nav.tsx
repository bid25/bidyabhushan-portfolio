"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile panel is open. Lenis's syncTouch
  // is false in this project (native touch scroll), so a plain overflow
  // lock on body is enough -- no Lenis instance needs to be reached into.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-ash/30 bg-void"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-bone"
        >
          BN
        </Link>

        {/* Desktop nav -- full row, hidden below md */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`cursor-target font-body text-xs font-medium uppercase tracking-[0.05em] transition-colors ${
                    isActive ? "text-amber" : "text-ash hover:text-bone"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls -- hidden at md and above */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center text-ash transition-colors hover:text-bone focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile panel -- link list, only present in the DOM while open */}
      {open && (
        <div id="mobile-nav-panel" className="border-t border-ash/30 bg-void md:hidden">
          <ul className="mx-auto flex max-w-[1200px] flex-col px-4 py-2 sm:px-8">
            {links.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-[44px] items-center font-body text-sm font-medium uppercase tracking-[0.05em] transition-colors ${
                      isActive ? "text-amber" : "text-ash hover:text-bone"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
