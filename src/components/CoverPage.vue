<template>
  <div class="cover_page" ref="coverPage">
    <div class="overlay" ref="overlay">
      <template v-for="i in 2" :key="i">
        <div class="overlay__row" ref="overlayRows"></div>
      </template>
    </div>
    <section class="cover" ref="cover">
      <div class="cover_img" ref="coverImg">
        <div
          class="cover_img__inner"
          ref="coverImgInner"
          :style="{
            background: `linear-gradient(hsla(0deg, 0%, 0%, 0.2), hsla(0deg, 0%, 0%, 0.4)), url(src/assets/${item.image})`,
          }"
        />
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
        <h2 class="text__inner title" ref="coverTitleInner">
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
        <div class="text" ref="sideColumnContent">
          <TagList :tags="(item.sideColumnContent as string[])" />
        </div>
      </div>
      <button class="button overlay__back" @click="hideCover" ref="closeButton">
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
import TagList from "./TagList.vue";
import SplitType from "split-type";
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

const emit = defineEmits(["closeCover"]);
const overlay = ref();
const overlayRows = ref();
const coverPage = ref();
const cover = ref();
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

const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power3.inOut" },
});

const hideCover = () => {
  tl.reverse().then(() => {
    emit("closeCover");
  });
};
/**
 * Wraps the elements of an array.
 * @param {Array} elements - the array of elements to be wrapped
 * @param {String} wrapType - the type of the wrap element ('div', 'span' etc)
 * @param {String} wrapClass - the wrap class(es)
 */
const wrapLines = (elements: Array<HTMLElement> | null, wrapType: string) => {
  if (!elements || elements.length === 0) return;
  elements.forEach((el) => {
    const wrapEl = document.createElement(wrapType);
    wrapEl.style.overflow = "hidden";
    el.parentNode?.appendChild(wrapEl);
    wrapEl.appendChild(el);
  });
};

onMounted(() => {
  const mainContentText = new SplitType(mainColumnContent.value, {
    types: "lines",
  });
  wrapLines(mainContentText.lines, "div");

  tl.addLabel("start", 0)
    .fromTo("body", { overflow: "auto" }, { overflow: "hidden" }, "start")
    .from(coverPage.value, { visibility: "hidden", duration: 0.1 }, "start")
    .to(overlayRows.value, { scaleY: 1 }, "start")

    .addLabel("content", 0.6)
    .from(cover.value, { opacity: 0 }, "content")
    .from(coverImg.value, { y: "-101%" }, "content")
    .from(coverImgInner.value, { y: "101%" }, "content")
    .from(coverTitleInner.value, { y: "101%" }, "content")
    .from(closeButton.value, { x: "-101%" }, "content")

    .addLabel("title", 0.8)
    .from(mainColumnTitleInner.value, { y: "101%", opacity: 0 }, "title")
    .from(sideColumnTitleInner.value, { y: "101%", opacity: 0 }, "title")
    .from(fullTitleInner.value.parentNode, { x: "-101%" }, "title")
    .from(fullTitleInner.value, { x: "101%" }, "title")
    .from(subtitleInner.value.parentNode, { x: "-101%" }, "title+=0.2")
    .from(subtitleInner.value, { x: "101%" }, "title+=0.2")

    .addLabel("text", 1)
    .from(mainContentText.lines, { y: "101%", stagger: 0.1 }, "text")
    .from(
      sideColumnContent.value.firstChild.children,
      { y: "101%", stagger: 0.2 },
      "text"
    );
});
</script>

<style scoped lang="scss">
/* Transition style properties */
.cover_page {
  position: fixed;

  z-index: 10;
}

.overlay {
  --color-overlay: hsl(var(--c-primary-100, var(--c-black)));
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
  --x-padding: 0rem;
  --top-padding: 0rem;
  --bottom-padding: 0rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  padding-top: var(--top-padding);
  padding-left: var(--x-padding);
  padding-right: var(--x-padding);
  padding-bottom: var(--bottom-padding);

  grid-template-rows: 4fr 1fr;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas:
    "image image image image image"
    "title . . mainContent sideContent";
}

.cover_img {
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  pointer-events: none;
  overflow: hidden;
  .cover_img__inner {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;
    pointer-events: all;
  }
}
.cover_title {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  .text__inner {
    font-size: 8rem;
    font-weight: bold;
  }
}
.overlay__column:nth-child(3) {
  grid-area: title;
}
.overlay__column:nth-child(4) {
  grid-area: mainContent;
}
.overlay__column:nth-child(5) {
  grid-area: sideContent;
}

.overlay__back {
  position: absolute;
  bottom: 10%;
  left: var(--x-padding);
}
.hidden {
  opacity: 0;
  visibility: hidden;
}
@media screen and (min-width: 900px) {
  .cover {
    --x-padding: 2rem;
    --top-padding: 8rem;
    --bottom-padding: 3rem;

    row-gap: 1rem;
  }
  .overlay__column {
    width: 30ch;
  }
}
</style>
