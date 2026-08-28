import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

const splineImportSpy = vi.fn()
vi.mock('@splinetool/react-spline', () => {
  splineImportSpy()
  return { default: () => <div data-testid="spline-scene" /> }
})

const { default: Hero } = await import('./hero')

function setViewportWidth(width) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('Hero', () => {
  it('renders the owner name in the h1 heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Rubén Alapont')
  })

  it('renders a static, fixed role line and value line, not a rotating one', () => {
    render(<Hero />)
    expect(
      screen.getByText('CTO at Aimira · Valencia, Spain'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'I scale engineering organisations and the architectures they ship.',
      ),
    ).toBeInTheDocument()
  })

  it('does not offer him for full-time employment while he holds a CTO seat', () => {
    // The hero used to advertise availability for Head of Engineering roles.
    // With the seat filled, that line is no longer true, and a stale promise
    // reads worse than no promise at all.
    const { container } = render(<Hero />)
    expect(container.textContent).not.toMatch(/open to head of engineering roles/i)
    expect(container.textContent).toMatch(/fractional/i)
  })

  it('does not render a CV download CTA', () => {
    render(<Hero />)
    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link.textContent.toLowerCase()).not.toMatch(/cv|resume|download/)
    }
  })

  it('does not render the Spline scene below the 768px mobile breakpoint', async () => {
    setViewportWidth(375)
    render(<Hero />)
    // give any pending microtasks/lazy-import a chance to run
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(screen.queryByTestId('spline-scene')).not.toBeInTheDocument()
  })

  it('renders the Spline scene at desktop width', async () => {
    setViewportWidth(1280)
    splineImportSpy.mockClear()
    render(<Hero />)
    await waitFor(() => {
      expect(screen.getByTestId('spline-scene')).toBeInTheDocument()
    })
  })

  it('keeps the LinkedIn CTA legible on hover (no white-on-white pairing)', () => {
    render(<Hero />)
    const linkedInLink = screen.getByRole('link', { name: /LinkedIn Profile/ })
    const classNames = linkedInLink.className
    const hasWhiteHoverBg = /hover:bg-white\b/.test(classNames)
    const hasWhiteHoverText = /hover:text-white\b/.test(classNames)
    expect(hasWhiteHoverBg && hasWhiteHoverText).toBe(false)
  })
})
