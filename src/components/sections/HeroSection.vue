<template>
  <section>
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
  padding: 0 2rem;
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
}
h2 {
  display: inline-block;
  line-height: normal;
}
</style>
