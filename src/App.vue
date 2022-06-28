<template>
  <header><HeaderContainer /></header>

  <main>
    <NavBar />
    <IndexTemplate />
  </main>
</template>

<style lang="scss">
@import "./assets/base.scss";

#app {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: static !important;
}

main {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;
}
@media (min-width: 1024px) {
  /* body {
    display: flex;
    place-items: center;
  } */
}
</style>
<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import HeaderContainer from "./components/HeaderContainer.vue";
import IndexTemplate from "./components/templates/indexTemplate.vue";
</script>
