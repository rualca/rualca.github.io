import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@splinetool/react-spline', () => ({ default: () => null }))

const { default: Hero } = await import('./hero')

describe('Hero — rotating/live text accessibility', () => {
  it('renders no rotating or interval-driven text region', () => {
    // Task 6 removed RotatingText (rotating market positions) and WordRotate
    // (rotating multilingual greeting) from the Hero entirely — the hero
    // heading, role line, and value line are now static text, so there is no
    // live-updating region left anywhere in this component that would need
    // aria-live. This test documents and enforces that outcome: it fails if a
    // rotating/interval-driven text component is ever reintroduced without an
    // aria-live announcement.
    const { container } = render(<Hero />)
    expect(container.querySelector('[class*="RotatingText"]')).toBeNull()
    expect(container.querySelector('[data-rotating-text]')).toBeNull()

    // Any element that DOES change without user action must carry aria-live.
    // There are currently none in Hero, so this loop is intentionally a
    // vacuous pass — it keeps enforcing the rule if one is added later.
    const candidates = container.querySelectorAll('[data-live-region]')
    candidates.forEach((el) => {
      expect(el).toHaveAttribute('aria-live')
    })
  })
})
