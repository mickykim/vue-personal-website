<template>
  <section id="hero" data-section-id="0">
    <FadeInComponent direction="up">
      <h2 class="title">Miqueas Kim Han</h2>
    </FadeInComponent>
    <FadeInComponent direction="up" :delay="1">
      <p class="description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod officiis
        expedita iure. Praesentium, blanditiis molestiae. Suscipit nobis a,
        placeat adipisci vel quod deleniti dignissimos, cupiditate fugiat error
        aspernatur itaque nostrum!
      </p>
    </FadeInComponent>
  </section>
</template>

<script setup lang="ts">
import FadeInComponent from "../FadeInComponent.vue";
</script>

<style scoped>
#hero {
  margin: 0 0 20rem 0;
}

h2 {
  display: inline-block;
  line-height: normal;
}

@media screen and (min-width: 600px) {
}
</style>
