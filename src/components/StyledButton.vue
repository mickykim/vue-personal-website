<template>
  <button class="styled-button" ref="button">
    <div class="hover-overlay" ref="overlay"></div>
    <div class="left-text" ref="leftText">
      <slot name="text"> Button </slot>
    </div>
    <div class="right-icon" ref="rightIcon">
      <slot name="icon"> </slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";

const button = ref<HTMLElement>();
const overlay = ref<HTMLElement>();
const leftText = ref<HTMLElement>();
const rightIcon = ref<HTMLElement>();

onMounted(() => {
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" },
    paused: true,
  });

  if (!overlay.value) return;

  tl.to(overlay.value, { right: "0", duration: 0.5 });
  button.value?.addEventListener("mouseenter", () => {
    tl.play();
  });

  button.value?.addEventListener("mouseleave", () => {
    tl.reverse();
  });
  if (!leftText.value || !rightIcon.value || !button.value) return;
  let maxWidth =
    leftText.value.getBoundingClientRect().width +
    2 * rightIcon.value.getBoundingClientRect().width;

  button.value.style.maxWidth = `${maxWidth.toFixed(2)}px`;
});
</script>

<style scoped>
.styled-button {
  position: relative;
  background-color: hsl(var(--c-primary-500, var(--c-green-500)));
  border: none;
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
  align-items: center;
  transition: background-color 0.5s;
  box-shadow: inset 0 1px 0 hsl(var(--c-primary-900)),
    0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 5px hsla(0, 0%, 0%, 0.24);
}
.styled-button:active {
  box-shadow: none;
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
  flex-grow: 0;
  text-align: center;
  padding: 1.375rem 4rem;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: hsl(var(--c-primary-100, var(--c-green-100)));
  min-height: 4rem;
}
.right-icon {
  display: flex;
  flex: 0;
  border-left: 1px solid hsl(var(--c-black));
  padding: 1rem 1rem;
  min-height: 4rem;
}
@media screen and (min-width: 900px) {
  .styled-button {
    min-height: 4rem;
  }
}
</style>
