import { reactive, ref, computed, onMounted, onUnmounted } from 'vue'

// Shared state between components (e.g. the "Solutions" menu link opens the solutions panel)
export const ui = reactive({
  showSolutions: false,
})

// Smoothly scroll to a section by its id
export function scrollToSection(id) {
  if (id === 'solutions') ui.showSolutions = true
  // wait a tick so the solutions panel can open before we scroll
  requestAnimationFrame(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

// v-reveal: fades/slides an element in when it scrolls into view.
// Usage in a component:  import { vReveal } from '@/utils'  then  <div v-reveal>
// Optional delay in ms:  <div v-reveal="150">
export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    el._revealObserver = observer
  },
  unmounted(el) {
    el._revealObserver?.disconnect()
  },
}

// Countdown to voting: works out whether voting is upcoming, open or closed
export function useCountdown(opensAt, closesAt) {
  const now = ref(Date.now())
  let timer
  onMounted(() => {
    timer = setInterval(() => (now.value = Date.now()), 1000)
  })
  onUnmounted(() => clearInterval(timer))

  const opens = new Date(opensAt).getTime()
  const closes = new Date(closesAt).getTime()

  const phase = computed(() => {
    if (now.value < opens) return 'before'
    if (now.value < closes) return 'open'
    return 'closed'
  })

  const parts = computed(() => {
    const target = phase.value === 'before' ? opens : closes
    const diff = Math.max(0, target - now.value)
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  })

  return { phase, parts }
}

export const pad = (n) => String(n).padStart(2, '0')
