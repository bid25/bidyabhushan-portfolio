"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  };
}

function getSnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

/** SSR-safe media query hook, matching the pattern in HeavyComponentWrapper. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(subscribe(query), getSnapshot(query), getServerSnapshot);
}

export const PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const IS_TABLET_DOWN = "(max-width: 1023px)";
export const IS_MOBILE = "(max-width: 767px)";
