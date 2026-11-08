import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Sector Not Found",
  description: "The requested route does not exist in this memory bank.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 sm:px-8 py-20 font-mono text-[#0B3D2E]">
      <div className="w-full max-w-[680px] bg-[#FFF6C2] border-4 border-[#0B3D2E] p-6 sm:p-10 shadow-[8px_8px_0_#0B3D2E] relative">
        {/* Retro Header Tag */}
        <div className="inline-block bg-[#FF5C8A] border-3 border-[#0B3D2E] px-3 py-1 font-pixel text-xs text-[#0B3D2E] shadow-[3px_3px_0_#0B3D2E] mb-6">
          ERR_404 // INVALID_POINTER
        </div>

        <h1 className="font-pixel text-3xl sm:text-4xl text-[#0B3D2E] leading-tight mb-4">
          404: SECTOR NOT FOUND
        </h1>

        <p className="font-mono text-base sm:text-lg text-[#0B3D2E] leading-relaxed mb-8 border-l-4 border-[#0B3D2E] pl-4">
          The requested memory address does not resolve to an active node. It may have been moved, deleted, or entered with a typo.
        </p>

        {/* Action Gateways */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
          <Link
            href="/"
            style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
            className="btn inline-flex items-center justify-center px-6 py-3 font-bold font-mono border-3 border-[#0B3D2E] shadow-[4px_4px_0_#FF5C8A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
          >
            ← RETURN HOME
          </Link>
          <Link
            href="/projects"
            style={{ backgroundColor: "#FFD93B", color: "#0B3D2E" }}
            className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
          >
            VIEW PROJECTS →
          </Link>
          <Link
            href="/lens-portfolio"
            style={{ backgroundColor: "#FFF", color: "#0B3D2E" }}
            className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
          >
            LENS SHOWCASE →
          </Link>
        </div>
      </div>
    </div>
  );
}

