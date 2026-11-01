<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { election, links } from '@/data/content'
import { useCountdown, pad, vReveal } from '@/utils'

const { phase, parts } = useCountdown(election.votingOpens, election.votingCloses)

const units = computed(() => [
  { label: 'Days', value: pad(parts.value.days) },
  { label: 'Hours', value: pad(parts.value.hours) },
  { label: 'Minutes', value: pad(parts.value.minutes) },
  { label: 'Seconds', value: pad(parts.value.seconds) },
])

const heading = computed(
  () =>
    ({
      before: 'Don’t forget to vote',
      open: 'Voting is open — vote HEAT',
      closed: 'Thank you for voting',
    })[phase.value],
)

const sub = computed(
  () =>
    ({
      before: 'Voting opens 18th November at 12:00 AM.',
      open: 'Voting closes 22nd November at 11:59 PM.',
      closed: 'Results will be declared on 25th November.',
    })[phase.value],
)
</script>

<template>
  <section id="vote" class="vote section">
    <div class="blob blob-1" aria-hidden="true"></div>
    <div class="blob blob-2" aria-hidden="true"></div>

    <div class="container inner">
      <div v-reveal class="center">
        <p class="eyebrow light">Motion '26 · Vote</p>
        <h2 class="title">{{ heading }}</h2>
        <p class="names">Maria Bortei-Doku &amp; Yayra Boven</p>
        <p class="for">as ASC President and Vice-President</p>
      </div>

      <div v-if="phase !== 'closed'" v-reveal class="countdown" aria-live="polite">
        <p class="count-label">{{ phase === 'before' ? 'Voting opens in' : 'Voting closes in' }}</p>
        <div class="units">
          <div v-for="u in units" :key="u.label" class="unit">
            <span class="value">{{ u.value }}</span>
            <span class="label">{{ u.label }}</span>
          </div>
        </div>
      </div>
      <p v-reveal class="sub">{{ sub }}</p>

      <div v-reveal class="dates">
        <div
          v-for="d in election.keyDates"
          :key="d.title"
          class="date"
          :class="{ hl: d.highlight }"
        >
          <p class="date-when"><AppIcon name="calendar" :size="16" /> {{ d.date }}</p>
          <h3>{{ d.title }}</h3>
          <p>{{ d.text }}</p>
        </div>
      </div>

      <div v-reveal class="actions">
        <a :href="links.whatsapp" target="_blank" rel="noopener" class="btn btn-light">
          <AppIcon name="whatsapp" /> Join Team HEAT
        </a>
        <a :href="links.priorities" target="_blank" rel="noopener" class="btn btn-outline">
          Share your priorities
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vote {
  position: relative;
  overflow: hidden;
  background: var(--crimson);
  color: var(--white);
}

/* soft colourful blobs, like the manifesto's VOTE page */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  pointer-events: none;
}
.blob-1 {
  width: 420px;
  height: 420px;
  left: -140px;
  top: -80px;
  background: radial-gradient(circle, #f58a4b 0%, #8e2bb0 70%);
  animation: float 14s ease-in-out infinite alternate;
}
.blob-2 {
  width: 360px;
  height: 360px;
  right: -120px;
  bottom: -120px;
  background: radial-gradient(circle, #4f7fe0 0%, var(--pink) 70%);
  animation: float 16s ease-in-out infinite alternate-reverse;
}
@keyframes float {
  to {
    transform: translate(50px, 40px) scale(1.1);
  }
}

.inner {
  position: relative;
}

.eyebrow.light {
  color: var(--pink-soft);
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5.5vw, 3.8rem);
  line-height: 1.1;
  margin: 12px 0 14px;
}

.names {
  font-size: 1.3rem;
  font-weight: 700;
}
.for {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--pink-soft);
  opacity: 0.85;
}

/* ---------- Countdown ---------- */
.countdown {
  margin: 44px auto 0;
  text-align: center;
}
.count-label {
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 16px;
}
.units {
  display: flex;
  justify-content: center;
  gap: 14px;
}
.unit {
  width: 120px;
  padding: 22px 0 16px;
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
}
.value {
  display: block;
  font-family: var(--font-display);
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.label {
  display: block;
  margin-top: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.8;
}

.sub {
  text-align: center;
  margin-top: 18px;
  font-weight: 600;
}

/* ---------- Key dates ---------- */
.dates {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin: 56px auto 0;
  max-width: 980px;
}
.date {
  padding: 24px;
  border-radius: var(--radius);
  background: rgba(0, 0, 0, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.date.hl {
  background: var(--white);
  color: var(--ink);
}
.date-when {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 0.9rem;
  color: var(--pink-soft);
}
.date.hl .date-when {
  color: var(--crimson);
}
.date h3 {
  font-size: 1.1rem;
  margin: 8px 0 6px;
}
.date p:last-child {
  font-size: 0.92rem;
  opacity: 0.85;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 48px;
}
.btn-light {
  background: var(--white);
  color: var(--crimson);
}
.btn-light:hover {
  background: var(--pink-soft);
}

@media (max-width: 760px) {
  .dates {
    grid-template-columns: 1fr;
  }
  .units {
    gap: 8px;
  }
  .unit {
    width: 76px;
    padding: 16px 0 12px;
  }
  .value {
    font-size: 2.1rem;
  }
  .label {
    font-size: 0.58rem;
    letter-spacing: 0.12em;
  }
}
</style>
