import { reactive } from 'vue'
import { links } from '@/data/content'
import { apiUrl } from '@/apiBase'

// Links from src/data/content.js, overridden by whatever Maria & Yayra saved at /inbox
export const siteLinks = reactive({ ...links })

export async function loadSiteLinks() {
  try {
    const res = await fetch(apiUrl('/api/links'))
    if (!res.ok) return
    const data = await res.json()
    Object.assign(siteLinks, data.links)
  } catch {
    // offline or API down: keep the defaults from content.js
  }
}

// An unset link is '#': open real links in a new tab, keep '#' in place
export const external = (url) =>
  url && url !== '#' ? { href: url, target: '_blank', rel: 'noopener' } : { href: '#' }
