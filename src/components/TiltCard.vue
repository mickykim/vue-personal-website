<template>
  <div
    :class="id ? 'tilt-card ' + id : 'tilt-card'"
    ref="tiltCard"
    @click="openCoverPage"
  >
    <div
      class="image-bg"
      :style="{
        backgroundImage: `url(src/assets/${props.image})`,
        backgroundSize: 'cover',
      }"
    />
    <div :class="id ? 'text-content ' + id : 'text-content'" ref="textContent">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <TagList :tags="tags" class="tag-list" />
    </div>
  </div>
  <CoverPage :item="data.coverData" />
</template>

<script setup lang="ts">
import VanillaTilt from "vanilla-tilt";
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TagList from "./TagList.vue";
import CoverPage from "./CoverPage.vue";
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({ id: Number, image: String, title: String, description:String, tags:Array<string> });
const tiltCard = ref<HTMLElement>();
const textContent = ref();
const openCoverPage = () => {
  tiltCard.value?.nextElementSibling?.classList.remove('hidden');
  }

const data =
  {

  coverData: {
    image: "invexcapital.png",
    title: "Invex Capital",
    fullTitle: "Invex Capital",
    subtitle: "",
    mainColumnContent: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    sideColumnContent: ["Vue", "TypeScript", "GSAP"],
  }
};

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
  display: flex;
  grid-template-columns: 1fr;
  background-color: hsla(var(--c-primary-200, var(--c-green-500)), 0.5);
  width: 100%;
  cursor: pointer;
  position: relative;
  min-height: 300px;
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
    hsla(var(--c-black), 0.25) -20%,
    hsla(var(--c-black), 0.6)
  );
}
.text-content {
  pointer-events: none;
}
.tag-list {
  position: absolute;
  bottom: 22.5%;
}
.text-content {
  z-index: 10;
  transform: translateZ(15px);
  margin: 0.5rem 2rem;
}

.title {
  margin: 1rem 0;
}

@media screen and (min-width: 600px) {
  .tilt-card {
    min-height: 400px;
  }
}
@media screen and (min-width: 900px) {
  .text-content {
    margin: 1rem 2rem;
    height: 100%;
  }
}
</style>
