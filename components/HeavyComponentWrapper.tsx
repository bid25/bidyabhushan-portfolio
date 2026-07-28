"use client";

import { useInView } from "react-intersection-observer";
import { useSyncExternalStore } from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** Custom rootMargin for intersection observer. Default: "200px 0px" */
  rootMargin?: string;
  /** Skip the mobile viewport bypass — for children that aren't GPU/WebGL heavy. Default: true */
  mobileBypass?: boolean;
}

function subscribeToMediaQuery(query: string) {
  return (callback: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", callback);
    return () => mediaQueryList.removeEventListener("change", callback);
  };
}

function getMediaQuerySnapshot(query: string) {
  return () => window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeMobile = subscribeToMediaQuery(MOBILE_QUERY);
const getMobileSnapshot = getMediaQuerySnapshot(MOBILE_QUERY);
const subscribeReducedMotion = subscribeToMediaQuery(REDUCED_MOTION_QUERY);
const getReducedMotionSnapshot = getMediaQuerySnapshot(REDUCED_MOTION_QUERY);

export function HeavyComponentWrapper({
  children,
  fallback = null,
  rootMargin = "200px 0px",
  mobileBypass = true,
}: Props) {
  const { ref, inView } = useInView({ rootMargin });
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  // Accessibility bypass: never mount WebGL components if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className="h-full w-full">{fallback}</div>;
  }

  // Mobile bypass: never mount WebGL components on small screens
  if (isMobile && mobileBypass) {
    return <div className="h-full w-full">{fallback}</div>;
  }

  // Desktop viewport mounting: unmounts WebGL when out of view
  return (
    <div ref={ref} className="h-full w-full">
      {inView ? children : fallback}
    </div>
  );
}
