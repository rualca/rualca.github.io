import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { config, track, trackLinkClicks, trackSectionViews, analyticsEnabled } from './analytics'

beforeEach(() => {
  window.umami = { track: vi.fn() }
})

afterEach(() => {
  config.websiteId = ''
  delete window.umami
  document.body.innerHTML = ''
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

const enable = () => {
  config.websiteId = 'site-id'
  vi.stubEnv('PROD', true)
}

describe('analytics switch', () => {
  it('sends nothing when no website id is configured', () => {
    config.websiteId = ''
    vi.stubEnv('PROD', true)
    track('anything', { a: 1 })
    expect(analyticsEnabled()).toBe(false)
    expect(window.umami.track).not.toHaveBeenCalled()
  })

  it('stays off outside production even with an id configured', () => {
    config.websiteId = 'site-id'
    vi.stubEnv('PROD', false)
    track('anything')
    expect(window.umami.track).not.toHaveBeenCalled()
  })

  it('sends events once configured in production', () => {
    enable()
    track('contact_submit', { topic: 'Advisory' })
    expect(window.umami.track).toHaveBeenCalledWith('contact_submit', { topic: 'Advisory' })
  })
})

describe('trackLinkClicks', () => {
  const setup = (html) => {
    enable()
    document.body.innerHTML = html
    return trackLinkClicks()
  }

  it('reports in-page navigation with the section and where it was clicked', () => {
    const stop = setup('<header><a href="#projects">Projects</a></header>')
    document.querySelector('a').click()
    expect(window.umami.track).toHaveBeenCalledWith('nav_click', {
      section: 'projects',
      where: 'navbar',
      label: 'Projects',
    })
    stop()
  })

  it('ignores the bare # home link', () => {
    const stop = setup('<a href="#">Home</a>')
    document.querySelector('a').click()
    expect(window.umami.track).not.toHaveBeenCalled()
    stop()
  })

  it('reports email clicks without sending the address', () => {
    const stop = setup('<section id="fractional"><a href="mailto:someone@example.com">Mail</a></section>')
    document.querySelector('a').click()
    expect(window.umami.track).toHaveBeenCalledWith('email_click', { where: 'fractional' })
    expect(JSON.stringify(window.umami.track.mock.calls)).not.toContain('someone@example.com')
    stop()
  })

  it('reports outbound clicks with a friendly target for known profiles', () => {
    const stop = setup('<a href="https://www.linkedin.com/in/someone" aria-label="LinkedIn">in</a>')
    document.querySelector('a').click()
    const [name, data] = window.umami.track.mock.calls[0]
    expect(name).toBe('outbound_click')
    expect(data.target).toBe('linkedin')
    expect(data.label).toBe('LinkedIn')
    stop()
  })

  it('stops listening when cleaned up', () => {
    const stop = setup('<a href="#about">About</a>')
    stop()
    document.querySelector('a').click()
    expect(window.umami.track).not.toHaveBeenCalled()
  })
})

describe('trackSectionViews', () => {
  it('fires once per section when it becomes visible', () => {
    enable()
    let callback
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb) {
          callback = cb
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
    document.body.innerHTML = '<section id="skills"></section>'
    const el = document.getElementById('skills')
    const stop = trackSectionViews(['skills', 'missing'])
    const entry = (ratio, visiblePx) => ({
      target: el,
      isIntersecting: true,
      intersectionRatio: ratio,
      intersectionRect: { height: visiblePx },
      rootBounds: { height: 900 },
    })
    callback([entry(0.6, 600)])
    callback([entry(0.6, 600)])
    expect(window.umami.track).toHaveBeenCalledTimes(1)
    expect(window.umami.track).toHaveBeenCalledWith('section_view', { section: 'skills' })
    stop()
    vi.unstubAllGlobals()
  })

  describe('with tall and barely visible sections', () => {
    const setup = () => {
      enable()
      let callback
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          constructor(cb) {
            callback = cb
          }
          observe() {}
          unobserve() {}
          disconnect() {}
        },
      )
      document.body.innerHTML = '<section id="experience"></section>'
      const el = document.getElementById('experience')
      const stop = trackSectionViews(['experience'])
      return { el, stop, fire: (entry) => callback([{ target: el, isIntersecting: true, ...entry }]) }
    }

    it('counts a section far taller than the screen once it fills 40% of the viewport', () => {
      const { stop, fire } = setup()
      // 2,690 px section, 540 px visible: only 20% of the section, but 60% of a 900 px screen.
      fire({ intersectionRatio: 0.2, intersectionRect: { height: 540 }, rootBounds: { height: 900 } })
      expect(window.umami.track).toHaveBeenCalledWith('section_view', { section: 'experience' })
      stop()
      vi.unstubAllGlobals()
    })

    it('does not count a section that only just entered the screen', () => {
      const { stop, fire } = setup()
      fire({ intersectionRatio: 0.05, intersectionRect: { height: 130 }, rootBounds: { height: 900 } })
      expect(window.umami.track).not.toHaveBeenCalled()
      stop()
      vi.unstubAllGlobals()
    })
  })
})
