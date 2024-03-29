<template>
  <div class="cover_page" ref="coverPage">
    <div class="overlay" ref="overlay">
      <template v-for="i in 2" :key="i">
        <div class="overlay__row" ref="overlayRows"></div>
      </template>
    </div>
    <section class="cover" ref="cover">
      <div class="cover_img" ref="coverImg">
        <div class="cover_img__inner" ref="coverImgInner"></div>
        <!-- <ImageGallery
          class="cover_img__inner"
          ref="coverImgInner"
          :slides="[
            { imgurl: 'invexcapital.png' },
            { imgurl: 'invexcapital.png' },
          ]"
        /> -->
      </div>
      <div class="cover_title text" ref="coverTitle">
        <h2
          class="text__inner title"
          :ref="
            (el) => {
              coverTitleInner = el;
            }
          "
          :style="{ fontSize: `${clampBuilder(400, 900, 4, 9)}` }"
        >
          {{ item.title }}
        </h2>
      </div>

      <div class="overlay__column overlay__column--start">
        <div
          class="overlay__column-title overlay__column-title--main text"
          ref="fullTitle"
        >
          <h3 class="text__inner title" ref="fullTitleInner">
            {{ item.fullTitle }}
          </h3>
        </div>
        <div class="text" ref="subtitle">
          <h4 class="text__inner" ref="subtitleInner">{{ item.subtitle }}</h4>
        </div>
      </div>
      <div class="overlay__column">
        <div class="overlay__column-title text" ref="mainColumnTitle">
          <h3 class="text__inner title" ref="mainColumnTitleInner">
            {{ item.mainColumnTitle ? item.mainColumnTitle : "Description" }}
          </h3>
        </div>
        <p ref="mainColumnContent">
          {{ item.mainColumnContent }}
        </p>
      </div>
      <div class="overlay__column">
        <div class="overlay__column-title text" ref="sideColumnTitle">
          <h3 class="text__inner title" ref="sideColumnTitleInner">
            {{ item.sideColumnTitle ? item.sideColumnTitle : "Tech stack" }}
          </h3>
        </div>
        <div class="text side-column-content" ref="sideColumnContent">
          <TagList
            :tags="(item.sideColumnContent as string[])"
            :animation-delay="0.5"
            :animation-reverse="animationReverse"
          />
        </div>
      </div>

      <div class="overlay__column" v-if="item.githubLink || item.websiteLink">
        <div class="text" v-if="item.githubLink">
          <div ref="githubLink">
            <StyledButton
              @click="openLink(item.githubLink as string)"
              color="blue"
            >
              <template #text> Github </template>
              <template #icon> <ArrowForwardIos class="icon" /> </template>
            </StyledButton>
          </div>
        </div>
        <div class="text" v-if="item.websiteLink">
          <div ref="websiteLink">
            <StyledButton
              @click="openLink(item.websiteLink as string)"
              color="blue"
            >
              <template #text> Visit </template>
              <template #icon> <ArrowForwardIos class="icon" /> </template>
            </StyledButton>
          </div>
        </div>
      </div>
      <!-- <div class="text overlay__back">
        <button class="unbutton" @click="hideCover" ref="closeButton">
          <svg width="100px" height="18px" viewBox="0 0 50 9">
            <path
              vector-effect="non-scaling-stroke"
              d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
            ></path>
          </svg>
        </button>
      </div> -->
      <div class="text overlay__back">
        <div ref="closeButton">
          <StyledButton @click="hideCover" color="blue">
            <template #text> Back </template>
            <template #icon> <ArrowBackIosNew class="icon" /> </template>
          </StyledButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, reactive, ref } from "vue";
import ImageGallery from "./ImageGallery.vue";
import TagList from "./TagList.vue";
import SplitType from "split-type";
import StyledButton from "./StyledButton.vue";
import ArrowBackIosNew from "~icons/material-symbols/arrow-back-ios-new";
import ArrowForwardIos from "~icons/material-symbols/arrow-forward-ios";
import { wrapLines, clampBuilder } from "../utils/utils.js";
const props = defineProps<{
  item: {
    image?: string;
    title: string;
    fullTitle?: string;
    subtitle?: string;
    mainColumnTitle?: string;
    mainColumnContent?: string;
    sideColumnTitle?: string;
    sideColumnContent?: string | string[];
    githubLink?: string;
    websiteLink?: string;
  };
}>();

