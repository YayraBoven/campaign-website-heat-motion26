<script setup>
// Simple icon set. Usage: <AppIcon name="instagram" />
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    class="icon"
  >
    <!-- filled brand icons -->
    <path
      v-if="name === 'instagram'"
      fill="currentColor"
      d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 4.9a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.1-9.5a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z"
    />
    <path
      v-else-if="name === 'tiktok'"
      fill="currentColor"
      d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2-2.8V9.3a6.2 6.2 0 1 0 5.3 6.1V8.6a7.6 7.6 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.7z"
    />
    <path
      v-else-if="name === 'x'"
      fill="currentColor"
      d="M17.8 2.5h3.1l-6.8 7.8 8 10.6h-6.3l-4.9-6.4-5.6 6.4H2.2l7.3-8.3L1.9 2.5h6.4l4.4 5.9 5.1-5.9zm-1.1 16.5h1.7L7.4 4.3H5.6l11.1 14.7z"
    />
    <path
      v-else-if="name === 'whatsapp'"
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.5-.7-2.2-1.4-.6-.5-1-1.2-1.2-1.6-.1-.2 0-.4.1-.5l.4-.4.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z"
    />
    <path v-else-if="name === 'play'" fill="currentColor" d="M8 5.5v13l10.5-6.5L8 5.5z" />

    <!-- line icons -->
    <g
      v-else
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="name === 'download'">
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </template>
      <template v-else-if="name === 'arrow'">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </template>
      <path v-else-if="name === 'chevron-down'" d="m6 9 6 6 6-6" />
      <template v-else-if="name === 'calendar'">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </template>
      <path v-else-if="name === 'check'" d="m5 12 5 5L20 7" />
      <path
        v-else-if="name === 'alert'"
        d="M12 8v5M12 16.5v.5M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"
      />
      <template v-else-if="name === 'menu'">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </template>
      <template v-else-if="name === 'close'">
        <path d="M6 6l12 12M18 6 6 18" />
      </template>
      <template v-else-if="name === 'camera'">
        <path
          d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
        />
        <circle cx="12" cy="13.5" r="3.5" />
      </template>
      <template v-else-if="name === 'lock'">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </template>
      <path
        v-else-if="name === 'flame'"
        d="M12 22c4 0 7-2.8 7-6.8 0-3.4-2.3-5.8-4-7.7-.4 2-1.4 3.2-2.6 3.8.3-3.5-1.2-6.6-3.9-9.3.1 3.6-1.6 5.6-3.1 7.6C4.3 11.2 5 13 5 15.2 5 19.2 8 22 12 22z"
      />
    </g>
  </svg>
</template>

<style scoped>
.icon {
  flex-shrink: 0;
}
</style>
