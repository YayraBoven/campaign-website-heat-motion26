<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'
import PhotoBox from './PhotoBox.vue'
import { merch, links } from '@/data/content'
import { vReveal } from '@/utils'

// ---- Photo viewer (click a merch photo to see it big) ----
const withPhotos = computed(() => merch.items.filter((item) => item.photo))
const openIndex = ref(-1) // -1 = closed
const current = computed(() => withPhotos.value[openIndex.value])

function openViewer(item) {
  if (!item.photo) return
  openIndex.value = withPhotos.value.indexOf(item)
}
function closeViewer() {
  openIndex.value = -1
}
function step(dir) {
  const n = withPhotos.value.length
  openIndex.value = (openIndex.value + dir + n) % n
}
function onKey(e) {
  if (openIndex.value < 0) return
  if (e.key === 'Escape') closeViewer()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
// stop the page scrolling behind the viewer
watch(openIndex, (i) => {
  document.body.style.overflow = i >= 0 ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <section id="merch" class="merch section">
    <div class="container">
      <div v-reveal class="head">
        <div>
          <p class="eyebrow">Merch</p>
          <h2 class="section-title">Join the MOTION</h2>
          <p class="section-lead">Rep the campaign around campus. Grab yours when you see the team.</p>
        </div>
      </div>

      <div class="grid">
        <article v-for="(item, i) in merch.items" :key="item.name" v-reveal="i * 90" class="item">
          <button
            type="button"
            class="item-photo zoomable"
            :disabled="!item.photo"
            :aria-label="`View ${item.name} larger`"
            @click="openViewer(item)"
          >
            <PhotoBox :src="item.photo" :label="item.name" ratio="1 / 1" />
            <span v-if="item.photo" class="zoom-hint">Tap to view</span>
          </button>
          <div class="item-body">
            <h3>{{ item.name }}</h3>
            <a
              v-if="!merch.comingSoon"
              :href="links.merchOrder"
              target="_blank"
              rel="noopener"
              class="order"
            >
              Order <AppIcon name="arrow" :size="16" />
            </a>
          </div>
        </article>
      </div>
    </div>

    <!-- Photo viewer -->
    <Teleport to="body">
      <Transition name="viewer">
        <div
          v-if="current"
          class="viewer"
          role="dialog"
          aria-modal="true"
          :aria-label="current.name"
          @click.self="closeViewer"
        >
          <button type="button" class="viewer-close" aria-label="Close" @click="closeViewer">
            <AppIcon name="close" :size="26" />
          </button>

          <button
            v-if="withPhotos.length > 1"
            type="button"
            class="viewer-nav prev"
            aria-label="Previous item"
            @click="step(-1)"
          >
            <AppIcon name="arrow" :size="24" />
          </button>

          <figure class="viewer-figure">
            <img :src="current.photo" :alt="current.name" />
            <figcaption>{{ current.name }}</figcaption>
          </figure>

          <button
            v-if="withPhotos.length > 1"
            type="button"
            class="viewer-nav next"
            aria-label="Next item"
            @click="step(1)"
          >
            <AppIcon name="arrow" :size="24" />
          </button>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>


<style scoped>
.merch {
  background: var(--cream);
}

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 40px;
}

.soon {
  padding: 8px 18px;
  border-radius: 999px;
  background: var(--pink-soft);
  color: var(--crimson);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.item {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.item:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.item-photo {
  overflow: hidden;
}
.item-photo :deep(.photo) {
  border-radius: 0;
  transition: transform 0.5s ease;
}
.item:hover .item-photo :deep(.photo) {
  transform: scale(1.05);
}

.item-body {
  padding: 18px 20px 22px;
}
.item h3 {
  font-size: 1.02rem;
  color: var(--green);
  margin-bottom: 12px;
}
.order {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--crimson);
  text-decoration: none;
}
.order.disabled {
  color: var(--muted);
  opacity: 0.7;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 420px) {
  .grid {
    gap: 14px;
  }
  .item-body {
    padding: 14px;
  }
}
</style>


<style scoped>
/* ---------- Click-to-view merch photos ---------- */
.zoomable {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  cursor: zoom-in;
}
.zoomable:disabled {
  cursor: default;
}
.zoom-hint {
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(24, 35, 28, 0.8);
  color: var(--white);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.item:hover .zoom-hint,
.zoomable:focus-visible .zoom-hint {
  opacity: 1;
}
@media (hover: none) {
  .zoom-hint {
    opacity: 1; /* always show the hint on phones */
  }
}

.viewer {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 16px;
  background: rgba(16, 22, 18, 0.92);
  backdrop-filter: blur(6px);
}
.viewer-figure {
  margin: 0;
  max-width: min(900px, 100%);
  text-align: center;
}
.viewer-figure img {
  max-width: 100%;
  max-height: 78vh;
  margin: 0 auto;
  border-radius: var(--radius);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  object-fit: contain;
}
.viewer-figure figcaption {
  margin-top: 14px;
  color: var(--white);
  font-weight: 700;
  letter-spacing: 0.08em;
}
.viewer-close,
.viewer-nav {
  position: absolute;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: var(--white);
  transition: background-color 0.2s ease;
}
.viewer-close:hover,
.viewer-nav:hover {
  background: rgba(255, 255, 255, 0.25);
}
.viewer-close {
  top: 16px;
  right: 16px;
}
.viewer-nav {
  top: 50%;
  transform: translateY(-50%);
}
.viewer-nav.prev {
  left: 16px;
}
.viewer-nav.prev .icon {
  transform: rotate(180deg);
}
.viewer-nav.next {
  right: 16px;
}
@media (max-width: 640px) {
  .viewer-nav {
    top: auto;
    bottom: 16px;
    transform: none;
  }
}
.viewer-enter-active,
.viewer-leave-active {
  transition: opacity 0.25s ease;
}
.viewer-enter-from,
.viewer-leave-to {
  opacity: 0;
}
</style>
