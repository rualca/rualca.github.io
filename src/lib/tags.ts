/**
 * Tag URLs are part of the published site: changing the slug shape breaks
 * every existing link and the sitemap with it, so the rule lives in one place.
 */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function tagUrl(tag: string): string {
  return `/blog/tag/${tagSlug(tag)}/`
}
