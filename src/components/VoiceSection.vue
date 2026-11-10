<script setup>
import { ref, computed, onMounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { voice } from '@/data/content'
import { vReveal } from '@/utils'
import {
  NOTE_COLORS,
  NOTE_MAX,
  MESSAGE_MAX,
  getNotes,
  postNote,
  sendMessage,
  tilt,
  timeAgo,
} from '@/voiceApi'

const mode = ref('wall') // 'wall' | 'private'

// ---------- wall ----------
const notes = ref([])
const loading = ref(true)
const loadError = ref('')
// The busier the wall, the smaller the notes, so a full wall still fits on screen.
// Small notes clip long text; tap one to read it all.
const density = computed(() => {
  const n = notes.value.length
  if (n > 40) return 'dense'
  if (n > 12) return 'compact'
  return 'roomy'
})
const openNote = ref(null)
const toggleNote = (id) => (openNote.value = openNote.value === id ? null : id)

const draft = ref('')
const color = ref(NOTE_COLORS[0])
const posting = ref(false)
const postError = ref('')
const justPosted = ref(null)

async function loadNotes() {
  loading.value = true
  loadError.value = ''
  try {
    notes.value = await getNotes()
  } catch (e) {
    loadError.value = e.message
  } finally {
    loading.value = false
  }
}

// hidden field real people never see; bots fill it in
const website = ref('')

async function stick() {
  if (!draft.value.trim() || posting.value) return
  posting.value = true
  postError.value = ''
  try {
    const note = await postNote(draft.value, color.value, website.value)
    notes.value = [note, ...notes.value]
    justPosted.value = note.id
    draft.value = ''
  } catch (e) {
    postError.value = e.message
  } finally {
    posting.value = false
  }
}

// ---------- private ----------
const message = ref('')
const sending = ref(false)
const sendError = ref('')
const sent = ref(false)

async function send() {
  if (!message.value.trim() || sending.value) return
  sending.value = true
  sendError.value = ''
  try {
    await sendMessage(message.value, website.value)
    message.value = ''
    sent.value = true
  } catch (e) {
    sendError.value = e.message
  } finally {
    sending.value = false
  }
}

onMounted(loadNotes)
</script>

<template>
  <section id="voice" class="voice section">
    <div class="container">
      <div v-reveal class="center">
        <p class="eyebrow light">{{ voice.eyebrow }}</p>
        <h2 class="section-title light">{{ voice.title }}</h2>
        <p class="section-lead light">{{ voice.lead }}</p>
      </div>

      <div v-reveal class="switch" role="tablist" aria-label="How to share">
        <button
          role="tab"
          :aria-selected="mode === 'wall'"
          :class="{ active: mode === 'wall' }"
          @click="mode = 'wall'"
        >
          Post on the wall
        </button>
        <button
          role="tab"
          :aria-selected="mode === 'private'"
          :class="{ active: mode === 'private' }"
          @click="mode = 'private'"
        >
          Send privately
        </button>
      </div>

      <input
        v-model="website"
        class="trap"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <Transition name="swap" mode="out-in">
        <!-- Public wall -->
        <div v-if="mode === 'wall'" key="wall" class="wall">
          <form class="composer" :class="`note-${color}`" @submit.prevent="stick">
            <span class="pin" aria-hidden="true"></span>
            <label for="note-text" class="composer-label">{{ voice.wallPrompt }}</label>
            <textarea
              id="note-text"
              v-model="draft"
              :maxlength="NOTE_MAX"
              rows="5"
              placeholder="Write your note…"
            ></textarea>
            <div class="composer-foot">
              <div class="swatches" role="radiogroup" aria-label="Note colour">
                <button
                  v-for="c in NOTE_COLORS"
                  :key="c"
                  type="button"
                  role="radio"
                  :aria-checked="color === c"
                  :aria-label="c"
                  class="swatch"
                  :class="[`note-${c}`, { on: color === c }]"
                  @click="color = c"
                ></button>
              </div>
              <span class="count">{{ draft.length }}/{{ NOTE_MAX }}</span>
            </div>
            <button class="btn btn-primary stick" :disabled="!draft.trim() || posting">
              {{ posting ? 'Sticking…' : 'Stick it on the wall' }}
            </button>
            <p v-if="postError" class="error" role="alert">{{ postError }}</p>
            <p class="fineprint">Anonymous: no name is attached. Be kind; notes may be removed.</p>
          </form>

          <div class="board" aria-live="polite">
            <p v-if="loading" class="board-msg">Loading the wall…</p>
            <p v-else-if="loadError" class="board-msg">
              {{ loadError }} <button class="link" @click="loadNotes">Try again</button>
            </p>
            <p v-else-if="!notes.length" class="board-msg">
              The wall is empty. Be the first to leave a note.
            </p>
            <TransitionGroup v-else tag="ul" name="note" class="notes" :class="density">
              <li v-for="n in notes" :key="n.id" class="slot" :class="{ open: n.id === openNote }">
                <div
                  class="note"
                  :class="[`note-${n.color}`, { fresh: n.id === justPosted }]"
                  :style="{ '--tilt': `${tilt(n.id)}deg` }"
                  :tabindex="density === 'roomy' ? undefined : 0"
                  :role="density === 'roomy' ? undefined : 'button'"
                  :aria-expanded="density === 'roomy' ? undefined : n.id === openNote"
                  @click="density !== 'roomy' && toggleNote(n.id)"
                  @keydown.enter.space.prevent="density !== 'roomy' && toggleNote(n.id)"
                >
                  <span class="pin" aria-hidden="true"></span>
                  <p class="note-body">{{ n.body }}</p>
                  <time class="note-time" :datetime="new Date(n.createdAt).toISOString()">
                    {{ timeAgo(n.createdAt) }}
                  </time>
                </div>
              </li>
            </TransitionGroup>
            <p v-if="density !== 'roomy'" class="board-hint">
              {{ notes.length }} notes · tap one to read it all
            </p>
          </div>
        </div>

        <!-- Private inbox -->
        <div v-else key="private" class="private">
          <div v-if="sent" class="envelope sent" role="status">
            <AppIcon name="check" :size="28" />
            <h3>Sent. Thank you.</h3>
            <p>Only Maria &amp; Yayra will see it. No name was attached.</p>
            <button class="btn btn-outline-dark" @click="sent = false">Send another</button>
          </div>
          <form v-else class="envelope" @submit.prevent="send">
            <p class="lock"><AppIcon name="lock" :size="16" /> Private &amp; anonymous</p>
            <label for="private-text">{{ voice.privatePrompt }}</label>
            <textarea
              id="private-text"
              v-model="message"
              :maxlength="MESSAGE_MAX"
              rows="7"
              placeholder="Type your message…"
            ></textarea>
            <div class="envelope-foot">
              <span class="count">{{ message.length }}/{{ MESSAGE_MAX }}</span>
              <button class="btn btn-primary" :disabled="!message.trim() || sending">
                {{ sending ? 'Sending…' : 'Send to Maria & Yayra' }}
              </button>
            </div>
            <p v-if="sendError" class="error" role="alert">{{ sendError }}</p>
          </form>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.voice {
  background: var(--green);
  color: var(--white);
}

.eyebrow.light {
  color: var(--pink-soft);
}
.section-title.light {
  color: var(--white);
}
.section-lead.light {
  color: rgba(255, 255, 255, 0.78);
}

/* ---------- Switch ---------- */
.switch {
  display: flex;
  width: fit-content;
  margin: 36px auto 40px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}
.switch button {
  border: 0;
  padding: 11px 22px;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 700;
  font-size: 0.88rem;
  transition: all 0.2s ease;
}
.switch button.active {
  background: var(--white);
  color: var(--green);
}

.trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

/* ---------- Note colours ---------- */
.note-yellow {
  --note: #fde68a;
}
.note-pink {
  --note: #fbcfe0;
}
.note-green {
  --note: #c7ecc9;
}
.note-blue {
  --note: #c4ddfb;
}
.note-orange {
  --note: #fed2a8;
}

.pin {
  position: absolute;
  top: -8px;
  left: 50%;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #f07a9a, var(--crimson) 70%);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.35);
}

/* ---------- Wall ---------- */
.wall {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  align-items: start;
}

.composer {
  background: var(--note);
  color: var(--ink);
  padding: 26px 22px 20px;
  border-radius: 3px 3px 18px 3px;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.3);
  transform: rotate(-1.2deg);
  transition: background-color 0.25s ease;
  position: sticky;
  top: calc(var(--nav-height) + 20px);
}
.composer-label {
  display: block;
  font-family: var(--font-hand);
  font-size: 1.55rem;
  line-height: 1.15;
  font-weight: 700;
  color: var(--green);
  margin-bottom: 10px;
}
.composer textarea {
  width: 100%;
  resize: vertical;
  border: 0;
  background: repeating-linear-gradient(transparent 0 29px, rgba(34, 49, 39, 0.14) 29px 30px);
  line-height: 30px;
  font-family: var(--font-hand);
  font-size: 1.4rem;
  color: var(--ink);
  padding: 0 2px;
}
.composer textarea:focus {
  outline: none;
}
.composer:focus-within {
  outline: 3px solid var(--pink);
  outline-offset: 4px;
}
.composer-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0 14px;
}
.swatches {
  display: flex;
  gap: 8px;
}
.swatch {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid rgba(34, 49, 39, 0.25);
  background: var(--note);
}
.swatch.on {
  border-color: var(--green);
  box-shadow: 0 0 0 2px var(--note);
}
.count {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted);
}
.stick {
  width: 100%;
}
.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}
.error {
  margin-top: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--crimson);
}
.fineprint {
  margin-top: 10px;
  font-size: 0.75rem;
  color: var(--muted);
}

