import { describe, it, expect, vi, afterEach } from 'vitest'
import { scrollToSection } from './scrollToSection'

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('scrollToSection', () => {
  it('scrolls to the section when it already exists', () => {
    document.body.innerHTML = '<section id="skills"></section>'
    const el = document.getElementById('skills')
    el.scrollIntoView = vi.fn()
    scrollToSection('skills')
    expect(el.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  })

  it('keeps looking for a section that is lazy-loaded after the click', async () => {
    scrollToSection('projects')
    const el = document.createElement('section')
    el.id = 'projects'
    el.scrollIntoView = vi.fn()
    document.body.appendChild(el)
    await vi.waitFor(() => expect(el.scrollIntoView).toHaveBeenCalledTimes(1))
  })

  it('gives up quietly when the section never appears', async () => {
    const raf = vi.spyOn(window, 'requestAnimationFrame')
    scrollToSection('missing', { timeout: 30 })
    await new Promise((resolve) => setTimeout(resolve, 80))
    const calls = raf.mock.calls.length
    await new Promise((resolve) => setTimeout(resolve, 80))
    expect(raf.mock.calls.length).toBe(calls)
  })
})
