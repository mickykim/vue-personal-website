<template>
  <div ref="target" class="target">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const target = ref();

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: target.value, start: "top 80%" },
  });
  tl.from(target.value, { opacity: 0, y: 100, duration: 1 }).to(target.value, {
    opacity: 1,
    y: 0,
  });
});
</script>

<style scoped>
.target {
}
/* Fade animation */
</style>
