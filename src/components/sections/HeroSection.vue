<template>
  <section id="hero" data-section-id="0">
    <FadeInComponent direction="up">
      <h2 class="title">Miqueas Kim Han</h2>
    </FadeInComponent>
    <p class="description" ref="description">
      Hey there! I'm Micky, a fullstack developer (MongoDB, Express, React,
      Node) with a focus on frontend development using Vue/React. Previously, I
      worked on graphics related projects such as creating a raytracer for
      multiple surface types and automatic object recognition both in C++. On my
      time outside of programming I enjoy playing videogames
      <a
        href="https://liquipedia.net/heroes/Wrath"
        target="_blank"
        rel="noreferrer noopener"
        ><em>(I was relatively good!)</em></a
      >, watching baseball (let's go Blue Jays!), and learning to play the
      piano.
    </p>
  </section>
</template>

<script setup lang="ts">
import { wrapLines } from "@/utils/utils";
import gsap from "gsap";
import SplitType from "split-type";
import { onMounted, ref } from "vue";
import FadeInComponent from "../FadeInComponent.vue";

const description = ref();
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power3.inOut" },
});
onMounted(() => {
  const mainContentText = new SplitType(description.value, {
    types: "lines",
    tagName: "p",
  });
  tl.from(mainContentText.lines, { y: "101%", stagger: 0.1 }, "0.5");

  wrapLines(mainContentText.lines, "div");
});
</script>

<style scoped lang="scss">
#hero {
  width: 100%;
}

h2 {
  display: inline-block;
  line-height: normal;
  font-weight: bold;
}

.title {
  margin: 1rem 0rem;
}
a {
  color: hsl(var(--c-primary-600, var(--c-black)));
  text-decoration: none;
}
a:visited {
}
a:hover {
  color: hsl(var(--c-primary-500));
}
a:active {
}
.description {
  margin-bottom: 6rem;
}

@media screen and (min-width: 900px) {
  #hero {
    margin: 0rem auto;
    margin-bottom: 6rem;
    width: 70ch;
  }
}
</style>
