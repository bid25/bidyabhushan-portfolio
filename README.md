<div align="center">

![bidyabhushan-portfolio](docs/assets/banner.svg)

**[bidyabhushan.in](https://bidyabhushan.in)**  ·  Live in production

![Next.js](https://img.shields.io/badge/Next.js-16-0A0B0D?style=flat-square&labelColor=0A0B0D&color=EDEAE4)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-0A0B0D?style=flat-square&labelColor=0A0B0D&color=22D3EE)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-0A0B0D?style=flat-square&labelColor=0A0B0D&color=EDEAE4)
![Three.js](https://img.shields.io/badge/Three.js-R3F-0A0B0D?style=flat-square&labelColor=0A0B0D&color=F5A623)
![Deployed](https://img.shields.io/badge/Vercel-live-0A0B0D?style=flat-square&labelColor=0A0B0D&color=F5A623)
![CLS](https://img.shields.io/badge/CLS-good%20band-0A0B0D?style=flat-square&labelColor=0A0B0D&color=22D3EE)

</div>

---

## Contents

- [What this is](#what-this-is)
- [Why it doesn't look like everyone else's portfolio](#why-it-doesnt-look-like-everyone-elses-portfolio)
- [The design system: "Terminal Session"](#the-design-system-terminal-session)
- [Technology stack](#technology-stack)
- [Two builds, one site: web and mobile](#two-builds-one-site-web-and-mobile)
- [Performance and layout stability](#performance-and-layout-stability)
- [Accessibility decisions](#accessibility-decisions)
- [The markdown documentation layer](#the-markdown-documentation-layer)
- [Difficulties worth naming](#difficulties-worth-naming)
- [Security and asset hygiene](#security-and-asset-hygiene)
- [Deployment](#deployment)
- [What is deliberately not documented here](#what-is-deliberately-not-documented-here)
- [Roadmap](#roadmap)
- [Contact](#contact)

---

## What this is

`bidyabhushan-portfolio` is my personal engineering portfolio — a live, production website at **[bidyabhushan.in](https://bidyabhushan.in)** covering my work, case studies, writing, and how to reach me.

It is not a resume rendered in HTML. It was scoped, specified, designed, and built as an actual product, with a written product requirement document, an enforceable design system, a sequenced delivery plan, and an append-only decision log. The site is the deliverable. The reasoning behind it is documented separately and treated with equal seriousness.

The site currently ships:

| Surface | What it does |
|---|---|
| **Home** | Identity, positioning, featured case studies, and an interactive career timeline ("signal path") |
| **Projects** | Full project index with per-project case study pages |
| **Case studies** | Long-form technical write-ups — architecture, decisions, tradeoffs, debugging narratives |
| **About** | Background, what I actually care about as an engineer, and what I am looking for |
| **Blog** | Long-form technical writing, authored as content rather than as markup |
| **Contact** | Direct contact routes, validated form handling |
| **Resume** | Served directly from the site, always in sync with the live version |

---

## Why it doesn't look like everyone else's portfolio

Most developer portfolios today converge on the same artefact. There is a reason for that: they are assembled from the same starter templates and the same component libraries, with the defaults left untouched. The result is recognisable at a glance — and it is recognisable to the exact people you are trying to impress.

The failure modes are consistent. This project was scoped explicitly against each of them.

| The default portfolio | This project |
|---|---|
| Rounded corners, soft shadows, purple-to-blue gradients, glassmorphism | **Zero border-radius, zero box-shadow, zero gradients.** Hierarchy comes from contrast, whitespace, and rule lines |
| Generic sans-serif at every size | **Two families only** — a variable monospace for display and data, a humanist sans for prose. No third font, ever |
| A grid of technology logos as a stand-in for skill | **No logo wall.** Skills are stated in honest tiers, and the case studies show the actual debugging work |
| Motion everywhere: things floating, pulsing, drifting on load | **No ambient motion.** Movement has to be earned by intent — it responds to the reader or it does not exist |
| Every section wrapped in a card with a border and a shadow | **No card containers.** Sections are separated by space and single-pixel rules |
| Six accent colours competing for attention | **A two-accent rule.** Amber means interactive. Cyan means informational. Nothing else gets a colour |
| Lorem-flavoured project blurbs, three lines each | **Real case studies** with named failures, root causes, and what changed as a result |
| Layout jumps around while fonts and images load | **Layout stability treated as a hard requirement**, not a lighthouse score to chase afterwards |
| One responsive layout squeezed through breakpoints | **Two genuinely different builds** — see below |

The underlying principle: a portfolio is itself a work sample. If the site is generic, that is the sample.

<div align="center">

![Design system](docs/assets/design-system.svg)

</div>

---

## The design system: "Terminal Session"

The visual language was written down as a specification before any of it was implemented, and it is enforced rather than suggested.

**Palette — four colours, two of which are accents**

| Token | Value | Role |
|---|---|---|
| Void | `#0A0B0D` | The only background. Not black — black is too hard against bone |
| Bone | `#EDEAE4` | All primary text. Never pure white; pure white on near-black is a glare problem, not a contrast win |
| Signal Amber | `#F5A623` | Interactive only. If it is amber, it does something |
| Terminal Cyan | `#22D3EE` | Informational only. Labels, status, metadata |

The two-accent rule is the load-bearing constraint. Because amber is reserved exclusively for interactivity, a reader learns the interface within about three seconds of landing and never has to guess what is clickable again.

**Typography**

- **JetBrains Mono Variable** — display, headings, labels, all numeric and status data
- **Instrument Sans** — body copy and long-form prose

Monospace as a display face is a deliberate risk. It reads as instrumentation rather than decoration, which is the exact register the site is aiming for, and it makes the tabular and timeline data legible without additional styling. It is paired with a proper humanist sans for reading length, because monospace body copy at paragraph length is hostile.

**Structural rules (non-negotiable)**

- `border-radius: 0` everywhere
- No `box-shadow`, no gradients, no blur-glass surfaces
- No card containers — hierarchy is space plus hairline rules
- No ambient or decorative motion
- Every interactive element has a visible, non-colour-dependent state change

---

## Technology stack

<div align="center">

![Stack map](docs/assets/stack.svg)

</div>

**Framework and language**

- **Next.js 16** — App Router, React Server Components
- **TypeScript**, strict mode — no implicit `any`, no escape hatches left in
- **Zod** — schema validation on every external input boundary

**Styling and primitives**

- **Tailwind CSS v4** — design tokens defined once and consumed everywhere; the palette above exists in exactly one place
- **Base UI (Nova preset)** — unstyled, accessible primitives. Behaviour and accessibility come from the library; every visual decision is mine

**Motion**

- **Motion** — component-level transitions and gesture response
- **Lenis** — smooth scroll on pointer devices
- **GSAP** — timeline-critical sequences where frame-accurate choreography matters

**3D, WebGL and canvas**

- **Three.js** with **React Three Fiber** and **Drei**
- **Rapier** — physics for the interactive lanyard element
- **OGL** — lightweight WebGL where a full Three scene is unnecessary overhead
- **Custom canvas components** — including a bespoke 2D dot-field written from scratch after the off-the-shelf option failed the design rules

**Content**

- **MDX** with typed frontmatter — case studies and blog posts are authored as content, not hand-marked-up pages, so the writing and the presentation stay independent

**Asset pipeline**

- **sharp** — every referenced image converted to WebP at appropriate dimensions
- **exiftool** — metadata scrubbing before anything is published

**Delivery**

- **Vercel** — edge network, custom domain, automatic HTTPS, per-branch preview builds

---

## Two builds, one site: web and mobile

This is the part I would most want someone to look closely at.

The common approach is one layout with media queries applied on top: the same components render everywhere, just narrower. That works until the desktop experience is carrying WebGL scenes, physics simulation and pointer-driven interaction — at which point "narrower" means a phone downloading and executing work it can never use, on a battery and a cellular connection.

So the site ships **two distinct experiences from one content source**.

<div align="center">

![Dual experience](docs/assets/dual-experience.svg)

</div>

**Desktop / pointer**

- Full WebGL and canvas scenes
- Physics-driven interactive elements
- Pointer-reactive fields that respond to cursor position
- Scroll-pinned narrative sequences
- Smooth-scroll layer with a tuned easing curve

**Mobile / touch**

- Heavy interactive components are **not shipped at all** — not hidden with CSS, not rendered and then faded out. They are replaced with composed static equivalents that carry the same visual idea at a fraction of the cost
- Safe-area insets honoured properly: notch, dynamic island, home indicator, and rotation, on real devices rather than a resized desktop browser
- Navigation, the career timeline, and the case study layouts are **re-flowed for vertical reading**, not compressed
- Scroll momentum is handed back to the operating system — a JavaScript smooth-scroll layer on touch fights the platform and always loses
- Tap targets sized for thumbs, with state changes that do not depend on hover

Both experiences share one content source, one design system, and one set of typography and colour rules. What differs is the delivery, and each target is treated as a first-class product rather than a degraded copy of the other.

Getting this right took a full responsive audit. Four confirmed root-cause defects came out of it — a navigation overflow at narrow widths, a missing viewport declaration that silently broke safe-area insets, a wrapper that was hiding a component on mobile that was supposed to be present, and a layout function producing empty branch groups in the timeline. Two more turned up alongside them: a full-screen transparent element that was intercepting taps whenever one interactive component rendered nothing, and an ASCII-art element failing contrast in dark surroundings. All of them were only visible on real hardware.

---

## Performance and layout stability

<div align="center">

![Layout stability](docs/assets/metrics.svg)

</div>

**Cumulative Layout Shift sits inside the "good" band (≤ 0.10) on both desktop and mobile.** That is not a coincidence and it was not fixed afterwards — it is the consequence of four rules applied from the start.

**1. Nothing renders without reserved space.**
Every image, canvas, embed and media block declares its dimensions or aspect ratio up front. The browser allocates the box before the content arrives, so nothing below it ever gets pushed down.

**2. Fonts do not reflow the page.**
Variable fonts, self-hosted, with metric-matched fallbacks. Text does not visibly re-lay-out when the webfont resolves. This is the single largest source of layout shift on most portfolio sites and it is entirely avoidable.

**3. Motion runs on `transform` and `opacity` only.**
No animated `width`, `height`, `top`, `left`, or `margin`. Compositor-only properties do not trigger layout, which means the site can be heavily animated and still contribute effectively zero layout shift. Motion and stability are not in tension; treating them as if they are is a choice.

**4. Server-first shell.**
Structure arrives complete on the first paint. Interactive enhancement layers on top of a page that is already correctly laid out — so there is no skeleton-to-content jump, and no reader watching the page rearrange itself.

Supporting decisions: WebP throughout at correct dimensions, heavy interactive modules loaded on demand rather than blocking first paint, and route-level splitting so a reader landing on the blog never pays for the 3D code they will not see.

---

## Accessibility decisions

- **Base UI primitives** — keyboard behaviour, focus management and ARIA semantics come from audited components rather than being reinvented
- **Animated text announces its final value.** A decrypt-style text effect was scrambling characters mid-animation, and screen readers were reading the scramble aloud. It was corrected so assistive technology receives the resolved text while the visual effect still plays
- **Colour is never the only signal.** Every state carries a second cue
- **Contrast checked against the actual background**, including the ASCII-art surfaces where the failure was found in practice, not in theory
- **Focus states are visible and square** — consistent with the design system rather than the browser default

---

## The markdown documentation layer

<div align="center">

![Documentation layer](docs/assets/docs-layer.svg)

</div>

This is the part that has been most useful and is least visible.

Alongside the project sits a set of markdown documents that function as a working specification. They are not written after the fact for presentation — they are written before implementation, and they are what implementation is checked against.

| Document | Purpose |
|---|---|
| **PRD.md** | What the site must prove, to whom, and what is explicitly out of scope |
| **PRODUCT.md** | Audience, narrative arc, and what each individual page has to accomplish for a reader |
| **DESIGN.md** | The full design system — colour, type scale, spacing, motion rules, and the reasoning behind each constraint |
| **ARCHITECTURE.md** | Boundaries and responsibilities. Where different kinds of logic are allowed to live |
| **RULES.md** | Non-negotiables. The explicit list of things this project does not do |
| **PHASES.md** | Sequenced delivery — what ships now, what waits, and the reason for the ordering |
| **MEMORY.md** | Append-only decision log |

**MEMORY.md is the canonical source of truth**, and it is append-only by rule. When a decision is reversed, the reversal is appended with its reasoning — the original is never edited out. The log therefore records not just the current state but the path to it, including the wrong turns.

The corollary is a rule I have found genuinely valuable: **documentation drift is treated as a defect.** When the live site and the decision log disagree, one of them is wrong, and it gets resolved explicitly rather than ignored. Four reconciliation entries have been appended so far — covering a navigation item that shipped ahead of its content, the two-accent rule, a change of display typeface, and a stale internal report.

Two things fell out of this that I did not expect. First, the constraints held under pressure precisely because they were written down before the temptation to break them arrived. Second, the decision log turned out to be the most useful interview preparation material I have, because it is a record of tradeoffs with reasoning attached, rather than a list of features.

---

## Difficulties worth naming

Documenting only the successes would make this a brochure. These are the problems that actually cost time.

**A green build is not a working site.**
A successful production build does not verify that runtime assets exist. Components dependent on 3D models and textures compiled without complaint and then failed silently in the browser. Asset verification has to be a separate, deliberate step against a running site with the console open — the build step will not do it for you.

**Component libraries are starting points, not solutions.**
Third-party interactive components consistently arrived missing required client-side directives, and a routine library update would silently revert the fixes. One component's assets were corrupted at the CDN and had to be sourced directly. Another failed the design rules outright and was replaced with a custom canvas implementation written from scratch. Treating library components as finished products is how a site ends up looking like every other site.

**Undocumented defaults cost real hours.**
A smooth-scroll library's touch synchronisation defaulted to a value the documentation did not surface, producing scroll behaviour on mobile that was wrong in a way that was very hard to attribute. It was resolved by reading the compiled source. Sometimes that is the only way to find out what a dependency actually does.

**Invisible elements are still elements.**
When one interactive component rendered nothing, its container remained in the layout as a full-screen transparent element and quietly intercepted every tap on the page. Nothing looked wrong. Nothing was reported by any tool. It only surfaced on a real device.

**Version control on a project with heavy assets needs discipline early.**
Build artefacts and dependencies had made it into version control. Removing files from tracking does not remove them from history — that distinction matters, and conflating reversible with irreversible operations on a repository is how work gets lost. The `.gitignore` was also carrying overly broad patterns that were excluding files that mattered.

**Real-device testing is not optional.**
Every one of the mobile defects listed earlier — the safe-area failure, the tap interception, the incorrectly hidden component — was invisible in a resized desktop browser. Device emulation is a convenience, not a verification step.

**Deciding what to leave out was harder than deciding what to build.**
A pointer-driven portrait reveal with an amber aperture ring was fully designed — including how to run it without any per-frame state updates — and then deliberately deferred, because it did not yet earn its place. Sequencing is a design decision. The specification exists; it can ship when it is justified.

---

## Security and asset hygiene

Portfolio sites publish personal material, which makes them a small but real privacy surface.

- **GPS coordinates and EXIF metadata stripped** from every published photograph before it went anywhere near the repository. Camera images carry location by default and a personal photo will happily publish the place it was taken
- **Unreferenced and oversized assets removed** rather than left in the tree
- **Every input validated at the boundary** with typed schemas — no unchecked data crosses into application code
- **Repository hygiene enforced**: dependencies and build output untracked, ignore patterns tightened and reviewed rather than copy-pasted

---

## Deployment

<div align="center">

![Deployment](docs/assets/deployment.svg)

</div>

**Live now on Vercel**, at the custom domain **[bidyabhushan.in](https://bidyabhushan.in)** — edge delivery, automatic HTTPS, and per-branch preview builds so changes can be reviewed at a real URL before they reach production.

**AWS migration is planned.** Vercel was the correct decision for shipping: it removed an entire category of infrastructure work at a point where the priority was getting a correct site in front of people. But it also abstracts away the layer I want to understand properly — CDN configuration, certificate management, build pipelines and observability. Moving the site to AWS is the next deliberate step, and it is scheduled rather than urgent. The current deployment is stable and there is no reason to rush it.

---

## What is deliberately not documented here

This document covers **what** the site is: the stack, the design system, the constraints, the decisions, and the problems encountered along the way.

It does not cover **how** it is assembled — no internal architecture, no component structure, no configuration, no setup or build instructions. That is intentional. This repository documents outcomes and reasoning; the implementation is not published as a template for reuse.

If you want to talk through any of it in detail, I am happy to do that directly.

---

## Roadmap

- [x] Design system specified and enforced
- [x] Core pages, case studies and blog live
- [x] Separate desktop and mobile experiences shipped
- [x] Responsive and accessibility audit completed and resolved
- [x] Image pipeline, WebP conversion and metadata scrubbing
- [x] Custom domain live on Vercel
- [ ] Pointer-driven portrait reveal component
- [ ] Full CI/CD pipeline with automated checks on every change
- [ ] Migration to AWS
- [ ] Expanded case study coverage

---

## Contact

**Bidya Bhushan Nanda** — Full-Stack & AI/ML Engineer
B.Tech Electronics, Maharaja Agrasen Institute of Technology, Delhi · Class of 2029
New Delhi, India · Open to full-stack and AI/ML internships

[**bidyabhushan.in**](https://bidyabhushan.in) · [GitHub](https://github.com/bid25) · [LinkedIn](https://linkedin.com/in/bidya-bhushan-nanda-6a0149369) · bidyabhushannanda@gmail.com

<div align="center">

<sub>© 2026 Bidya Bhushan Nanda</sub>

</div>
