<script setup>
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import PhotoBox from './PhotoBox.vue'
import { statement, message, vision, candidates, photos } from '@/data/content'
import { vReveal, scrollToSection } from '@/utils'

const expanded = ref(false)
</script>

<template>
  <!-- Statement band (like the framed photo + big sentence on the reference site) -->
  <section class="statement section">
    <div class="container narrow">
      <div v-reveal class="framed">
        <!-- image shifted down inside the frame (18% instead of centred) so both faces show -->
        <PhotoBox
          :src="photos.statement"
          label="Campaign photo with students"
          ratio="16 / 9"
          position="center 18%"
        />
      </div>
      <p v-reveal class="statement-text">
        <strong>{{ statement.highlight }}</strong>
        {{ statement.text }}
      </p>
      <div v-reveal class="center">
        <a href="#about" class="btn btn-primary" @click.prevent="scrollToSection('about')">
          Learn more <AppIcon name="arrow" :size="18" />
        </a>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="about section">
    <div class="container">
      <div v-reveal class="center">
        <p class="eyebrow">About us</p>
        <h2 class="section-title">Our message to you</h2>
      </div>

      <div class="message" v-reveal>
        <p v-for="(p, i) in message.short" :key="'s' + i">{{ p }}</p>

        <div class="more" :class="{ open: expanded }">
          <div class="more-inner">
            <p v-for="(p, i) in message.full" :key="'f' + i">{{ p }}</p>
          </div>
        </div>

        <p class="signoff">{{ message.signoff }} <span>HEAT!</span></p>

        <button class="read-more" :aria-expanded="expanded" @click="expanded = !expanded">
          {{ expanded ? 'Show less' : 'Read our full message' }}
          <AppIcon name="chevron-down" :size="18" :class="{ flip: expanded }" />
        </button>
      </div>

      <!-- Candidates -->
      <div class="candidates">
        <article v-for="(c, i) in candidates" :key="c.id" v-reveal="i * 120" class="candidate">
          <PhotoBox :src="c.photo" :label="`${c.name.split(' ')[0]} portrait`" ratio="4 / 5" />
          <div class="candidate-body">
            <p class="role">{{ c.role }}</p>
            <h3>{{ c.name }}</h3>
            <p>{{ c.bio }}</p>
          </div>
        </article>
      </div>

      <!-- Vision -->
      <div class="vision">
        <div v-reveal class="vision-head">
          <div>
            <p class="eyebrow">Our vision</p>
            <h2 class="section-title">Where we see Ashesi</h2>
          </div>
          <div class="vision-photo">
            <PhotoBox :src="photos.vision" label="Maria & Yayra together" ratio="16 / 10" />
          </div>
        </div>
        <div class="vision-grid">
          <div v-for="(v, i) in vision" :key="v.title" v-reveal="i * 120" class="vision-card">
            <span class="num">0{{ i + 1 }}</span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- Statement ---------- */
.statement {
  background: linear-gradient(180deg, #ece6de 0%, var(--cream) 30%);
}

.narrow {
  max-width: 980px;
}

.framed {
  background: var(--white);
  padding: 14px;
  box-shadow: 0 24px 50px rgba(34, 49, 39, 0.16);
  transform: rotate(-0.6deg);
  max-width: 860px;
  margin: 0 auto;
}
.framed :deep(.photo) {
  border-radius: 2px;
}

.statement-text {
  margin: 56px auto 36px;
  max-width: 880px;
  text-align: center;
  font-size: clamp(1.25rem, 2.6vw, 1.85rem);
  line-height: 1.5;
  color: var(--green);
}
.statement-text strong {
  color: var(--crimson);
  font-weight: 800;
}

/* ---------- Message ---------- */
.about {
  background: var(--white);
}

.message {
  max-width: 760px;
  margin: 24px auto 0;
  font-size: 1.05rem;
  color: var(--muted);
}

.message p + p,
.more-inner p {
  margin-top: 16px;
}

/* smooth expand/collapse */
.more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s ease;
}
.more.open {
  grid-template-rows: 1fr;
}
.more-inner {
  overflow: hidden;
}

.signoff {
  margin-top: 24px !important;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--green);
}
.signoff span {
  font-style: normal;
  font-weight: 700;
  color: var(--crimson);
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  background: none;
  border: 0;
  padding: 0;
  color: var(--crimson);
  font-weight: 700;
  letter-spacing: 0.06em;
  border-bottom: 2px solid currentColor;
}
.read-more .icon {
  transition: transform 0.3s ease;
}
.read-more .flip {
  transform: rotate(180deg);
}

/* ---------- Candidates ---------- */
.candidates {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 80px;
}

.candidate {
  background: var(--cream);
  border-radius: calc(var(--radius) + 4px);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.candidate:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}
.candidate :deep(.photo) {
  border-radius: 0;
}

.candidate-body {
  padding: 26px 28px 30px;
}
.role {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--crimson);
}
.candidate h3 {
  font-family: var(--font-display);
  font-size: 1.7rem;
  color: var(--green);
  margin: 6px 0 10px;
}
.candidate p:last-child {
  color: var(--muted);
}

/* ---------- Vision ---------- */
.vision {
  margin-top: 100px;
}

.vision-head {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: end;
  gap: 40px;
  margin-bottom: 36px;
}

.vision-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.vision-card {
  position: relative;
  padding: 32px 28px;
  border-radius: var(--radius);
  background: var(--green);
  color: var(--white);
  overflow: hidden;
  transition: transform 0.3s ease;
}
.vision-card:nth-child(2) {
  background: var(--crimson);
}
.vision-card:nth-child(3) {
  background: var(--pink);
}
.vision-card:hover {
  transform: translateY(-6px);
}

.num {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  opacity: 0.35;
}
.vision-card h3 {
  font-size: 1.2rem;
  margin: 14px 0 10px;
}
.vision-card p {
  font-size: 0.95rem;
  opacity: 0.9;
}

@media (max-width: 860px) {
  .candidates,
  .vision-head,
  .vision-grid {
    grid-template-columns: 1fr;
  }
  .candidates {
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
