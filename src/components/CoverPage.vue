<template>
  <div class="cover_page hidden" ref="coverPage">
    <div class="overlay" ref="overlay">
      <template v-for="i in 2" :key="i">
        <div class="overlay__row" ref="overlayRows"></div>
      </template>
    </div>
    <section class="cover" ref="cover">
      <div class="cover_img" ref="coverImg">
        <!-- <div
        class="cover_img__inner"
        ref="coverImgInner"
        :style="{
          background: `url(src/assets/${item.image})`,
        }"
      /> -->
        <ImageGallery
          class="cover_img__inner"
          :slides="[
            { imgurl: 'invexcapital.png' },
            { imgurl: 'invexcapital.png' },
          ]"
        />
        <h2 class="cover_title text" ref="coverTitle">
          <span class="text__inner title" ref="coverTitleInner">{{
            item.title
          }}</span>
        </h2>
      </div>

      <div class="overlay__column overlay__column--start">
        <span
          class="overlay__column-title overlay__column-title--main text"
          ref="fullTitle"
        >
          <span class="text__inner title" ref="fullTitleInner">
            {{ item.fullTitle }}
          </span>
        </span>
        <span class="text" ref="subtitle">
          <span class="text__inner" ref="subtitleInner">{{
            item.subtitle
          }}</span>
        </span>
      </div>
      <div class="overlay__column">
        <h3 class="overlay__column-title text" ref="mainColumnTitle">
          <span class="text__inner title" ref="mainColumnInner">{{
            item.mainColumnTitle ? item.mainColumnTitle : "Description"
          }}</span>
        </h3>
        <p ref="mainColumnContent">
          {{ item.mainColumnContent }}
        </p>
      </div>
      <div class="overlay__column">
        <h3 class="overlay__column-title text" ref="sideColumnTitle">
          <span class="text__inner title" ref="sideColumnTitleInner">{{
            item.sideColumnTitle ? item.sideColumnTitle : "Tech stack"
          }}</span>
        </h3>
        <p ref="sideColumnContent">
          {{ item.sideColumnContent }}
        </p>
      </div>
      <button class="button overlay__back" @click="hideCover">
        <svg width="100px" height="18px" viewBox="0 0 50 9">
          <path
            vector-effect="non-scaling-stroke"
            d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
          ></path>
        </svg>
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";
import ImageGallery from "./ImageGallery.vue";

const props = defineProps<{
  item: {
    image: string;
    title: string;
    fullTitle: string;
    subtitle: string;
    mainColumnTitle?: string;
    mainColumnContent: string;
    sideColumnTitle?: string;
    sideColumnContent?: string | string[];
  };
}>();
const cover = ref();
const overlay = ref();
const overlayRows = ref();
const coverPage = ref();
const hideCover = () => {
  coverPage.value.classList.add("hidden");
};
onMounted(() => {
  const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
  tl.addLabel("start", 0)
    .to(overlayRows.value, { scaleY: 1 }, "start")
    .addLabel("content", 0.6);
});
</script>

<style scoped lang="scss">
/* Transition style properties */
.cover_page {
  position: fixed;

  z-index: 10;
}

.overlay {
  --color-overlay: hsl(var(--c-primary-600, var(--c-black)));
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  pointer-events: none;
  grid-template-rows: repeat(2, 1fr);
}

.overlay__row {
  background: var(--color-overlay);
  transform: scaleY(0);
}

.overlay__row:first-child {
  transform-origin: top center;
}

.overlay__row:last-child {
  transform-origin: bottom center;
}

/* Cover page style property */

.text {
  color: hsl(var(--c-primary-900, var(--c-white)));
  line-height: 3rem;
}
p {
  line-height: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
}
.cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: hsl(var(--c-primary-100, var(--c-black)));
  display: grid;
  grid-template-rows: 3fr 1fr;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    "image image image image"
    "title . mainContent sideContent";
}

.cover_img {
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;

  background: linear-gradient(hsla(0deg, 0%, 0%, 0.2), hsla(0deg, 0%, 0%, 0.4));
  .cover_img__inner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    pointer-events: all;
  }
  .text__inner {
    font-size: 8rem;
    font-weight: bold;
  }
}

.overlay__column:nth-child(2) {
  grid-area: title;
}
.overlay__column:nth-child(3) {
  grid-area: mainContent;
}
.overlay__column:nth-child(4) {
  grid-area: sideContent;
}

.overlay__back {
  position: absolute;
  bottom: 10%;
  left: 3rem;
}
.hidden {
  opacity: 0;
  visibility: hidden;
}
@media screen and (min-width: 900px) {
  .cover {
    padding: 8rem 2rem 3rem;
  }
}
</style>
