<template>
  <header><HeaderContainer /></header>

  <main ref="main">
    <NavBar :colorTheme="colorTheme" @change-color-theme="changeColorTheme" />
    <IndexTemplate />
  </main>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import HeaderContainer from "./components/HeaderContainer.vue";
import IndexTemplate from "./components/templates/indexTemplate.vue";
import { reactive, ref, watch } from "vue";
const main = ref();
const root = document.querySelector<HTMLElement>(":root");

const colorTheme = reactive({
  background: "",
  text: "",
  root: "",
  button: "",
});

watch(colorTheme, () => {
  if (!root) return;
  root.style.setProperty("--color-text", `var(${colorTheme.text})`);
  root.style.setProperty("--color-background", `var(${colorTheme.background})`);
  root.style.setProperty("--color-root", `var(${colorTheme.root})`);
  root.style.setProperty("--color-button", `var(${colorTheme.button})`);
});

function changeColorTheme(color: string) {
  colorTheme.background = `--c-${color}-700`;

  colorTheme.text = `--c-${color}-100`;
  colorTheme.root = `--c-${color}-900`;
  colorTheme.button = `--c-${color}-500`;
}
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
