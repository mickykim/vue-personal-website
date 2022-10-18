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
      <!-- <p class="description">{{ description }}</p> -->
    </div>
    <div ref="tagListWrapper" class="tag-list__wrapper">
      <TagList :tags="tags" />
    </div>
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
const tagListWrapper = ref();
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
  const touchDevice = ('ontouchstart' in document.documentElement);
    if(!touchDevice){

    VanillaTilt.init(tiltCard.value, {
      max: 10,
      speed: 1000,
      reverse: true,
      easing: "cubic-bezier(0,.69,1,.69)",
  });
  }

  const tl = gsap.timeline({
    scrollTrigger: { trigger: textContent.value, start: "top 80%" },
    defaults: { duration: 1, ease: "slow", stagger: 0.5 },
  });
  tl.from(textContent.value.children, {
    opacity: 0,
    y: 50,
    stagger: 0.5,
  });
  // tl.from(tagListWrapper.value.firstChild.children, {y: 101, stagger: 0.1, ease:'power2.inOut'} )
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
    to bottom,
    hsla(var(--c-black), 0.25) -20%,
    hsla(var(--c-black), 0.9)
  );
}
.text-content {
  pointer-events: none;
  margin: 0.5rem auto;
  z-index: 10;
  justify-self: center;
  transform: translateZ(15px);
}

.tag-list__wrapper {
  position: absolute;
  bottom: 17.5%;
  transform: translateZ(15px);
  overflow: hidden;
}
.tag-list {
  margin: 0.5rem 2rem;
}

.title {
  margin: 1rem 0;
  font-weight: bold;
}

@media screen and (min-width: 600px) {
  .text-content {
    margin: 4rem auto;
    height: 100%;
  }
  .tilt-card {
    min-height: 400px;
  }
}
@media screen and (min-width: 900px) {
}
</style>
