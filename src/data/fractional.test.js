import { describe, it, expect } from 'vitest'
import { fractional } from './fractional'
import { experience } from './experience'

const FORBIDDEN_METRIC_PATTERNS = [/%/, /\bpercent\b/i, /\b\d+\s*(x|×)\b/]

function allStringFields(data) {
  const fields = [data.headline, data.summary, data.availability, data.cta.label]
  for (const trigger of data.triggers) fields.push(trigger.title, trigger.body)
  for (const engagement of data.engagements) {
    fields.push(engagement.name, engagement.cadence, engagement.body)
  }
  fields.push(...data.notThis)
  return fields
}

describe('fractional CTO data', () => {
  it('never contains a percentage or forbidden metric pattern in any string field', () => {
    for (const field of allStringFields(fractional)) {
      for (const pattern of FORBIDDEN_METRIC_PATTERNS) {
        expect(field).not.toMatch(pattern)
      }
    }
  })

  it('publishes no rate, price or currency figure', () => {
    // Rates are a negotiation, not a landing page. Publishing them anchors the
    // conversation before the scope of the engagement is understood.
    const text = allStringFields(fractional).join(' ')
    expect(text).not.toMatch(/[€$£]/)
    expect(text).not.toMatch(/\bper (hour|day|month)\b/i)
    expect(text).not.toMatch(/\b(eur|usd|gbp)\b/i)
  })

  it('states what the engagement is not, which is part of the offer', () => {
    expect(fractional.notThis.length).toBeGreaterThanOrEqual(3)
    const text = fractional.notThis.join(' ')
    expect(text).toMatch(/not a consultant/i)
    expect(text).toMatch(/not a full-time CTO/i)
  })

  it('still declares availability for a full-time role while ruling the fraction out', () => {
    // Declining the five-day engagement must not read as declining employment.
    // A founder who could hire him outright should not infer he only sells
    // fractions of himself.
    const text = fractional.notThis.join(' ')
    expect(text).toMatch(/open to full-time engineering leadership roles/i)
  })

  it('offers engagement shapes with an explicit cadence', () => {
    expect(fractional.engagements.length).toBeGreaterThanOrEqual(3)
    for (const engagement of fractional.engagements) {
      expect(engagement.cadence.trim()).not.toBe('')
    }
  })

  it('only claims companies that appear in the experience record', () => {
    // Every company named in a trigger must be one he actually worked at, so
    // the offer cannot drift into claiming engagements that never happened.
    const worked = experience.map((e) => e.company)
    const named = fractional.triggers
      .flatMap((t) => t.body.match(/\b(Loomee|Fourvenues|Cubicup|Avantio|Bdeo)\b/g) ?? [])
    expect(named.length).toBeGreaterThan(0)
    for (const company of named) {
      expect(worked).toContain(company)
    }
  })

  it('does not claim investor due diligence experience, which the record does not support', () => {
    const text = allStringFields(fractional).join(' ').toLowerCase()
    expect(text).not.toContain('due diligence')
    expect(text).not.toContain('fundraise')
    expect(text).not.toContain('raised a round')
  })
})
