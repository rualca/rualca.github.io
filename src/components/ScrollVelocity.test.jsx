import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ScrollVelocity from './ScrollVelocity'

describe('ScrollVelocity', () => {
  it('renders its marquee text without throwing, resolving every motion hook', () => {
    const { container } = render(
      <ScrollVelocity texts={['React', 'Node']} velocity={80} />,
    )
    expect(container.textContent).toContain('React')
    expect(container.textContent).toContain('Node')
  })
})
