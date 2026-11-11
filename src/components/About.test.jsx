import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('shows the canonical 12-years figure', () => {
    const { container } = render(<About />)
    expect(container.textContent).toContain('12 years')
  })

  it('names the current employer and the domain he works in today', () => {
    // "Engineering leader with 12 years of experience" describes a category.
    // Naming where he sits now, and on what, is what makes it a person.
    const { container } = render(<About />)
    expect(container.textContent).toMatch(/Aimira/)
    expect(container.textContent).toMatch(/computer vision/i)
  })

  it('does not render a conflicting years figure such as "10+"', () => {
    const { container } = render(<About />)
    expect(container.textContent).not.toMatch(/10\+\s*years/)
  })
})
