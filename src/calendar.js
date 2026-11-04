import { election } from '@/data/content'

// "Add to calendar" for the voting period. The .ics file is served by the Worker
// (worker/index.js) so iPhones open it straight in the Calendar app.
export const icsUrl = '/api/calendar/vote.ics'

const stamp = (iso) =>
  new Date(iso)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: election.calendar.title,
    dates: `${stamp(election.votingOpens)}/${stamp(election.votingCloses)}`,
    details: `${election.calendar.details}\n\n${window.location.origin}`,
    ctz: 'Africa/Accra',
  })
  return `https://calendar.google.com/calendar/render?${params}`
}

// iPhone/iPad, and Safari on a Mac, open the .ics straight in Apple Calendar.
// Everyone else (Android, Chrome/Edge/Firefox on a computer) gets Google Calendar.
export function prefersAppleCalendar() {
  const ua = navigator.userAgent
  const iOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  const macSafari =
    /Macintosh/.test(ua) &&
    /Safari\//.test(ua) &&
    !/Chrome|Chromium|CriOS|Edg|Firefox|FxiOS/.test(ua)
  return iOS || macSafari
}

export function addToCalendar() {
  if (prefersAppleCalendar()) window.location.href = icsUrl
  else window.open(googleCalendarUrl(), '_blank', 'noopener')
}
