import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const fixture = [
  {
    title: 'Recovered Article With A Real Permalink',
    date: 'Jan 1, 2025',
    url: 'https://medium.com/@ruben.alapont/recovered-article-with-a-real-permalink-abc123',
    tags: ['Testing'],
  },
  {
    title: 'Unrecovered Article Still Pending A Permalink',
    date: 'Jan 2, 2025',
    url: 'https://medium.com/@ruben.alapont',
    tags: ['Testing'],
  },
]

vi.mock('../data/publications', () => ({ publications: fixture }))

const { default: Publications } = await import('./Publications')

describe('Publications', () => {
  it('renders an anchor only for the permalink entry, plain text for the unrecovered one', () => {
    render(<Publications />)

    const link = screen.getByRole('link', {
      name: /Recovered Article With A Real Permalink/,
    })
    expect(link).toHaveAttribute('href', fixture[0].url)

    expect(
      screen.getByText('Unrecovered Article Still Pending A Permalink'),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', {
        name: /Unrecovered Article Still Pending A Permalink/,
      }),
    ).not.toBeInTheDocument()
  })

  it('shows the outbound arrow only on the entry that actually links out', () => {
    render(<Publications />)

    // CardBody renders exactly one svg, the ArrowUpRight, and only when isLinked.
    const linkedCard = screen.getByText(fixture[0].title).closest('.block')
    const unlinkedCard = screen.getByText(fixture[1].title).closest('.block')

    expect(linkedCard.querySelectorAll('svg')).toHaveLength(1)
    expect(unlinkedCard.querySelectorAll('svg')).toHaveLength(0)
  })
})
