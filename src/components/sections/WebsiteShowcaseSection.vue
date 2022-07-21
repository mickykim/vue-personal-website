<template>
  <div class="website-showcase-section">
    <HoverCard />
    <HoverCard />

    <HoverCard />

    <HoverCard />
  </div>
</template>

<script setup lang="ts">
import HoverCard from "../HoverCard.vue";
</script>

<style scoped>
.website-showcase-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  justify-items: center;
  padding: 0 2rem;
  /* transition: background 0.5s;
  background: hsl(var(--c-primary-900)); */
}
</style>