const emit = defineEmits(["closeCover"]);
const overlay = ref();
const overlayRows = ref();
const coverPage = ref();
const cover = ref<HTMLElement>();
const coverImg = ref();
const coverImgInner = ref();
const coverTitle = ref();
const fullTitleInner = ref();
const subtitleInner = ref();
const mainColumnTitleInner = ref();
const mainColumnContent = ref();
const sideColumnTitleInner = ref();
const sideColumnContent = ref();
const coverTitleInner = ref();
const closeButton = ref();
const githubLink = ref();
const websiteLink = ref();
let animationReverse = ref(false);
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power3.inOut" },
});

const openLink = (url: string) => {
  window.open(url);
};
const hideCover = () => {
  tl.reverse().then(() => {
    emit("closeCover");
  });
  animationReverse.value = true;
};
/**
 * Wraps the elements of an array.
 * @param {Array} elements - the array of elements to be wrapped
 * @param {String} wrapType - the type of the wrap element ('div', 'span' etc)
 * @param {String} wrapClass - the wrap class(es)
 */

onMounted(() => {
  coverImgInner.value.style.background = `linear-gradient(hsla(0deg, 0%, 0%, 0.3), hsla(0deg, 0%, 0%, 0.6)), url(/assets/${props.item.image}) center`;
  coverImgInner.value.style.backgroundRepeat = "no-repeat";
  const largeViewport = window.matchMedia("(min-width:1200px)");
  if (!cover.value) return;
  if (!props.item.githubLink || !props.item.websiteLink) {
    if (largeViewport.matches) {
      cover.value.style.gridTemplateAreas = `
      'image image image image image image'
      'title . . mainContent sideContent links'
      `;
    }
  }
  const mainContentText = new SplitType(mainColumnContent.value, {
    types: "lines",
  });
  wrapLines(mainContentText.lines, "div");

  tl.addLabel("start", 0)
    // Remove scrollbar to prevent navigation confusion
    .fromTo("body", { overflow: "auto" }, { overflow: "hidden" }, "start")
    .from(coverPage.value, { visibility: "hidden", duration: 0.1 }, "start")
    .from(overlayRows.value, { scaleY: 0, duration: 0.8 }, "start")

    .addLabel("content", 0.4)
    .from(cover.value, { opacity: 0, duration: 1.5 }, "content")
    .from(coverImg.value, { y: "-101%" }, "content")
    .from(coverImgInner.value, { y: "101%" }, "content")

    .addLabel("title", 0.8)
    .from(coverTitle.value, { y: "-101%" }, "title")
    .from(coverTitleInner.value, { y: "101%" }, "title")
    .from(mainColumnTitleInner.value, { y: "101%", opacity: 0 }, "title")
    .from(sideColumnTitleInner.value, { y: "101%", opacity: 0 }, "title")
    .from(fullTitleInner.value.parentNode, { x: "-101%" }, "title")
    .from(fullTitleInner.value, { x: "101%" }, "title")
    .from(subtitleInner.value.parentNode, { x: "-101%" }, "title+=0.2")
    .from(subtitleInner.value, { x: "101%" }, "title+=0.2")

    .addLabel("text", 0.8)
    .from(mainContentText.lines, { y: "101%", stagger: 0.08 }, "text")
    // .from(
    //   sideColumnContent.value.firstChild.children,
    //   { y: "101%", opacity: 0, stagger: 0.2 },
    //   "text"
    // )
    .addLabel("button", 0.8)
    .from(closeButton.value, { x: "101%" }, "button")
    .from(closeButton.value.parentNode, { x: "-101%" }, "button");
  if (githubLink.value) {
    tl.from(githubLink.value, { x: "101%" }, "button").from(
      githubLink.value.parentNode,
      { x: "-101%" },
      "button"
    );
  }
  if (websiteLink.value) {
    tl.from(websiteLink.value, { x: "101%" }, "button+=0.1").from(
      websiteLink.value.parentNode,
      { x: "-101%" },
      "button+=0.1"
    );
  }
});
</script>

<style scoped lang="scss">
/* Transition style properties */
.cover_page {
  --color-overlay: hsl(var(--c-primary-100, var(--c-blue-100)));
  --color-text: hsl(var(--c-primary-900, var(--c-blue-900)));
  --color-hover: hsl(var(--c-primary-700, var(--c-blue-700)));
  position: fixed;
  z-index: 100;
}

