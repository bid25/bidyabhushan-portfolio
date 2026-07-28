# Task: Full responsive audit and rebuild of bidyabhushan-portfolio

You have Chrome access. **Use it constantly.** This is a visual task — every fix must be
verified by looking at the rendered page, not by reasoning about the code.

## The working method (non-negotiable)

For every single change:

1. Open the page in Chrome DevTools device mode
2. **Screenshot it. Actually look at the image.**
3. Ask: does this look like something a senior designer would ship? Not "does it not
   crash" — does it look *intentional and good*?
4. Fix
5. Screenshot again and compare
6. Repeat until it genuinely looks right

Never mark something done from code reasoning alone. If you did not look at a
screenshot of the result, it is not done.

**Test at these widths, every time:**

| Width | Device | Notes |
|---|---|---|
| 320 | iPhone SE / small Android | tightest case |
| 390 | iPhone 14/15 | most common |
| 412 | Pixel / mid Android | |
| 744 | iPad mini portrait | tablet gap — currently broken, see below |
| 820 | iPad Air portrait | tablet gap |
| 1024 | iPad landscape | |
| 1440 | Desktop | **must not regress** |
| 844×390 | Phone landscape | short + wide, usually forgotten |

Also test: light mode AND dark mode, scrolling all the way down each page, and
rotating mid-scroll.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · TypeScript
three / @react-three/fiber / drei / rapier · GSAP · Motion · Lenis · OGL

Run `npx tsc --noEmit` after changes. Must stay clean.

---

## Confirmed root causes (already traced — do not re-diagnose, just fix)

### 1. ProfileCard vanishes on mobile, sits wrong on tablet

`app/page.tsx:118` wraps `LazyProfileCard` in `HeavyComponentWrapper`.

`components/HeavyComponentWrapper.tsx:60` returns the `fallback` for any viewport
under 768px. The fallback here is `<div className="h-full w-full bg-void/50 border
border-ash/10" />` — **an empty grey box**. That is why the profile card is gone on
phones.

On tablet (768–1023px) the wrapper does *not* bypass, so the card renders — but the
hero grid is `grid-cols-1 lg:grid-cols-2`, so it stacks *below* the intro text
instead of beside it. That is the "weird place after the text" the owner described.

**Intent:** the ProfileCard is the centerpiece of the landing screen and must be
visible and well-placed at every width, alongside the animated decrypted name.
Decide the right mobile composition (stacked above/below the text? scaled? tilt
disabled?) and make it look deliberate. `enableMobileTilt={false}` is already set.

### 2. Trajectory is a 44px-wide sliver in the left corner on mobile

`lib/trajectoryLayout.ts:28` → `mobileTrunkX: 22`
`lib/trajectoryLayout.ts:499` → `const width = centerX * 2` = **44px total**

The entire vertical SVG is 44 pixels wide, hard against the left edge.

**Intent:** vertical orientation on mobile is correct and good. It should be
horizontally centered and use the available width.

### 3. Trajectory has no branches on mobile

`lib/trajectoryLayout.ts:567` → `computeVerticalLayout` returns `branchGroups: []`,
hardcoded empty. `computeHorizontalLayout` (line ~419) returns real `branchGroups`.

Branch data exists in `data/trajectory.ts` (`node.branches`) — it is simply never
laid out for vertical.

**Intent:** branches must render in vertical mode, and must grow/reveal as the user
scrolls, matching the scroll-scrub behaviour the horizontal layout already has. The
scrub mechanism (`--progress` / `--lp` CSS vars, see `revealVars` in
`components/Trajectory.tsx:51`) already works — vertical just needs geometry.

### 4. Mobile feels stripped of all atmosphere

`HeavyComponentWrapper` bypasses **all** WebGL under 768px. That kills:

- `LiquidEther` (`app/layout.tsx:49`) → replaced by flat `bg-void`
- `DotField` (`app/page.tsx:33`) → replaced by a static dot pattern

