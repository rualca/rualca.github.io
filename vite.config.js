import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
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
          // Rollup's automatic per-dynamic-import splitting. The Task 8 lazy()
          // + Suspense gating already keeps the whole Spline dependency graph out
          // of the entry chunk and out of the initial mobile/reduced-motion render.

          if (
            id.includes('/motion/') ||
            id.includes('gsap') ||
            id.includes('@gsap/react') ||
            id.includes('lenis')
          ) {
            return 'motion-vendor'
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
})
