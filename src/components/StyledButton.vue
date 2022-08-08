<template>
  <button class="styled-button" ref="button">
    <div class="hover-overlay" ref="overlay"></div>
    <div class="left-text">
      <slot> Button </slot>
    </div>
    <div class="right-icon"></div>
  </button>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";
const button = ref<Element>();
const overlay = ref<Element>();

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power2" },
    paused: true,
  });

  if (!overlay.value) return;

  tl.to(overlay.value, { right: "0", duration: 1 });
  button.value?.addEventListener("mouseenter", () => {
    tl.play();
  });

  button.value?.addEventListener("mouseleave", () => {
    tl.reverse();
  });
});
</script>

<style scoped>
.styled-button {
  position: relative;
  background-color: hsl(var(--c-primary-500, var(--c-green-500)));
  border: none;
  display: flex;
  flex-wrap: nowrap;
  min-height: 4rem;
  cursor: pointer;
}

.hover-overlay {
  background-color: hsla(var(--c-primary-100, var(--c-black)), 8%);
  position: absolute;
  top: 0;
  left: 0;
  right: 100%;
  bottom: 0;
  z-index: 10;
}
.left-text {
  flex: auto;
  text-align: center;
  padding: 1.375rem 4rem;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: hsl(var(--c-primary-100, var(--c-green-100)));
  min-height: 4rem;
}

.right-icon {
  flex: auto;
  border-left: 1px solid hsl(var(--c-black));
  padding: 2rem;
  min-height: 4rem;
}
</style>
