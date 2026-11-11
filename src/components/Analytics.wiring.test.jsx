import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const track = vi.fn()
vi.mock('../lib/analytics', () => ({
  track: (...args) => track(...args),
  analyticsEnabled: () => false,
}))

const { default: ContactForm } = await import('./ContactForm')
const { default: CaseStudies } = await import('./CaseStudies')

beforeEach(() => track.mockClear())

describe('analytics wiring', () => {
  it('reports only the topic when the contact form is submitted, never personal data', () => {
    const { container } = render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/Your Name/), { target: { name: 'name', value: 'Ada Lovelace' } })
    fireEvent.change(screen.getByLabelText(/Your Email/), { target: { name: 'email', value: 'ada@example.com' } })
    fireEvent.change(screen.getByLabelText(/contacting about/), { target: { name: 'topic', value: 'Advisory' } })
    fireEvent.change(screen.getByLabelText(/Your Message/), { target: { name: 'message', value: 'secret message' } })
    const form = container.querySelector('form')
    form.addEventListener('submit', (e) => e.preventDefault())
    fireEvent.submit(form)
    expect(track).toHaveBeenCalledWith('contact_submit', { topic: 'Advisory' })
    const sent = JSON.stringify(track.mock.calls)
    expect(sent).not.toContain('Ada')
    expect(sent).not.toContain('ada@example.com')
    expect(sent).not.toContain('secret message')
  })

  it('reports a case study only when it is opened, not when it is closed', () => {
    const { container } = render(<CaseStudies />)
    const [first, second] = container.querySelectorAll('details')
    fireEvent.click(second.querySelector('summary'))
    expect(track).toHaveBeenCalledWith('case_study_open', { id: expect.any(String) })
    track.mockClear()
    // The first case starts open, so clicking its summary closes it.
    fireEvent.click(first.querySelector('summary'))
    expect(track).not.toHaveBeenCalled()
  })
})
