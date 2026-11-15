import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Base config for the test runner only.
 *
 * Astro owns the production build (astro.config.mjs), so chunking and the
 * Tailwind plugin live there. vitest merges this file (vitest.config.js) to get
 * the same `@` alias; the runner's own transformer handles JSX, so no React
 * plugin is needed here (vitest 5 uses oxc and ignores an `esbuild.jsx` option).
 *
 * The `@` alias is duplicated in astro.config.mjs on purpose: neither config
 * reads the other. Change both or neither.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
})
