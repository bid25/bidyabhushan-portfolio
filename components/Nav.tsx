"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ash/30 bg-void">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-tight text-bone"
        >
          BN
        </Link>

        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={`font-body text-xs font-medium uppercase tracking-[0.05em] transition-colors ${
                    isActive ? "text-amber" : "text-ash hover:text-bone"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
