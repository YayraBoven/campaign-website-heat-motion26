<script setup>
// Shows a photo if `src` is set, otherwise a labelled placeholder box.
import AppIcon from './AppIcon.vue'

defineProps({
  src: { type: String, default: null },
  label: { type: String, default: 'Photo' },
  alt: { type: String, default: '' },
  ratio: { type: String, default: '4 / 3' }, // e.g. '1 / 1', '3 / 4', '16 / 9'
  dark: { type: Boolean, default: false }, // use on dark backgrounds
  position: { type: String, default: null }, // CSS object-position, e.g. 'center top'
})
</script>

<template>
  <div class="photo" :class="{ dark, empty: !src }" :style="{ aspectRatio: ratio }">
    <img
      v-if="src"
      :src="src"
      :alt="alt || label"
      loading="lazy"
      :style="position && { objectPosition: position }"
    />
    <div v-else class="placeholder">
      <AppIcon name="camera" :size="34" />
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.photo {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--white);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--pink);
  background:
    repeating-linear-gradient(135deg, rgba(206, 83, 116, 0.07) 0 12px, transparent 12px 24px),
    var(--pink-soft);
  border: 2px dashed rgba(206, 83, 116, 0.45);
  border-radius: inherit;
}

.photo.dark {
  background: rgba(255, 255, 255, 0.04);
}

.dark .placeholder {
  color: rgba(255, 255, 255, 0.75);
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0 12px, transparent 12px 24px),
    rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
