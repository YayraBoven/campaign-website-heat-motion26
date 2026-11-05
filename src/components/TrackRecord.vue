<script setup>
import { ref, computed } from 'vue'
import { trackRecord } from '@/data/content'
import { vReveal } from '@/utils'

const filters = [
  { id: 'maria', label: 'Maria' },
  { id: 'yayra', label: 'Yayra' },
]
const filter = ref('maria')

const items = computed(() =>
  filter.value === 'all' ? trackRecord : trackRecord.filter((t) => t.who === filter.value),
)

const whoLabel = { maria: 'Maria', yayra: 'Yayra', both: 'Maria & Yayra' }
</script>

<template>
  <section id="track-record" class="track section">
    <div class="container">
      <div v-reveal class="center">
        <p class="eyebrow">Track record</p>
        <h2 class="section-title">We’ve already been doing the work</h2>
        <p class="section-lead">
          From parliament to residence halls to the baketball court and the football pitch, leadership isn’t new to us.
        </p>
      </div>

      <div v-reveal class="filters" role="group" aria-label="Filter track record">
        <button
          v-for="f in filters"
          :key="f.id"
          class="filter"
          :class="{ active: filter === f.id }"
          :aria-pressed="filter === f.id"
          @click="filter = f.id"
        >
          {{ f.label }}
        </button>
      </div>

      <TransitionGroup tag="ol" name="list" class="timeline">
        <li v-for="item in items" :key="item.title" class="entry">
          <span class="marker" :class="item.who" aria-hidden="true"></span>
          <article class="card">
            <div class="card-body">
              <div class="meta">
              </div>
              <h3>{{ item.title }}</h3>
              <p class="role">{{ item.role }}</p>
              <p v-if="item.text">{{ item.text }}</p>
            </div>
          </article>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.track {
  background: var(--white);
}

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 36px 0 48px;
}
.filter {
  padding: 10px 20px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: transparent;
  color: var(--green);
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}
.filter:hover {
  border-color: var(--crimson);
}
.filter.active {
  background: var(--crimson);
  border-color: var(--crimson);
  color: var(--white);
}

/* ---------- Timeline ---------- */
.timeline {
  position: relative;
  list-style: none;
  padding: 0 0 0 44px;
  max-width: 900px;
  margin: 0 auto;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 13px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 3px;
  background: var(--pink-soft);
}

.entry {
  position: relative;
  padding-bottom: 28px;
}

.marker {
  position: absolute;
  left: -44px;
  top: 22px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 5px solid var(--white);
  background: var(--crimson);
  box-shadow: 0 0 0 2px var(--pink-soft);
}
.marker.yayra {
  background: var(--pink);
}
.marker.both {
  background: var(--green);
}

.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  background: var(--cream);
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow);
}
.card-photo :deep(.photo) {
  height: 100%;
  border-radius: 0;
}

.card-body {
  padding: 22px 26px;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.year {
  font-weight: 800;
  font-size: 0.85rem;
  color: var(--crimson);
}
.who {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--white);
  background: var(--crimson);
}
.who.yayra {
  background: var(--pink);
}
.who.both {
  background: var(--green);
}
.card h3 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--green);
  margin-top: 8px;
}
.card .role {
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 6px;
}
.card p:last-child {
  color: var(--muted);
  font-size: 0.95rem;
}

/* filter animation */
.list-enter-active,
.list-leave-active {
  transition: all 0.35s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
.list-leave-active {
  position: absolute;
  width: calc(100% - 44px);
}
.list-move {
  transition: transform 0.35s ease;
}

@media (max-width: 640px) {
  .card {
    grid-template-columns: 1fr;
  }
  .card-photo :deep(.photo) {
    aspect-ratio: 16 / 9 !important;
  }
  .timeline {
    padding-left: 32px;
  }
  .timeline::before {
    left: 8px;
  }
  .marker {
    left: -32px;
    width: 22px;
    height: 22px;
    border-width: 4px;
  }
  .list-leave-active {
    width: calc(100% - 32px);
  }
}
</style>
