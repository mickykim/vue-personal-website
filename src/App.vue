<template>
  <header><HeaderContainer /></header>

  <main ref="main">
    <NavBar
      @change-color-theme="changeColorTheme"
      id="navbar"
      :current-section-id="currentSection"
    />
    <MobileNavbar id="mobile-nav" />
    <div class="index-template">
      <HeroSection />
      <ResumeSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderContainer from "./components/HeaderContainer.vue";
import HeroSection from "./components/sections/HeroSection.vue";
import ResumeSection from "./components/sections/ResumeSection.vue";
import { onMounted, reactive, ref, watch, defineAsyncComponent } from "vue";

const NavBar = defineAsyncComponent(() => import("./components/NavBar.vue"));
const MobileNavbar = defineAsyncComponent(
  () => import("./components/MobileNavbar.vue")
);
const ProjectsSection = defineAsyncComponent(
  () => import("./components/sections/ProjectsSection.vue")
);
const ContactSection = defineAsyncComponent(
  () => import("./components/sections/ContactSection.vue")
);
const main = ref();
const root = document.querySelector<HTMLElement>(":root");
const currentSection = ref();

//-------------- Emit handlers ------------------
function changeColorTheme(color: string) {
  colorTheme.background = `--c-${color}-700`;

  colorTheme.root = `--c-${color}-900`;
  colorTheme.button = `--c-${color}-500`;

  colorTheme.color = color;
}

const colorTheme = reactive({
  background: "",
  text: "",
  root: "",
  button: "",
  color: "",
});
const addIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          currentSection.value = Number(
            entry.target.getAttribute("data-section-id")
          );
        }
      });
    },
    { threshold: 0.1, rootMargin: "-40% 0px -40% 0px" }
  );

  document.querySelectorAll(".index-template > *").forEach((section) => {
    observer.observe(section);
  });
  document.removeEventListener("scroll", addIntersectionObserver);
};
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
  //   "--color-background",
  //   `var(--c-${colorTheme.color}-gray, var(--c-gray))`
  // );

  // root.style.setProperty(
  //   "--shadow-s",
  //   `0 10px 20px hsla(var(--c-primary-100), 0.25), 0 3px 6px hsla(var(--c-primary-100), 0.2)`
  // );
});
onMounted(() => {
  const largeViewport = window.matchMedia("(min-width:1200px)");
  if (largeViewport.matches) {
    document.addEventListener("scroll", addIntersectionObserver);
  }
});
</script>

<style lang="scss">
@import "./assets/base.scss";

#navbar {
  display: none;
}

#app {
  width: 100%;
  position: static !important;
}

main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 1366px;
  padding: 2rem;

  margin: 0 auto;
}
.index-template {
  padding: 0 0rem;
  width: 100%;
  max-width: 866px;
  margin: 0 auto;
}

@media screen and (min-width: 600px) {
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
