/**
 * Converts a Notion block tree into the markdown this site renders.
 *
 * The tree is what `GET /v1/blocks/:id/children` returns, with nested
 * `children` already expanded: `[{ block, children? }]`. Only the block types
 * the Blog Editorial Calendar actually uses are supported (paragraph, the three
 * heading levels, both list types, code, image, divider); anything else is
 * skipped, but its children are still rendered.
 *
 * Article bodies in Notion repeat the page title as their first `heading_1`, so
 * that one is dropped: the page already renders the title from the frontmatter.
 * Remaining headings are levelled so the result never skips a level — Notion
 * uses `heading_3` as the top section in most articles, which would otherwise
 * produce an `h3` with no `h2` above it.
 */

const CODE_LANGUAGES = {
  javascript: 'js',
  typescript: 'ts',
  shell: 'bash',
  'plain text': '',
  json: 'json',
  yaml: 'yaml',
  html: 'html',
  css: 'css',
  python: 'python',
  sql: 'sql',
}

const renderRichText = (segments = []) =>
  segments
    .map((segment) => {
      const annotations = segment.annotations ?? {}
      let text = segment.plain_text ?? ''
      if (annotations.code) text = `\`${text}\``
      if (annotations.bold) text = `**${text}**`
      if (annotations.italic) text = `_${text}_`
      if (annotations.strikethrough) text = `~~${text}~~`
      if (segment.href) text = `[${text}](${segment.href})`
      return text
    })
    .join('')

const renderCode = (richText, language) => {
  const code = richText.map((segment) => segment.plain_text).join('')
  const fence = code.includes('```') ? '````' : '```'
  const lang = CODE_LANGUAGES[language] ?? language ?? ''
  return [`${fence}${lang}`, code.replace(/\n$/, ''), fence].join('\n')
}

const renderImage = (image) => {
  const url = image.external?.url ?? image.file?.url ?? ''
  const caption = renderRichText(image.caption).replace(/[[\]]/g, '')
  return `![${caption}](${url})`
}

const indent = (block, prefix) =>
  block
    .split('\n')
    .map((line) => (line ? prefix + line : line))
    .join('\n')

/**
 * @param {Array<{ block: any, children?: Array<any> }>} tree
 * @returns {string} markdown, blocks separated by one blank line
 */
export function blocksToMarkdown(tree) {
  const state = { titleHeadingDropped: false, seenHeading2: false }
  const blocks = renderBlocks(tree, state)
  if (blocks.length === 0) return ''
  return `${blocks.join('\n\n')}\n`
}

function renderBlocks(nodes, state) {
  const blocks = []
  let list = null
  let counter = 0

  const flushList = () => {
    if (list) {
      blocks.push(list.join('\n'))
      list = null
    }
  }

  for (const node of nodes) {
    const { block } = node
    const type = block?.type
    if (!type) continue

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const body = block[type]
      if (!list) {
        list = []
        counter = 0
      }
      counter += 1
      const marker = type === 'bulleted_list_item' ? '-' : `${counter}.`
      const text = renderRichText(body.rich_text)
      list.push(text ? `${marker} ${text}` : marker)
      if (node.children?.length) {
        for (const child of renderBlocks(node.children, state)) {
          // Nested content aligns under the parent's text, past its marker.
          list.push(indent(child, ' '.repeat(marker.length + 1)))
        }
      }
      continue
    }

    flushList()

    if (type === 'paragraph') {
      const text = renderRichText(block.paragraph?.rich_text)
      if (text.trim()) blocks.push(text)
    } else if (type.startsWith('heading_')) {
      const level = Number(type.slice(-1))
      const text = renderRichText(block[type]?.rich_text)
      if (!text.trim()) continue
      if (level === 1 && !state.titleHeadingDropped) {
        state.titleHeadingDropped = true
        continue
      }
      const depth = level === 3 && state.seenHeading2 ? 3 : 2
      if (depth === 2) state.seenHeading2 = true
      blocks.push(`${'#'.repeat(depth)} ${text}`)
    } else if (type === 'code') {
      blocks.push(renderCode(block.code?.rich_text ?? [], block.code?.language))
    } else if (type === 'image') {
      blocks.push(renderImage(block.image ?? {}))
    } else if (type === 'divider') {
      blocks.push('---')
    }

    if (node.children?.length) {
      for (const child of renderBlocks(node.children, state)) blocks.push(child)
    }
  }

  flushList()
  return blocks
}