.board {
  min-height: 420px;
  max-height: min(820px, 85vh);
  overflow-y: auto;
  scrollbar-color: #8a5f3a transparent;
  padding: 36px 28px;
  border-radius: calc(var(--radius) + 4px);
  background:
    radial-gradient(rgba(90, 55, 25, 0.22) 1px, transparent 1.6px) 0 0 / 9px 9px,
    radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1.6px) 4px 5px / 13px 13px,
    #c49a6c;
  box-shadow:
    inset 0 0 0 10px #8a5f3a,
    inset 0 0 30px rgba(0, 0, 0, 0.35);
}
.board-msg {
  text-align: center;
  padding: 120px 20px;
  font-family: var(--font-hand);
  font-size: 1.7rem;
  color: #3d2a17;
}
.link {
  border: 0;
  background: none;
  text-decoration: underline;
  font: inherit;
  color: var(--crimson);
}

.notes {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 26px 20px;
}
.slot {
  display: flex;
  flex-direction: column;
}
.note {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 160px;
  padding: 20px 16px 12px;
  background: var(--note);
  color: var(--ink);
  border-radius: 2px 2px 14px 2px;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.28);
  transform: rotate(var(--tilt));
  transition: transform 0.2s ease;
}
.slot:hover {
  z-index: 1;
}
.note:hover {
  transform: rotate(0deg) scale(1.04);
  z-index: 1;
}
.note.fresh {
  animation: slap 0.5s ease;
}
.note-body {
  flex: 1;
  font-family: var(--font-hand);
  font-size: 1.35rem;
  line-height: 1.2;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.note-time {
  margin-top: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(34, 49, 39, 0.55);
}

/* Busier walls: smaller notes, long text clipped until tapped */
.notes.compact {
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 20px 14px;
}
.notes.dense {
  grid-template-columns: repeat(auto-fill, minmax(104px, 1fr));
  gap: 16px 10px;
}
.notes.compact .slot,
.notes.dense .slot {
  position: relative;
  height: var(--slot);
}
.notes.compact {
  --slot: 136px;
}
.notes.dense {
  --slot: 116px;
}
.notes.compact .note,
.notes.dense .note {
  position: absolute;
  inset: 0 0 auto;
  height: 100%;
  min-height: 0;
  cursor: pointer;
}
.notes.compact .note {
  padding: 16px 12px 10px;
}
.notes.dense .note {
  padding: 14px 10px 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.26);
}
.notes.compact .note-body,
.notes.dense .note-body {
  flex: 0 1 auto;
  margin-bottom: auto;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.notes.compact .note-body {
  font-size: 1.12rem;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}
.notes.dense .note-body {
  font-size: 1rem;
  line-height: 1.15;
  -webkit-line-clamp: 4;
  line-clamp: 4;
}
.notes.dense .pin {
  top: -6px;
  width: 12px;
  height: 12px;
  margin-left: -6px;
}
.notes.dense .note-time {
  margin-top: 6px;
  font-size: 0.62rem;
}
.slot.open {
  z-index: 3;
}
.slot.open .note {
  height: auto;
  min-height: 100%;
  transform: rotate(0deg) scale(1.12);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.4);
}
.slot.open .note-body {
  display: block;
}
.note:focus-visible {
  outline: 3px solid var(--pink);
  outline-offset: 3px;
}
.board-hint {
  margin-top: 24px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3d2a17;
}

