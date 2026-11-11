import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CaseStudies from './CaseStudies'
import { caseStudies, caseStudiesDisclaimer } from '../data/caseStudies'

const EMPLOYERS = /\b(Aimira|Loomee|Fourvenues|Cubicup|Avantio|Dozen)\b/i

describe('CaseStudies', () => {
  it('renders every case study with its five parts', () => {
    const { container } = render(<CaseStudies />)
    expect(screen.getAllByRole('group')).toHaveLength(caseStudies.length)
    for (const label of ['Context', 'Problem', 'Decision', 'Result', 'Takeaway']) {
      expect(container.querySelectorAll('dt')).not.toHaveLength(0)
      expect(screen.getAllByText(label)).toHaveLength(caseStudies.length)
    }
  })

  it('states up front that the case studies are anonymised', () => {
    render(<CaseStudies />)
    expect(screen.getByText(caseStudiesDisclaimer)).toBeInTheDocument()
    expect(caseStudiesDisclaimer).toMatch(/anonymised/i)
  })

  it('never names an employer or investor, because the disclaimer promises that', () => {
    const everything = [
      caseStudiesDisclaimer,
      ...caseStudies.flatMap((s) => Object.values(s)),
    ].join(' ')
    expect(everything).not.toMatch(EMPLOYERS)
  })

  it('gives every case study a unique id and title', () => {
    expect(new Set(caseStudies.map((s) => s.id)).size).toBe(caseStudies.length)
    expect(new Set(caseStudies.map((s) => s.title)).size).toBe(caseStudies.length)
  })

  it('does not present Aimira, the current employer, as a case study', () => {
    const everything = caseStudies.flatMap((s) => Object.values(s)).join(' ')
    expect(everything).not.toMatch(/computer vision|fabric|textile|factory/i)
  })
})
