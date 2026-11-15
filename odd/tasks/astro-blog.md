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
- T1 Islands decomposition; drop mobile wake gate. Specs: S1. Route: inline (worker
  admission declined: no trigger held). Commit: 89bd5b2
- T2 Dep majors one commit each: motion, lucide-react, eslint 10, GH Actions bumps.
  Specs: S6. Route: inline. Commits: dfcd49d, 148dba2, 6b1ec2b, bbf18f6
- T3 Content collection, blog routes, sitemap/RSS. Specs: S2-S5. Route: inline (same).
  Commit: b8fb2c1

## Log
- L1 Owner: "dale a todo hasta el final" - finish T1-T3 without per-step approval.
- L2 Pages deploy of `0ea35cb` green (run 43748268846); CI warns checkout@v4,
  setup-node@v4, upload-artifact@v4 target Node 20 and run forced on Node 24.
- L3 (T1, 89bd5b2): five islands (`load` x3, `visible`, `idle`); `client:visible`
  replaces the mobile wake gate. Content is now server-rendered - which exposed
  `InteractiveGridPattern` serialising 19,202 rects: **3.3 MB of HTML**. Grid draws
  after mount, `<svg>` reserves the space: now **111 kB**, no layout shift.
  Tests 119 (the 2 below-fold tests died with the mechanism; 7 Lenis tests moved to
  `SmoothScroll.test.jsx` unchanged).
- L4 (T2, dfcd49d/148dba2/6b1ec2b/bbf18f6): motion 14.14.0, lucide-react 1.73.0,
  eslint 10.15.0 + react-hooks 7 + react-refresh 0.5 + globals 17, actions to
  checkout@v7/setup-node@v7/upload-pages-artifact@v5/deploy-pages@v5. eslint 10 broke
  the config twice: react-hooks 7 nests its flat configs under `configs.flat`, and
  react-refresh 0.5 dropped `configs.vite`. The new `set-state-in-effect` rule flagged
  `Magnet.jsx`; its reset moved to render time. Deploy with the new actions: green
  (run 43748848372), Node 20 deprecation warning gone.
- L5 (T3, b8fb2c1): collection + `/blog/`, `/blog/<slug>/`, `/rss.xml`. Sitemap is
  generated and emits a **sitemap index**, so `robots.txt` now points at
  `sitemap-index.xml` - the old URL would have 404'd. Negative case proven: a scratch
  post without `title` and with 5 tags failed the build (`InvalidContentEntryDataError`,
  exit 1), then was removed.