This was a deliberate perf decision and it is defensible — but the result reads as
empty rather than considered. Either give mobile a genuinely designed lightweight
alternative (CSS gradient / static art that looks intentional), or selectively allow
a cheap version on capable devices. **Do not** simply re-enable full WebGL on phones
without measuring frame rate under 4× CPU throttle.

`TargetCursor` correctly self-disables on touch (`components/TargetCursor.tsx:76-84`)
— **leave that alone**, it is right.

---

## Owner's reported issues, verbatim

> 1. the ui feels very limited, no ether in side, no target cursor (which I
>    understand should not be there, it is fine)
> 2. the trajectory runs vertically down but in the left corner with no branches. If
>    it runs vertically that is fine and even good, but it should run in the center
>    with all the branches, and be scroll interactive — branches should grow as the
>    user scrolls. That happens now but not perfectly.
>    The lanyard is not visible and there is no area for it. ASCII art is almost
>    blending with the page.
> 3. the featured project section feels very low effort, no text alignment
> 4. my profile window, which was the centre of attraction, is not there. It is
>    visible in the tablet version but in a weird place, after the initial text and
>    before featured projects — not on the front landing screen with the decryption
>    animated name.

Items not yet traced (investigate yourself):
- **Lanyard** (`app/about/page.tsx:59`) — not visible, no space allocated for it
- **ASCII art** (`components/ascii-art-demo.tsx`) — insufficient contrast against page
- **Featured Projects** (`app/page.tsx:139-172`) — alignment and hierarchy feel unconsidered

---

## Full component inventory — audit every one

Check each at all widths. For each: does it render? is it positioned deliberately?
is it readable? is it performant? are touch targets ≥44px?

**Global:** `app/layout.tsx` · `Nav.tsx` (recently fixed — verify hamburger works) ·
`Footer.tsx` · `providers/SmoothScroll.tsx` · `providers/ThemeProvider.tsx`

**Homepage:** hero grid · `LazyDecryptedText` · `BlurText` · `LazyProfileCard` ·
`LazyDotField` · `Noise` · Featured Projects · `Trajectory` · `ScrollReveal`

**Not yet examined at all — start fresh:** `InfiniteMenu.tsx` · `Radar.tsx` ·
`MagnetLines.tsx` · `EvilEye.tsx` · `TextPressure.tsx` · `DotGrid.tsx` ·
`ScrollFloat.tsx` · `Lanyard.tsx`

**Routes not yet reviewed:** `/projects` · `/projects/[slug]` · `/blog` · `/about` ·
`/contact` · `/style-guide`

---

## Constraints

- **Desktop must not regress.** Screenshot 1440px before and after every change.
- Do not re-enable the custom cursor on touch devices.
- Respect `prefers-reduced-motion` — the existing bypasses are correct.
- Keep `npx tsc --noEmit` clean.
- The design language is established (`DESIGN.seed.md`, `app/globals.css`, colour
  tokens `void`/`bone`/`ash`/`amber`/`cyan`). Work within it — this is a fix pass,
  not a redesign.
- Existing patterns to reuse, not reinvent: `useMediaQuery` hook
  (`hooks/useMediaQuery.ts`), `HeavyComponentWrapper`, `LazyComponents.tsx`.
- Images live in `public/` as `.webp` — do not reference the old `.jpg`/`.png` names,
  they were deleted.

## Suggested order

1. ProfileCard on the landing screen (biggest visible loss)
2. Trajectory centring + branches + scroll reveal
3. Mobile atmosphere replacement for LiquidEther/DotField
4. Featured Projects typography and alignment
5. Lanyard and ASCII art
6. Sweep every remaining component and route from the inventory

Work through it methodically. Take the time it needs. **Screenshot everything.**

## Definition of done

Every page, at every width in the table above, in both themes, looks like something
you would be proud to ship — not merely "not broken." You have personally looked at
a screenshot of each one.
