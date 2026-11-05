<script setup>
import AppIcon from './AppIcon.vue'
import PhotoBox from './PhotoBox.vue'
import { merch, links } from '@/data/content'
import { vReveal } from '@/utils'
</script>

<template>
  <section id="merch" class="merch section">
    <div class="container">
      <div v-reveal class="head">
        <div>
          <p class="eyebrow">Merch</p>
          <h2 class="section-title">Wear the HEAT</h2>
          <p class="section-lead">Rep the campaign around campus. Limited pieces, grab yours.</p>
        </div>
        <span v-if="merch.comingSoon" class="soon">Coming soon</span>
      </div>

      <div class="grid">
        <article v-for="(item, i) in merch.items" :key="item.name" v-reveal="i * 90" class="item">
          <div class="item-photo">
            <PhotoBox :src="item.photo" :label="item.name" ratio="1 / 1" />
          </div>
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
            <span v-else class="order disabled">Dropping soon</span>
          </div>
        </article>
      </div>
    </div>
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
