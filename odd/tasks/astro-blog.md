# Astro blog migration

## Specs
- S1 Landing page keeps Lenis (reduced-motion + mobile gated), ScrollReveal and
  below-fold deferral; use Astro hydration directives where they express the gate.
- S2 Posts in `src/content/blog/` (md/mdx), zod-validated; bad frontmatter fails the build.
- S3 Frontmatter: title, description, pubDate, tags (max 4), optional cover,
  optional linkedinText, optional canonical (defaults to page URL).
- S4 Routes `/blog` (newest first) and `/blog/<slug>`, each with own title,
  description, canonical, OG via `src/layouts/Base.astro`.
- S5 Generated `sitemap.xml` and `rss.xml`; drop hand-maintained `public/sitemap.xml`.
- S6 New dependencies pinned exactly (no `^`).

## Tasks
- T1 Islands decomposition; drop mobile wake gate. Specs: S1. Route: worker. Commit: _pending_
- T2 Dep majors one commit each: motion, lucide-react, eslint 10, GH Actions bumps. Specs: S6. Route: inline. Commit: _pending_
- T3 Content collection, blog routes, sitemap/RSS. Specs: S2-S5. Route: worker. Commit: _pending_

## Log
- L1 Owner: "dale a todo hasta el final" - finish T1-T3 without per-step approval.
- L2 Pages deploy of `0ea35cb` green (run 43748268846); CI warns checkout@v4,
  setup-node@v4, upload-artifact@v4 target Node 20 and run forced on Node 24.
