<script setup>
import { ref, computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { issues, links } from '@/data/content'
import { ui, vReveal } from '@/utils'

const activeId = ref(issues[0].id)
const current = computed(() => issues.find((i) => i.id === activeId.value))

// Solutions may be a plain list or grouped with headings - make both look the same
const solutionGroups = computed(() => {
  const s = current.value.solutions
  return typeof s[0] === 'string' ? [{ heading: null, items: s }] : s
})
const solutionCount = computed(() => solutionGroups.value.reduce((n, g) => n + g.items.length, 0))

function selectTab(id) {
  activeId.value = id
}

// Arrow-key navigation between tabs (accessibility)
function onKey(e, index) {
  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  const next = (index + dir + issues.length) % issues.length
  activeId.value = issues[next].id
  document.getElementById(`tab-${issues[next].id}`)?.focus()
}
</script>

<template>
  <section id="issues" class="issues section">
    <div class="container">
      <div v-reveal class="center">
        <p class="eyebrow">Issues identified &amp; our solutions</p>
        <h2 class="section-title">We listened. Here’s the plan.</h2>
        <p class="section-lead">
          Pick an area to see the problems students raised, then see exactly how we’ll tackle them.
        </p>
      </div>

      <div v-reveal class="tabs" role="tablist" aria-label="Manifesto areas">
        <button
          v-for="(issue, i) in issues"
          :id="`tab-${issue.id}`"
          :key="issue.id"
          role="tab"
          class="tab"
          :class="{ active: issue.id === activeId }"
          :aria-selected="issue.id === activeId"
          :tabindex="issue.id === activeId ? 0 : -1"
          aria-controls="issue-panel"
          @click="selectTab(issue.id)"
          @keydown="onKey($event, i)"
        >
          {{ issue.title }}
        </button>
      </div>

      <div
        id="issue-panel"
        v-reveal
        class="panel"
        role="tabpanel"
        :aria-labelledby="`tab-${activeId}`"
      >
        <Transition name="swap" mode="out-in">
          <div :key="activeId">
            <!-- Problems -->
            <div class="block problems">
              <div class="block-head">
                <span class="tag tag-problem">Problems identified</span>
                <h3>{{ current.title }}</h3>
              </div>
              <ol class="problem-list">
                <li v-for="(p, i) in current.problems" :key="i" :style="{ '--i': i }">
                  <span class="index">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span>{{ p }}</span>
                </li>
              </ol>
            </div>

            <!-- Toggle -->
            <div class="toggle-row">
              <button
                class="btn"
                :class="ui.showSolutions ? 'btn-outline-dark' : 'btn-primary'"
                :aria-expanded="ui.showSolutions"
                aria-controls="solutions"
                @click="ui.showSolutions = !ui.showSolutions"
              >
                {{ ui.showSolutions ? 'Hide solutions' : `See our ${solutionCount} solutions` }}
                <AppIcon name="chevron-down" :size="18" :class="{ flip: ui.showSolutions }" />
              </button>
            </div>

            <!-- Solutions -->
            <div id="solutions" class="solutions-wrap" :class="{ open: ui.showSolutions }">
              <div class="solutions-inner">
                <div class="block solutions">
                  <div class="block-head">
                    <span class="tag tag-solution">Our solutions</span>
                    <h3>How HEAT will fix it</h3>
                  </div>
                  <div v-for="(group, gi) in solutionGroups" :key="gi" class="group">
                    <h4 v-if="group.heading">{{ group.heading }}</h4>
                    <ul class="solution-list">
                      <li v-for="(s, si) in group.items" :key="si">
                        <span class="check"><AppIcon name="check" :size="14" /></span>
                        <span>{{ s }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <div v-reveal class="download">
        <div>
          <h3>Want every detail?</h3>
          <p>Download the full HEAT manifesto and read it in your own time.</p>
        </div>
        <a :href="links.manifesto" download="HEAT-Manifesto-Motion26.pdf" class="btn btn-primary">
          <AppIcon name="download" :size="18" /> Download manifesto
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.issues {
  background: var(--cream);
}

/* ---------- Tabs ---------- */
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 40px auto 32px;
  max-width: 980px;
}

.tab {
  padding: 10px 18px;
  border-radius: 999px;
  border: 1.5px solid var(--line);
  background: var(--white);
  color: var(--green);
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.2s ease;
}
.tab:hover {
  border-color: var(--pink);
  color: var(--crimson);
}
.tab.active {
  background: var(--green);
  border-color: var(--green);
  color: var(--white);
  box-shadow: 0 6px 16px rgba(34, 49, 39, 0.25);
}

/* ---------- Panel ---------- */
.panel {
  max-width: 900px;
  margin: 0 auto;
}

.block {
  background: var(--white);
  border-radius: calc(var(--radius) + 4px);
  padding: 36px 40px;
  box-shadow: var(--shadow);
}

.block-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.block-head h3 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--green);
  order: -1;
}

.tag {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 999px;
}
.tag-problem {
  background: var(--pink-soft);
  color: var(--crimson);
}
.tag-solution {
  background: rgba(255, 255, 255, 0.15);
  color: var(--white);
}

.problem-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 4px;
}
.problem-list li {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
  animation: fadeUp 0.45s ease both;
  animation-delay: calc(var(--i) * 45ms);
}
.problem-list li:last-child {
  border-bottom: 0;
}
.index {
  font-weight: 800;
  color: var(--pink);
  font-size: 0.85rem;
  padding-top: 2px;
}

.toggle-row {
  display: flex;
  justify-content: center;
  margin: 28px 0;
}
.toggle-row .icon {
  transition: transform 0.3s ease;
}
.toggle-row .flip {
  transform: rotate(180deg);
}

/* smooth open/close for solutions */
.solutions-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.55s ease;
}
.solutions-wrap.open {
  grid-template-rows: 1fr;
}
.solutions-inner {
  overflow: hidden;
}

.solutions {
  background: var(--green);
  color: var(--white);
  margin-bottom: 6px;
}
.solutions .block-head h3 {
  color: var(--white);
}

.group + .group {
  margin-top: 22px;
}
.group h4 {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pink);
  margin-bottom: 8px;
}

.solution-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 14px;
}
.solution-list li {
  display: flex;
  gap: 14px;
  line-height: 1.55;
}
.check {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-top: 1px;
  border-radius: 50%;
  background: var(--crimson);
}

/* ---------- Download ---------- */
.download {
  max-width: 900px;
  margin: 56px auto 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 30px 36px;
  border-radius: calc(var(--radius) + 4px);
  border: 2px dashed rgba(156, 13, 56, 0.3);
}
.download h3 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--green);
}
.download p {
  color: var(--muted);
}

/* tab switch animation */
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

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}

@media (max-width: 640px) {
  .block {
    padding: 26px 22px;
  }
  .block-head h3 {
    font-size: 1.5rem;
  }
  .tab {
    font-size: 0.8rem;
    padding: 8px 14px;
  }
  .download {
    padding: 24px;
  }
}
</style>
