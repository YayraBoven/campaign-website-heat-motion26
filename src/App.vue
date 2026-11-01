<script setup>
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import IssuesSection from './components/IssuesSection.vue'
import TrackRecord from './components/TrackRecord.vue'
import MerchSection from './components/MerchSection.vue'
import VoteSection from './components/VoteSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <AboutSection />
    <IssuesSection />
    <TrackRecord />
    <MerchSection />
    <VoteSection />
  </main>
  <SiteFooter />
</template>
