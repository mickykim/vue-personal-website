<template>
  <header><HeaderContainer /></header>

  <main>
    <NavBar :colors="colors" />
    <IndexTemplate />
  </main>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import HeaderContainer from "./components/HeaderContainer.vue";
import IndexTemplate from "./components/templates/indexTemplate.vue";
import { reactive } from "vue";

const colors = reactive({ backgroundColor: "--c-green-700" });
</script>

<style lang="scss">
@import "./assets/base.scss";

#app {
  max-width: 1366px;
  margin: 0 auto;
  padding: 2rem;
  position: static !important;
}

main {
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;
}
</style>
