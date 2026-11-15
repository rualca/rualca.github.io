import { describe, it, expect } from 'vitest'
import { slugify, descriptionFrom, tagsFor, pubDateFor } from './notion-import-plan'

describe('slugify', () => {
  it('turns a title into a kebab-case slug', () => {
    expect(slugify('Diving into Streams: Understanding the Basics in Node.js')).toBe(
      'diving-into-streams-understanding-the-basics-in-node-js',
    )
  })

  it('drops apostrophes and quotes rather than splitting words', () => {
    expect(slugify("Dependency Management in NPM: Understanding 'dependencies' vs 'devDependencies'")).toBe(
      'dependency-management-in-npm-understanding-dependencies-vs-devdependencies',
    )
  })

  it('strips accents and collapses runs of punctuation', () => {
    expect(slugify('Introducción a los Patrones — ¿Qué son?')).toBe('introduccion-a-los-patrones-que-son')
  })

  it('keeps slugs short enough for a URL path', () => {
    const slug = slugify('A very long title that keeps going and going well past any reasonable length for a url path segment at all')
    expect(slug.length).toBeLessThanOrEqual(80)
    expect(slug.endsWith('-')).toBe(false)
  })
})

describe('descriptionFrom', () => {
  it('uses the first real paragraph and skips headings and lists', () => {
    const markdown = ['## Why streams?', '', '- a bullet', '', 'Streams let you process data piece by piece. They also save memory.', ''].join('\n')
    expect(descriptionFrom(markdown)).toBe('Streams let you process data piece by piece.')
  })

  it('strips inline markdown so the description stays plain text', () => {
    expect(descriptionFrom('The **pipe()** method is `readable.pipe(writable)`, see [the docs](https://nodejs.org/).')).toBe(
      'The pipe() method is readable.pipe(writable), see the docs.',
    )
  })

  it('truncates a long first sentence on a word boundary', () => {
    const description = descriptionFrom(`${'word '.repeat(60)}end.`)
    expect(description.length).toBeLessThanOrEqual(200)
    expect(description.endsWith('…')).toBe(true)
    expect(description).not.toContain('  ')
  })

  it('falls back to the first paragraph when there is no sentence break', () => {
    expect(descriptionFrom('No final period here at all')).toBe('No final period here at all')
  })
})

describe('tagsFor', () => {
  it('maps each topic to at most four site tags', () => {
    for (const topic of ['Streams', 'NPM', 'SPACE', 'DORA', 'MongoDB', 'Threads', 'Leadership', 'GoF']) {
      const tags = tagsFor(topic)
      expect(tags.length).toBeGreaterThan(0)
      expect(tags.length).toBeLessThanOrEqual(4)
    }
  })

  it('replaces the five generic Notion tags with topic tags', () => {
    expect(tagsFor('Streams')).toEqual(['nodejs', 'streams', 'backend', 'javascript'])
  })

  it('fails loudly on an unknown topic instead of inventing tags', () => {
    expect(() => tagsFor('Whatever')).toThrow(/unknown topic/i)
  })
})

describe('pubDateFor', () => {
  it('keeps the real publish date from Notion', () => {
    expect(pubDateFor({ topic: 'Streams', publishDate: '2024-01-23', index: 3, total: 10 })).toBe('2024-01-23')
    expect(pubDateFor({ topic: 'Streams', publishDate: { start: '2023-12-25' }, index: 0, total: 10 })).toBe('2023-12-25')
  })

  it('spreads a series across its window, oldest first, ending inside the window', () => {
    const dates = Array.from({ length: 19 }, (_, index) => pubDateFor({ topic: 'NPM', index, total: 19 }))
    expect(dates[0]).toBe('2024-02-01')
    expect(dates.at(-1)).toBe('2024-04-30')
    for (let i = 1; i < dates.length; i += 1) expect(dates[i] > dates[i - 1]).toBe(true)
  })

  it('gives each series its own window so no two series collide', () => {
    expect(pubDateFor({ topic: 'SPACE', index: 0, total: 7 })).toBe('2024-05-01')
    expect(pubDateFor({ topic: 'DORA', index: 0, total: 5 })).toBe('2024-06-01')
    expect(pubDateFor({ topic: 'MongoDB', index: 0, total: 14 })).toBe('2024-07-01')
    expect(pubDateFor({ topic: 'Threads', index: 0, total: 9 })).toBe('2024-08-01')
    expect(pubDateFor({ topic: 'Leadership', index: 0, total: 5 })).toBe('2024-09-01')
    expect(pubDateFor({ topic: 'GoF', index: 0, total: 3 })).toBe('2024-10-01')
  })

  it('never dates an import after the site post that must stay first', () => {
    for (const topic of ['NPM', 'SPACE', 'DORA', 'MongoDB', 'Threads', 'Leadership', 'GoF']) {
      expect(pubDateFor({ topic, index: 99, total: 100 }) < '2026-11-15').toBe(true)
    }
  })

  it('handles a single-article series', () => {
    expect(pubDateFor({ topic: 'GoF', index: 0, total: 1 })).toBe('2024-10-01')
  })
})
