<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { getInbox, setNoteHidden, setMessageRead, deleteMessage, timeAgo } from '@/voiceApi'

// Only for Maria & Yayra: private messages, plus hiding notes from the public wall.
const STORE = 'heat-inbox-key'
const key = ref('')
const password = ref('')
const loggedIn = ref(false)
const loading = ref(false)
const error = ref('')

const tab = ref('messages')
const messages = ref([])
const notes = ref([])
const unread = computed(() => messages.value.filter((m) => !m.read).length)

function remember(value) {
  try {
    if (value) sessionStorage.setItem(STORE, value)
    else sessionStorage.removeItem(STORE)
  } catch {
    // private mode etc. — just won't stay logged in on refresh
  }
}

async function load(k = key.value) {
  loading.value = true
  error.value = ''
  try {
    const data = await getInbox(k)
    messages.value = data.messages
    notes.value = data.notes
    key.value = k
    loggedIn.value = true
    remember(k)
  } catch (e) {
    error.value = e.message
    if (e.status === 401) logout()
  } finally {
    loading.value = false
  }
}

function logout() {
  loggedIn.value = false
  key.value = ''
  remember('')
}

async function act(fn) {
  error.value = ''
  try {
    await fn()
  } catch (e) {
    error.value = e.message
  }
}

const toggleRead = (m) =>
  act(async () => {
    await setMessageRead(key.value, m.id, !m.read)
    m.read = m.read ? 0 : 1
  })

const remove = (m) =>
  act(async () => {
    await deleteMessage(key.value, m.id)
    messages.value = messages.value.filter((x) => x.id !== m.id)
  })

const toggleHidden = (n) =>
  act(async () => {
    await setNoteHidden(key.value, n.id, !n.hidden)
    n.hidden = n.hidden ? 0 : 1
  })

const fullDate = (ms) =>
  new Date(ms).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })

onMounted(() => {
  let saved = ''
  try {
    saved = sessionStorage.getItem(STORE) || ''
  } catch {
    // ignore
  }
  document.title = 'Team inbox · HEAT'
  const robots = document.createElement('meta')
  robots.name = 'robots'
  robots.content = 'noindex'
  document.head.appendChild(robots)
  if (saved) load(saved)
})
</script>

<template>
  <div class="page">
    <header class="top">
      <RouterLink to="/" class="brand"><AppIcon name="flame" /> HEAT · Team inbox</RouterLink>
      <button v-if="loggedIn" class="ghost" @click="logout">Log out</button>
    </header>

    <form v-if="!loggedIn" class="login" @submit.prevent="load(password)">
      <AppIcon name="lock" :size="28" />
      <h1>Team inbox</h1>
      <p>For Maria &amp; Yayra. Enter the team password.</p>
      <input
        v-model="password"
        type="password"
        autocomplete="current-password"
        placeholder="Password"
        aria-label="Password"
      />
      <button class="btn btn-primary" :disabled="!password || loading">
        {{ loading ? 'Checking…' : 'Open inbox' }}
      </button>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
    </form>

    <main v-else class="inbox">
      <div class="bar">
        <div class="tabs" role="tablist">
          <button
            role="tab"
            :aria-selected="tab === 'messages'"
            :class="{ active: tab === 'messages' }"
            @click="tab = 'messages'"
          >
            Private messages <span v-if="unread" class="badge">{{ unread }}</span>
          </button>
          <button
            role="tab"
            :aria-selected="tab === 'notes'"
            :class="{ active: tab === 'notes' }"
            @click="tab = 'notes'"
          >
            Wall notes ({{ notes.length }})
          </button>
        </div>
        <button class="ghost" :disabled="loading" @click="load()">
          {{ loading ? 'Refreshing…' : 'Refresh' }}
        </button>
      </div>
      <p v-if="error" class="error" role="alert">{{ error }}</p>

      <section v-if="tab === 'messages'">
        <p v-if="!messages.length" class="empty">No private messages yet.</p>
        <article v-for="m in messages" :key="m.id" class="item" :class="{ unread: !m.read }">
          <p class="body">{{ m.body }}</p>
          <div class="meta">
            <time :title="fullDate(m.createdAt)">{{ timeAgo(m.createdAt) }}</time>
            <div class="actions">
              <button class="ghost" @click="toggleRead(m)">
                {{ m.read ? 'Mark unread' : 'Mark read' }}
              </button>
              <button class="ghost danger" @click="remove(m)">Delete</button>
            </div>
          </div>
        </article>
      </section>

      <section v-else>
        <p class="hint">Hidden notes disappear from the public wall. You can show them again.</p>
        <p v-if="!notes.length" class="empty">No notes on the wall yet.</p>
        <article v-for="n in notes" :key="n.id" class="item" :class="{ hidden: n.hidden }">
          <span class="dot" :class="`dot-${n.color}`" aria-hidden="true"></span>
          <p class="body">{{ n.body }}</p>
          <div class="meta">
            <time :title="fullDate(n.createdAt)">{{ timeAgo(n.createdAt) }}</time>
            <span v-if="n.hidden" class="tag">Hidden</span>
            <div class="actions">
              <button class="ghost" :class="{ danger: !n.hidden }" @click="toggleHidden(n)">
                {{ n.hidden ? 'Show on wall' : 'Hide from wall' }}
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--cream);
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: var(--green);
  color: var(--white);
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  text-decoration: none;
}
.top .ghost {
  color: var(--white);
  border-color: rgba(255, 255, 255, 0.4);
}

