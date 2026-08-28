import { describe, it, expect } from 'vitest'
import { experience } from './experience'

const FORBIDDEN_METRIC_PATTERNS = [/%/, /\bpercent\b/i, /\b\d+\s*(x|×)\b/]

function allStringFields(entries) {
  const fields = []
  for (const entry of entries) {
    fields.push(entry.company, entry.role, entry.period, entry.location)
    fields.push(...entry.highlights)
  }
  return fields
}

describe('experience data', () => {
  it('contains entries for Aimira, Loomee, Fourvenues, Cubicup, and Avantio', () => {
    const companies = experience.map((e) => e.company)
    expect(companies).toEqual([
      'Aimira',
      'Loomee',
      'Fourvenues',
      'Cubicup',
      'Avantio',
    ])
  })

  it('lists the current role first and marks it as ongoing', () => {
    // A recruiter reads top-down and stops early. The seat he holds today has
    // to be the first thing in the list, and it has to say it is still his.
    const [current] = experience
    expect(current.company).toBe('Aimira')
    expect(current.role).toBe('CTO')
    expect(current.period).toMatch(/Present$/)
  })

  it('has exactly one ongoing entry, so the record cannot read as two current jobs', () => {
    const ongoing = experience.filter((e) => /Present/.test(e.period))
    expect(ongoing).toHaveLength(1)
  })

  it('never contains a percentage or forbidden metric pattern in any string field', () => {
    const fields = allStringFields(experience)
    for (const field of fields) {
      for (const pattern of FORBIDDEN_METRIC_PATTERNS) {
        expect(field).not.toMatch(pattern)
      }
    }
  })

  it('never contains any of the explicitly forbidden metric claims', () => {
    const fields = allStringFields(experience).join(' ')
    const forbidden = [
      'lead time −50%',
      'MTTR −65%',
      'deployment time −60%',
      'OKR attainment 85%',
      'incidents −40%',
      'sprint velocity +40%',
      'load time −30%',
    ]
    for (const claim of forbidden) {
      expect(fields).not.toContain(claim)
    }
  })

  it('attributes the 6-to-40 growth claim to the 26-month Fourvenues tenure, not the 6-month Head of Engineering role', () => {
    const fourvenues = experience.find((e) => e.company === 'Fourvenues')
    expect(fourvenues.period).toBe('Jan 2023 – Mar 2025')
    const growthHighlight = fourvenues.highlights.find((h) =>
      h.includes('6 to around 40'),
    )
    expect(growthHighlight).toBeTruthy()
    // the growth claim lives on the single Fourvenues entry whose period
    // spans the full 26-month tenure, never a narrower 6-month sub-period
    expect(fourvenues.role).not.toMatch(/^Head of Engineering$/)
  })

  it('Fourvenues is a single entry showing progression, not three separate roles', () => {
    const fourvenuesEntries = experience.filter((e) => e.company === 'Fourvenues')
    expect(fourvenuesEntries).toHaveLength(1)
    expect(fourvenuesEntries[0].role).toBe(
      'Product Owner → Technical Lead Manager → Head of Engineering',
    )
  })

  it('Avantio is a single merged entry, not two overlapping rows', () => {
    const avantioEntries = experience.filter((e) => e.company === 'Avantio')
    expect(avantioEntries).toHaveLength(1)
  })
})
