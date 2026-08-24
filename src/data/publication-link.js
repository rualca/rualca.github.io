export const isPermalink = (url) => {
  if (typeof url !== 'string' || url.trim() === '') return false
  try {
    const { protocol, pathname } = new URL(url.trim())
    if (protocol !== 'https:') return false
    return pathname.split('/').filter(Boolean).length >= 2
  } catch {
    return false
  }
}
