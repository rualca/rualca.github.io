import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Blog posts. The schema is the contract the publishing pipeline writes
 * against, so a post with wrong or missing frontmatter fails the build instead
 * of rendering half-populated.
 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // dev.to accepts at most 4 tags, so the schema refuses more than that here
    // rather than letting the adapter truncate them later.
    tags: z.array(z.string()).max(4).default([]),
    cover: z.string().optional(),
    // LinkedIn gets a short post with a link, not the article, so its text is
    // authored next to the article instead of being derived from it.
    linkedinText: z.string().optional(),
    // Defaults to the page URL; set it when the post was published elsewhere
    // first and this page is the copy.
    canonical: z.string().url().optional(),
  }),
});

export const collections = { blog };
