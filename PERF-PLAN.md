# Speed Insights Remediation Plan — Target RES 90+

> ## 📊 MEASURED — Lighthouse lab, localhost, after Phase 1+2
>
> | Metric | Field before (P75) | Desktop lab | Mobile lab | Mobile after §1.3b | Mobile after §3.1 |
> |---|---|---|---|---|---|
> | Performance | — | **97** | 66 | **87** | *re-measure* |
> | CLS | 0.33 mob / 0.11 desk | **0.028** ✅ | 0.479 ❌ | **0** ✅ | — |
> | LCP | 2.34 / 3.07 | 1.2 s ✅ | 4.1 s ❌ | 4.1 s ❌ | *re-measure* |
> | TBT | — | 0 ms ✅ | 40 ms ✅ | 30 ms ✅ | — |
> | FCP | 1.17 / 1.87 | 0.3 s ✅ | 1.1 s ✅ | 1.1 s ✅ | — |
>
> Desktop lab config: no CPU throttle, 10 Mbps, 40 ms RTT. Mobile lab config: **4× CPU slowdown, 1.6 Mbps, 150 ms RTT, 412×823** — far harsher than the desktop run, so the two columns are not directly comparable to each other or to field P75.
>
> **Mobile CLS 0.479 exposed a second bug — see §1.3b. Fixed, needs re-measurement.**
>
> ## ⚠️ IMPLEMENTATION STATUS — 30 Jul 2026
>
> **Shipped (uncommitted, in working tree):** §1.1, §1.2 (revised), §1.3, §1.5, §2.2, §2.3, §2.4.
> `tsc --noEmit` passes. ESLint introduces zero new problems (DotField's 5 pre-existing issues verified identical against `HEAD`).
>
> **Skipped by your decision:** §1.4 (hero blur-fade animation kept) and §2.1 (grain stays animated).
>
> **Skipped by me, needs your measurement:** §2.5 — `contain-intrinsic-size` requires a measured height, and getting it wrong trades INP for CLS. Not worth guessing.
>
> **Not started:** Phase 3, Phase 4.
>
> **⛔ BLOCKER I CREATED:** a failed `git stash` left an empty `.git/index.lock` that my sandbox lacks permission to delete. **Run `rm -f .git/index.lock` in your terminal before your next commit** or git will refuse to write.
>
> **⚠️ I could not run `next build`.** The sandbox is arm64 Linux and can't reach the npm registry to fetch its SWC binary. Every claim below about *source* is verified; nothing about *build output* is. Run Phase 0 yourself first.
>
> **Honest expectation with §2.1 skipped:** mobile should land ~86-90 (CLS fix + Noise now off mobile entirely). **Desktop is likely to stall around 80-85** — the 1,000,000-iteration grain loop still runs on any desktop viewing the hero, and that is the dominant INP cost. If desktop doesn't clear 90, §2.1 is the reason. See §2.1b for a version that keeps the shimmer at near-zero cost.

**Repo:** `bidyabhushan-portfolio` · **Branch:** `main` · **Framework:** Next.js 16.2.12 (App Router, Turbopack) · React 19.2.4
**Baseline captured:** Vercel Speed Insights, Production, Last 7 Days, P75, 30 Jul 2026

---

## 0. Baseline

| Metric | Mobile | Desktop | Good threshold | Verdict |
|---|---|---|---|---|
| **Real Experience Score** | **77** | **79** | ≥ 90 | Needs improvement |
| FCP | 1.17 s | 1.87 s | ≤ 1.8 s | Mobile OK / Desktop borderline |
| LCP | 2.34 s | 3.07 s | ≤ 2.5 s | Mobile borderline / **Desktop fail** |
| INP | 264 ms | 464 ms | ≤ 200 ms | **Both fail** |
| CLS | **0.33** | 0.11 | ≤ 0.10 | **Mobile fail hard / Desktop fail** |
| FID | 28 ms | 11 ms | ≤ 100 ms | OK |
| TTFB | 0.51 s | 1.04 s | ≤ 0.8 s | Mobile OK / Desktop fail |

**Per-route RES (this is the whole story):**

| Route | Mobile RES | Desktop RES | Samples (D) |
|---|---|---|---|
| `/` | 75 | **49 (Poor)** | 31 |
| `/contact` | 82 | 86 | 10 |
| `/about` | — | 82 | 5 |

> **The single most important observation:** `/contact` and `/about` already score 82–86 with the same layout, same fonts, same providers and the same TTFB. Only `/` is Poor. This means the problem is **not** infrastructure, hosting, fonts, or the framework — it is a specific set of components on the home page plus two components in the root layout. Fixing `/` fixes the aggregate score, because `/` carries ~76% of desktop traffic (31 of 41 sampled visits).

**Confirmed non-issues (do not spend time here):**

- `/` **is** statically prerendered — verified in `.next/prerender-manifest.json` (`routes` includes `/`). There is no server-side render cost per request. Desktop TTFB 1.04 s at n=31 is CDN/geography/sample noise, not code. Re-measure after Phase 1 before touching anything TTFB-related.
- Fonts are configured correctly. `next/font/google` with `display: "swap"` auto-generates a metric-adjusted fallback, and `app/globals.css:20-21` correctly places `var(--font-display)` / `var(--font-body)` first in the chain so that fallback is used. Font swap is **not** a meaningful CLS contributor here.
- Heavy libs are genuinely code-split. `components/LazyComponents.tsx` uses `next/dynamic` with `ssr: false` for all 11 effects, so `three` / `rapier` / `ogl` / `gl-matrix` are not in the initial chunk. The problem is **when** and **whether** they mount, not that they're bundled.

---

## 1. Diagnosis — root cause per metric

Every claim below is tied to a file and line in this repo.

### 1.1 CLS 0.33 (mobile) — cause: the `<h1>` is not server-rendered

`app/page.tsx:70-97` — the hero `<h1>` contains nothing but three `<LazyDecryptedText>` children.
`components/LazyComponents.tsx:15` — `LazyDecryptedText` is `dynamic(..., { ssr: false })`.

**This is confirmed, not inferred.** Here is the actual `<h1>` from the prerendered `.next/server/app/index.html`, verbatim:

```html
<h1 class="w-full font-display text-[clamp(3rem,5vw,4.5rem)] font-black leading-[1.1]
           flex flex-wrap items-start justify-start gap-x-3 sm:gap-x-4 animate-in fade-in
           slide-in-from-bottom-4 duration-1000 ease-out fill-mode-both"
    style="animation-delay:100ms">
  <div class="flex flex-wrap items-start justify-start gap-x-[0.25em]">
    <!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->
    <!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->
  </div>
  <!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->
</h1>
```

Three `BAILOUT_TO_CLIENT_SIDE_RENDERING` markers and **zero text nodes**. `<template>` elements do not render. This is an empty flex container with **computed height 0px**. Only after hydration + the `DecryptedText` chunk downloads + `motion` initialises does "BIDYA BHUSHAN NANDA" appear.

> Verify it yourself: `grep -c 'BAILOUT_TO_CLIENT_SIDE_RENDERING' .next/server/app/index.html` → returns 4 (3 in the h1, 1 for ProfileCard).
> ⚠️ The `.next/` currently in the repo is **stale** — it predates recent `app/page.tsx` edits (it has no `order-1` / `max-w-[300px]` classes). Rebuild before trusting any other number from it. The h1 bailout structure is unchanged in current source, so this specific finding holds.

Height arithmetic on a 390 px viewport: `clamp(3rem, 5vw, 4.5rem)` → 5vw = 19.5 px → clamps up to **48 px**; `leading-[1.1]` → 52.8 px per line; JetBrains Mono Black at 48 px ≈ 29 px/char, so "BIDYA BHUSHAN" (13 chars ≈ 375 px) wraps, and "NANDA" takes a third line. **0 px → ≈ 158 px, in one frame, above the paragraph and the CTA row.** Narrower viewport = more wrapped lines = bigger shift, which is exactly why mobile CLS (0.33) is 3× desktop CLS (0.11).

This also violates the repo's own rule: *"Hero text is never blocked behind a 3D component's load"* — `Rules.md`, Performance discipline.

**Secondary CLS contributors, in descending order:**

| # | Source | Mechanism |
|---|---|---|
| C2 | `app/page.tsx:120-135` — `ProfileCard` fallback vs. real card | Fallback is `min-h-[300px] sm:min-h-[360px] lg:min-h-[480px]`; the real card is `aspect-ratio: 1` (`components/ProfileCard.css:64`) on a `max-w-[300px]/[360px]/[480px]` container. These match at ≥332 px viewport but **diverge below it** (320 px iPhone SE → 288 px card vs. 300 px fallback = 12 px shift). On mobile the card is `order-1`, i.e. **above everything**, so any divergence moves the entire page. |
| C3 | `components/BlurText.tsx:98-116` | `initial={{ opacity: 0, y: ±50 }}` per word. Transform/opacity only, so **no layout shift** — but see §1.3b: the prerendered HTML proves every word ships at `opacity:0`, so the entire hero copy is invisible at first paint. That's an LCP problem, not a CLS one. |
| C4 | `components/HeavyComponentWrapper.tsx:27-29` | `getServerSnapshot()` returns `false`, so SSR always renders the desktop branch. Currently harmless (both branches render the same `fallback` before `inView`), but it is a latent hydration-mismatch shift if anyone changes the fallbacks. |

### 1.2 INP 464 ms desktop / 264 ms mobile — cause: four uncapped animation loops competing for the main thread

On desktop, `/` runs **all** of these simultaneously and permanently:

| Loop | Location | Cost |
|---|---|---|
| **`Noise`** — worst offender | `components/Noise.tsx:32,43-51,55-62` | `canvasSize = patternSize * 4` = **1000 × 1000**. `createImageData(1000,1000)` allocates a 4 MB buffer, then a **1,000,000-iteration loop with a `Math.random()` per pixel**, re-run every 2 frames via `requestAnimationFrame`, **forever**. That is ~15M `Math.random()` calls and ~120 MB/s of buffer churn per second on a 60 Hz display. |
| `LiquidEther` (WebGL, `three`) | `app/layout.tsx:58-66`, `components/LiquidEther.tsx:974` | Mounted in the **root layout**, `fixed inset-0` — so it is *always* in the viewport, meaning `HeavyComponentWrapper`'s unmount-when-offscreen logic never fires. A GPU fluid sim runs on every desktop page for the entire session. |
| `DotField` (2D canvas) | `app/page.tsx:35-45`, `components/DotField.tsx:133,242` | `requestAnimationFrame` per-dot physics **plus** a separate `setInterval(updateMouseSpeed, 20)` — a 50 Hz timer independent of frame pacing. |
| `TargetCursor` (GSAP ticker) | `app/layout.tsx:57`, `components/TargetCursor.tsx:286` | `gsap.ticker.add()` in the root layout. Also loads all of `gsap` on **every page including mobile** — and a custom cursor is meaningless on a touch device. |
| Lenis | `app/layout.tsx:68` | A fifth rAF loop wrapping the whole tree. |

`Noise` is the critical one because **it is not wrapped in `HeavyComponentWrapper`** (`app/page.tsx:49-57` renders it directly). It therefore has **no mobile bypass, no `prefers-reduced-motion` bypass, and no viewport gating** — it runs at full cost on every phone. This explains why mobile INP is 264 ms despite WebGL being skipped.

It also directly violates `Rules.md`: *"No ambient/auto-playing motion — animation triggers on scroll position or interaction only, never on a timer."*

### 1.3 LCP 3.07 s desktop / 2.34 s mobile — cause: a fully serialized discovery chain

The LCP candidate on `/` is either the `<h1>` or the ProfileCard avatar. **Both are invisible to the HTML preload scanner.**

```
HTML (h1 empty, no <img> in markup)
  └─> download + parse framework chunk
      └─> hydrate
          └─> dynamic import DecryptedText chunk  +  dynamic import ProfileCard chunk
              └─> React render
                  └─> browser *first learns about* /avatar.webp
                      └─> request → 72 KB → decode → paint
```

**Confirmed from the prerendered HTML.** `.next/server/app/index.html` contains exactly **three** `<link rel="preload">` tags:

```html
<link rel="preload" href="/_next/static/media/70bc3e132a0a741e-s.p...woff2" as="font" .../>
<link rel="preload" href="/_next/static/media/f06bf9da926bae75-s.p...woff2" as="font" .../>
<link rel="preload" as="script" fetchPriority="low" href="/_next/static/chunks/2zjueh7t2vecu.js"/>
```

Two fonts and one **low-priority** script. **There is no image preload at all.** `avatar.webp` appears in the document only as an escaped string inside the RSC flight payload (`\"avatarUrl\":\"/avatar.webp\"`) — the preload scanner cannot see that. §3.1 fixes exactly this.

Contributing facts:
- `components/ProfileCard.tsx:349-354` — `next/image` with `width={834} height={834}`, **no `priority`**, inside an `ssr: false` component. No `<link rel="preload">` can be emitted for it.
- **The entire hero copy ships invisible.** The prerendered HTML renders every `BlurText` word as `<span style="filter:blur(10px);opacity:0;transform:translateY(-50px)">P</span>` — one span per letter for the eyebrow, one per word for the paragraph. So the largest text block on the page is `opacity: 0` in the initial HTML and cannot become an LCP candidate until `motion/react` hydrates. Combined with the empty h1, **there is no server-painted LCP candidate in the hero at all.**
- `app/page.tsx:185` — `<Trajectory />` is imported **statically** (`components/Trajectory.tsx`, 792 lines, `motion/react`, `useScroll`, 8 `motion.*` nodes). It is below the fold on every device but is in the home page's initial client bundle and hydrates before LCP settles.
- `components/Footer.tsx:5` — `new Date().getFullYear()` in a Server Component is fine, but note the footer is also eager.

### 1.4 FCP 1.87 s desktop — cause: root-layout client JS

`app/layout.tsx` wraps everything in `ThemeProvider` → `LazyTargetCursor` (gsap) → `HeavyComponentWrapper`/`LiquidEther` (three) → `SmoothScroll` (lenis). Four client-side systems must boot before anything settles, on **every route**. `/contact`'s better score (86) despite the same layout confirms the layout is a contributor but not the dominant one.

### 1.5 Deploy bloat (not a Core Web Vital, but free to fix)

`public/images/portrait-photo.png` (3.3 MB) and `public/images/portrait-circuit.png` (2.1 MB) are **referenced nowhere** in `app/`, `components/`, `data/`, `lib/`, or `content/`. 5.4 MB of dead weight in the deployment. `public/.DS_Store` and `components/.DS_Store` are also committed.

---

## 2. Implementation plan

Five phases, ordered by **impact per unit of risk**. Each phase is independently shippable and independently measurable. Do not batch them — you will not know what worked.

> **Ground rule:** one `git commit` per phase, one Vercel preview deploy per phase, one Lighthouse run per phase (`Rules.md`: *"Check Lighthouse after every phase"*). Phases 1–2 alone should clear 90.

---

### PHASE 0 — Instrumentation (30 min, zero user-facing change)

You cannot verify a 90 without a local baseline, and Speed Insights P75 lags real deploys by hours.

**0.1 — Capture the production bundle baseline.** The committed `.next/` is stale; delete it first so you're measuring current source.

```bash
mkdir -p perf && rm -rf .next
npx next build 2>&1 | tee perf/build-baseline.txt
```

Record, for `/`: **First Load JS**, and the shared-chunk total. This is the number Phases 3–4 are judged on.

**0.2 — Add a local Lighthouse gate.**

```bash
npm i -D @lhci/cli
npx next build && npx next start &
npx lhci autorun --collect.url=http://localhost:3000/ \
  --collect.settings.preset=desktop --collect.numberOfRuns=3
npx lhci autorun --collect.url=http://localhost:3000/ --collect.numberOfRuns=3   # mobile
```

**0.3 — Add a CLS attribution probe.** Temporarily paste into the browser console on the deployed `/` to get the *actual* shifting elements rather than my arithmetic:

```js
new PerformanceObserver(l => l.getEntries().forEach(e => {
  if (e.hadRecentInput) return;
  console.log('shift', e.value.toFixed(4),
    e.sources.map(s => s.node?.tagName + '.' + (s.node?.className || '').slice(0,40)));
})).observe({ type: 'layout-shift', buffered: true });
```

**0.4 — Add an INP long-task probe:**

```js
new PerformanceObserver(l => l.getEntries()
  .filter(e => e.duration > 50)
  .forEach(e => console.log('longtask', e.duration.toFixed(0), e.attribution)))
  .observe({ type: 'longtask', buffered: true });
```

**0.5 — Confirm the h1 finding on the fresh build** (should reproduce exactly what §1.1 documents):

```bash
grep -c 'BAILOUT_TO_CLIENT_SIDE_RENDERING' .next/server/app/index.html   # expect 4
grep -o 'rel="preload"[^>]*' .next/server/app/index.html                 # expect 2 fonts, no image
```

**Exit criteria:** you have `perf/build-baseline.txt`, three Lighthouse runs per form factor, a console log naming the top 3 shifting DOM nodes, and the two greps above reproduce.

**Expected metric change:** none.

---

### PHASE 1 — Kill CLS (highest impact, lowest risk)

> **Target: CLS 0.33 → ≤ 0.05 mobile, 0.11 → ≤ 0.05 desktop.** This is worth roughly +10 to +14 RES points on its own, on both form factors.

#### 1.1 — Server-render the `<h1>`. *(This is the single most important change in this document.)*

The problem is not `DecryptedText` — it is that `DecryptedText` is `ssr: false`. `DecryptedText` already renders the plain text as its initial state (`components/DecryptedText.tsx:38` — `useState(text)`) and already emits a screen-reader copy (`:373`). It is safe to SSR.

**Edit `components/LazyComponents.tsx:15`:**

```diff
-export const LazyDecryptedText = dynamic(() => import("./DecryptedText").then((mod) => mod.default || mod), { ssr: false });
+// SSR ON: this renders inside the hero <h1>. With ssr:false the h1 serialises
+// empty and collapses to 0px, then jumps ~158px on hydration — this was the
+// dominant CLS source on mobile (0.33). DecryptedText's initial state is the
+// plain text, so SSR output is the correct final text with no hydration diff.
+export const LazyDecryptedText = dynamic(() => import("./DecryptedText").then((mod) => mod.default || mod));
```

**Verify no hydration mismatch:** `DecryptedText`'s SSR output depends on `animateOn`. For `animateOn="hover"` (the only usage — `app/page.tsx:74,82,91`), `isDecrypted` initialises to `animateOn !== 'click'` = `true` (`:42`) and `displayText` = `text` (`:38`). Server and client first render are identical. ✅ Do **not** apply this to any future `animateOn="click"` usage — that path calls `encryptInstantly()` with `Math.random()` and *will* mismatch.

**Better still — remove the dynamic wrapper entirely for this one.** `DecryptedText` pulls in `motion/react`, which `BlurText`, `ScrollReveal` and `Trajectory` already load on this page. Splitting it buys nothing and costs a round-trip:

```diff
# app/page.tsx
-import { LazyProfileCard, LazyDotField, LazyDecryptedText } from "@/components/LazyComponents";
+import { LazyProfileCard, LazyDotField } from "@/components/LazyComponents";
+import DecryptedText from "@/components/DecryptedText";
```
…and replace the three `<LazyDecryptedText>` with `<DecryptedText>`.

#### 1.2 — Add a collapse guard to the h1. *(Revised during implementation.)*

My first version of this step reserved the full wrapped height — `min-h-[calc(3em*1.1)] lg:min-h-[calc(2em*1.1)]`. **That was wrong and I've replaced it.** `em` in `min-height` resolves against the element's own font size, so the maths was right, but reserving 3 lines is only correct at widths where the text actually wraps to 3 lines. At any width where it wraps to 2, you get ~53px of phantom empty space below the heading — a visible layout change traded for protection that §1.1 already provides.

Shipped instead:

```diff
# app/page.tsx
-... gap-x-3 sm:gap-x-4 animate-in fade-in ...
+... gap-x-3 sm:gap-x-4 min-h-[1.1em] animate-in fade-in ...
```

A one-line floor. It cannot exceed real content height (the h1 always has at least one line), so it has zero visual cost, and it still catches total collapse if someone later reintroduces `ssr: false`.

#### 1.3 — Make the ProfileCard fallback dimensionally identical to the real card.

Replace the `min-h-*` fallback with the same `aspect-square` the real card uses, so the two are geometrically interchangeable at **every** viewport width including 320 px:

```diff
# app/page.tsx:120
-<HeavyComponentWrapper mobileBypass={false} fallback={<div className="w-full min-h-[300px] sm:min-h-[360px] lg:min-h-[480px] bg-void/50 border border-ash/10" />}>
+<HeavyComponentWrapper mobileBypass={false} fallback={<div className="w-full aspect-square bg-void/50" />}>
```

Note the `border border-ash/10` also goes — `Rules.md` No-Card Rule forbids bordered containers wrapping content, so the current fallback is a rule violation as well as a CLS risk.

#### 1.3b — `next/dynamic` without `loading` collapses the card column. *(Found by measurement, after §1.3 shipped.)*

The mobile lab run came back at **CLS 0.479**, and the attribution was unambiguous: **two shifts of exactly `0.2394488176700014` each**, both on `div.z-10 order-2` — the hero *text* column.

Identical magnitude, repeated twice, means one element collapsing and re-expanding. Working backwards from `CLS = impact fraction × distance fraction` with a 412×823 viewport and a 366px-tall text column gives a displacement of **~259px** — almost exactly the 300px card height.

**Root cause:** `LazyProfileCard` was `dynamic(..., { ssr: false })` with **no `loading` option**. Without it, `next/dynamic` renders *nothing* between the moment the component mounts and the moment its chunk finishes downloading. So the sequence was:

```
SSR + hydrate   → fallback rendered      → column 300px
inView = true   → LazyProfileCard mounts → chunk not loaded → renders null → column 0px   ← SHIFT 1
chunk arrives   → ProfileCard renders    → column 300px                                    ← SHIFT 2
```

**Why mobile-only:** `app/page.tsx` puts this column at `order-1` on mobile — above every word of copy. On `lg` it's a side-by-side grid column, so the same collapse displaces almost nothing vertically. That is exactly why desktop measured 0.028 and mobile 0.479.

**Why §1.1 appeared to make mobile worse:** it didn't. `CLS = impact × distance`. Filling in the empty h1 made the text column taller (366px vs ~208px), which *raised the impact fraction of this pre-existing shift*. Same physical movement, higher score. Fixing one CLS source can inflate the measured score of another — worth remembering.

**The fix, two layers:**

```diff
# app/page.tsx — lock the column height at the container, independent of contents
-<div className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[480px] mx-auto order-1 ...">
+<div className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[480px] aspect-square mx-auto order-1 ...">
-  <HeavyComponentWrapper mobileBypass={false} fallback={<div className="w-full aspect-square bg-void/50" />}>
+  <HeavyComponentWrapper mobileBypass={false} fallback={<div className="h-full w-full bg-void/50" />}>
```

```diff
# components/LazyComponents.tsx — never render null while the chunk loads
-export const LazyProfileCard = dynamic(() => import("./ProfileCard")..., { ssr: false });
+export const LazyProfileCard = dynamic(() => import("./ProfileCard")...,
+  { ssr: false, loading: () => <div className="h-full w-full bg-void/50" /> });
```

Putting `aspect-square` on the *container* is the load-bearing change: the column's height no longer depends on what's inside it. The `loading` placeholder is defence in depth.

**Generalise this.** Any `dynamic(..., { ssr: false })` whose output occupies layout space needs either a `loading` placeholder or a parent with reserved dimensions. In this repo `LazyDotField`, `LazyLiquidEther` and `LazyTargetCursor` are all absolutely/fixed positioned so they're exempt — but `LazyLanyard` on `/about` and `LazyInfiniteMenu` are worth auditing before they bite.

#### 1.4 — Stop `BlurText` from hiding above-the-fold copy. *(Second-most important change. Not optional.)*

The hero paragraph (`app/page.tsx:98-105`) and the "Portfolio" eyebrow (`:61-69`) ship at `opacity: 0` in the server HTML — verified above — and only animate in after `motion` hydrates and the IntersectionObserver fires. For content **already in the initial viewport** this is a page-load reveal, not a scroll reveal, and it costs LCP for zero benefit. With §1.1 fixed, the h1 becomes a server-painted LCP candidate; with §1.4 fixed, so does the paragraph. Together they give the browser something real to paint at FCP instead of an empty hero.

Add an opt-out prop and use it for above-the-fold instances:

```diff
# components/BlurText.tsx — props interface
   as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
+  /** Above-the-fold copy: render final state immediately, skip the reveal.
+   *  Prevents hero text from being invisible until motion hydrates. */
+  immediate?: boolean;
 }
```

```diff
-  const [inView, setInView] = useState(false);
+  const [inView, setInView] = useState(immediate);
```
…and gate the observer `useEffect` on `if (immediate) return;`. Then pass `immediate` on `app/page.tsx:61` and `:98`.

**If you want to keep the reveal for below-the-fold `BlurText` usage** (`/about`, `/contact` both use it), the `immediate` prop is opt-in — those call sites are unchanged. Only pass `immediate` where the text is above the fold on load.

**Side benefit:** the eyebrow currently emits one `<span>` with three inline styles **per letter** (9 spans for "Portfolio") and the paragraph one per word (~30 spans). That's several KB of HTML and a lot of `will-change: transform,filter,opacity` layers — each one a compositor layer the browser must allocate. Setting `immediate` doesn't remove the spans, but if you want the extra win, render a plain `<p>` when `immediate` is true and skip the per-word split entirely.

#### 1.5 — Fix `getServerSnapshot` honesty.

`components/HeavyComponentWrapper.tsx:27-29` returning `false` means "server thinks: desktop, not reduced-motion, not in view." That is the right default *today* only because both branches render `fallback`. Add a comment locking that invariant in so a future edit doesn't silently reintroduce a hydration shift:

```diff
 function getServerSnapshot() {
+  // INVARIANT: SSR renders the `fallback` branch on every code path
+  // (inView starts false). Both the mobile-bypass branch and the
+  // viewport branch must therefore render `fallback` at identical
+  // dimensions, or hydration produces a layout shift. See PERF-PLAN.md §1.1.
   return false;
 }
```

**Verification for Phase 1**

1. `npx next build && npx next start`, then `curl -s localhost:3000 | grep -o 'BIDYA'` → **must return a match.** If it doesn't, 1.1 didn't take.
2. Re-run the 0.3 CLS probe on the preview deploy at 390 × 844 and 320 × 568 throttled to Slow 4G. Sum of shifts must be **≤ 0.05**.
3. Lighthouse mobile CLS ≤ 0.05, desktop ≤ 0.03.
4. Check the browser console for a React hydration mismatch warning on `/`. **Zero tolerance** — a mismatch here means 1.1 is wrong.

**Expected:** Mobile RES 77 → **86-90**. Desktop 79 → **83-86**. LCP improves as a side effect (the h1 becomes a server-painted LCP candidate).

---

### PHASE 2 — Kill INP (second-highest impact)

> **Target: INP 464 ms → ≤ 200 ms desktop, 264 ms → ≤ 130 ms mobile.**

#### 2.1 — Rewrite `Noise` as a static tile. *(Biggest single INP win.)*

The current implementation regenerates a 1-megapixel random buffer forever. Film grain does not need to be animated — and `Rules.md` explicitly forbids timer-driven motion. Generate **once**, at a **much smaller** size, and tile it.

Rewrite `components/Noise.tsx`:

```tsx
"use client";

import { useEffect, useRef } from 'react';
import './Noise.css';

interface NoiseProps { patternSize?: number; patternAlpha?: number; }

/** Static film grain. Generated once at mount, never animated.
 *  Rules.md: "No ambient/auto-playing motion ... never on a timer."
 *  Previous version ran a 1,000,000-iteration Math.random() loop every
 *  2 animation frames, on every device, forever. See PERF-PLAN.md §1.2. */
const Noise = ({ patternSize = 128, patternAlpha = 15 }: NoiseProps) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.width = canvas.height = patternSize;
    const img = ctx.createImageData(patternSize, patternSize);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = patternAlpha;
    }
    ctx.putImageData(img, 0, 0);
  }, [patternSize, patternAlpha]);

  return (
    <canvas
      aria-hidden="true"
      className="noise-overlay"
      ref={ref}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default Noise;
```

Cost change: **16,384 iterations once** vs. **1,000,000 iterations × 30/sec forever**. Roughly a 1,800,000× reduction in steady-state work.

Then update the call site to drop the dead props:

```diff
# app/page.tsx:50-56
-<Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={15} />
+<Noise patternSize={128} patternAlpha={15} />
```

If you want it to visually tile rather than stretch, add to `components/Noise.css`:

```css
.noise-overlay { image-rendering: pixelated; }
```
…and set the canvas to `width:128px; height:128px` with the parent using `background-repeat` — or simply accept the stretch, which at `mix-blend-overlay opacity-50` is visually indistinguishable.

**Visual-regression check required:** screenshot `/` hero before and after at 2× DPR and diff. Grain character will change slightly (larger apparent grain). Tune `patternSize` between 96 and 256 to taste — the cost is O(n²) but paid **once**, so 256 is still cheap.

#### 2.1b — If desktop stalls below 90: keep the shimmer, drop the cost. *(Not implemented — the option to reach for if §2.1 stays skipped.)*

You skipped §2.1 to keep the grain animated. Fair — but the shimmer and the cost are separable, and §2.1 threw away both. There are two ways to keep the motion:

**Cheapest, look unchanged: animate a static tile with CSS.** Generate the grain **once** into a small canvas, then animate `background-position` in discrete steps with a CSS `@keyframes`. Compositor-only, so main-thread cost after mount is **zero** — but you still get the classic film-grain flicker. This is what production sites do. The grain translates rather than regenerating, which reads slightly differently under close inspection but is indistinguishable at `mix-blend-overlay opacity-50`.

**Middle ground, one-line change: pre-render N frames and cycle them.** Generate 4-6 grain buffers at mount, then have the rAF loop `putImageData` a different one each tick instead of calling `Math.random()` a million times. Kills ~99% of the CPU while keeping the exact regeneration look. Costs 4-6× the memory of one buffer.

**Note (measured):** mobile TBT came back at 30-40ms and desktop at 0ms, i.e. Lighthouse's load-window proxy sees no problem. That is *not* evidence the grain is fine — TBT stops at Time to Interactive, and the grain loop runs forever after that. Only field INP from Speed Insights can settle this. Check it in 48h.

**Do NOT just lower `patternSize`.** `canvasSize = patternSize * 4`, and the canvas is stretched to the full viewport, so halving it makes the grain visibly chunkier. That *is* a look change, which is what you were avoiding.

#### 2.2 — Give `Noise` the same guards every other effect has.

Even static, it's a full-viewport canvas. Wrap it so mobile and reduced-motion users skip it:

```diff
# app/page.tsx:49-57
 <div className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay opacity-50">
-  <Noise patternSize={128} patternAlpha={15} />
+  <HeavyComponentWrapper fallback={null}>
+    <Noise patternSize={128} patternAlpha={15} />
+  </HeavyComponentWrapper>
 </div>
```

#### 2.3 — Gate `TargetCursor` to pointer-fine devices.

`app/layout.tsx:57` mounts a GSAP-ticker-driven custom cursor on **every route on every device**, including phones where a cursor does not exist. This ships `gsap` to every mobile visitor for literally no rendered output.

Add a `useMediaQuery`-based gate — the hook already exists at `hooks/useMediaQuery.ts`:

```diff
# hooks/useMediaQuery.ts:28
 export const IS_MOBILE = "(max-width: 767px)";
+export const HAS_FINE_POINTER = "(pointer: fine) and (hover: hover)";
```

Create `components/PointerCursor.tsx`:

```tsx
"use client";

import { useMediaQuery, HAS_FINE_POINTER, PREFERS_REDUCED_MOTION } from "@/hooks/useMediaQuery";
import { LazyTargetCursor } from "./LazyComponents";

/** Mounts the custom cursor only where a cursor exists and motion is welcome.
 *  Previously mounted unconditionally in the root layout, shipping gsap to
 *  every mobile visitor for zero rendered output. See PERF-PLAN.md §1.2. */
export function PointerCursor({ targetSelector }: { targetSelector?: string }) {
  const fine = useMediaQuery(HAS_FINE_POINTER);
  const reduced = useMediaQuery(PREFERS_REDUCED_MOTION);
  if (!fine || reduced) return null;
  return <LazyTargetCursor targetSelector={targetSelector} />;
}
```

```diff
# app/layout.tsx:57
-<LazyTargetCursor targetSelector="a, button, [role='button'], .cursor-target" />
+<PointerCursor targetSelector="a, button, [role='button'], .cursor-target" />
```

This also fixes an accessibility gap: `Rules.md` requires every interactive component to be reduced-motion-safe, and a spinning GSAP cursor currently isn't.

#### 2.4 — Fold `DotField`'s 50 Hz timer into its rAF loop.

`components/DotField.tsx:133` — `setInterval(updateMouseSpeed, 20)` runs independently of frame pacing, so it fires during scroll and input handling.

```diff
-    const speedInterval = setInterval(updateMouseSpeed, 20);
-
     let frameCount = 0;

     function tick() {
       if (!ctx) return;
+      updateMouseSpeed();          // frame-paced, not a 50Hz timer
       frameCount++;
```
…and remove `clearInterval(speedInterval)` from the cleanup at `components/DotField.tsx:257`.

Behaviour note: mouse-speed smoothing changes from a 20 ms to a ~16.7 ms cadence, which makes the `m.speed += (dist - m.speed) * 0.5` easing marginally snappier. If the bulge feels too reactive, lower `0.5` to `0.42`.

#### 2.5 — Add `content-visibility` to below-the-fold sections.

Cheap, no-JS way to keep layout and paint work off the critical path:

```diff
# app/page.tsx:141
-<section className="w-full border-t border-ash/30 px-4 py-20 sm:px-8 lg:px-16">
+<section className="w-full border-t border-ash/30 px-4 py-20 sm:px-8 lg:px-16 [content-visibility:auto] [contain-intrinsic-size:auto_600px]">
```

⚠️ `contain-intrinsic-size` must be a **close** estimate or you trade INP for CLS. Measure the section's real rendered height in DevTools first and use that number. Skip this step entirely if the measured height varies by more than ~15% across breakpoints.

**Verification for Phase 2**

1. DevTools → Performance → record 5 s idle on `/` with the page focused. **Main thread must be essentially flat.** Before: continuous 60 Hz activity. After: near-zero.
2. Re-run the 0.4 long-task probe. Target: **zero tasks > 200 ms**, ≤ 2 tasks > 50 ms.
3. DevTools → Performance insights → interact with the CTA buttons and the nav. Measured INP ≤ 200 ms desktop.
4. Visual diff of the hero at 1× and 2× DPR — grain and cursor must still look right.
5. Confirm `gsap` no longer appears in the mobile network waterfall (emulate iPhone 14, check chunk list).

**Expected:** Desktop INP 464 → **150-200 ms**. Mobile INP 264 → **100-140 ms**. Desktop RES → **88-93**. Mobile RES → **90-93**.

---

### PHASE 3 — Fix LCP

> **Target: LCP 3.07 s → ≤ 2.5 s desktop, 2.34 s → ≤ 2.0 s mobile.**

Phase 1 already helps here (the server-rendered h1 becomes a paintable LCP candidate at FCP). Phase 3 closes the rest.

#### 3.1 — Make the avatar preload-discoverable.

**SHIPPED — and the plan's original Option A was subtly wrong.** Preloading `/avatar.webp` while `next/image` requests `/_next/image?url=%2Favatar.webp&w=…&q=75` preloads a *different URL*: the preload never matches, and you double-fetch. The optimizer's chosen srcset entry depends on DPR and `sizes`, so it isn't predictable from the server.

What actually shipped:

1. `app/page.tsx` — `ReactDOM.preload("/avatar.webp", { as: "image", fetchPriority: "high" })` at the top of `Home()`.
2. `components/ProfileCard.tsx` — `unoptimized` on both the main avatar and the mini avatar, so the requested URL is exactly `/avatar.webp` and matches the preload. The mini avatar reuses the same cached file for zero extra bytes.
3. The stale `sizes="(max-width: 480px) 100vw, 480px"` was removed — it was wrong anyway (the container caps at `max-w-[300px]` below `sm`, so `100vw` over-fetched on the narrowest devices) and `sizes` is meaningless once `unoptimized` is set.

**Trade-off, stated plainly:** every device now gets the same 834×834 file instead of a device-sized variant. That's acceptable *only* because the source is a 72KB WebP — already small enough that responsive variants save little, and the optimizer round-trip plus a missed preload cost more than the extra bytes. **If you ever swap in a larger avatar, revisit this.** The alternative is lifting the avatar out of the `ssr: false` boundary so `next/image` can emit its own preload.

**Verify it landed:**

```bash
grep -o '<link rel="preload"[^>]*avatar[^>]*>' .next/server/app/index.html
```

Below is the original plan text, kept for reference.

**Option A — hint the preload from the server.** Add to `app/page.tsx`, above the component:

```tsx
import ReactDOM from "react-dom";

export default function Home() {
  ReactDOM.preload("/avatar.webp", { as: "image", fetchPriority: "high" });
  // ...
```

React 19 emits `<link rel="preload">` into the streamed HTML `<head>`, so the browser starts the avatar request *in parallel with* the JS download instead of after it. This is the smallest possible change with the largest LCP effect.

**Option B — mark it `priority` inside ProfileCard.** Add a `priorityAvatar` prop:

```diff
# components/ProfileCard.tsx:349
               <Image
                 className="avatar"
                 src={avatarUrl}
                 alt={`${name || 'User'} avatar`}
                 width={834}
                 height={834}
-                sizes="(max-width: 480px) 100vw, 480px"
+                sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 480px"
+                priority={priorityAvatar}
```

Note the `sizes` fix is worth doing **regardless of option**: the current `100vw` below 480 px is wrong — the container is capped at `max-w-[300px]`, so Next is serving a needlessly large variant to the narrowest devices. The corrected `sizes` mirrors `app/page.tsx:119`'s actual `max-w-*` chain.

Do **both** A and the `sizes` fix. Option B alone doesn't help because `priority` inside an `ssr: false` component can't reach the initial HTML.

#### 3.2 — Lazy-load `Trajectory`.

`app/page.tsx:185` statically imports a 792-line client component with `motion/react`, `useScroll`, and 8 `motion.*` nodes — all below the fold, all in the initial home-page bundle.

```diff
# app/page.tsx
-import { Trajectory } from "@/components/Trajectory";
+import dynamic from "next/dynamic";
+const Trajectory = dynamic(() => import("@/components/Trajectory").then(m => m.Trajectory));
```

Keep SSR **on** (no `ssr: false`) so its markup still serialises and it contributes no CLS; you get the code-split benefit without the empty-container problem from §1.1. Then wrap the call site so its height is reserved:

```diff
-<Trajectory />
+<div className="min-h-[80vh]">
+  <Trajectory />
+</div>
```

Measure `Trajectory`'s real rendered height first and use that value, not my guess.

#### 3.3 — Move `LiquidEther` out of the root layout.

`app/layout.tsx:58-66` mounts a `three`-based WebGL fluid sim on **every route**. Because it's `fixed inset-0`, it is permanently "in view," so `HeavyComponentWrapper`'s unmount-when-offscreen optimisation never fires. `Architecture.md` / `Rules.md` state *"One WebGL/Three.js context mounted at a time, app-wide"* — that rule is currently satisfied by luck, not design, and it puts `three` on the critical path of `/contact` and `/blog` which don't need it.

Two paths, in order of preference:

**3.3a — Defer past first paint.** Keep it global but don't let it compete with LCP. Create `components/Atmosphere.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { HeavyComponentWrapper } from "./HeavyComponentWrapper";
import { AtmosphereFallback } from "./AtmosphereFallback";
import { LazyLiquidEther } from "./LazyComponents";

/** Holds the static starfield until the browser is idle, then swaps in the
 *  WebGL sim. Keeps `three` off the LCP critical path on every route.
 *  See PERF-PLAN.md §3.3. */
export function Atmosphere() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => (w as unknown as { cancelIdleCallback: (i: number) => void }).cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return <AtmosphereFallback />;

  return (
    <HeavyComponentWrapper fallback={<AtmosphereFallback />}>
      <LazyLiquidEther colors={['#00E5FF', '#FF0055', '#4A00E0']} mouseForce={15} cursorSize={80} />
    </HeavyComponentWrapper>
  );
}
```

Both branches are `fixed inset-0` inside the existing wrapper div, so the swap causes **zero** layout shift. Replace `app/layout.tsx:59-65` with `<Atmosphere />`.

**3.3b — Scope it to `/` only.** If the atmosphere is really a home-page treatment, delete it from the layout and render it in `app/page.tsx`. `/contact` and `/blog` then never download `three` at all. This is the bigger win but a visual/design decision — it's your call, which is why it's not the default recommendation.

⚠️ Also note `components/Footer.tsx:5` says *"Built with Next.js, Tailwind, & Three.js."* If you take 3.3b, that line is still true (`/about` uses `three` via `Lanyard`), but double-check it reads correctly.

#### 3.4 — Add `optimizePackageImports` and image config.

`next.config.ts` is currently bare. Next 16 auto-optimizes some packages, but be explicit and add image format control:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    // Trim the default deviceSizes ladder to widths this design actually uses.
    deviceSizes: [320, 390, 640, 828, 1080, 1200, 1920],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "@base-ui/react"],
  },
};

export default createMDX({})(nextConfig);
```

