import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('shows the canonical 12-years figure', () => {
    const { container } = render(<About />)
    expect(container.textContent).toContain('12 years')
  })

  it('does not render a conflicting years figure such as "10+"', () => {
    const { container } = render(<About />)
    expect(container.textContent).not.toMatch(/10\+\s*years/)
  })
})
