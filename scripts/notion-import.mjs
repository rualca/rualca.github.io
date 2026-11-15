#!/usr/bin/env node
/**
 * Imports the Notion "Blog Editorial Calendar" into `src/content/blog/`.
 *
 *   node scripts/notion-import.mjs --topic Streams        # one series
 *   node scripts/notion-import.mjs --all                  # every series
 *   node scripts/notion-import.mjs --all --dry-run        # report only
 *
 * Reads only. Pages without a real body are skipped, the leading title heading
 * is dropped, images are downloaded next to the site's own assets and the
 * markdown references them locally. Re-running rewrites the same files.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { blocksToMarkdown } from '../src/lib/notion-blocks.js'
import { descriptionFrom, pubDateFor, slugify, tagsFor, SERIES } from '../src/lib/notion-import-plan.js'

const DATABASE_ID = '46bc2084-3de7-4297-9ab7-fb4128a3b333'
const NOTION_VERSION = '2022-06-28'
const MIN_BODY_CHARS = 500
const IMAGE_WIDTH = 1600

const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const postsDir = join(repoRoot, 'src/content/blog')
const imagesDir = join(repoRoot, 'public/images/blog')

const token = async () => {
  if (process.env.NOTION_TOKEN) return process.env.NOTION_TOKEN
  for (const path of [join(homedir(), '.config/notion/token'), join(homedir(), '.notion-token')]) {
    if (existsSync(path)) return (await readFile(path, 'utf8')).trim()
  }
  throw new Error('No Notion token: set NOTION_TOKEN or write ~/.config/notion/token')
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const notion = async (auth, path, init = {}) => {
  const response = await fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${auth}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
  if (!response.ok) throw new Error(`Notion ${response.status} on ${path}: ${(await response.text()).slice(0, 300)}`)
  return response.json()
}

const plain = (richText = []) => richText.map((segment) => segment.plain_text).join('')

const pageSummary = (page) => ({
  id: page.id,
  title: plain(page.properties?.Name?.title).trim(),
  topic: page.properties?.Topic?.select?.name ?? '',
  status: page.properties?.Status?.status?.name ?? '',
  publishDate: page.properties?.['Publish date']?.date ?? null,
  createdTime: page.created_time,
})

async function allPages(auth) {
  const pages = []
  let cursor
  do {
    const body = { page_size: 100, ...(cursor ? { start_cursor: cursor } : {}) }
    const result = await notion(auth, `databases/${DATABASE_ID}/query`, {
      method: 'POST',
      body: JSON.stringify(body),
    })
    pages.push(...result.results.filter((page) => page.object === 'page').map(pageSummary))
    cursor = result.has_more ? result.next_cursor : undefined
    await sleep(120)
  } while (cursor)
  return pages
}

async function blockTree(auth, blockId) {
  const nodes = []
  let cursor
  do {
    const query = cursor ? `?page_size=100&start_cursor=${cursor}` : '?page_size=100'
    const result = await notion(auth, `blocks/${blockId}/children${query}`)
    for (const block of result.results) {
      const node = { block }
      if (block.has_children) node.children = await blockTree(auth, block.id)
      nodes.push(node)
    }
    cursor = result.has_more ? result.next_cursor : undefined
    await sleep(120)
  } while (cursor)
  return nodes
}

const imageExtension = (contentType, url) => {
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('gif')) return 'gif'
  const match = /\.(jpe?g|png|webp|gif)(\?|$)/i.exec(url)
  return match ? match[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg'
}

/** Downloads every remote image of one article and rewrites its markdown. */
async function localizeImages(markdown, slug) {
  const urls = [...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)].map((match) => match[1])
  if (urls.length === 0) return markdown

  const dir = join(imagesDir, slug)
  await mkdir(dir, { recursive: true })

  let result = markdown
  let index = 0
  for (const url of urls) {
    index += 1
    const source =
      url.includes('images.unsplash.com') && !/[?&]w=/.test(url)
        ? `${url}${url.includes('?') ? '&' : '?'}w=${IMAGE_WIDTH}&q=80&fm=jpg`
        : url
    const response = await fetch(source)
    if (!response.ok) throw new Error(`Image ${response.status}: ${url}`)
    const fileName = `image-${index}.${imageExtension(response.headers.get('content-type'), source)}`
    await writeFile(join(dir, fileName), Buffer.from(await response.arrayBuffer()))
    result = result.split(`](${url})`).join(`](/images/blog/${slug}/${fileName})`)
    await sleep(120)
  }
  return result
}

const frontmatter = ({ title, description, pubDate, tags }) =>
  [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `pubDate: ${pubDate}`,
    `tags: [${tags.map((tag) => JSON.stringify(tag)).join(', ')}]`,
    '---',
    '',
  ].join('\n')

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const topics = args.reduce((list, arg, index) => (arg === '--topic' ? [...list, args[index + 1]] : list), [])
  const everyTopic = args.includes('--all') || topics.length === 0
  const wanted = everyTopic ? Object.keys(SERIES) : topics

  for (const topic of wanted) {
    if (!SERIES[topic]) throw new Error(`Unknown topic ${topic}. Known: ${Object.keys(SERIES).join(', ')}`)
  }

  const auth = await token()
  const pages = (await allPages(auth)).filter((page) => page.title && wanted.includes(page.topic))
  const byTopic = new Map(wanted.map((topic) => [topic, []]))
  for (const page of pages) byTopic.get(page.topic).push(page)
  for (const list of byTopic.values()) list.sort((a, b) => a.createdTime.localeCompare(b.createdTime))

  // Re-importing rewrites the same file; a different article keeps its own slug.
  const isFreeSlug = (slug, title) => {
    const file = join(postsDir, `${slug}.md`)
    if (!existsSync(file)) return true
    return readFileSync(file, 'utf8').startsWith(`---\ntitle: ${JSON.stringify(title)}\n`)
  }
  const report = []

  for (const topic of wanted) {
    const list = byTopic.get(topic)
    let imported = 0
    let skipped = 0
    let images = 0

    for (const [index, page] of list.entries()) {
      const tree = await blockTree(auth, page.id)
      const body = blocksToMarkdown(tree)
      if (body.replace(/\s+/g, '').length < MIN_BODY_CHARS) {
        skipped += 1
        continue
      }

      const baseSlug = slugify(page.title)
      let slug = baseSlug
      for (let suffix = 2; !isFreeSlug(slug, page.title); suffix += 1) slug = `${baseSlug}-${suffix}`

      const description = descriptionFrom(body)
      if (!description) throw new Error(`No description could be derived for ${page.title}`)
      const pubDate = pubDateFor({ topic, publishDate: page.publishDate, index, total: list.length })
      const tags = tagsFor(topic)
      const markdown = dryRun ? body : await localizeImages(body, slug)
      images += (body.match(/!\[[^\]]*\]\(https?:/g) ?? []).length

      if (!dryRun) {
        await mkdir(postsDir, { recursive: true })
        await writeFile(join(postsDir, `${slug}.md`), `${frontmatter({ title: page.title, description, pubDate, tags })}\n${markdown}`)
      }
      imported += 1
      report.push(`${topic.padEnd(10)} ${pubDate}  ${slug}`)
    }

    report.push(`${topic.padEnd(10)} imported ${imported}, skipped ${skipped} without a body, ${list.length} candidates`)
  }

  console.log(report.join('\n'))
  console.log(dryRun ? 'dry run: nothing written' : `written to ${postsDir}`)
}

await main()
