<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: Bidyabhushan Nanda — Portfolio
description: Full-stack engineering portfolio. Dark, direct, technically honest.
---

# Design System: Bidyabhushan Nanda — Portfolio

## Overview

**Creative North Star: "The Terminal Session"**

This portfolio reads like an engineer's workspace rendered for the browser: dark, information-dense when it needs to be, and spatially precise. The aesthetic borrows from the terminal and the technical diagram — environments where clarity is the only decoration and every element earns its pixel. Color is functional: it marks what is interactive and what is distinct, never what is decorative.

The site's interactive components (TextPressure, ScrollStack, MagnetLines) are not ornaments — they are inline proof of frontend craft, placed where a recruiter can see them working. Outside those moments, the surface is still and fast. Motion exists to demonstrate capability, not to fill silence.

Typography is monospaced where it signals code or data, and a clean sans-serif where it carries prose. The hierarchy is steep: large display type anchors each section, body text stays compact, and labels are small and tracked. White space is structural, not generous for its own sake.

**Key Characteristics:**
- Dark ground, near-black, with high-contrast text
- Two accent colors with distinct semantic roles (warm = interactive/primary, cool = informational/secondary)
- Monospaced display type for headings; sans-serif for body
- Interactive components deployed as inline craft demonstrations
- Flat surfaces — no shadows, no cards, no layered containers
- Dense but scannable: recruiter-optimized information hierarchy
- Static by default; motion is authored and intentional, never ambient

## Colors

The palette is achromatic at rest. Color arrives only when it has a job: marking interactive elements, distinguishing content categories, or signaling state.

### Primary
- **Signal Amber** (`[to be resolved during implementation]`): The warm accent. Used for links, hover states, focus rings, interactive affordances, and the primary call-to-action. Its warmth separates it from the cool ground and reads as "this does something."

### Secondary
- **Terminal Cyan** (`[to be resolved during implementation]`): The cool accent. Used for secondary distinctions — tags, skill categories, metadata, timestamps, and informational highlights. It coexists with Signal Amber without competing; their temperature difference is the separation.

### Neutral
- **Void** (`[to be resolved during implementation]`): Near-black background. Not pure `#000` — enough warmth or coolness to feel intentional, not default.
- **Ash** (`[to be resolved during implementation]`): Mid-gray for secondary text, borders, and dividers.
- **Bone** (`[to be resolved during implementation]`): Off-white for primary text. High contrast against Void, but not eye-searing pure white.

### Named Rules
**The Two-Signal Rule.** Signal Amber and Terminal Cyan never appear on the same element. They occupy different semantic lanes: warm = action, cool = information. Mixing them into gradients, combined borders, or adjacent decorative uses is prohibited.

**The No-Gradient Rule.** No gradients anywhere in the palette. Color fields are flat and solid. This is a binding rejection of the SaaS-template gradient vocabulary.

## Typography

**Display Font:** A monospaced or monospaced-adjacent face with variable weight support `[to be resolved during implementation — candidates: JetBrains Mono, Berkeley Mono, iA Writer Mono, or a variable-axis mono with display range]`
**Body Font:** A humanist or grotesque sans-serif `[to be resolved during implementation — candidates: Instrument Sans, General Sans, Switzer, Satoshi, or a system sans stack]`
**Label/Mono Font:** Same as Display where monospace is needed; Body where labels are prose-adjacent.

**Character:** The pairing is a register shift: monospaced headings signal the engineering context, sans-serif body signals readable prose. The contrast is deliberate — this is not a site that pretends to be a magazine. It types like someone who writes code.

### Hierarchy
- **Display** (bold, `clamp(2.5rem, 5vw, 4rem)`, line-height 1.1): Section headings. Monospaced. Set tight.
- **Headline** (semibold, `clamp(1.5rem, 3vw, 2rem)`, line-height 1.2): Project titles, blog post titles.
- **Title** (medium, `1.125rem`, line-height 1.4): Subsection headings, card-level titles.
- **Body** (regular, `1rem`, line-height 1.6, max-width `65ch`): Prose paragraphs, project descriptions. Sans-serif.
- **Label** (medium, `0.75rem`, letter-spacing `0.05em`, uppercase): Tags, metadata, navigation items, skill labels.

