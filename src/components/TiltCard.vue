<template>
  <div :class="id ? 'tilt-card ' + id : 'tilt-card'" ref="tiltCard">
    <img class="image-bg" :src="image" />
    <div :class="id ? 'text-content ' + id : 'text-content'" ref="textContent">
      <h3>Tilt Card</h3>
      <p>Description</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import VanillaTilt from "vanilla-tilt";
import { onMounted, ref, watchEffect } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({ id: Number, image: String });
const tiltCard = ref<HTMLElement>();
const textContent = ref();
const image = ref();

const getImageURL = async (imageName: string) => {
  const module = await import(
    /* @vite-ignore */ `./../assets/${imageName}.jpg`
  );
  return module.default.replace(/^\/@fs/, "");
};
watchEffect(async () =>
  props.image
    ? (image.value = await getImageURL(props.image))
    : (image.value = "")
);
onMounted(() => {
  if (!tiltCard.value) return;
  VanillaTilt.init(tiltCard.value, {
    max: 10,
    speed: 1000,
    reverse: true,
    easing: "cubic-bezier(0,.69,1,.69)",
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: textContent.value, start: "top 80%" },
    defaults: { duration: 1, ease: "slow", stagger: 0.5 },
  });
  tl.from(textContent.value.children, {
    opacity: 0,
    y: 50,
    stagger: 0.5,
  });
});
</script>

<style scoped>
.tilt-card {
  display: grid;
  grid-template-columns: 1fr;
  background-color: hsla(var(--c-primary-200, var(--c-green-500)), 0.5);
  width: 100%;
  cursor: pointer;
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(500px);
}

.image-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tilt-card:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: linear-gradient(
    180deg,
    hsla(var(--c-black), 0) -20%,
    hsla(var(--c-black), 1)
  );
}

.text-content {
  z-index: 10;
  transform: translateZ(15px);
}

@media screen and (min-width: 600px) {
  .tilt-card {
    min-height: 400px;
  }
}
@media screen and (min-width: 900px) {
  .text-content {
    margin: 2rem;
    height: 100%;
  }
}
</style>
