import { describe, it, expect } from 'vitest'
import { isPermalink } from './publication-link'

describe('isPermalink', () => {
  it.each([
    ['https://medium.com/@ruben.alapont', false],
    ['https://medium.com/@ruben.alapont/', false],
    ['https://medium.com/@ruben.alapont?source=nav', false],
    ['https://medium.com/@ruben.alapont/some-article-slug-abc123', true],
    ['https://medium.com/some-publication/some-article-slug-abc123', true],
    ['', false],
    [undefined, false],
    ['http://medium.com/@ruben.alapont/some-article-slug', false],
    ['not a url', false],
  ])('isPermalink(%s) === %s', (url, expected) => {
    expect(isPermalink(url)).toBe(expected)
  })
})
