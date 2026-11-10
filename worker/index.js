// =====================================================================
//  MOTION · MOTION '26 - STUDENT VOICE API
//  Runs only for /api/* (see wrangler.jsonc); everything else is the
//  static site in dist/.
//
//  Public:  GET  /api/notes           sticky notes on the wall
//           POST /api/notes           { body, color } - post a note
//           POST /api/messages        { body } - private message to the team
//           GET  /api/links           WhatsApp / TikTok links set from /inbox
//           GET  /api/calendar/vote.ics   the voting period, for "Add to calendar"
//  Team:    (header  Authorization: Bearer <ADMIN_KEY>)
//           GET    /api/admin/inbox           private messages + every note
//           POST   /api/admin/notes/:id       { hidden } - hide/show a note
//           POST   /api/admin/messages/:id    { read } - mark read/unread
//           DELETE /api/admin/messages/:id
//           POST   /api/admin/links           { whatsapp?, tiktok?, tiktokVideo? }
//
//  Everything is anonymous: no names, no accounts, no IP addresses stored.
//  A salted hash of the IP is kept only to stop one person spamming.
// =====================================================================

import { election } from '../src/data/content.js'

const NOTE_COLORS = ['yellow', 'pink', 'green', 'blue', 'orange']
const NOTE_MAX = 280
const MESSAGE_MAX = 2000
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5 // posts per sender per table per 10 minutes
const WALL_LIMIT = 150

// Links the team can set from /inbox, and which sites each may point to
// ('' clears it, so the site falls back to src/data/content.js)
const EDITABLE_LINKS = {
  whatsapp: ['whatsapp.com', 'wa.me'],
  tiktok: ['tiktok.com'],
  tiktokVideo: ['tiktok.com'],
}
const LINK_LABELS = { whatsapp: 'WhatsApp', tiktok: 'TikTok', tiktokVideo: 'TikTok' }

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    try {
      const res = await route(request, env, url)
      if (res) return res
      return json({ error: 'Not found' }, 404)
    } catch (err) {
      if (err instanceof HttpError) return json({ error: err.message }, err.status)
      console.error(err)
      return json({ error: 'Something went wrong. Please try again.' }, 500)
    }
  },
}

async function route(request, env, url) {
  const { pathname } = url
  const method = request.method

  if (pathname === '/api/notes' && method === 'GET') return listNotes(env)
  if (pathname === '/api/notes' && method === 'POST') return createNote(request, env)
  if (pathname === '/api/messages' && method === 'POST') return createMessage(request, env)
  if (pathname === '/api/links' && method === 'GET') return json({ links: await getLinks(env) })
  if (pathname === '/api/calendar/vote.ics' && method === 'GET') return votingCalendar(url)

  if (pathname.startsWith('/api/admin/')) {
    await requireAdmin(request, env)
    if (pathname === '/api/admin/inbox' && method === 'GET') return adminInbox(env)
    if (pathname === '/api/admin/links' && method === 'POST') return saveLinks(request, env)

    const note = pathname.match(/^\/api\/admin\/notes\/(\d+)$/)
    if (note && method === 'POST') {
      const { hidden } = await readJson(request)
      await env.DB.prepare('UPDATE notes SET hidden = ? WHERE id = ?')
        .bind(hidden ? 1 : 0, Number(note[1]))
        .run()
      return json({ ok: true })
    }

    const msg = pathname.match(/^\/api\/admin\/messages\/(\d+)$/)
    if (msg && method === 'POST') {
      const { read } = await readJson(request)
      await env.DB.prepare('UPDATE messages SET read = ? WHERE id = ?')
        .bind(read ? 1 : 0, Number(msg[1]))
        .run()
      return json({ ok: true })
    }
    if (msg && method === 'DELETE') {
      await env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(Number(msg[1])).run()
      return json({ ok: true })
    }
  }
  return null
}

// ---------- public ----------

async function listNotes(env) {
  const { results } = await env.DB.prepare(
    'SELECT id, body, color, created_at AS createdAt FROM notes WHERE hidden = 0 ORDER BY created_at DESC LIMIT ?',
  )
    .bind(WALL_LIMIT)
    .all()
  return json({ notes: results }, 200, { 'Cache-Control': 'no-store' })
}

async function createNote(request, env) {
  const data = await readJson(request)
  rejectBots(data)
  const body = cleanText(data.body, NOTE_MAX)
  const color = NOTE_COLORS.includes(data.color) ? data.color : NOTE_COLORS[0]
  const sender = await senderId(request, env)
  await rateLimit(env, 'notes', sender)

  const createdAt = Date.now()
  const row = await env.DB.prepare(
    'INSERT INTO notes (body, color, created_at, sender) VALUES (?, ?, ?, ?) RETURNING id',
  )
    .bind(body, color, createdAt, sender)
    .first()
  return json({ note: { id: row.id, body, color, createdAt } }, 201)
}

async function createMessage(request, env) {
  const data = await readJson(request)
  rejectBots(data)
  const body = cleanText(data.body, MESSAGE_MAX)
  const sender = await senderId(request, env)
  await rateLimit(env, 'messages', sender)

  await env.DB.prepare('INSERT INTO messages (body, created_at, sender) VALUES (?, ?, ?)')
    .bind(body, Date.now(), sender)
    .run()
  return json({ ok: true }, 201)
}

