# Homepage Migration — Inventory & Plan (Phase A)

## Stack discovered

- **Next.js 16.2.1** (App Router, much newer than Next 13–15 patterns)
- **React 19.2.4** (Server Components by default, `'use client'` for interactivity)
- **Tailwind v4** with `@theme` directive in [globals.css](apps/web/src/app/globals.css) — there is **no** `tailwind.config.js`. Custom animations must be defined in CSS.
- AGENTS.md flag: this Next.js has breaking changes; verify against `node_modules/next/dist/docs/` before writing each component.

## Current homepage flow

1. [page.tsx](apps/web/src/app/page.tsx) — async server component, fetches exhibitions + blog posts, maps them, passes to `WireframeHomepage` as plain data props.
2. [WireframeHomepage.tsx](apps/web/src/components/home/WireframeHomepage.tsx) — client component, holds:
   - 1370 lines total
   - `HOMEPAGE_HTML` — ~89KB inlined HTML string with `%%HERO_EVENTS%%`, `%%EXHIBITION_CARDS%%`, `%%BLOG_CARDS%%` placeholders
   - `HOMEPAGE_JS` — ~200 lines of vanilla JS run via `new Function()` in `useEffect`
   - Helper functions: `optimizedImg()`, `buildHeroEvents()`, `buildExhibitionCards()`, `buildBlogCards()`, `formatDate()`, `CATEGORY_COLORS`, `DEFAULT_HERO_EVENTS`, `DEFAULT_BLOGS`
3. CSS lives in [wireframe.css](apps/web/src/components/home/wireframe.css) — imported globally; **all classes used by the wireframe HTML are defined here**, not in Tailwind. This is critical: most "classes" are real CSS, not Tailwind utilities. Migration just needs to keep those classnames.

## Section-by-section inventory

| # | Section | Wireframe lines | Existing React component | Reuse plan | Notes |
|---|---------|-----------------|--------------------------|------------|-------|
| 1 | **Hero** + upcoming events card | 222–247 | [Hero.tsx](apps/web/src/components/home/Hero.tsx) | **REBUILD** | Existing Hero uses different markup (Tailwind classes vs wireframe `.hero` CSS). Rebuild matching wireframe structure exactly. Static text + dynamic events list. |
| 2 | **Top marquee** (category words) | 249–278 | [DarkMarquee.tsx](apps/web/src/components/home/DarkMarquee.tsx) | **REBUILD** | Existing one uses undefined `animate-marquee` Tailwind class. Wireframe uses `.marquee-section` / `.marquee-track` / `.marquee-item` (defined in wireframe.css). Pure CSS animation, no JS needed. |
| 3 | **Stats** (count-up) | 280–310 | [Stats.tsx](apps/web/src/components/home/Stats.tsx) | **REBUILD** | Wireframe uses `.stats`, `.stat-card`, `.count-up`, `.stat-suffix`. Count-up animation in inline JS (lines 75-99 of HOMEPAGE_JS). Needs client component with IntersectionObserver. |
| 4 | **What to Expect** (6 cards) | 312–353 | [WhatToExpect.tsx](apps/web/src/components/home/WhatToExpect.tsx) | **REBUILD** | Wireframe uses `.expect-section`, `.expect-grid`, `.expect-card`, `.expect-icon`. Static. |
| 5 | **Exhibitions grid** | 356–376 | [Exhibitions.tsx](apps/web/src/components/home/Exhibitions.tsx) | **REBUILD** | Cards built by `buildExhibitionCards()` helper using `events` data. Carousel dot logic in inline JS (lines 184–202). Needs client wrapper for scroll dots. |
| 6 | **App Download** (with phone mockup) | 378–514 | [AppDownload.tsx](apps/web/src/components/home/AppDownload.tsx) | **REBUILD** | Large section with `.app-section`, `.app-mockup`, `.phone-frame`, `.phone-screen`, `.app-buttons`, `.app-feature`. Lots of inline SVGs. Static. |
| 7 | **Brands marquee** (2 rows of logos) | 516–589 | [BrandsMarquee.tsx](apps/web/src/components/home/BrandsMarquee.tsx) | **REBUILD** | Uses `.brands-marquee-wrapper`, `.brands-track`, `.brand-logo`. CSS animation `marqueeScroll` already defined in wireframe.css. Static logos. |
| 8 | **Blog magazine** (1 big + 2 small) | 591–610 | [BlogPreview.tsx](apps/web/src/components/home/BlogPreview.tsx) | **REBUILD** | Cards built by `buildBlogCards()` using `blogs` data. Carousel dot logic in inline JS. Needs client wrapper. |
| 9 | **Newsletter** (centered form) | 612–~720 | [Newsletter.tsx](apps/web/src/components/home/Newsletter.tsx) | **REBUILD** | Form with name/phone/email/state. Currently just `alert()` on submit; existing component does real Brevo submission via API. |
| 10 | **Shopping Guide** (3 steps) | ~720–~880 | [ShoppingGuide.tsx](apps/web/src/components/home/ShoppingGuide.tsx) | **REBUILD** | Static 3-step section. |
| 11 | **Venues map** | ~880–~1000 | [Venues.tsx](apps/web/src/components/home/Venues.tsx) | **REBUILD** | Interactive — map markers + venue cards, hover/auto-cycle every 3.5s (logic in HOMEPAGE_JS lines 41–67). Needs client component with timer + state. **Most complex section.** |
| 12 | **FAQ** (accordion) | ~1000–1300 | [FAQ.tsx](apps/web/src/components/home/FAQ.tsx) | **REBUILD** | Click-to-expand items via `.faq-question` + `.active` toggle (HOMEPAGE_JS lines 117–124). Needs client component with state per item. |

(Note: line numbers for sections 9–12 are approximate — I read up to line 619; rest is similar pattern.)

