<script setup>
import SiteNav from '@/components/SiteNav.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import IssuesSection from '@/components/IssuesSection.vue'
import VoiceSection from '@/components/VoiceSection.vue'
import TrackRecord from '@/components/TrackRecord.vue'
import MerchSection from '@/components/MerchSection.vue'
import VoteSection from '@/components/VoteSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CalendarPrompt from '@/components/CalendarPrompt.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <AboutSection />
    <IssuesSection />
    <VoiceSection />
    <TrackRecord />
    <MerchSection />
    <VoteSection />
  </main>
  <SiteFooter />
  <CalendarPrompt />
</template>