**Verify this actually helps** before keeping it — diff `First Load JS` for `/` against `perf/build-baseline.txt`. If the delta is < 2 KB, Next was already doing it and you should drop the `experimental` block rather than carry config you don't need.

**Verification for Phase 3**

1. `curl -s localhost:3000 | grep -o 'rel="preload"[^>]*avatar'` → must match after 3.1 Option A.
2. Network waterfall, Slow 4G, emulated iPhone: `/avatar.webp` must start **before** the first dynamic chunk finishes.
3. `First Load JS` for `/` down vs. baseline — expect a meaningful drop from 3.2 and 3.3.
4. Lighthouse "Largest Contentful Paint element" audit — confirm which element it now is, and that its `renderDelay` is small.
5. Confirm 3.2's `min-h` didn't introduce CLS — re-run the 0.3 probe.

**Expected:** Desktop LCP 3.07 → **2.0-2.4 s**. Mobile 2.34 → **1.7-2.0 s**. Desktop FCP 1.87 → **1.2-1.5 s**.

---

### PHASE 4 — Hygiene and headroom

Not needed to hit 90, but cheap and it stops regression.

**4.1 — Delete the 5.4 MB of unreferenced images.**

```bash
git rm public/images/portrait-photo.png public/images/portrait-circuit.png
```

