"use client";

import dynamic from "next/dynamic";

export const LazyLanyard = dynamic(() => import("./Lanyard").then((mod) => mod.default || mod), { ssr: false });
export const LazyTextPressure = dynamic(() => import("./TextPressure").then((mod) => mod.default || mod), { ssr: false });
export const LazyEvilEye = dynamic(() => import("./EvilEye").then((mod) => mod.default || mod), { ssr: false });
export const LazyDotField = dynamic(() => import("./DotField").then((mod) => mod.default || mod), { ssr: false });
export const LazyDotGrid = dynamic(() => import("./DotGrid").then((mod) => mod.default || mod), { ssr: false });
export const LazyProfileCard = dynamic(() => import("./ProfileCard").then((mod) => mod.default || mod), { ssr: false });
export const LazyRadar = dynamic(() => import("./Radar").then((mod) => mod.default || mod), { ssr: false });
export const LazyInfiniteMenu = dynamic(() => import("./InfiniteMenu").then((mod) => mod.default || mod), { ssr: false });
export const LazyLiquidEther = dynamic(() => import("./LiquidEther").then((mod) => mod.default || mod), { ssr: false });
export const LazyTargetCursor = dynamic(() => import("./TargetCursor").then((mod) => mod.default || mod), { ssr: false });
export const LazyDecryptedText = dynamic(() => import("./DecryptedText").then((mod) => mod.default || mod), { ssr: false });
