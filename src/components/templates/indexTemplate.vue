<template>
  <div class="index-template">
    <HeroSection />
    <ResumeSection />
    <ProjectsSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from "../sections/HeroSection.vue";
import ProjectsSection from "../sections/ProjectsSection.vue";
import ResumeSection from "../sections/ResumeSection.vue";
</script>

<style scoped>
.index-template {
  padding: 0 0rem;
}
@media screen and (min-width: 600px) {
  .index-template {
    padding: 0 8rem;
  }
}
</style>