Verify first: `grep -rn "portrait-photo\|portrait-circuit" app components data lib content` returned **zero** matches at the time of writing. Re-run before deleting.

**4.2 — Stop committing `.DS_Store`.**

```bash
git rm --cached public/.DS_Store components/.DS_Store app/.DS_Store .DS_Store 2>/dev/null
printf '\n.DS_Store\n**/.DS_Store\n' >> .gitignore
```

**4.3 — Remove dev-only artefacts from the repo root.** `trace_before.json` (2.4 MB), `trace_dotfield.json` (5.7 MB), `tsconfig.tsbuildinfo` (0.5 MB) and `home_dotfield.png` are build/profiling leftovers. Move them to a gitignored `perf/` directory. They don't ship to the client but they bloat clone time and the Vercel build context.

**4.4 — Audit `/about`.** It carries the heaviest payload in the app: `Lanyard` pulls `three` + `@react-three/drei` + `@react-three/rapier` (a WASM physics engine) + `meshline`, and loads `public/card.glb` (2.4 MB). It scores 82 on desktop with only 5 samples, so it's under-measured. Once `/` is fixed, `/about` becomes the next bottleneck. Specifically: `app/about/page.tsx:49` marks `/portrait.webp` (892 KB) as `priority` at `width={600} height={800}` — check whether the rendered size justifies 600×800, and confirm `card.glb` is fetched only after `Lanyard` actually mounts.

