<template>
  <section id="hero">
    <template v-for="header in headers">
      <template v-for="(char, index) in header.split('')" :key="index">
        <h2
          v-if="index === header.length - 1"
          class="staggered-reveal"
          style="margin-right: 1rem"
          :ref="(el) => headerElements.push(el as HTMLHeadingElement)"
        >
          {{ char }}
        </h2>
        <h2
          v-else
          class="staggered-reveal"
          :ref="(el) => headerElements.push(el as HTMLHeadingElement)"
        >
          {{ char }}
        </h2>
      </template>
    </template>
    <p class="sliding-fade-in">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod officiis
      expedita iure. Praesentium, blanditiis molestiae. Suscipit nobis a,
      placeat adipisci vel quod deleniti dignissimos, cupiditate fugiat error
      aspernatur itaque nostrum!
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const headingString = "Miqueas Kim Han";
const headers = headingString.split(" ");
const processedHeaders = [];
headers.forEach((header) => {
  processedHeaders.push(header.split(""));
});
console.log(headers);
const headerElements = ref<HTMLHeadingElement[]>([]);

onMounted(() => {
  headerElements.value.forEach((element) => {
    element.style.setProperty(
      "--anim-order",
      (Math.random() * 0.5 + Math.random() * 0.2).toFixed(1).toString()
    );
  });
});
</script>

<style scoped>
section {
  /* transition: background 0.5s;
  background-color: hsl(var(--c-primary-900)); */
  margin: 0 0 10rem 0;
  padding-left: 3rem;
  position: relative;
}

section::after {
  position: absolute;
  content: "";
  top: 8.75%;
  left: 0;
  width: 100%;
  height: 85%;
  border-left: 2px solid hsl(var(--c-primary-500, var(--c-white)));
}

@keyframes staggeredReveal {
  0% {
    opacity: 0%;
  }
  90% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.staggered-reveal {
  --anim-time: 0.25s;

  --anim-delay: calc(var(--anim-order) * 1s);
  --anim-total-duration: calc(var(--anim-time) + var(--anim-delay));
  animation-name: staggeredReveal;
  animation-duration: var(--anim-time);
  animation-delay: var(--anim-delay);
  animation-fill-mode: both;
}

@keyframes slidingFadeIn {
  0% {
    transform: translateY(10%);
    opacity: 0%;
  }

  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

.sliding-fade-in {
  animation-name: slidingFadeIn;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-fill-mode: both;
  margin-top: 2rem;
}
h2 {
  display: inline-block;
  line-height: normal;
}

@media screen and (min-width: 600px) {
  section::after {
    border-left: 4px solid hsl(var(--c-primary-500, var(--c-white)));
  }
}
</style>
