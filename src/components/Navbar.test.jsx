import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('gives the logo image a descriptive alt, not the generic "Logo"', () => {
    render(<Navbar />)
    const logo = screen.getByRole('img')
    expect(logo.getAttribute('alt')).not.toBe('Logo')
    expect(logo.getAttribute('alt')).toBeTruthy()
  })
})
