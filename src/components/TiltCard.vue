<template>
  <div :class="id ? 'tilt-card ' + id : 'tilt-card'" ref="tiltCard">
    <FadeInComponent target="text-content" direction="up" :id="id">
      <div :class="id ? 'text-content ' + id : 'text-content'">
        <h3>Tilt Card</h3>
        <p>Description</p>
        <button>CLick Me</button>
      </div>
    </FadeInComponent>
    <div class="image-container"></div>
  </div>
</template>

<script setup lang="ts">
import VanillaTilt from "vanilla-tilt";
import { onMounted, ref } from "vue";
import FadeInComponent from "./FadeInComponent.vue";

const props = defineProps({ id: Number });

const tiltCard = ref<HTMLElement>();
onMounted(() => {
  if (!tiltCard.value) return;
  VanillaTilt.init(tiltCard.value, {
    max: 10,
    speed: 1000,
    reverse: true,
    easing: "cubic-bezier(0,.69,1,.69)",
  });
});
</script>

<style scoped>
.tilt-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: lightgreen;
  width: 100%;
  padding: 1rem;
}

@media screen and (min-width: 600px) {
  .tilt-card {
    min-height: 400px;
  }
}
@media screen and (min-width: 900px) {
  .tilt-card {
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
  }
}
</style>
