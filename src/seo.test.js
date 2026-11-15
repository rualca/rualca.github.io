import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import { experience } from './data/experience'
import { fractional } from './data/fractional'
import { caseStudies } from './data/caseStudies'

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8')

describe('crawler files', () => {
  it('robots.txt allows crawling and points at the sitemap', () => {
    const robots = read('../public/robots.txt')
    expect(robots).toMatch(/User-agent: \*/)
    expect(robots).not.toMatch(/^Disallow:\s*\/\s*$/m)
    expect(robots).toContain('Sitemap: https://rualca.github.io/sitemap-index.xml')
  })

  it('generates sitemap.xml at build time instead of keeping a hand-written copy', () => {
    // S5: the hand-maintained file is gone; the sitemap integration writes it
    // from the routes and the blog collection on every build.
    expect(fs.existsSync(new URL('../public/sitemap.xml', import.meta.url))).toBe(false)
    expect(read('../astro.config.mjs')).toMatch(/sitemap\(\)/)
  })

  it('the base layout carries a no-JavaScript summary for crawlers that do not run scripts', () => {
    const html = read('./layouts/Base.astro')
    const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1] ?? ''
    expect(noscript).toContain('Rubén Alapont')
    expect(noscript).toContain('/llms.txt')
  })
})

describe('llms.txt', () => {
  const llms = read('../public/llms.txt')

  it('opens with the name and a summary line', () => {
    expect(llms.startsWith('# Rubén Alapont')).toBe(true)
    expect(llms).toMatch(/^> .+/m)
  })

  it('lists every role from the experience record, with its period', () => {
    for (const entry of experience) {
      expect(llms).toContain(entry.company)
      expect(llms).toContain(entry.period)
    }
  })

  it('describes every fractional engagement shape and every case study title', () => {
    for (const engagement of fractional.engagements) expect(llms).toContain(engagement.name)
    for (const study of caseStudies) expect(llms).toContain(study.title)
  })

  it('does not name investors, because the case studies are anonymised', () => {
    expect(llms).not.toMatch(/Dozen/i)
  })

  it('does not state anything the site does not already say publicly', () => {
    // Guards against a hand-edit adding prices or the forbidden claims.
    expect(llms).not.toMatch(/[€$£]\s?\d/)
    expect(llms).not.toMatch(/open to (full-time|head of engineering)/i)
  })
})
