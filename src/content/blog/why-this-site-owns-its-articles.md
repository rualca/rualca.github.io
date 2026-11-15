---
title: Why this site now owns its articles
description: The portfolio moved to Astro so a post could be a page with its own canonical URL, instead of a paragraph inside a single-page app.
pubDate: 2026-11-15
tags:
  - astro
  - writing
linkedinText: I rebuilt my site on Astro so articles are real pages, not sections of a single-page app. First post on why it matters for publishing.
---

For a long time this site was one page. Everything I wanted to say had to fit
into a section of that page, and anything longer had nowhere to live.

## A post needs an address

An article without its own URL cannot be the canonical source of anything. It
cannot be linked from another platform, it cannot appear in a feed, and it cannot
be the copy that other sites point back to. A single-page app gives every section
one address, and that address is the home page.

Astro gives each post a route. `/blog/<slug>/` is a real page, with its own title,
description, canonical tag and Open Graph metadata.

## The publishing order follows from that

Because the blog page is the canonical copy, it has to exist before anywhere else
links to it:

1. the post is committed here and the site is deployed;
2. dev.to receives the article with `canonical_url` pointing at this page;
3. LinkedIn gets a short post with a link, not the whole article;
4. Medium, if it is used at all, imports the story with the canonical set.

Publishing is a deliberate action, never a schedule. The pipeline holds the draft
until someone asks for it.
