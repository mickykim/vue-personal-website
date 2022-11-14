<template>
  <!-- Trigger/Open The Modal -->
  <div ref="card" class="modal__card">
    <h3>Pog Title</h3>
    <h4>FeelsGoodMan Description Body</h4>
  </div>

  <!-- The Modal -->
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ImageGallery from "./ImageGallery.vue";

// Get the modal
</script>

<style lang="scss" scoped>
.modal__card {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  height: 30rem;
  border-radius: 1rem;

  background-image: linear-gradient(
      to top,
      hsla(var(--color-background), 1) 0%,
      hsla(var(--color-background), 0.59) 32%,
      hsla(var(--color-background), 0.1) 100%
    ),
    url("./../assets/websiteImage.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}
</style>
