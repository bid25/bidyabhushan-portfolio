"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/projects", label: "PROJECTS" },
  { href: "/about", label: "ABOUT" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT", isContact: true },
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname === "/lens" || pathname?.startsWith("/lens") || pathname === "/broccoli" || pathname?.startsWith("/broccoli")) {
    return null;
  }

  return (
    <nav className="w-full max-w-[1240px] mx-auto pt-4 sm:pt-6 px-3.5 sm:px-8 box-border relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-3 sm:border-4 border-ink bg-panel p-2.5 sm:p-3 sm:px-4 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E]">
        {/* Brand Logo Switchers: DEV (Lens switch) + BROCCOLI Flagship Pill */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/lens"
            title="Switch to Photography & Film Showcase (/lens)"
            className="group inline-flex items-center text-decoration-none"
          >
            <span
              className="glitch-mark font-pixel text-base bg-[#0B3D2E] !text-[#FFD93B] px-3.5 py-1.5 border-3 border-[#FFD93B] shadow-[3px_3px_0_#0A0A0A] group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:bg-[#FFD93B] group-hover:border-[#0B3D2E] group-hover:!text-[#0B3D2E] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center justify-center min-h-[44px] h-[44px] select-none cursor-pointer"
            >
              <span className="glitch-text" data-text="DEV">
                DEV
              </span>
            </span>
          </Link>

          <Link
            href="/broccoli"
            title="Broccoli - Caloric & Body Composition Instrument (/broccoli)"
            className="hidden md:inline-flex group items-center text-decoration-none"
          >
            <span className="bg-[#1A1F14] group-hover:bg-[#B9D94A] group-active:bg-[#B9D94A] border-3 border-[#B9D94A] group-hover:border-[#1A1F14] group-active:border-[#1A1F14] px-3.5 shadow-[3px_3px_0_#0A0A0A] flex items-center justify-center min-h-[44px] h-[44px] group-hover:scale-105 group-hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all select-none cursor-pointer">
              <img
                src="/images/broccoli-logo-light-crop.png"
                alt="Broccoli"
                className="h-[20px] w-auto block group-hover:hidden group-active:hidden object-contain"
              />
              <img
                src="/images/broccoli-logo-on-lime.png"
                alt="Broccoli"
                className="h-[20px] w-auto hidden group-hover:block group-active:block object-contain"
              />
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-wrap items-center gap-2 font-bold font-mono text-sm">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            const activeClass = isActive ? "active" : "";
            const contactClass = link.isContact ? "contact" : "";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`btn nav-link-dev px-3.5 py-2 min-h-[44px] flex items-center justify-center ${activeClass} ${contactClass}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          className="md:hidden border-3 border-ink bg-ink text-canvas p-2 flex items-center justify-center cursor-pointer hover:bg-pink hover:text-ink transition-colors"
        >
          {isOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 border-3 sm:border-4 border-ink bg-panel p-3.5 sm:p-4 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] flex flex-col gap-2 font-bold font-mono">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            const activeClass = isActive ? "active" : "";
            const contactClass = link.isContact ? "contact" : "";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link-dev px-4 py-3 min-h-[44px] flex items-center justify-between text-base ${activeClass} ${contactClass}`}
              >
                <span>{link.label}</span>
                <span className="font-pixel text-xs">→</span>
              </Link>
            );
          })}

          {/* Mobile Broccoli Flagship Link */}
          <Link
            href="/broccoli"
            className="nav-link-dev broccoli px-4 py-3 min-h-[51px] flex items-center justify-between text-base mt-2 shadow-[3px_3px_0_#0A0A0A] group"
          >
            <span className="flex items-center gap-2">
              <img
                src="/images/broccoli-logo-light-crop.png"
                alt="Broccoli"
                className="h-[22px] w-auto block group-hover:hidden group-active:hidden object-contain"
              />
              <img
                src="/images/broccoli-logo-on-lime.png"
                alt="Broccoli"
                className="h-[22px] w-auto hidden group-hover:block group-active:block object-contain"
              />
            </span>
            <span className="font-pixel text-xs text-[#B9D94A] group-hover:text-[#1A1F14] group-active:text-[#1A1F14] transition-colors">
              →
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}
