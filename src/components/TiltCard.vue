<template>
  <div
    :class="id ? 'tilt-card ' + id : 'tilt-card'"
    ref="tiltCard"
    @click="isCoverOpen = true"
  >
    <div
      class="image-bg"
      :style="{
        backgroundImage: `url(src/assets/${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    />
    <div :class="id ? 'text-content ' + id : 'text-content'" ref="textContent">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
    </div>
    <TagList :tags="tags" class="tag-list" />
  </div>
  <CoverPage :item="coverData" v-if="isCoverOpen" @close-cover="closeCover" />
</template>

<script setup lang="ts">
import VanillaTilt from "vanilla-tilt";
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TagList from "./TagList.vue";
import CoverPage from "./CoverPage.vue";

const props = defineProps({
  id: Number,
  image: String,
  title: String,
  description:String,
  tags:Array<string>,
  githubLink: String,
  websiteLink: String,
});
const tiltCard = ref<HTMLElement>();
const textContent = ref<HTMLElement>();
const isCoverOpen = ref(false);
gsap.registerPlugin(ScrollTrigger);


const coverData =
{
    image: props.image,
    title: props.title as string,
    fullTitle: "Invex Capital",
    subtitle: "Invex Capital",
    mainColumnContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempus nunc vitae magna tristique, a maximus felis mattis. Pellentesque sollicitudin eros sit amet lectus molestie, lobortis commodo justo egestas. Sed. ",
    sideColumnContent: props.tags,
    githubLink: props.githubLink,
    websiteLink: props.websiteLink,

};


//Emit handlers
const closeCover = () => {
  isCoverOpen.value = false;
}


onMounted(() => {
  if (!tiltCard.value || !textContent.value) return;
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
  margin: 0.5rem 2rem;
  z-index: 10;
  transform: translateZ(15px);
}
.tag-list {
  position: absolute;
  bottom: 22.5%;
  margin: 0.5rem 2rem;
  transform: translateZ(15px);
}

.title {
  margin: 1rem 0;
  font-weight: bold;
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
