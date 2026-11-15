import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The `@` alias is duplicated in vite.config.js on purpose: Astro owns the
// build, vitest keeps using vite.config.js, and neither reads the other's
// config. Change both or neither.
export default defineConfig({
  site: 'https://rualca.github.io',
  // The post was removed after it had been indexed. A static host cannot send
  // a 301, so Astro emits a meta-refresh page here and the old URL keeps
  // working instead of answering 404.
  redirects: {
    '/blog/why-this-site-owns-its-articles/': '/blog/',
  },
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined

            // @splinetool is deliberately NOT grouped into a single vendor chunk here:
            // its runtime already performs its own internal dynamic imports for
            // sub-features (physics, font/opentype, gaussian-splat compression, ...).
            // Forcing all of @splinetool into one chunk was measured to merge those
            // on-demand sub-chunks into a single ~4.6MB chunk, which is worse than
            // Rollup's automatic per-dynamic-import splitting.

            if (id.includes('/motion/') || id.includes('/motion-dom/') || id.includes('/motion-utils/')) {
              return 'motion-vendor'
            }

            // Smooth-scroll stack: loaded on demand after first render.
            if (id.includes('gsap') || id.includes('@gsap/react') || id.includes('lenis')) {
              return 'scroll-vendor'
            }

            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor'
            }

            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('/scheduler/')
            ) {
              return 'react-vendor'
            }

            return undefined
          },
        },
      },
    },
  },
});
