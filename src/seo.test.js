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

describe('article SEO', () => {
  const layout = read('./layouts/Base.astro')
  const article = read('./pages/blog/[slug].astro')
  const feed = read('./pages/rss.xml.js')

  it('lets a page declare itself an article instead of hardcoding the Open Graph type', () => {
    expect(layout).toMatch(/ogType\?: 'website' \| 'article'/)
    expect(layout).toMatch(/<meta property="og:type" content=\{ogType\} \/>/)
    expect(layout).not.toMatch(/<meta property="og:type" content="website" \/>/)
    expect(article).toMatch(/ogType="article"/)
  })

  it('emits BlogPosting structured data with the fields Google reads', () => {
    expect(article).toContain("'@type': 'BlogPosting'")
    for (const field of ['headline', 'description', 'datePublished', 'inLanguage', 'author', 'publisher', 'isPartOf', 'mainEntityOfPage']) {
      expect(article).toContain(`${field}:`)
    }
    // The headline must be the article's own title, never a rewritten variant.
    expect(article).toMatch(/headline: post\.data\.title/)
  })

  it('emits a three-position breadcrumb that ends on the article itself', () => {
    expect(article).toContain("'@type': 'BreadcrumbList'")
    expect(article.match(/position: \d/g)?.length).toBe(3)
    expect(article).toMatch(/name: 'Writing'/)
  })

  it('does not invent an og:image for an article that has none', () => {
    expect(article).toMatch(/const image = firstImage \?[^:]*: undefined/)
    expect(article).toContain('...(image && { image })')
  })

  it('carries the tags into the feed as categories', () => {
    expect(feed).toContain('categories: post.data.tags')
  })
})