**4.5 — Add a bundle budget to CI.** Wire the `@lhci/cli` run from Phase 0.2 into a GitHub Action with assertions, so a future React Bits component can't silently undo this work:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

**4.6 — Prune unused components.** `MagnetLines`, `ScrollFloat`, `DotGrid`, `EvilEye`, `Radar`, `InfiniteMenu`, `TextPressure` — confirm which are reachable from a route. Unreachable client components still cost lint/typecheck/build time and invite accidental re-introduction. (`components/ui/retro-grid.tsx` at 866 lines and `components/ui/ascii-art.tsx` at 562 lines **are** used, by `/contact`.)

---

## 3. Expected trajectory

**As actually shipped** (§1.4 and §2.1 skipped):

| After | Mobile RES | Desktop RES | Driver |
|---|---|---|---|
| Baseline | 77 | 79 | — |
| Phase 1 (shipped) | 84-88 | 82-85 | CLS 0.33 → ≤0.05 |
| Phase 2 (shipped) | 86-90 | **80-85** | Grain off mobile entirely; gsap off mobile. Desktop grain loop untouched → **INP stays the ceiling.** |
| + Phase 3 | 90-93 | 85-89 | LCP under 2.5 s, `three` off the critical path |
| + §2.1b | 92-95 | 91-95 | Grain shimmer kept, cost removed |

