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
import { stringify } from "querystring";
import { onMounted, ref } from "vue";
const props = defineProps({
  color: String,
});
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
  const largeViewport = window.matchMedia("(min-width:1200px)");
  if (!largeViewport.matches) {
    if (props.color === "blue") {
      const style = document.createElement("style");
      style.textContent = ` 
    .styled-button{
      background-color: hsl(var(--c-blue-500));
    }
    .hover-overlay{
      background-color: hsla(var(--c-blue-100), 8%);
    }
    .left-text{
      color: hsl(var(--c-blue-100));
    }
    .right-icon{
      color: hsl(var(--c-blue-100));
    }
    `;
      button.value.appendChild(style);
    }
    if (props.color === "orange") {
      const style = document.createElement("style");
      style.textContent = ` 
    .styled-button{
      background-color: hsl(var(--c-orange-500));
    }
    .hover-overlay{
      background-color: hsla(var(--c-orange-100), 8%);
    }
    .left-text{
      color: hsl(var(--c-orange-100));
    }
    .right-icon{
      color: hsl(var(--c-orange-100));
    }
    `;
      button.value.appendChild(style);
    }
  }
});
</script>

<style scoped>
.styled-button {
  position: relative;
  background-color: hsl(var(--c-primary-500, var(--c-orange-500)));
  border: none;
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;
  align-items: center;
  transition: background-color 0.5s;
  width: min-content;
  box-shadow: inset 0 1px 0 hsl(var(--c-primary-900, var(--c-orange-900))),
    0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 5px hsla(0, 0%, 0%, 0.24);
}
.styled-button:active {
  box-shadow: none;
}

.hover-overlay {
  background-color: hsla(var(--c-primary-100, var(--c-orange-100)), 8%);
  position: absolute;
  top: 0;
  left: 0;
  right: 100%;
  bottom: 0;
  z-index: 10;
}
.left-text {
  text-align: center;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  color: hsl(var(--c-primary-100, var(--c-orange-100)));
  line-height: 1rem;
}
.right-icon {
  display: flex;
  border-left: 1px solid hsl(var(--c-black));
  min-height: 1rem;
  color: hsl(var(--c-primary-100, var(--c-orange-100)));
}

@media screen and (min-width: 600px) {
  .styled-button {
    position: relative;
    border: none;
    display: flex;
    flex-wrap: nowrap;
    cursor: pointer;
    align-items: center;
    transition: background-color 0.5s;
    width: min-content;
  }
  .styled-button:active {
    box-shadow: none;
  }

  .left-text {
    flex-grow: 0;
    text-align: center;
    padding: 1.375rem 4rem;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    min-height: 4rem;
  }
  .right-icon {
    display: flex;
    flex: 0;
    border-left: 1px solid hsl(var(--c-black));
    padding: 1rem 1rem;
    min-height: 4rem;
  }
}

@media screen and (min-width: 900px) {
}
</style>
