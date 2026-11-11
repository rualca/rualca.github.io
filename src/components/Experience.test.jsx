import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Experience from './Experience'

describe('Experience', () => {
  it('renders text for Loomee, Fourvenues, Cubicup, and Avantio', () => {
    const { container } = render(<Experience />)
    const text = container.textContent
    expect(text).toContain('Loomee')
    expect(text).toContain('Fourvenues')
    expect(text).toContain('Cubicup')
    expect(text).toContain('Avantio')
  })

  it('renders emphasised phrases as bold text without leaking the markdown markers', () => {
    const { container } = render(<Experience />)
    expect(container.textContent).not.toContain('**')
    expect(container.querySelectorAll('li strong').length).toBeGreaterThan(0)
  })

  it('emphasises at most three highlights per role so the emphasis stays meaningful', () => {
    const { container } = render(<Experience />)
    const cards = container.querySelectorAll('section > div > div:last-child > div')
    expect(cards).toHaveLength(5)
    for (const card of cards) {
      expect(card.querySelectorAll('li strong').length).toBeLessThanOrEqual(3)
    }
  })
})
