<template>
  <header><HeaderContainer /></header>

  <main ref="main">
    <NavBar @change-color-theme="changeColorTheme" id="navbar" />
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
  // root.style.setProperty("--color-background", `var(${colorTheme.background})`);

  root.style.setProperty("--c-primary-100", `var(--c-${colorTheme.color}-100)`);
  root.style.setProperty("--c-primary-200", `var(--c-${colorTheme.color}-200)`);
  root.style.setProperty("--c-primary-300", `var(--c-${colorTheme.color}-300)`);
  root.style.setProperty("--c-primary-400", `var(--c-${colorTheme.color}-400)`);
  root.style.setProperty("--c-primary-500", `var(--c-${colorTheme.color}-500)`);
  root.style.setProperty("--c-primary-600", `var(--c-${colorTheme.color}-600)`);
  root.style.setProperty("--c-primary-700", `var(--c-${colorTheme.color}-700)`);
  root.style.setProperty("--c-primary-800", `var(--c-${colorTheme.color}-800)`);
  root.style.setProperty("--c-primary-900", `var(--c-${colorTheme.color}-900)`);

  // root.style.setProperty(
  //   "--shadow-s",
  //   `0 10px 20px hsla(var(--c-primary-100), 0.25), 0 3px 6px hsla(var(--c-primary-100), 0.2)`
  // );
});

//-------------- Emit handlers ------------------
function changeColorTheme(color: string) {
  colorTheme.background = `--c-${color}-700`;

  colorTheme.root = `--c-${color}-900`;
  colorTheme.button = `--c-${color}-500`;

  colorTheme.color = color;
}
</script>

<style lang="scss">
@import "./assets/base.scss";

#navbar {
  display: none;
}
#app {
  max-width: 1366px;
  width: 100%;
  padding: 2rem;
  margin: 0 auto;
  position: static !important;
}

main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media screen and (min-width: 1200px) {
  #navbar {
    display: block;
  }

  main {
    grid-template-columns: 1fr 4fr;
  }
}
</style>
