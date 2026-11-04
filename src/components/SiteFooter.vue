<script setup>
import AppIcon from './AppIcon.vue'
import { navLinks, socials, links } from '@/data/content'
import { scrollToSection } from '@/utils'
import { siteLinks, external } from '@/siteLinks'
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <img src="/logo-white.png" alt="MY HEAT logo" class="logo" />
      <p class="tagline">HEAT · Motion '26</p>
      <p class="slogan">Vote for change. Vote for voice. Vote for relief.</p>

      <nav class="links" aria-label="Footer">
        <a
          v-for="link in navLinks"
          :key="link.target"
          :href="`#${link.target}`"
          @click.prevent="scrollToSection(link.target)"
          >{{ link.label }}</a
        >
        <a href="#vote" @click.prevent="scrollToSection('vote')">Vote</a>
        <a :href="links.manifesto" download="HEAT-Manifesto-Motion26.pdf">Manifesto</a>
      </nav>

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

      <a v-if="links.email" :href="`mailto:${links.email}`" class="email">{{ links.email }}</a>

      <p class="copy">
        © {{ new Date().getFullYear() }} HEAT · Maria Bortei-Doku &amp; Yayra Boven
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--green-deep);
  color: var(--white);
  padding: 72px 0 40px;
  text-align: center;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 84px;
  height: 84px;
  object-fit: contain;
}

.tagline {
  margin-top: 14px;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.slogan {
  margin-top: 4px;
  font-style: italic;
  opacity: 0.75;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 30px;
  margin-top: 36px;
}
.links a {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  opacity: 0.85;
  transition:
    opacity 0.2s ease,
    color 0.2s ease;
}
.links a:hover {
  opacity: 1;
  color: var(--pink);
}

.socials {
  display: flex;
  gap: 18px;
  margin-top: 28px;
}
.socials a {
  opacity: 0.85;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
}
.socials a:hover {
  color: var(--pink);
  transform: translateY(-2px);
}

.email {
  margin-top: 22px;
  color: var(--pink);
}

.copy {
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  font-size: 0.8rem;
  opacity: 0.6;
}
</style>
