<template>
  <div class="background-image">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:svgjs="http://svgjs.com/svgjs"
      width="1920"
      height="1080"
      preserveAspectRatio="none"
      viewBox="0 0 1920 1080"
    >
      <g mask='url("#SvgjsMask1094")' fill="none">
        <rect
          width="1920"
          height="1080"
          x="0"
          y="0"
          fill="rgba(22, 33, 45, 1)"
          class="background-bg"
        ></rect>
        <path
          d="M924.68 93.09 a228.51 228.51 0 1 0 457.02 0 a228.51 228.51 0 1 0 -457.02 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float3 background-objects"
        ></path>
        <path
          d="M419.96 854.09 a211.86 211.86 0 1 0 423.72 0 a211.86 211.86 0 1 0 -423.72 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float1 background-objects"
        ></path>
        <path
          d="M1398.19 553.54 a330.12 330.12 0 1 0 660.24 0 a330.12 330.12 0 1 0 -660.24 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float3 background-objects"
        ></path>
        <path
          d="M1281.46 835.33 a327.3 327.3 0 1 0 654.6 0 a327.3 327.3 0 1 0 -654.6 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float3 background-objects"
        ></path>
        <path
          d="M1550.12 903.8 a323.75 323.75 0 1 0 647.5 0 a323.75 323.75 0 1 0 -647.5 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float3 background-objects"
        ></path>
        <path
          d="M-181.38 57.63 a302.93 302.93 0 1 0 605.86 0 a302.93 302.93 0 1 0 -605.86 0z"
          fill="rgba(28, 83, 142, 0.4)"
          class="triangle-float1 background-objects"
        ></path>
      </g>
      <defs>
        <mask id="SvgjsMask1094">
          <rect width="1920" height="1080" fill="#ffffff"></rect>
        </mask>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const background = document.querySelector(".background-bg");
  const objects = document.querySelectorAll(".background-objects");
  const triangleFloat1 = document.querySelectorAll(".triangle-float1");

  const triangleFloat2 = document.querySelectorAll(".triangle-float2");

  const triangleFloat3 = document.querySelectorAll(".triangle-float3");

  if (!background || !objects) return;

  // background.setAttribute(
  //   "fill",
  //   "hsla(var(--c-primary-100, var(--c-black)), 0.05)"
  // );

  // triangleFloat1.forEach((object) => {
  //   object.setAttribute(
  //     "fill",
  //     "hsla(var(--c-primary-900, var(--c-white)), 0.2)"
  //   );
  // });
  // triangleFloat2.forEach((object) => {
  //   object.setAttribute(
  //     "fill",
  //     "hsla(var(--c-primary-800, var(--c-white)), 0.2)"
  //   );
  // });
  // triangleFloat3.forEach((object) => {
  //   object.setAttribute(
  //     "fill",
  //     "hsla(var(--c-primary-500, var(--c-white)), 0.10)"
  //   );
  // });
});
</script>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
}
@keyframes float1 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-10px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float1 {
  animation: float1 5s infinite;
}

@keyframes float2 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float2 {
  animation: float2 4s infinite;
}

@keyframes float3 {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.triangle-float3 {
  animation: float3 6s infinite;
}
</style>
