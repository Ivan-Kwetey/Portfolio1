# Ivan Kwetey Portfolio

Portfolio site for Ivan Kwetey, built as a case-study-driven product design showcase in React + Vite.

## Product Direction

This repo is structured around a clear portfolio thesis:

- Home should feel curated, editorial, and motion-led.
- Each case study should be addressable by URL and able to stand on its own.
- Content updates should live in a small number of source-of-truth files instead of being scattered through UI components.

## Architecture

- `src/content/siteConfig.ts`
  Portfolio-wide identity and product metadata such as name, role, contact links, default SEO copy, and home-page case ordering.
- `src/data/projectCards.ts`
  Canonical project summary data for cards, routing slugs, home hero media, and case-study metadata.
- `src/components/projects/*`
  Case-study rendering. `ProjectDetails.tsx` dispatches to the correct project experience.
- `src/lib/portfolioRouting.ts`
  Lightweight route parsing and URL generation for home and project deep links.
- `src/components/AutoplayVideo.tsx`
  Shared media primitive used across hero surfaces and case-study storytelling.

## Working With Content

- Update portfolio identity, SEO defaults, and contact links in `src/content/siteConfig.ts`.
- Update case-card copy, titles, canonical slugs, and home hero ordering in `src/data/projectCards.ts`.
- Update long-form case-study layouts in the relevant file under `src/components/projects/`.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