**If the full plan had been applied** (§1.4 + §2.1 included): 92-95 mobile, 91-95 desktop after Phase 3.

The honest read: **desktop cannot reliably clear 90 while a 1,000,000-iteration loop runs 30×/sec on the hero.** Mobile should be fine because §2.2 removes that loop from mobile entirely. If you want desktop at 90+ without giving up the shimmer, §2.1b is the path.

These are estimates from the code, not measurements. The honest version: **Phase 1 is near-certain to be worth double digits** because a 0.33 CLS is a hard score cap and its cause is unambiguous. Phase 2's magnitude is high-confidence (the `Noise` loop is objectively pathological) but the exact INP number depends on device mix. Phase 3 is the least certain — re-measure after Phase 2 and skip anything that no longer matters.

**Critically: Speed Insights is P75 over a rolling 7-day window with n≈40.** After each deploy, do not judge the result for at least 48 hours, and be aware that at this sample size a handful of visits on a slow device will move the number several points. Use local Lighthouse for the tight loop; use Speed Insights only for confirmation.

---

## 4. Risk register

| Change | Risk | Mitigation |
|---|---|---|
| §1.1 SSR `DecryptedText` | Hydration mismatch if `animateOn` is ever `"click"` (`Math.random()` in `encryptInstantly`) | Only `"hover"` is used today. Add a comment at `LazyComponents.tsx:15`. Check console for mismatch warnings. |
| §2.1 Static `Noise` | Grain looks visibly different | Screenshot diff at 1× and 2× DPR; tune `patternSize` 96–256. |
| §2.3 Gate `TargetCursor` | Custom cursor disappears on hybrid touch+mouse laptops | `(pointer: fine) and (hover: hover)` is the correct query for this; test on a touchscreen laptop if you have one. |
| §2.5 `content-visibility` | Wrong `contain-intrinsic-size` trades INP for CLS | Measure the real height first; skip the step if height varies > 15% across breakpoints. |
| §3.2 Lazy `Trajectory` | Reserved `min-h` doesn't match real height → new CLS | Keep SSR on (markup still serialises), measure real height, re-run the CLS probe. |
| §3.3b Scope `LiquidEther` to `/` | Design regression — other pages lose the atmosphere | This is a design decision, not a perf one. 3.3a gets most of the win without it. |
| §4.1 Delete images | They were needed after all | `git rm` is recoverable; re-run the grep first. |

