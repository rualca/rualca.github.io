import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Fractional from './Fractional'
import { fractional } from '../data/fractional'

describe('Fractional', () => {
  it('renders every trigger and every engagement shape', () => {
    render(<Fractional />)

    for (const trigger of fractional.triggers) {
      expect(screen.getByText(trigger.title)).toBeInTheDocument()
    }
    for (const engagement of fractional.engagements) {
      expect(screen.getByText(engagement.name)).toBeInTheDocument()
      expect(screen.getByText(engagement.cadence)).toBeInTheDocument()
    }
  })

  it('exposes a mailto call to action with a real address', () => {
    render(<Fractional />)

    const cta = screen.getByRole('link', { name: new RegExp(fractional.cta.label, 'i') })
    expect(cta).toHaveAttribute('href', `mailto:${fractional.cta.email}`)
  })

  it('renders the section under an id the navigation can anchor to', () => {
    const { container } = render(<Fractional />)
    expect(container.querySelector('#fractional')).toBeInTheDocument()
  })

  it('states what the engagement is not', () => {
    render(<Fractional />)
    expect(screen.getByText(/what it is not/i)).toBeInTheDocument()
  })
})
