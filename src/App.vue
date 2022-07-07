<template>
  <header><HeaderContainer /></header>

  <main ref="main">
    <NavBar @change-color-theme="changeColorTheme" />
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
  color: "",
});

watch(colorTheme, () => {
  if (!root) return;
  root.style.setProperty("--color-text", `var(${colorTheme.text})`);
  root.style.setProperty("--color-background", `var(${colorTheme.background})`);
  root.style.setProperty("--color-root", `var(${colorTheme.root})`);
  root.style.setProperty("--color-button", `var(${colorTheme.button})`);

  root.style.setProperty("--c-primary-100", `--c-${colorTheme.color}-100`);
  root.style.setProperty("--c-primary-200", `--c-${colorTheme.color}-200`);
  root.style.setProperty("--c-primary-300", `--c-${colorTheme.color}-300`);
  root.style.setProperty("--c-primary-400", `--c-${colorTheme.color}-400`);
  root.style.setProperty("--c-primary-500", `--c-${colorTheme.color}-500`);
  root.style.setProperty("--c-primary-600", `--c-${colorTheme.color}-600`);
  root.style.setProperty("--c-primary-700", `--c-${colorTheme.color}-700`);
  root.style.setProperty("--c-primary-800", `--c-${colorTheme.color}-800`);
  root.style.setProperty("--c-primary-900", `--c-${colorTheme.color}-900`);
});

function changeColorTheme(color: string) {
  colorTheme.background = `--c-${color}-700`;

  colorTheme.text = `--c-${color}-100`;
  colorTheme.root = `--c-${color}-900`;
  colorTheme.button = `--c-${color}-500`;

  colorTheme.color = color;
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