---

## 5. What I could not verify in this session

Stated plainly so you can close these gaps yourself:

1. **Production bundle sizes.** `npx next build` exceeds the tool timeout available to me, and the existing `.next/` is **stale** (its `index.html` predates recent `app/page.tsx` edits) and mixes dev and build output, so its chunk sizes (a 2.2 MB chunk containing `rapier`, a 712 KB chunk containing `three`) are **not** trustworthy production figures. Phase 0.1 exists to fix this. Do it first.
2. **Which element Speed Insights actually records as LCP on `/`.** The prerendered HTML proves there is no server-painted candidate in the hero — the h1 is empty and every `BlurText` word is `opacity:0` — so LCP is necessarily post-hydration and is either the h1, the paragraph, or the avatar. All three share the same root cause, so the fix is the same either way. Confirm with the Lighthouse LCP-element audit.
3. **The exact CLS split** between the h1 (§1.1) and the ProfileCard fallback (§1.2/1.3). The h1 is confirmed as *a* cause and is almost certainly the dominant one; the split between it and everything else is what the Phase 0.3 probe measures in 30 seconds on the live site.
4. **Desktop TTFB 1.04 s.** `/` is confirmed statically prerendered, so this is not application code. Check `x-vercel-cache` and `server-timing` response headers on a cold request; if you see `MISS` consistently, it's a CDN/region question for Vercel, not a code change.