async function getLinks(env) {
  const { results } = await env.DB.prepare('SELECT key, value FROM settings').all()
  return Object.fromEntries(
    results.filter((r) => r.key in EDITABLE_LINKS).map((r) => [r.key, r.value]),
  )
}

// The voting period as a calendar file. iPhones/Macs open it straight in Calendar;
// Outlook and others import it. Dates come from src/data/content.js.
function votingCalendar(url) {
  const stamp = (iso) =>
    new Date(iso)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')
  const esc = (t) => t.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n')
  const site = url.origin
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MOTION Motion 26//Vote//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:asc-voting-2026@heat-motion26',
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(election.votingOpens)}`,
    `DTEND:${stamp(election.votingCloses)}`,
    `SUMMARY:${esc(election.calendar.title)}`,
    `DESCRIPTION:${esc(`${election.calendar.details}\n\n${site}`)}`,
    `URL:${site}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(election.calendar.title)}`,
    'TRIGGER;RELATED=START:PT9H', // 9:00 AM on the day voting opens
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vote-heat-asc-2026.ics"',
      'Cache-Control': 'public, max-age=300',
    },
  })
}

// ---------- team ----------

async function saveLinks(request, env) {
  const data = await readJson(request)
  const now = Date.now()
  const writes = []
  for (const [key, hosts] of Object.entries(EDITABLE_LINKS)) {
    if (!(key in data)) continue
    const value = typeof data[key] === 'string' ? data[key].trim() : ''
    if (!value) {
      writes.push(env.DB.prepare('DELETE FROM settings WHERE key = ?').bind(key))
      continue
    }
    writes.push(
      env.DB.prepare(
        'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at',
      ).bind(key, checkLink(value, hosts, LINK_LABELS[key]), now),
    )
  }
  if (writes.length) await env.DB.batch(writes)
  return json({ links: await getLinks(env) })
}

function checkLink(value, hosts, label) {
  let link
  try {
    link = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
  } catch {
    throw new HttpError(400, `That doesn’t look like a link: ${value}`)
  }
  const host = link.hostname.toLowerCase()
  if (link.protocol !== 'https:' && link.protocol !== 'http:') {
    throw new HttpError(400, `That doesn’t look like a link: ${value}`)
  }
  if (!hosts.some((h) => host === h || host.endsWith(`.${h}`))) {
    throw new HttpError(400, `The ${label} link should be a ${hosts.join(' or ')} link.`)
  }
  if (value.length > 500) throw new HttpError(400, 'That link is too long.')
  link.protocol = 'https:'
  return link.toString()
}

async function adminInbox(env) {
  const [messages, notes] = await env.DB.batch([
    env.DB.prepare(
      'SELECT id, body, created_at AS createdAt, read FROM messages ORDER BY created_at DESC LIMIT 500',
    ),
    env.DB.prepare(
      'SELECT id, body, color, created_at AS createdAt, hidden FROM notes ORDER BY created_at DESC LIMIT 500',
    ),
  ])
  return json({ messages: messages.results, notes: notes.results }, 200, {
    'Cache-Control': 'no-store',
  })
}

async function requireAdmin(request, env) {
  if (!env.ADMIN_KEY) throw new HttpError(503, 'The team inbox is not set up yet.')
  const given = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
  // compare hashes so the check takes the same time whatever was typed
  const [a, b] = await Promise.all([sha256(given), sha256(env.ADMIN_KEY)])
  if (!crypto.subtle.timingSafeEqual(a, b)) throw new HttpError(401, 'Wrong password.')
}

// ---------- helpers ----------

class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  })
}

async function readJson(request) {
  const type = request.headers.get('Content-Type') || ''
  if (!type.includes('application/json')) throw new HttpError(415, 'Send JSON.')
  const text = await request.text()
  if (text.length > 10_000) throw new HttpError(413, 'That is too long.')
  try {
    const data = JSON.parse(text)
    if (data && typeof data === 'object') return data
  } catch {
    // fall through
  }
  throw new HttpError(400, 'Invalid request.')
}

// The forms include a hidden "website" field people never see; bots fill it in.
function rejectBots(data) {
  if (data.website) throw new HttpError(400, 'Invalid request.')
}

function cleanText(value, max) {
  if (typeof value !== 'string') throw new HttpError(400, 'Write something first.')
  // strip invisible control characters (keeps tabs and newlines)
  const text = [...value]
    .filter((ch) => {
      const c = ch.charCodeAt(0)
      return c === 9 || c === 10 || c === 13 || (c >= 32 && c !== 127)
    })
    .join('')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  if (!text) throw new HttpError(400, 'Write something first.')
  if (text.length > max) throw new HttpError(400, `Keep it under ${max} characters.`)
  return text
}

async function senderId(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const bytes = new Uint8Array(await sha256(`${env.ADMIN_KEY || 'heat'}:${ip}`))
  return bytes
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function rateLimit(env, table, sender) {
  const row = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM ${table} WHERE sender = ? AND created_at > ?`,
  )
    .bind(sender, Date.now() - RATE_WINDOW_MS)
    .first()
  if (row.n >= RATE_MAX) {
    throw new HttpError(429, 'You’ve posted a lot just now. Give it a few minutes.')
  }
}

function sha256(text) {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
}
