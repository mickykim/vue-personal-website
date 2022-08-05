<template>
  <div>
    <FadeInComponent>
      <HeroSection />
    </FadeInComponent>
    <WebsiteShowcaseSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../sections/HeroSection.vue";
import WebsiteShowcaseSection from "../sections/WebsiteShowcaseSection.vue";
import FadeInComponent from "../FadeInComponent.vue";
</script>

<style scoped></style>
