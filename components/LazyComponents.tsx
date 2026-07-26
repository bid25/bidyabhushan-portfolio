"use client";

import dynamic from "next/dynamic";

export const LazyLanyard = dynamic(() => import("./Lanyard").then((mod) => mod.default || mod), { ssr: false });
export const LazyScrollStack = dynamic(() => import("./ScrollStack").then((mod) => mod.default || mod), { ssr: false });
export const LazyTextPressure = dynamic(() => import("./TextPressure").then((mod) => mod.default || mod), { ssr: false });
export const LazyEvilEye = dynamic(() => import("./EvilEye").then((mod) => mod.default || mod), { ssr: false });
export const LazyRadar = dynamic(() => import("./Radar").then((mod) => mod.default || mod), { ssr: false });
export const LazyInfiniteMenu = dynamic(() => import("./InfiniteMenu").then((mod) => mod.default || mod), { ssr: false });
