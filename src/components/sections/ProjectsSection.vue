<template>
  <FadeInComponent direction="up">
    <StyledHeading position="right" id="projects"> Projects </StyledHeading>
  </FadeInComponent>

  <div class="projects-section">
    <TiltCard v-for="i in 4" :id="i" :key="i" image="websiteImage" />
  </div>
  <div class="website-showcase-section">
    <FadeInComponent direction="up">
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent direction="up">
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent direction="up">
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent direction="up">
      <HoverCard />
    </FadeInComponent>
  </div>
</template>

<script setup lang="ts">
import FadeInComponent from "../FadeInComponent.vue";
import StyledHeading from "../StyledHeading.vue";
import TiltCard from "../TiltCard.vue";
import HoverCard from "../HoverCard.vue";
</script>

<style scoped>
.projects-section {
  display: flex;
  max-width: 760px;
  margin: 4rem 0;
  gap: 6rem;
  flex-wrap: wrap;
}
.website-showcase-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  justify-items: center;
  padding: 0 2rem;
  margin-bottom: 8rem;
  /* transition: background 0.5s;
  background: hsl(var(--c-primary-900)); */
}
@media screen and (min-width: 600px) {
  .website-showcase-section {
    grid-template-columns: 1fr 1fr;
  }

  .projects-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;

    gap: 4rem;
  }
}
</style>
