/**
 * Cookieless, privacy-first analytics (Umami) behind a thin wrapper.
 *
 * - Disabled until `config.websiteId` is set, and only runs in production
 *   builds, so development and tests never send anything.
 * - Never receives personal data: events carry labels, section ids and fixed
 *   enum values, never form contents.
 * - Swapping provider means changing `load` and `send` below.
 */
export const config = {
  // Umami website id (public, not a secret). Leave empty to keep analytics off.
  websiteId: 'f6922b36-83bb-4990-8a09-13ab36023d4d',
  scriptSrc: 'https://cloud.umami.is/script.js',
  domains: 'rualca.github.io',
}

export const analyticsEnabled = () => Boolean(config.websiteId) && import.meta.env.PROD

const queue = []
let loading = false

function send(name, data) {
  window.umami?.track(name, data)
}

function flush() {
  while (queue.length) {
    const [name, data] = queue.shift()
    send(name, data)
  }
}

function load() {
  if (loading || typeof document === 'undefined') return
  loading = true
  const script = document.createElement('script')
  script.defer = true
  script.src = config.scriptSrc
  script.dataset.websiteId = config.websiteId
  script.dataset.domains = config.domains
  script.dataset.doNotTrack = 'true'
  script.addEventListener('load', flush)
  document.head.appendChild(script)
}

/** Loads the tracker once the page is idle, so it never competes with first paint. */
export function initAnalytics() {
  if (!analyticsEnabled()) return () => {}
  let cancelled = false
  let cancel = () => {}
  const start = () => {
    if (!cancelled) load()
  }
  if ('requestIdleCallback' in window) {
    const handle = window.requestIdleCallback(start, { timeout: 3000 })
    cancel = () => window.cancelIdleCallback(handle)
  } else {
    const handle = setTimeout(start, 1500)
    cancel = () => clearTimeout(handle)
  }
  return () => {
    cancelled = true
    cancel()
  }
}

export function track(name, data) {
  if (!analyticsEnabled()) return
  if (window.umami) send(name, data)
  else queue.push([name, data])
}

const KNOWN_HOSTS = {
  'www.linkedin.com': 'linkedin',
  'linkedin.com': 'linkedin',
  'github.com': 'github',
  'medium.com': 'medium',
}

/**
 * One delegated listener covers every link on the page: in-page navigation,
 * email and outbound clicks, labelled by where on the page they happened.
 */
export function trackLinkClicks() {
  const onClick = (event) => {
    const link = event.target?.closest?.('a[href]')
    if (!link) return

    const href = link.getAttribute('href')
    const where = link.closest('header') ? 'navbar' : link.closest('section')?.id || 'page'
    const label = (link.getAttribute('aria-label') || link.textContent || '').trim().slice(0, 40)

    if (href === '#') return
    if (href.startsWith('#')) {
      track('nav_click', { section: href.slice(1), where, label })
    } else if (href.startsWith('mailto:')) {
      track('email_click', { where })
    } else {
      let url
      try {
        url = new URL(link.href, window.location.href)
      } catch {
        return
      }
      if (url.origin === window.location.origin) return
      track('outbound_click', {
        target: KNOWN_HOSTS[url.hostname] ?? url.hostname,
        path: url.pathname.slice(0, 80),
        where,
        label,
      })
    }
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

const VISIBLE_SHARE = 0.4
// Fine steps so very tall sections (long on phones) still produce a callback
// while their visible share is growing.
const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20)

/**
 * Fires once per section the first time it counts as seen: at least 40% of the
 * section is on screen, or the section fills at least 40% of the viewport.
 * The second rule matters for tall sections, which can never reach 40% of their
 * own height inside a single screen.
 */
export function trackSectionViews(ids) {
  if (typeof IntersectionObserver === 'undefined') return () => {}
  const seen = new Set()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = entry.target.id
        const viewportHeight = entry.rootBounds?.height ?? window.innerHeight
        const seenEnough =
          entry.intersectionRatio >= VISIBLE_SHARE ||
          entry.intersectionRect.height >= VISIBLE_SHARE * viewportHeight
        if (entry.isIntersecting && seenEnough && !seen.has(id)) {
          seen.add(id)
          track('section_view', { section: id })
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: THRESHOLDS },
  )
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
  return () => observer.disconnect()
}
