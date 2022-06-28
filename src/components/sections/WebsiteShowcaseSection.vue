<template>
  <div class="website-showcase-section">
    <HoverCard />
    <HoverCard />

    <HoverCard />

    <HoverCard />

    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
    <ImageCardModal />
  </div>
</template>

<script setup lang="ts">
import ImageCardModal from "../ImageCardModal.vue";
import HoverCard from "../HoverCard.vue";
</script>

<style scoped>
.website-showcase-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 0 2rem;
}
</style>