## Sections that need client interactivity

These must be `'use client'`:

- **Stats** — count-up on scroll
- **Exhibitions** — carousel dots on scroll
- **Blog** — carousel dots on scroll
- **Newsletter** — form submission
- **Venues** — hover + auto-cycle timer
- **FAQ** — accordion toggle

These can stay server components:

- Hero (static text + pre-rendered events)
- Top marquee (CSS animation only)
- What to Expect (static)
- App Download (static)
- Brands marquee (CSS animation only)
- Shopping Guide (static)

## Migration order (safest first)

Recommend this order. Each batch is roughly 1 visual region of the page:

| Batch | Sections | Why grouped | Risk |
|-------|----------|-------------|------|
| **B1** | Top marquee + Brands marquee | Pure CSS, no JS, no data | Lowest |
| **B2** | What to Expect + Shopping Guide + Hero | Static content; Hero takes data but no client logic | Low |
| **B3** | App Download + FAQ | Self-contained; FAQ has simple state | Low |
| **B4** | Newsletter + Stats | Both client; Newsletter already exists usefully; Stats needs count-up | Medium |
| **B5** | Exhibitions + Blog (magazine) | Both data-driven, carousel dots, similar pattern | Medium |
| **B6** | Venues | Interactive map, timer, hover. Save for last. | Highest |

After each batch: verify in browser (mobile + desktop), confirm visual match, then move on.

## Key technical decisions for the rebuild

1. **Keep all wireframe.css classes intact.** Components reference them directly via `className="hero-card"` etc. No new Tailwind classes; no class renames. This guarantees the styling stays identical.

2. **Preserve inline `style="..."` exactly** — convert to React `style={{ ... }}` with the same values. There are dozens of these in the wireframe (especially around the magazine blog grid, "View All" links, carousel dots).

3. **Section structure: each section gets its own file** under `apps/web/src/components/home/sections/`, e.g. `sections/HeroSection.tsx`, `sections/TopMarquee.tsx`. New folder so we don't conflict with the existing (broken) components — those get deleted last.

4. **Keep `WireframeHomepage` working throughout migration via `skipSections` prop.** During Batch B1, Batch B2, etc., the migrated section names are passed in `skipSections={['top-marquee', 'brands-marquee']}` and `WireframeHomepage` strips those `<section>` blocks from the HTML string before injecting. New React components render in their place inside `page.tsx`.

5. **No CSS file moves until the end.** wireframe.css stays as-is until every section is migrated. Then it gets either renamed `home.css` or split per-section.

6. **Do NOT delete the unused [components/home/Hero.tsx, etc.]** until Phase D (after every section migrated and verified). They're confusing but they're a useful reference for naming and prop shapes.

## Files that will be created during migration

- `apps/web/src/components/home/sections/HeroSection.tsx`
- `apps/web/src/components/home/sections/TopMarquee.tsx`
- `apps/web/src/components/home/sections/StatsSection.tsx`
- `apps/web/src/components/home/sections/WhatToExpect.tsx`
- `apps/web/src/components/home/sections/ExhibitionsSection.tsx`
- `apps/web/src/components/home/sections/AppDownloadSection.tsx`
- `apps/web/src/components/home/sections/BrandsMarquee.tsx`
- `apps/web/src/components/home/sections/BlogSection.tsx`
- `apps/web/src/components/home/sections/NewsletterSection.tsx`
- `apps/web/src/components/home/sections/ShoppingGuideSection.tsx`
- `apps/web/src/components/home/sections/VenuesSection.tsx`
- `apps/web/src/components/home/sections/FAQSection.tsx`

## Files that will be modified

- `apps/web/src/app/page.tsx` — compose section components in order
- `apps/web/src/components/home/WireframeHomepage.tsx` — add `skipSections` prop, eventually deleted
- `apps/web/src/components/home/wireframe.css` — kept until end, then renamed/split

## Files that will eventually be deleted

- `apps/web/src/components/home/WireframeHomepage.tsx`
- `apps/web/src/components/home/WireframeHomepage.backup.tsx`
- `apps/web/src/components/home/Hero.tsx` (old, unused)
- `apps/web/src/components/home/About.tsx`
- `apps/web/src/components/home/AppDownload.tsx`
- `apps/web/src/components/home/BlogPreview.tsx`
- `apps/web/src/components/home/BrandsMarquee.tsx`
- `apps/web/src/components/home/CategoryMarquee.tsx`
- `apps/web/src/components/home/DarkMarquee.tsx`
- `apps/web/src/components/home/Exhibitions.tsx`
- `apps/web/src/components/home/FAQ.tsx`
- `apps/web/src/components/home/Newsletter.tsx`
- `apps/web/src/components/home/ShoppingGuide.tsx`
- `apps/web/src/components/home/Stats.tsx`
- `apps/web/src/components/home/Venues.tsx`
- `apps/web/src/components/home/WhatToExpect.tsx`
- `apps/web/src/components/home/wireframe.css` (renamed/split, not literally deleted)

## What does NOT change

- Visual design — all CSS classes preserved, all inline styles preserved
- Fonts (Poppins via globals.css)
- Color palette (CSS vars in globals.css)
- API routes, data fetching pattern, payload of `events`/`blogs` props
- Behaviour: scroll fade-ins, marquee speed, count-up timing, FAQ accordion, venue cycle 3.5s, carousel dots
- Mobile/desktop breakpoints (in wireframe.css media queries)

## Phase A verdict

**Migration is feasible and the design will remain identical** if we:
- Reuse `wireframe.css` until the very end
- Copy markup verbatim from `HOMEPAGE_HTML` per section
- Convert inline styles literally to React `style={{}}` form
- Keep `skipSections` working at every batch boundary so the page never goes broken
