# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev         # Vite dev server (auto-picks a free port from 5173)
npm run build       # tsc -b && vite build → dist/
npm run preview     # serve dist/ (port 4173, auto-fallback if busy)
npm run typecheck   # tsc -b --noEmit (no build)
npm run lint        # eslint .
npm run lint:fix    # eslint . --fix
```

No test runner is wired. `npm run build` runs typecheck first — if TS fails, the bundle isn't emitted.

## Architecture

Marketing site for ReadonlyREST. Two routes (`/` and `/download`), SPA shell, BrowserRouter.

**Entry chain**: `index.html` → `src/main.tsx` (mounts `<HelmetProvider><BrowserRouter><App/></BrowserRouter></HelmetProvider>`) → `src/App.tsx` (sticky `Nav`, `<Routes>`, `Footer`, + a `ScrollToTop` that resets scroll on every `pathname` change).

**Pages** (`src/pages/*.tsx`) are thin: they render `<Seo .../>` with page-specific JSON-LD, then compose section components from `src/components/home/`. Don't hand-write `<meta>` tags — always go through `<Seo>`.

**SEO layer** (`src/seo/`):
- `schema.ts` — single source of truth for JSON-LD builders (`organizationSchema`, `websiteSchema`, `softwareApplicationSchema`, `webPageSchema`, `breadcrumbSchema`, `faqSchema`, `reviewSchema`) plus `SITE_URL`, `abs()`, and the `jsonld()` serializer that escapes `<`.
- `faqContent.ts` — plain-text mirrors of the JSX FAQs. Google's `FAQPage` schema requires plain strings, so the FAQ JSX in `Faq.tsx` / `FaqProduct.tsx` has a parallel string copy here. **Edit both when FAQ copy changes.**
- `Seo.tsx` — wraps `react-helmet-async`'s `<Helmet>` and emits title / description / canonical / OG / Twitter / alternate / JSON-LD blocks.

**Icons**: `src/components/Icon.tsx` is a closed enum (`IconName` union). Add new glyphs there, not inline SVG in components. Note the `import type { JSX, SVGProps } from 'react'` — React 19 moved `JSX` out of the global namespace.

## Non-obvious constraints

**Air-gapped — no CDN / external resources loaded at render time.** Outbound `<a href>` links are fine (they fetch on click, not on load). Rules:
- Fonts are self-hosted via `@fontsource/manrope` imported in `main.tsx` — do NOT add `<link>` to Google Fonts.
- `index.html` only contains: the React entry script, local icons/manifest, plus the three allowed external scripts: Papercups widget (`app.papercups.io/widget.js`), Google gtag (`googletagmanager.com/gtag/js?id=G-VTV059MD4Y`), and the inline `gtag("config","G-VTV059MD4Y")` call.
- Images live in `public/images/` and are referenced as `/images/foo.png` (absolute paths).
- `<iframe>` loading `portal.readonlyrest.com` is deliberately present on the Download page — the user wants that one.
- Manrope maxes at weight 800 on Fontsource. Use `font-extrabold` (800), never `font-black` (900). The type scale in `styles.css` caps at 800.

**Tailwind v4 cascade gotcha.** Any raw top-level CSS rule (outside `@layer`, `@utility`, `@theme`) ends up in the *unlayered* cascade bucket, which beats every Tailwind utility in `@layer utilities`. Previously this caused `img.h-8` to render at native size because an unlayered `img { height: auto }` rule was winning. **All base-element styles in `src/styles.css` must live inside `@layer base { … }`.** Custom utilities go in `@utility foo { … }` blocks. Theme tokens (colors, fonts, spacing, radii) go in `@theme { --color-ink: ... }` — Tailwind auto-generates `.text-ink`, `.bg-ink`, etc.

`src/styles.css` also contains `@source "../src/**/*.{ts,tsx,html}"` and `@source "../index.html"` — keep these if the content scanner ever misses class names.

**Path alias**: `@/*` → `src/*`, declared in both `tsconfig.app.json` (TS resolution) and `vite.config.ts` (bundler resolution). Both must agree.

**Strict TS + strict ESLint.** `tsconfig.app.json` enables `exactOptionalPropertyTypes`, `noImplicitOverride`, `noImplicitReturns`, `noUncheckedSideEffectImports`, `erasableSyntaxOnly`, `verbatimModuleSyntax`. ESLint uses `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked` — this enforces `readonly T[]` over `ReadonlyArray<T>`, `interface` over `type` for record shapes, no non-null assertions, escaped apostrophes/quotes in JSX text. Run `npm run lint:fix` before `typecheck`.

**ESLint 9, not 10.** `eslint-plugin-react@7` only accepts eslint up to `^9.7`. Don't upgrade to ESLint 10 until that plugin catches up.

**CSS side-effect imports** need `declare module '*.css'` — see `src/vite-env.d.ts`. `noUncheckedSideEffectImports` would otherwise reject `import '@/styles.css'` in `main.tsx`.
