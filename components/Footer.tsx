"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/lens" || pathname === "/broccoli" || pathname?.startsWith("/broccoli")) {
    return null;
  }

  return (
    <footer className="w-full bg-[#0B3D2E] text-[#FFD93B] border-t-4 border-[#0B3D2E] py-12 px-6 sm:px-8 text-center mt-20 relative z-20 font-mono">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center gap-6">
        {/* Retro Arcade START prompt */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="font-pixel text-sm sm:text-base md:text-lg text-[#FFD93B] tracking-wider select-none">
            PRESS
          </span>
          <Link
            href="/contact"
            className="pop group relative inline-flex items-center gap-2.5 bg-[#FF5C8A] border-3 border-[#FFD93B] px-5 py-2.5 sm:px-6 sm:py-3 font-pixel text-xs sm:text-sm md:text-base tracking-wider shadow-[4px_4px_0_#FFD93B] hover:shadow-[1px_1px_0_#FFD93B] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            aria-label="Press START to collaborate - Go to Contact Page"
          >
            <span className="w-2.5 h-2.5 bg-[#0B3D2E] animate-pulse rounded-none" />
            <span className="text-[#0B3D2E] font-bold tracking-widest">START</span>
            <span className="text-[#0B3D2E] font-mono text-xs font-bold group-hover:translate-x-0.5 transition-transform">
              ▶
            </span>
          </Link>
          <span className="font-pixel text-sm sm:text-base md:text-lg text-[#FFD93B] tracking-wider select-none">
            TO COLLABORATE
          </span>
        </div>

        {/* Sub-text credits */}
        <div className="text-xs sm:text-sm text-[#FFD93B]/80 font-mono flex items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} BIDYA BHUSHAN NANDA</span>
          <span>·</span>
          <span>New Delhi, India</span>
        </div>
      </div>
    </footer>
  );
}
