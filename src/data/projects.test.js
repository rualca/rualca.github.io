import { describe, it, expect } from 'vitest'
import { projects } from './projects'

describe('projects data', () => {
  it('contains 16 entries', () => {
    expect(projects).toHaveLength(16)
  })

  it('has a unique id for every entry', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('has an https repoUrl for every entry', () => {
    for (const project of projects) {
      expect(project.repoUrl).toMatch(/^https:\/\//)
    }
  })

  it('never declares a liveUrl key', () => {
    for (const project of projects) {
      expect(project).not.toHaveProperty('liveUrl')
    }
  })
})
