<template>
  <swiper :pagination="true" :navigation="true" :modules="modules">
    <!-- Create every swiper slide with a for loop of data from a prop -->
    <swiper-slide v-for="slide in props.slides" :key="slide.id">
      <div class="top">
        <img :src="imagePath(slide.imgurl)" />
      </div>
      <div v-if="slide.title || slide.description" class="bottom">
        <h3>{{ slide.title }}</h3>
        <p>{{ slide.description }}</p>
      </div>
    </swiper-slide>

    ...
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Pagination, Navigation];
const props = defineProps(["slides"]);
const imagePath = (imgurl: string) => {
  return new URL(`../assets/${imgurl}`, import.meta.url).href;
};
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 100%;
  --swiper-theme-color: hsl(var(--c-primary-500));
  --swiper-navigation-color: hsl(var(--c-primary-500));
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.swiper-slide {
  .top {
    max-height: 600px;

    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }

  .bottom {
    background-color: hsl(var(--color-background));
    width: 100%;
  }
}
</style>
