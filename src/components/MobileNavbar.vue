<template>
  <nav ref="navbar">
    <ul>
      <CloseButton @click="closeNavbar" class="close-button" />
      <li v-for="(section, index) in sections" :key="index">
        <a :href="section.url" @click="closeNavbar">
          {{ section.textContent }}
        </a>
      </li>
    </ul>
  </nav>
  <MenuButton @click="openNavbar" class="menu-button" />
</template>

<script setup lang="ts">
import gsap from "gsap";
import { onMounted, ref } from "vue";
import CloseButton from "~icons/material-symbols/close";
import MenuButton from "~icons/material-symbols/menu";
const sections = [
  {
    id: 0,
    color: "green",
    textContent: "About",
    url: "#hero",
  },
  {
    id: 1,
    color: "orange",
    textContent: "CV/Resume",
    url: "#resume",
  },
  {
    id: 2,
    color: "blue",
    textContent: "Projects",
    url: "#projects",
  },
  {
    id: 3,
    color: "red",
    textContent: "Contact",
    url: "#contact",
  },
];
const navbar = ref();
const closeNavbar = () => {
  tl.to(navbar.value, { x: "101%" });
};

const openNavbar = () => {
  tl.to(navbar.value, { x: "0%" });
};
const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
onMounted(() => {});
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: hsl(var(--color-background));
  transform: translateX(101%);
}
ul {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

li {
  min-height: calc(100% / 5);
  text-align: center;
  list-style: none;
}
a {
  font-size: 2rem;
  text-decoration: none;
}
.close-button {
  margin: 1rem;
  align-self: flex-end;
  font-size: 2rem;
}
.menu-button {
  position: fixed;
  top: 2.5%;
  right: 5%;
  font-size: 2rem;
}

@media screen and (min-width: 1200px) {
  .menu-button {
    display: none;
  }
  nav {
    display: none;
  }
}
</style>
