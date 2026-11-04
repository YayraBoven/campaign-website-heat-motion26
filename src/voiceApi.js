// Talks to the Student Voice API in worker/index.js
export const NOTE_COLORS = ['yellow', 'pink', 'green', 'blue', 'orange']
export const NOTE_MAX = 280
export const MESSAGE_MAX = 2000

async function request(path, { method = 'GET', body, key } = {}) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (key) headers.Authorization = `Bearer ${key}`
  const init = { method, headers }
  if (body) init.body = JSON.stringify(body)
  let res
  try {
    res = await fetch(path, init)
  } catch {
    throw new Error('Couldn’t reach the server. Check your connection and try again.')
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.error || 'Something went wrong. Please try again.')
    err.status = res.status
    throw err
  }
  return data
}

export const getNotes = () => request('/api/notes').then((d) => d.notes)
export const postNote = (body, color, website) =>
  request('/api/notes', { method: 'POST', body: { body, color, website } }).then((d) => d.note)
export const sendMessage = (body, website) =>
  request('/api/messages', { method: 'POST', body: { body, website } })

export const getInbox = (key) => request('/api/admin/inbox', { key })
export const setNoteHidden = (key, id, hidden) =>
  request(`/api/admin/notes/${id}`, { method: 'POST', body: { hidden }, key })
export const setMessageRead = (key, id, read) =>
  request(`/api/admin/messages/${id}`, { method: 'POST', body: { read }, key })
export const getLinks = () => request('/api/links').then((d) => d.links)
export const saveLinks = (key, links) =>
  request('/api/admin/links', { method: 'POST', body: links, key }).then((d) => d.links)
export const deleteMessage = (key, id) =>
  request(`/api/admin/messages/${id}`, { method: 'DELETE', key })

// Same tilt every time for the same note, so the wall doesn't jump around
export const tilt = (id) => ((id * 37) % 7) - 3

export function timeAgo(ms) {
  const s = Math.round((Date.now() - ms) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`
  return new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
