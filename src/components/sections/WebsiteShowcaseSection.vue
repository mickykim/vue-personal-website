<template>
  <FadeInComponent>
    <StyledHeader> Websites </StyledHeader>
  </FadeInComponent>
  <div class="website-showcase-section">
    <FadeInComponent>
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent>
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent>
      <HoverCard />
    </FadeInComponent>
    <FadeInComponent>
      <HoverCard />
    </FadeInComponent>
  </div>
</template>

<script setup lang="ts">
import HoverCard from "../HoverCard.vue";
import FadeInComponent from "../FadeInComponent.vue";
import StyledHeader from "../StyledHeader.vue";
</script>

<style scoped>
.website-showcase-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  justify-items: center;
  padding: 0 2rem;
  margin-bottom: 8rem;
  /* transition: background 0.5s;
  background: hsl(var(--c-primary-900)); */
}
</style>
