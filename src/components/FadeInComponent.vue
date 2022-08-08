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
const props = defineProps({
  direction: String,
  target: String,
  id: Number,
  delay: Number,
});

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: target.value, start: "top 90%" },
    defaults: { duration: 1, ease: "slow", stagger: 0.5 },
  });
  let animatedElements = props.target
    ? props.id
      ? "[class='" + props.target + " " + props.id + "'] > *"
      : "." + props.target + " > *"
    : target.value;
  if (props.direction === "up") {
    tl.from(animatedElements, {
      opacity: 0,
      y: 50,
    });
  }
  if (props.direction === "right") {
    tl.from(animatedElements, { opacity: 0, x: -100 });
  }
});
</script>

<style scoped>
.target {
}
/* Fade animation */
</style>
