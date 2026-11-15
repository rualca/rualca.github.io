import { describe, expect, it } from 'vitest'
import fs from 'node:fs'

// The bug this pins: Base.astro did not import the design layer, so every page
// wrapped only in the layout — the writing index and each post — shipped its
// Tailwind class names against no stylesheet at all. It deployed that way.
const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8')

describe('stylesheets are owned by the base layout', () => {
  it('imports App.css, the only Tailwind entry point', () => {
    expect(read('./layouts/Base.astro')).toMatch(/^import '\.\.\/App\.css';$/m)

    const app = read('./App.css')
    expect(app).toContain('@import "tailwindcss"')
    expect(app).toContain('@theme')
  })

  it('wraps every page in the layout, so no page renders unstyled', () => {
    for (const page of ['pages/index.astro', 'pages/blog/index.astro', 'pages/blog/[slug].astro']) {
      expect(read(`./${page}`), page).toMatch(/import Base from '[^']*layouts\/Base\.astro'/)
    }
  })

  it('keeps the portfolio component styles on top of the layout, without importing App.css twice', () => {
    const index = read('./pages/index.astro')

    expect(index).toMatch(/import '\.\.\/index\.css';/)
    expect(index).not.toMatch(/import '\.\.\/App\.css';/)
    expect(read('./index.css')).toContain('.btn')
  })

  it('declares Tailwind and the palette in exactly one file', () => {
    expect(read('./App.css')).toContain('@import "tailwindcss"')
    expect(read('./index.css')).not.toContain('@import "tailwindcss"')
  })
})