.overlay {
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
}

.overlay__row:first-child {
  transform-origin: top center;
}

.overlay__row:last-child {
  transform-origin: bottom center;
}

/* Cover page style property */

// text class often used to hide overflow for reveal animations.
.text {
  color: var(--color-text);
  overflow: hidden;
}
p {
  line-height: 1.5rem;
}

.title {
  font-weight: 700;
  font-size: 1.125rem;
}
.cover {
  --x-padding: 2rem;
  --top-padding: 0rem;
  --bottom-padding: 0rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  padding-top: var(--top-padding);
  padding-bottom: var(--bottom-padding);
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr;
  justify-content: stretch;
  grid-template-areas: "coverTitle" "image" "image" "mainContent" "sideContent" "links";
  gap: 1rem;
}

.cover_img {
  display: flex;
  grid-area: image;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;
  overflow: hidden;
  min-height: 250px;
  z-index: -1;

  .cover_img__inner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    pointer-events: all;
    background-repeat: no-repeat;
  }
}
.cover_title {
  grid-area: coverTitle;
  overflow: hidden;
  height: min-content;
  margin-top: 1.5rem;
  z-index: 999;

  .text__inner {
    height: 100%;
    font-weight: bold;
    text-align: center;
    line-height: 7rem;
    padding-bottom: 1.5rem;
    z-index: 999;
    -webkit-transform: translateZ(1px);
  }
}
.overlay__column {
  width: 100%;
}
.overlay__column:nth-child(3) {
  display: none;
  grid-area: title;
  padding-left: var(--x-padding);
  padding-right: var(--x-padding);
}
.overlay__column:nth-child(4) {
  grid-area: mainContent;
  padding-left: var(--x-padding);
  padding-right: var(--x-padding);
}
.overlay__column:nth-child(4) > p {
  /* margin: 0 auto; */
}
.overlay__column:nth-child(5) {
  grid-area: sideContent;
  padding-left: var(--x-padding);
  padding-right: var(--x-padding);
  margin-bottom: 5rem;
}

.overlay__column:nth-child(6) {
  grid-area: links;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 25%;
  padding-left: var(--x-padding);
  padding-right: var(--x-padding);
}
.overlay__column-title {
  margin-bottom: 0rem;
}
.overlay__column-title--main {
  margin-bottom: 0rem;
  display: none;
}
.overlay__back {
  position: absolute;
  display: block;
  bottom: 1.25rem;
  left: var(--x-padding);
  stroke: var(--color-overlay);
  stroke-width: 2px;
  cursor: pointer;
}
/* .overlay__back:hover {
  stroke: var(--color-hover);
} */
.hidden {
  opacity: 0;
  visibility: hidden;
}
.unbutton {
  background: transparent;
  border: 0;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.icon {
  font-size: 1.5rem;
  color: var(--color-overlay);
  border-color: var(--color-overlay);
  fill: aqua;
}
@media screen and (min-width: 600px) {
  .cover {
    --x-padding: 2rem;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "coverTitle coverTitle" "image image" "image image" "mainContent mainContent" "sideContent sideContent" ". links";
  }
  .overlay__column:nth-child(3) > div:nth-child(2) {
    margin: 0 auto;
  }

  .overlay__column:nth-child(6) {
    margin-bottom: 1.25rem;
    padding-left: var(--x-padding);
    padding-right: var(--x-padding);
    align-items: flex-end;
  }
}

@media screen and (min-width: 1200px) {
  .cover {
    --x-padding: 2rem;
    --top-padding: 8rem;
    --bottom-padding: 3rem;
    gap: 0;
    row-gap: 1rem;
    grid-template-rows: 4fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      "image image image image image"
      "title . mainContent sideContent links";
  }

  .cover_title {
    grid-area: initial;
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    white-space: nowrap;

    .text__inner {
      line-height: normal;
    }
  }
  .overlay__column {
    width: 30ch;
  }
  .overlay__column:nth-child(3) {
    display: block;
  }

  .overlay__column:nth-child(6) {
    align-items: flex-start;
  }

  .overlay__column-title--main {
    display: block;
  }
  .overlay__back {
    position: absolute;
    bottom: 5%;
    left: var(--x-padding);
    stroke: var(--color-overlay);
    stroke-width: 2px;
    cursor: pointer;
  }
}
</style>