### Named Rules
**The Monospace Threshold Rule.** Headings at Display and Headline scale use the monospaced face. Title and below use the sans-serif. The threshold is semantic, not decorative: large type establishes the engineering context, small type prioritizes reading speed.

## Layout

Single-column, vertically scrolled, full-viewport sections. No sidebar. No multi-column grid for content — the page is a linear narrative read top to bottom.

Container max-width is generous (`1200px`) but content max-width is constrained (`65ch` for prose, wider for project showcases). Horizontal padding scales with viewport: tight on mobile (`1rem`), comfortable on desktop (`4rem–6rem`).

Section spacing is large — full viewport height or near it for major transitions. Within sections, spacing follows a consistent `8px` base unit (`0.5rem` increments). The rhythm is: generous between sections, tight within them.

Responsive behavior: the layout doesn't rearrange, it scales. No hamburger menu unless navigation has more than five items. Interactive components degrade gracefully on small viewports but remain functional.

**The No-Card Rule.** Content is not wrapped in bordered or shadowed containers. Sections are separated by space and typography hierarchy, not by card edges. This is a binding rejection: no nested cards, no card grids, no card-as-layout-unit.

## Elevation & Depth

Flat. No shadows, no box-shadows, no layered card surfaces. Depth is conveyed exclusively through scale contrast (large type vs. small type), color contrast (accented vs. neutral), and spatial separation (white space).

The interactive components (TextPressure, MagnetLines, Three.js scenes) create perceived depth through their own rendering — canvas/WebGL depth is part of the craft demonstration, not part of the layout system.

### Named Rules
**The Zero-Shadow Rule.** `box-shadow` is not used anywhere in the design system. If an element needs visual separation from its surroundings, it earns it through spacing, border (1px, Ash), or background color shift. Shadows are the SaaS-template's crutch; this system does not use them.

## Shapes

Edges are sharp. Default border-radius is `0`. Interactive elements (buttons, inputs, tags) use `0` radius or a minimal `2px` at most — just enough to avoid looking broken on high-DPI screens.

No rounded-square icon tiles. No pill-shaped buttons. No circular avatars-as-decoration. If a circle appears, it's because the content is circular (a photo, a logo mark) — never because the layout demands one.

Borders are `1px`, solid, using Ash. They are structural separators, not decorative frames.

### Named Rules
**The Sharp Edge Rule.** Border-radius defaults to `0` everywhere. Any radius above `2px` requires a specific, documented reason tied to the content it contains, not the layout it sits in.

**The No-Icon-Tile Rule.** No rounded-square tiles with centered icons used as section introductions, feature callouts, or skill representations. This pattern is explicitly banned. Skills and features are listed as text, demonstrated as code, or shown as interactive elements — never abstracted into icon grids.

## Do's and Don'ts

### Do:
- **Do** use monospaced type at display scale to establish engineering context immediately.
- **Do** deploy interactive components (TextPressure, ScrollStack, MagnetLines) as inline demonstrations of craft, placed where they are most legible to a scanning recruiter.
- **Do** use Signal Amber exclusively for interactive affordances (links, buttons, focus states).
- **Do** use Terminal Cyan exclusively for informational distinctions (tags, metadata, categories).
- **Do** keep project descriptions honest about scope: "contributed to" vs. "built" vs. "led."
- **Do** ensure the site loads fast and works without JavaScript for core content (progressive enhancement).
- **Do** provide a single, obvious path to contact (email or LinkedIn) visible without scrolling.

### Don't:
- **Don't** use gradients of any kind — no linear, radial, or conic gradients anywhere.
- **Don't** nest content inside bordered card containers. Space and typography separate content.
- **Don't** place rounded-square icon tiles above headings, skill lists, or feature descriptions.
- **Don't** use purple-to-blue color combinations in any context.
- **Don't** add ambient motion (floating particles, parallax backgrounds, auto-playing animations). Motion is triggered by scroll position or interaction, never by time.
- **Don't** use marketing language: no "passionate developer," no "crafting digital experiences," no "let's build something amazing together."
- **Don't** add testimonial sections, client logos, or social proof widgets unless real evidence exists to fill them.
- **Don't** use pill-shaped buttons or elements with border-radius exceeding `2px`.