/* ---------- Private ---------- */
.private {
  max-width: 640px;
  margin: 0 auto;
}
.envelope {
  background: var(--cream);
  color: var(--ink);
  padding: 34px 36px;
  border-radius: calc(var(--radius) + 4px);
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.3);
  border-top: 6px solid var(--crimson);
}
.lock {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--crimson);
  margin-bottom: 12px;
}
.envelope label {
  display: block;
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--green);
  line-height: 1.35;
  margin-bottom: 16px;
}
.envelope textarea {
  width: 100%;
  resize: vertical;
  padding: 14px 16px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  background: var(--white);
  font: inherit;
  line-height: 1.55;
}
.envelope textarea:focus {
  outline: none;
  border-color: var(--pink);
}
.envelope-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 16px;
}
.envelope.sent {
  text-align: center;
  display: grid;
  justify-items: center;
  gap: 10px;
}
.envelope.sent .icon {
  color: var(--white);
  background: var(--crimson);
  border-radius: 50%;
  padding: 6px;
  width: 44px;
  height: 44px;
}
.envelope.sent h3 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--green);
}
.envelope.sent p {
  color: var(--muted);
  margin-bottom: 6px;
}

/* ---------- Animations ---------- */
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.note-enter-active {
  transition: all 0.4s ease;
}
.note-enter-from {
  opacity: 0;
  transform: translateY(-20px) rotate(-8deg);
}
@keyframes slap {
  0% {
    transform: scale(1.25) rotate(-6deg);
  }
  60% {
    transform: scale(0.96) rotate(var(--tilt));
  }
}

@media (max-width: 900px) {
  .wall {
    grid-template-columns: 1fr;
  }
  .composer {
    position: relative;
    top: 0;
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
  }
}
@media (max-width: 640px) {
  .board {
    padding: 28px 16px;
    /* leave room above/below so the page itself is easy to scroll past */
    max-height: 70vh;
  }
  .notes {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 14px;
  }
  .note {
    min-height: 130px;
  }
  .note-body {
    font-size: 1.2rem;
  }
  .notes.dense {
    grid-template-columns: repeat(3, 1fr);
    gap: 14px 8px;
  }
  .notes.compact {
    --slot: 142px;
  }
  .notes.dense {
    --slot: 118px;
  }
  .notes.compact .note-body {
    font-size: 1.05rem;
  }
  .notes.dense .note-body {
    font-size: 0.92rem;
  }
  .envelope {
    padding: 26px 22px;
  }
  .switch button {
    padding: 10px 16px;
    font-size: 0.82rem;
  }
}
</style>
