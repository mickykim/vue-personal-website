<template>
  <div class="overlay">
    <template v-for="i in 2" :key="i">
      <div class="overlay__row" ref="overlayRows"></div>
    </template>
  </div>
  <section class="covers">
    <div class="cover">
      <div class="cover_img" ref="coverImg">
        <div
          class="cover_img__inner"
          ref="coverImgInner"
          :style="{ backgroundImage: 'url(' + props.item.image + ')' }"
        />
      </div>
      <h2 class="cover_title text" ref="coverTitle">
        <span class="text__inner" ref="coverTitleInner">{{ item.title }}</span>
      </h2>
      <div class="overlay__column overlay__column--start">
        <span
          class="overlay__column-title overlay__column-title--main text"
          ref="fullTitle"
        >
          <span class="text__inner" ref="fullTitleInner">
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
          <span class="text__inner" ref="mainColumnInner">{{
            item.mainColumnTitle ? item.mainColumnTitle : "Description"
          }}</span>
        </h3>
        <p ref="mainColumnContent">
          {{ item.mainColumnContent }}
        </p>
      </div>
      <div class="overlay__column">
        <h3 class="overlay__column-title text" ref="sideColumnTitle">
          <span class="text__inner" ref="sideColumnTitleInner">{{
            item.sideColumnTitle ? item.sideColumnTitle : "Tools"
          }}</span>
        </h3>
        <p ref="sideColumnContent">
          {{ item.sideColumnContent }}
        </p>
      </div>
      <button class="button overlay__back">
        <svg width="100px" height="18px" viewBox="0 0 50 9">
          <path
            vector-effect="non-scaling-stroke"
            d="m0 4.5 5-3m-5 3 5 3m45-3h-77"
          ></path>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";

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

const overlayRows = ref();

const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
tl
  .addLabel("start", 0)
  .to(overlayRows.value, { scaleY: 1 }, "start")
  .addLabel("content", 0.6).add;

onMounted(() => {});
</script>

<style scoped>
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
.covers {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
