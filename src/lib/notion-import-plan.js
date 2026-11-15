/**
 * The editorial decisions behind the Notion import: how a title becomes a URL,
 * which description an article gets, which site tags replace Notion's five
 * generic ones, and which date each article is published on.
 *
 * Notion only has real publish dates for the Streams series, so every other
 * series is spread across its own window, newest series last, oldest article
 * first. The windows sit before the site's own article so that one stays on top
 * of /blog. Windows never overlap, so no two series land on the same day.
 */

export const SERIES = {
  Streams: { tags: ['nodejs', 'streams', 'backend', 'javascript'] },
  NPM: { from: '2024-02-01', to: '2024-04-30', tags: ['nodejs', 'npm', 'tooling', 'javascript'] },
  SPACE: { from: '2024-05-01', to: '2024-05-31', tags: ['productivity', 'teams', 'metrics', 'engineering'] },
  DORA: { from: '2024-06-01', to: '2024-06-30', tags: ['dora', 'devops', 'metrics', 'engineering'] },
  MongoDB: { from: '2024-07-01', to: '2024-07-31', tags: ['mongodb', 'database', 'backend', 'nosql'] },
  Threads: { from: '2024-08-01', to: '2024-08-31', tags: ['nodejs', 'concurrency', 'backend', 'javascript'] },
  Leadership: { from: '2024-09-01', to: '2024-09-30', tags: ['leadership', 'teams', 'career', 'management'] },
  GoF: { from: '2024-10-01', to: '2024-11-30', tags: ['patterns', 'design', 'architecture', 'javascript'] },
}

const MAX_SLUG_LENGTH = 80
const MAX_DESCRIPTION_LENGTH = 200
const MIN_OPENING_SENTENCE = 40
const DAY_MS = 24 * 60 * 60 * 1000

const seriesFor = (topic) => {
  const series = SERIES[topic]
  if (!series) throw new Error(`Unknown topic: ${topic}`)
  return series
}

/** Title to URL path segment: the filename is the route on this site. */
export function slugify(title) {
  const slug = String(title)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (slug.length <= MAX_SLUG_LENGTH) return slug
  const cut = slug.slice(0, MAX_SLUG_LENGTH + 1)
  const lastBreak = cut.lastIndexOf('-')
  return (lastBreak > 0 ? cut.slice(0, lastBreak) : cut.slice(0, MAX_SLUG_LENGTH)).replace(/-+$/, '')
}

const stripInlineMarkdown = (text) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*([^*]*)\*\*/g, '$1')
    .replace(/~~([^~]*)~~/g, '$1')
    .replace(/(^|[\s(])_([^_]+)_/g, '$1$2')
    .replace(/\s+/g, ' ')
    .trim()

/** Splits on sentence ends, but not on the dots inside `foo.bar()` or `Node.js`. */
const splitSentences = (text) => {
  const parts = []
  const boundary = /[.!?](?=\s+[A-Z"'“(]|$)/g
  let start = 0
  for (let match = boundary.exec(text); match; match = boundary.exec(text)) {
    parts.push(text.slice(start, match.index + 1).trim())
    start = match.index + 1
  }
  const tail = text.slice(start).trim()
  if (tail) parts.push(tail)
  return parts.filter(Boolean)
}

/** First real paragraph, first sentence: a plain-text `description`. */
export function descriptionFrom(markdown) {
  const paragraph = []
  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim()
    const isProse = line && !/^(#{1,6}\s|>|[-*+]\s|```|\d+\.\s|!\[|\||-{3,})/.test(line)
    if (isProse) {
      paragraph.push(line)
    } else if (paragraph.length) {
      break
    }
  }
  const text = stripInlineMarkdown(paragraph.join(' '))
  if (!text) return ''

  const sentences = splitSentences(text)
  let sentence = sentences[0] ?? text
  if (sentence.length < MIN_OPENING_SENTENCE && sentences.length > 1) {
    const combined = `${sentence} ${sentences[1]}`
    if (combined.length <= MAX_DESCRIPTION_LENGTH) sentence = combined
  }
  if (sentence.length <= MAX_DESCRIPTION_LENGTH) return sentence

  const cut = sentence.slice(0, MAX_DESCRIPTION_LENGTH)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`
}

/** Notion's five generic tags replaced by the series vocabulary. */
export function tagsFor(topic) {
  return [...seriesFor(topic).tags]
}

const toIsoDate = (date) => date.toISOString().slice(0, 10)

const publishedDate = (publishDate) => {
  const start = typeof publishDate === 'string' ? publishDate : publishDate?.start
  return start ? String(start).slice(0, 10) : null
}

/** Real Notion date when it exists, otherwise the series window. */
export function pubDateFor({ topic, publishDate, index, total }) {
  const real = publishedDate(publishDate)
  if (real) return real

  const { from, to } = seriesFor(topic)
  const first = Date.parse(`${from}T00:00:00Z`)
  const last = Date.parse(`${to}T00:00:00Z`)
  if (total <= 1) return from
  const offset = Math.round((index * (last - first)) / (total - 1) / DAY_MS) * DAY_MS
  return toIsoDate(new Date(first + offset))
}
