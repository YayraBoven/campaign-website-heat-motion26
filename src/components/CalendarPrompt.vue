<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { election } from '@/data/content'
import { ui } from '@/utils'
import { addToCalendar, icsUrl } from '@/calendar'

// Small "Add voting to your calendar?" pop-up. Opened by the hero countdown chip
// (after scrolling to the Vote section) and by the "Add to calendar" button there.
const yesBtn = ref(null)

const fmt = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    timeZone: 'Africa/Accra',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
const when = `${fmt(election.votingOpens)} to ${fmt(election.votingCloses)}`

function yes() {
  addToCalendar()
  ui.calendarPrompt = false
}
const close = () => (ui.calendarPrompt = false)
const onKey = (e) => e.key === 'Escape' && close()

watch(
  () => ui.calendarPrompt,
  async (open) => {
    if (open) {
      await nextTick()
      yesBtn.value?.focus({ preventScroll: true })
    }
  },
)
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition name="pop">
    <div
      v-if="ui.calendarPrompt"
      class="prompt"
      role="dialog"
      aria-labelledby="cal-title"
      aria-describedby="cal-when"
    >
      <button class="x" aria-label="Close" @click="close">
        <AppIcon name="close" :size="18" />
      </button>
      <div class="badge"><AppIcon name="calendar" :size="22" /></div>
      <div class="copy">
        <h2 id="cal-title">Add voting to your calendar?</h2>
        <p id="cal-when">{{ when }} (Ghana time)</p>
      </div>
      <div class="actions">
        <button ref="yesBtn" class="btn btn-primary" @click="yes">Yes, add it</button>
        <button class="btn btn-outline-dark" @click="close">Not now</button>
      </div>
      <a class="other" :href="icsUrl" @click="close">
        Apple Calendar or Outlook? Download the calendar file
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.prompt {
  position: fixed;
  z-index: 60;
  left: 50%;
  bottom: 24px;
  width: min(440px, calc(100% - 32px));
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px 16px;
  padding: 22px 22px 16px;
  border-radius: calc(var(--radius) + 4px);
  background: var(--white);
  color: var(--ink);
  box-shadow: 0 24px 60px rgba(24, 35, 28, 0.35);
  border-top: 5px solid var(--crimson);
}
.x {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
}
.x:hover {
  background: var(--cream);
}
.badge {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--pink-soft);
  color: var(--crimson);
}
.copy {
  padding-right: 24px;
}
.copy h2 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--green);
}
.copy p {
  margin-top: 4px;
  font-size: 0.88rem;
  color: var(--muted);
}
.actions {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.actions .btn {
  padding: 13px 16px;
  font-size: 0.8rem;
}
.other {
  grid-column: 1 / -1;
  justify-self: center;
  font-size: 0.75rem;
  color: var(--muted);
}

.pop-enter-active,
.pop-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 24px);
}

@media (max-width: 480px) {
  .prompt {
    bottom: 16px;
  }
}
</style>
