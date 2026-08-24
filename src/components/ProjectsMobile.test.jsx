import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsMobile from './ProjectsMobile'

describe('ProjectsMobile', () => {
  it('renders no anchor with an undefined href, and keeps the working View Code link', () => {
    const { container } = render(<ProjectsMobile />)
    const anchors = container.querySelectorAll('a')
    expect(anchors.length).toBeGreaterThan(0)
    for (const anchor of anchors) {
      expect(anchor.hasAttribute('href')).toBe(true)
      expect(anchor.getAttribute('href')).not.toBe('')
    }
    expect(screen.getAllByText('View Code').length).toBeGreaterThan(0)
  })
})
