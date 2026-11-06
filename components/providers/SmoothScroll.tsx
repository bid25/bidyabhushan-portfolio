"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // Standalone pages with their own custom 3D sticky scroll engines bypass Lenis
  if (prefersReducedMotion || pathname === "/broccoli" || pathname?.startsWith("/broccoli")) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
