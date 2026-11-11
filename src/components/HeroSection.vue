<script setup>
import AppIcon from './AppIcon.vue'
import PhotoBox from './PhotoBox.vue'
import { socials, photos, election } from '@/data/content'
import { scrollToSection, goVoteAndPromptCalendar, useCountdown } from '@/utils'
import { siteLinks, external } from '@/siteLinks'

const { phase, parts } = useCountdown(election.votingOpens, election.votingCloses)
</script>

<template>
  <section id="top" class="hero">
    <div class="glow glow-1" aria-hidden="true"></div>
    <div class="glow glow-2" aria-hidden="true"></div>

    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">HEAT '26 · ASC Elections</p>

                        <h1><span class="heat">MOTION</span> is coming<br />to Ashesi.</h1>

        <p class="names">
          Maria Bortei-Doku <span>&amp;</span> Yayra Boven<br />
          <small>for ASC President &amp; Vice-President</small>
        </p>

        <p class="slogan">Vote for change. Vote for voice. Vote for relief.</p>

        <div class="actions">
          <a v-bind="external(siteLinks.whatsapp)" class="btn btn-primary">
            <AppIcon name="whatsapp" /> Join Team MOTION
          </a>
          <a href="#issues" class="btn btn-outline" @click.prevent="scrollToSection('issues')">
            Read our plan
          </a>
        </div>

        <button class="countdown-chip" @click="goVoteAndPromptCalendar">
          <span class="dot" :class="phase"></span>
          <template v-if="phase === 'before'">
            Voting opens in
            <strong>{{ parts.days }}d {{ parts.hours }}h {{ parts.minutes }}m</strong>
          </template>
          <template v-else-if="phase === 'open'">
            Voting is <strong>OPEN</strong> · closes in {{ parts.days }}d {{ parts.hours }}h
          </template>
          <template v-else>Voting has closed · Thank you!</template>
        </button>

        <div class="socials">
          <a
            v-for="s in socials"
            :key="s.name"
            v-bind="external(siteLinks[s.link])"
            :aria-label="s.name"
          >
            <AppIcon :name="s.icon" :size="18" />
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="photo-frame">
          <PhotoBox :src="photos.heroTogether" label="Maria & Yayra together" ratio="4 / 5" dark />
        </div>
<!--
        <a v-bind="external(siteLinks.tiktokVideo)" class="watch">
          <span class="watch-label">Watch now</span>
          <span class="play"><AppIcon name="play" :size="34" /></span>
        </a>
-->
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: var(--white);
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0 2px, transparent 2px 9px),
    linear-gradient(160deg, var(--green) 0%, var(--green-deep) 100%);
  padding: calc(var(--nav-height) + 56px) 0 90px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* soft "heat" glows */
.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.glow-1 {
  width: 520px;
  height: 520px;
  right: -120px;
  top: 10%;
  background: rgba(156, 13, 56, 0.55);
  animation: drift 12s ease-in-out infinite alternate;
}
.glow-2 {
  width: 380px;
  height: 380px;
  right: 22%;
  bottom: -120px;
  background: rgba(206, 83, 116, 0.35);
  animation: drift 15s ease-in-out infinite alternate-reverse;
}

@keyframes drift {
  to {
    transform: translate(-40px, 30px) scale(1.08);
  }
}

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 56px;
}

.hero-copy {
  animation: rise 0.9s ease both;
}

h1 {
  font-family: var(--font-display);
  font-weight: 700;
    font-size: clamp(2.4rem, 5vw, 3.9rem);
  line-height: 1.05;
  margin: 18px 0 22px;
}

.heat {
  color: var(--pink);
  position: relative;
  white-space: nowrap;
}

.names {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.4;
}
.names span {
  color: var(--pink);
}
.names small {
  font-size: 0.9rem;
  font-weight: 500;
  opacity: 0.8;
}

.slogan {
  margin-top: 18px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.countdown-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 26px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: var(--white);
  font-size: 0.85rem;
  transition: background-color 0.2s ease;
}
.countdown-chip:hover {
  background: rgba(255, 255, 255, 0.12);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--pink);
  box-shadow: 0 0 0 0 rgba(206, 83, 116, 0.7);
  animation: pulse 1.8s infinite;
}
.dot.open {
  background: #4ade80;
}
.dot.closed {
  animation: none;
  background: #999;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 10px rgba(206, 83, 116, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(206, 83, 116, 0);
  }
}

.socials {
  display: flex;
  gap: 10px;
  margin-top: 26px;
}
.socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}
.socials a:hover {
  background: var(--white);
  color: var(--green);
  transform: translateY(-2px);
}

/* ---------- Visual ---------- */
.hero-visual {
  position: relative;
  animation: rise 0.9s 0.15s ease both;
}

.photo-frame {
  position: relative;
  border-radius: 200px 200px var(--radius) var(--radius);
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
}
.photo-frame :deep(.photo) {
  border-radius: 0;
}

.watch {
  position: absolute;
  right: -10px;
  bottom: 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
}

.watch-label {
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.95rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.play {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--white);
  color: var(--crimson);
  padding-left: 5px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.25s ease;
}
.watch:hover .play {
  transform: scale(1.08);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero-visual {
    max-width: 420px;
    width: 100%;
    margin: 0 auto;
  }
  .watch {
    right: 12px;
    bottom: 16px;
  }
  .play {
    width: 66px;
    height: 66px;
  }
}
</style>