.ghost {
  border: 1.5px solid var(--line);
  background: transparent;
  color: var(--green);
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}
.ghost.danger {
  color: var(--crimson);
}
.ghost:disabled {
  opacity: 0.5;
}

.login {
  max-width: 380px;
  margin: 80px auto;
  padding: 0 20px;
  display: grid;
  justify-items: center;
  gap: 12px;
  text-align: center;
  color: var(--green);
}
.login h1 {
  font-family: var(--font-display);
}
.login p {
  color: var(--muted);
}
.login input {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  font: inherit;
}
.login .btn {
  width: 100%;
}

.inbox {
  max-width: 820px;
  margin: 0 auto;
  padding: 28px 20px 80px;
}
.bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.tabs {
  display: flex;
  gap: 6px;
  padding: 4px;
  border-radius: 999px;
  background: var(--white);
  box-shadow: var(--shadow);
}
.tabs button {
  border: 0;
  background: transparent;
  padding: 9px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--green);
}
.tabs button.active {
  background: var(--green);
  color: var(--white);
}
.badge {
  display: inline-block;
  min-width: 20px;
  padding: 0 6px;
  margin-left: 4px;
  border-radius: 999px;
  background: var(--crimson);
  color: var(--white);
  font-size: 0.72rem;
}

.item {
  position: relative;
  background: var(--white);
  border-radius: var(--radius);
  padding: 18px 20px;
  margin-bottom: 12px;
  box-shadow: var(--shadow);
  border-left: 4px solid transparent;
}
.item.unread {
  border-left-color: var(--crimson);
}
.item.hidden {
  opacity: 0.55;
}
.item:has(.dot) .body {
  padding-left: 22px;
}
.body {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  line-height: 1.55;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-size: 0.8rem;
  color: var(--muted);
}
.actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}
.tag {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--crimson);
}
.dot {
  position: absolute;
  left: 20px;
  top: 22px;
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
.dot-yellow {
  background: #fde68a;
}
.dot-pink {
  background: #fbcfe0;
}
.dot-green {
  background: #c7ecc9;
}
.dot-blue {
  background: #c4ddfb;
}
.dot-orange {
  background: #fed2a8;
}
.hint,
.empty {
  color: var(--muted);
  font-size: 0.9rem;
  margin-bottom: 14px;
}
.empty {
  text-align: center;
  padding: 60px 0;
}
.error {
  color: var(--crimson);
  font-weight: 600;
  margin-bottom: 12px;
}
</style>
