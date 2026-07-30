"use client";

import dynamic from "next/dynamic";

export const LazyLanyard = dynamic(() => import("./Lanyard").then((mod) => mod.default || mod), { ssr: false });
export const LazyTextPressure = dynamic(() => import("./TextPressure").then((mod) => mod.default || mod), { ssr: false });
export const LazyEvilEye = dynamic(() => import("./EvilEye").then((mod) => mod.default || mod), { ssr: false });
export const LazyDotField = dynamic(() => import("./DotField").then((mod) => mod.default || mod), { ssr: false });
export const LazyDotGrid = dynamic(() => import("./DotGrid").then((mod) => mod.default || mod), { ssr: false });
// `loading` is REQUIRED here, not optional. Without it, next/dynamic renders
// nothing between the moment this component mounts and the moment its chunk
// finishes downloading. On the home page that collapsed the card column to 0px
// and then popped it back — two ~260px shifts, worth 0.24 CLS EACH on mobile,
// where this column sits above all the copy. See PERF-PLAN.md §1.3b.
export const LazyProfileCard = dynamic(
  () => import("./ProfileCard").then((mod) => mod.default || mod),
  { ssr: false, loading: () => <div className="h-full w-full bg-void/50" /> }
);
export const LazyRadar = dynamic(() => import("./Radar").then((mod) => mod.default || mod), { ssr: false });
export const LazyInfiniteMenu = dynamic(() => import("./InfiniteMenu").then((mod) => mod.default || mod), { ssr: false });
export const LazyLiquidEther = dynamic(() => import("./LiquidEther").then((mod) => mod.default || mod), { ssr: false });
export const LazyTargetCursor = dynamic(() => import("./TargetCursor").then((mod) => mod.default || mod), { ssr: false });
// SSR is deliberately ON here. With `ssr: false` this component serialised as a
// BAILOUT_TO_CLIENT_SIDE_RENDERING template, so any <h1> built out of it shipped
// empty (height 0px) and jumped ~158px on hydration — the dominant CLS source on
// mobile (0.33). DecryptedText's initial state is the plain text, so the server
// output is already the correct final text with no hydration diff.
//
// SAFE ONLY FOR animateOn="hover" | "view". Do NOT use with animateOn="click":
// that path calls encryptInstantly(), which uses Math.random(), and server and
// client renders will not match. See PERF-PLAN.md §1.1.
export const LazyDecryptedText = dynamic(() => import("./DecryptedText").then((mod) => mod.default || mod));
