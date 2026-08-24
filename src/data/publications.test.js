import { describe, it, expect } from 'vitest'
import { publications } from './publications'

describe('publications data', () => {
  it('has no duplicate titles', () => {
    const titles = publications.map((p) => p.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('contains the expected number of entries after dedup', () => {
    expect(publications).toHaveLength(69)
  })
})
