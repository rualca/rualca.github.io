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
})
