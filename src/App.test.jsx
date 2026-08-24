import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@splinetool/react-spline', () => ({ default: () => null }))
vi.mock('./components/ui/smooth-cursor', () => ({ SmoothCursor: () => null }))

const lenisConstructor = vi.fn()
vi.mock('lenis', () => ({
  default: class Lenis {
    constructor(...args) {
      lenisConstructor(...args)
    }
    on() {}
    raf() {}
    destroy() {}
  },
}))

function stubMatchMedia(matches) {
  window.matchMedia = vi.fn().mockReturnValue({
    matches,
    media: '(prefers-reduced-motion: reduce)',
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

describe('App', () => {
  beforeEach(() => {
    lenisConstructor.mockClear()
  })

  it('does not construct Lenis when reduced motion is preferred', async () => {
    stubMatchMedia(true)
    const { default: App } = await import('./App')
    render(<App />)
    expect(lenisConstructor).not.toHaveBeenCalled()
  })
})
