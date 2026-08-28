import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Projects from './Projects'
import { projects } from '../data/projects'

describe('Projects', () => {
  it('renders each visible project card as a working anchor to its repoUrl', () => {
    render(<Projects />)
    const firstProject = projects[0]
    const link = screen.getByRole('link', { name: new RegExp(firstProject.title) })
    expect(link).toHaveAttribute('href', firstProject.repoUrl)
  })

  it('defers below-the-fold project image fetches with loading="lazy"', () => {
    const { container } = render(<Projects />)
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
    for (const img of images) {
      expect(img).toHaveAttribute('loading', 'lazy')
      expect(img).toHaveAttribute('decoding', 'async')
    }
  })
})