---

## 6. Ordered checklist

```
Phase 0 — Instrumentation
  [ ] 0.1  Capture `next build` baseline → perf/build-baseline.txt
  [ ] 0.2  Install @lhci/cli, record 3 runs × 2 form factors
  [ ] 0.3  Run CLS attribution probe on live /, record top 3 shifting nodes
  [ ] 0.4  Run long-task probe, record tasks > 50 ms
  [ ] 0.5  Reproduce the h1-bailout and no-image-preload greps on the fresh build

Phase 1 — CLS            target: 0.33 → ≤ 0.05
  [x] 1.1  DecryptedText imported directly in page.tsx; ssr:false removed
  [x] 1.2  min-h-[1.1em] collapse guard on the hero <h1> (revised, see §1.2)
  [x] 1.3  ProfileCard fallback → aspect-square, border dropped
  [x] 1.3b aspect-square moved to the CONTAINER + loading placeholder on
           LazyProfileCard — fixes 2 × 0.24 mobile shifts (found by measurement)
  [–] 1.4  SKIPPED by your decision — hero keeps its blur-fade
  [x] 1.5  getServerSnapshot invariant documented
  [ ] ✅   curl | grep BIDYA returns a match; zero hydration warnings; CLS ≤ 0.05
  [ ] 📦  Commit + preview deploy + Lighthouse

Phase 2 — INP            target: 464 → ≤ 200 ms
  [–] 2.1  SKIPPED by your decision — grain stays animated
  [ ] 2.1b FALLBACK if desktop stalls < 90: CSS-animated static tile
  [x] 2.2  Noise wrapped in HeavyComponentWrapper (off on mobile + reduced-motion)
  [x] 2.3  TargetCursor gated behind (pointer:fine) + reduced-motion
  [x] 2.4  DotField's 50Hz setInterval folded into its rAF tick
  [ ] 2.5  DEFERRED — needs a measured contain-intrinsic-size, don't guess
  [ ] ✅   Idle main thread flat; zero long tasks > 200 ms; no gsap on mobile
  [ ] 📦  Commit + preview deploy + Lighthouse

Phase 3 — LCP            target: 3.07 → ≤ 2.5 s
  [x] 3.1  ReactDOM.preload("/avatar.webp") + `unoptimized` so the URL matches;
           stale `sizes` removed. NOTE: original plan text was wrong — see §3.1
  [ ] 3.2  Lazy-load Trajectory (SSR on) with a measured min-h
  [ ] 3.3  Atmosphere wrapper: defer LiquidEther to requestIdleCallback
  [ ] 3.4  next.config.ts: images.formats, deviceSizes, optimizePackageImports
  [ ] ✅   preload link in HTML; avatar starts before dynamic chunks resolve
  [ ] 📦  Commit + preview deploy + Lighthouse

Phase 4 — Hygiene
  [ ] 4.1  Delete portrait-photo.png + portrait-circuit.png (5.4 MB)
  [ ] 4.2  Untrack .DS_Store, update .gitignore
  [ ] 4.3  Move trace_*.json / tsbuildinfo / home_dotfield.png to perf/
  [ ] 4.4  Audit /about (three + drei + rapier + 2.4 MB card.glb)
  [ ] 4.5  Lighthouse CI assertions in GitHub Actions
  [ ] 4.6  Prune unreachable components
```

---

## 7. Rules.md compliance side-effects

Three items in this plan fix existing violations of the project's own binding rules, which is a useful argument if you're weighing perf against design:

| Change | Rule restored |
|---|---|
| §2.1 static `Noise` | *"No ambient/auto-playing motion — animation triggers on scroll position or interaction only, never on a timer."* |
| §1.1 SSR the h1 | *"Hero text is never blocked behind a 3D component's load."* |
| §1.3 drop the fallback border | No-Card Rule: *"no bordered/shadowed containers wrapping content."* |
| §2.3 reduced-motion cursor gate | *"Every interactive component needs a keyboard-accessible and reduced-motion-safe fallback."* |
