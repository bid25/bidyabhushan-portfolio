"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception to console for local and production debugging
    console.error("Runtime exception trapped by error boundary:", error);
  }, [error]);

  return (
    <div className="w-full flex-1 flex items-center justify-center px-4 sm:px-8 py-20 font-mono text-[#0B3D2E]">
      <div className="w-full max-w-[680px] bg-[#FFF6C2] border-4 border-[#0B3D2E] p-6 sm:p-10 shadow-[8px_8px_0_#FF5C8A] relative">
        {/* Panic Badge */}
        <div className="inline-block bg-[#FF5C8A] border-3 border-[#0B3D2E] px-3 py-1 font-pixel text-xs text-[#0B3D2E] shadow-[3px_3px_0_#0B3D2E] mb-6">
          KERNEL PANIC // TRAPPED EXCEPTION
        </div>

        <h1 className="font-pixel text-2xl sm:text-3xl text-[#0B3D2E] leading-tight mb-4">
          SYSTEM FAULT DETECTED
        </h1>

        <p className="font-mono text-base text-[#0B3D2E] leading-relaxed mb-6 border-l-4 border-[#FF5C8A] pl-4">
          A runtime execution anomaly was contained by the application boundary. The underlying process has been safely halted.
        </p>

        {error.digest && (
          <div className="bg-[#0B3D2E] text-[#FFD93B] p-3 border-2 border-[#0B3D2E] font-mono text-xs mb-8 overflow-x-auto">
            Fault Digest: {error.digest}
          </div>
        )}

        {/* Recovery Action Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
          <button
            onClick={() => reset()}
            style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
            className="btn inline-flex items-center justify-center px-6 py-3 font-bold font-mono border-3 border-[#0B3D2E] shadow-[4px_4px_0_#FF5C8A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm cursor-pointer"
          >
            RELOAD SESSION (RETRY)
          </button>
          <Link
            href="/"
            style={{ backgroundColor: "#FFD93B", color: "#0B3D2E" }}
            className="btn inline-flex items-center justify-center px-5 py-3 font-bold font-mono border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm"
          >
            ← SAFE REBOOT (HOME)
          </Link>
        </div>
      </div>
    </div>
  );
}

