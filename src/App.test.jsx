import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('@splinetool/react-spline', () => ({ default: () => null }))
vi.mock('./components/ui/smooth-cursor', () => ({ SmoothCursor: () => null }))
// ScrollReveal owns and kills its own ScrollTriggers on unmount (correctly).
// Stub it here so this file's ScrollTrigger assertions isolate App's own
// effect cleanup instead of also observing ScrollReveal's legitimate calls.
vi.mock('./components/ScrollReveal', () => ({ default: () => null }))

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

describe('App', () => {
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
    const { default: App } = await import('./App')
    render(<App />)
    expect(lenisConstructor).not.toHaveBeenCalled()
  })

  it('refreshes ScrollTrigger on cleanup instead of killing triggers it does not own', async () => {
    stubMatchMedia(false)
    const mockTrigger = { kill: vi.fn() }
    scrollTriggerGetAll.mockReturnValue([mockTrigger])
    const { default: App } = await import('./App')
    const { unmount } = render(<App />)
    unmount()
    expect(scrollTriggerRefresh).toHaveBeenCalled()
    expect(mockTrigger.kill).not.toHaveBeenCalled()
  })

  it('removes the exact ticker callback reference it registered', async () => {
    stubMatchMedia(false)
    const { default: App } = await import('./App')
    const { unmount } = render(<App />)
    expect(tickerAdd).toHaveBeenCalledTimes(1)
    const registeredCallback = tickerAdd.mock.calls[0][0]
    unmount()
    expect(tickerRemove).toHaveBeenCalledWith(registeredCallback)
  })

  it('does not construct Lenis/GSAP/ScrollTrigger on mobile viewports', async () => {
    stubMatchMedia(false)
    stubInnerWidth(375)
    const { default: App } = await import('./App')
    render(<App />)
    expect(lenisConstructor).not.toHaveBeenCalled()
    expect(tickerAdd).not.toHaveBeenCalled()
  })

  it('still constructs Lenis/GSAP/ScrollTrigger on desktop when motion is allowed', async () => {
    stubMatchMedia(false)
    stubInnerWidth(1280)
    const { default: App } = await import('./App')
    render(<App />)
    expect(lenisConstructor).toHaveBeenCalledTimes(1)
    expect(tickerAdd).toHaveBeenCalledTimes(1)
  })

  it('still skips motion libraries when reduced motion is preferred regardless of viewport', async () => {
    stubMatchMedia(true)
    stubInnerWidth(1280)
    const { default: App } = await import('./App')
    render(<App />)
    expect(lenisConstructor).not.toHaveBeenCalled()
    expect(tickerAdd).not.toHaveBeenCalled()
  })
})
