import { describe, it, expect } from 'vitest'
import { blocksToMarkdown } from './notion-blocks'

const rt = (text, annotations = {}, href = null) => ({
  type: 'text',
  plain_text: text,
  annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false, ...annotations },
  href,
})

const p = (...text) => ({ block: { type: 'paragraph', paragraph: { rich_text: text.map((t) => rt(t)) } } })

const heading = (level, text) => ({
  block: { type: `heading_${level}`, [`heading_${level}`]: { rich_text: [rt(text)] } },
})

const bullet = (text, children = null) => ({
  block: { type: 'bulleted_list_item', bulleted_list_item: { rich_text: [rt(text)] }, has_children: Boolean(children) },
  children,
})

const numbered = (text, children = null) => ({
  block: { type: 'numbered_list_item', numbered_list_item: { rich_text: [rt(text)] }, has_children: Boolean(children) },
  children,
})

const code = (text, language) => ({ block: { type: 'code', code: { rich_text: [rt(text)], language } } })

const image = (url, caption = '') => ({
  block: {
    type: 'image',
    image: {
      type: 'external',
      external: { url },
      caption: caption ? [rt(caption)] : [],
    },
  },
})

const divider = { block: { type: 'divider', divider: {} } }

describe('blocksToMarkdown', () => {
  it('drops the leading heading_1 that repeats the article title', () => {
    const md = blocksToMarkdown([heading(1, 'Diving into Streams'), p('Hello, fellow Node enthusiasts!')])
    expect(md).toBe('Hello, fellow Node enthusiasts!\n')
  })

  it('renders headings without skipping levels', () => {
    const md = blocksToMarkdown([
      heading(1, 'Title'),
      heading(3, 'Section without a parent'),
      p('body'),
      heading(2, 'Real section'),
      heading(3, 'Subsection'),
      heading(1, 'Another top section'),
    ])
    expect(md).toBe(
      ['## Section without a parent', '', 'body', '', '## Real section', '', '### Subsection', '', '## Another top section', ''].join('\n'),
    )
  })

  it('renders nested bulleted lists with two-space indentation per level', () => {
    const md = blocksToMarkdown([bullet('Readable Streams', [bullet('like a book'), bullet('paused by default')]), bullet('Writable Streams')])
    expect(md).toBe(['- Readable Streams', '  - like a book', '  - paused by default', '- Writable Streams', ''].join('\n'))
  })

  it('numbers consecutive numbered items and restarts after another block', () => {
    const md = blocksToMarkdown([numbered('Readable'), numbered('Writable'), numbered('Duplex'), p('note'), numbered('Restarted')])
    expect(md).toBe(['1. Readable', '2. Writable', '3. Duplex', '', 'note', '', '1. Restarted', ''].join('\n'))
  })

  it('indents nested numbered items under their parent', () => {
    const md = blocksToMarkdown([numbered('Outer', [numbered('inner one'), numbered('inner two')])])
    expect(md).toBe(['1. Outer', '   1. inner one', '   2. inner two', ''].join('\n'))
  })

  it('maps Notion code languages to markdown fences', () => {
    const md = blocksToMarkdown([code("const fs = require('fs')", 'javascript'), code('ls -la', 'shell'), code('plain words', 'plain text')])
    expect(md).toBe(['```js', "const fs = require('fs')", '```', '', '```bash', 'ls -la', '```', '', '```', 'plain words', '```', ''].join('\n'))
  })

  it('renders images with their caption as alt text', () => {
    const md = blocksToMarkdown([image('https://images.unsplash.com/photo-1', 'Conveyor belt'), image('https://images.unsplash.com/photo-2')])
    expect(md).toBe(
      ['![Conveyor belt](https://images.unsplash.com/photo-1)', '', '![](https://images.unsplash.com/photo-2)', ''].join('\n'),
    )
  })

  it('keeps bold, italic, inline code, strikethrough and links', () => {
    const md = blocksToMarkdown([
      {
        block: {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              rt('A '),
              rt('bold', { bold: true }),
              rt(' and '),
              rt('italic', { italic: true }),
              rt(' with '),
              rt('code', { code: true }),
              rt(' and '),
              rt('old', { strikethrough: true }),
              rt(' plus '),
              rt('a link', {}, 'https://nodejs.org/'),
              rt('.'),
            ],
          },
        },
      },
    ])
    expect(md).toBe('A **bold** and _italic_ with `code` and ~~old~~ plus [a link](https://nodejs.org/).\n')
  })

  it('drops empty paragraphs and never leaves runs of blank lines', () => {
    const md = blocksToMarkdown([p(''), p('one'), p('   '), p(''), p('two'), p('')])
    expect(md).toBe(['one', '', 'two', ''].join('\n'))
  })

  it('renders dividers as horizontal rules', () => {
    const md = blocksToMarkdown([p('before'), divider, p('after')])
    expect(md).toBe(['before', '', '---', '', 'after', ''].join('\n'))
  })

  it('returns an empty string for an empty tree', () => {
    expect(blocksToMarkdown([])).toBe('')
  })
})
