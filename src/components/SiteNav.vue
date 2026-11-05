<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppIcon from './AppIcon.vue'
import { navLinks } from '@/data/content'
import { scrollToSection } from '@/utils'

const scrolled = ref(false)
const menuOpen = ref(false)
const active = ref('')

function go(target) {
  menuOpen.value = false
  scrollToSection(target)
}

function onScroll() {
  scrolled.value = window.scrollY > 40
}

// Highlight the menu link for the section currently on screen
let observer
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) active.value = e.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  ;['about', 'issues', 'solutions', 'voice', 'track-record', 'merch', 'vote'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <header class="nav" :class="{ scrolled: scrolled || menuOpen }">
    <div class="container nav-inner">
      <a href="#top" class="brand" @click.prevent="go('top')">
        <img src="/logo-white.png" alt="MY HEAT logo" class="brand-logo" />
        <span class="brand-text">
          <strong>HEAT</strong>
          <small>Maria &amp; Yayra for ASC</small>
        </span>
      </a>

      <nav class="links" :class="{ open: menuOpen }" aria-label="Main">
        <a
          v-for="link in navLinks"
          :key="link.target"
          :href="`#${link.target}`"
          :class="{ active: active === link.target }"
          @click.prevent="go(link.target)"
          >{{ link.label }}</a
        >
        <a href="#vote" class="btn btn-primary vote-btn" @click.prevent="go('vote')">Vote</a>
      </nav>

      <button
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="26" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  height: var(--nav-height);
  color: var(--white);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.nav.scrolled {
  background: rgba(24, 35, 28, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-logo {
  width: 46px;
  height: 46px;
  object-fit: contain;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: 0.08em;
}

.brand-text small {
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
}

.links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.links a:not(.btn) {
  position: relative;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 6px 0;
}

/* underline like the reference site */
.links a:not(.btn)::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--pink);
  transform: scaleX(0.35);
  transform-origin: left;
  opacity: 0.6;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.links a:not(.btn):hover::after,
.links a.active::after {
  transform: scaleX(1);
  opacity: 1;
}

.vote-btn {
  padding: 12px 26px;
  font-size: 0.85rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: 0;
  color: inherit;
  padding: 6px;
}

/* ---------- Mobile menu ---------- */
@media (max-width: 1080px) {
  .menu-toggle {
    display: block;
  }

  .links {
    position: fixed;
    top: var(--nav-height);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 12px 20px 28px;
    background: var(--green-deep);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .links.open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }

  .links a:not(.btn) {
    padding: 16px 0;
    font-size: 0.85rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .links a:not(.btn)::after {
    display: none;
  }

  .links a.active {
    color: var(--pink);
  }

  .vote-btn {
    margin-top: 20px;
  }
}
</style>
