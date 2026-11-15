import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'

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

const tickerAdd = vi.fn()
const tickerRemove = vi.fn()
const tickerLagSmoothing = vi.fn()
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    ticker: {
      add: tickerAdd,
      remove: tickerRemove,
      lagSmoothing: tickerLagSmoothing,
    },
  },
}))

const scrollTriggerUpdate = vi.fn()
const scrollTriggerGetAll = vi.fn(() => [])
const scrollTriggerRefresh = vi.fn()
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {
    update: scrollTriggerUpdate,
    getAll: scrollTriggerGetAll,
    refresh: scrollTriggerRefresh,
  },
}))

// Lenis/GSAP are fetched with dynamic import(), so "was it constructed?" is only
// answerable after the import has had a chance to resolve.
const flushImports = () => new Promise((resolve) => setTimeout(resolve, 50))

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

function stubInnerWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('SmoothScroll', () => {
  beforeEach(() => {
    lenisConstructor.mockClear()
    tickerAdd.mockClear()
    tickerRemove.mockClear()
    tickerLagSmoothing.mockClear()
    scrollTriggerUpdate.mockClear()
    scrollTriggerGetAll.mockClear()
    scrollTriggerGetAll.mockReturnValue([])
    scrollTriggerRefresh.mockClear()
    stubInnerWidth(1280)
  })

  it('does not construct Lenis when reduced motion is preferred', async () => {
    stubMatchMedia(true)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    render(<SmoothScroll />)
    await flushImports()
    expect(lenisConstructor).not.toHaveBeenCalled()
  })

  it('refreshes ScrollTrigger on cleanup instead of killing triggers it does not own', async () => {
    stubMatchMedia(false)
    const mockTrigger = { kill: vi.fn() }
    scrollTriggerGetAll.mockReturnValue([mockTrigger])
    const { default: SmoothScroll } = await import('./SmoothScroll')
    const { unmount } = render(<SmoothScroll />)
    await waitFor(() => expect(lenisConstructor).toHaveBeenCalledTimes(1))
    unmount()
    expect(scrollTriggerRefresh).toHaveBeenCalled()
    expect(mockTrigger.kill).not.toHaveBeenCalled()
  })

  it('removes the exact ticker callback reference it registered', async () => {
    stubMatchMedia(false)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    const { unmount } = render(<SmoothScroll />)
    await waitFor(() => expect(tickerAdd).toHaveBeenCalledTimes(1))
    const registeredCallback = tickerAdd.mock.calls[0][0]
    unmount()
    expect(tickerRemove).toHaveBeenCalledWith(registeredCallback)
  })

  it('does not construct Lenis/GSAP/ScrollTrigger on mobile viewports', async () => {
    stubMatchMedia(false)
    stubInnerWidth(375)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    render(<SmoothScroll />)
    await flushImports()
    expect(lenisConstructor).not.toHaveBeenCalled()
    expect(tickerAdd).not.toHaveBeenCalled()
  })

  it('still constructs Lenis/GSAP/ScrollTrigger on desktop when motion is allowed', async () => {
    stubMatchMedia(false)
    stubInnerWidth(1280)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    render(<SmoothScroll />)
    await waitFor(() => expect(lenisConstructor).toHaveBeenCalledTimes(1))
    expect(tickerAdd).toHaveBeenCalledTimes(1)
  })

  it('never constructs Lenis if the page unmounts before the libraries finish loading', async () => {
    stubMatchMedia(false)
    stubInnerWidth(1280)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    const { unmount } = render(<SmoothScroll />)
    unmount()
    await flushImports()
    expect(lenisConstructor).not.toHaveBeenCalled()
    expect(tickerAdd).not.toHaveBeenCalled()
  })

  it('still skips motion libraries when reduced motion is preferred regardless of viewport', async () => {
    stubMatchMedia(true)
    stubInnerWidth(1280)
    const { default: SmoothScroll } = await import('./SmoothScroll')
    render(<SmoothScroll />)
    await flushImports()
    expect(lenisConstructor).not.toHaveBeenCalled()
    expect(tickerAdd).not.toHaveBeenCalled()
  })
})
