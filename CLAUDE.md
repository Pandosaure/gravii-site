# Gravii Landing Site

Marketing site for Gravii (gravii.app). Built with Next.js (App Router), React 19,
a token-driven CSS design system, MDX blog, PostHog analytics. Repo: Pandosaure/gravii-site.

## Positioning (V2)
Gravii is a sovereign company brain for teams that hold confidential, regulated data
(fintech, healthtech, legaltech, deal-side). Ask your company's knowledge in plain
language, in Slack, and get answers grounded in cited evidence, or an honest
"I don't have anything on that." Sovereignty is the objection-killer, not the headline.
Authoritative positioning lives in the app repo: ~/Projects/gravii/docs/gravii-v2-adr.md

## Design system
- Concept A "Plainspoken": Hanken Grotesk + IBM Plex Mono, Forest accent, ink + paper.
- All visual values are CSS custom properties on `.gv-root` in src/app/globals.css.
  Light is primary; dark tokens are wired under `.gv-root[data-theme="dark"]`.
- B/C concept directions (oxblood/serif, bronze/mono) remain a token swap away.

## Structure
- src/app/layout.tsx — fonts, metadata, the `.gv-root` shell + Nav + Footer
- src/app/page.tsx — home (renders <Home/> from components/site/sections.tsx)
- src/app/security/page.tsx — Security & Sovereignty (honest claims; /trust 301s here)
- src/app/blog/ — MDX blog index + post template (content preserved, restyled)
- src/components/site/ — ported design components (Slack hero, capture surfaces, etc.)
- src/components/blog/ — MDX wiring (body wrapped in .gv-prose)

## Rules
- No em-dashes — use hyphens
- Always complete files, never partial edits
- No product-management vocabulary (dashboard, roadmap, traction, pipeline, ticket,
  backlog, sprint, feature request). Never "the AI" — name the action.
- Honesty constraints: "isolated and encrypted with your own revocable key"; CMEK is
  NOT residency; do not oversell "your data never touches us" (plaintext transits the
  app tier at request time; confidential computing is future roadmap).
- Preserve all blog post URLs, RSS, and sitemap. Zero 404s; 301 any moved URL.

## App repo
The main Gravii app is at ~/Projects/gravii
