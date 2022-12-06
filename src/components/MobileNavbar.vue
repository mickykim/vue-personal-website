<template>
  <nav ref="navbar">
    <CloseButton @click="closeNavbar" class="close-button" />

    <ul>
      <li v-for="(section, index) in sections" :key="index">
        <a :href="section.url" @click="closeNavbar" :class="section.color">
          {{ section.textContent }}
        </a>
      </li>
    </ul>
  </nav>
  <MenuButton @click="openNavbar" class="menu-button" />
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ref } from "vue";
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
</script>

<style scoped lang="scss">
$colors: "green", "orange", "blue", "purple", "red";

@for $i from 1 through length($colors) {
  $color: nth($colors, $i); //Get the ith value from colors array
  a.#{$color} {
    --color-background: var(--c-#{$color}-600);
    --color-text: var(--c-#{$color}-900);
    --color-shadow: var(--c-#{$color}-900);
    --shadow-xs: inset 0 1px 0 hsl(var(--color-shadow)),
      0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.24);
  }
  [data-order="#{$i}"] {
    --anim-order: #{$i};
  }
}
nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
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
  color: hsl(var(--color-text));
}
.close-button {
  margin: 1rem;
  align-self: flex-end;
  font-size: 2rem;
  cursor: pointer;
}
.menu-button {
  position: fixed;
  top: 2.5%;
  right: 5%;
  font-size: 2rem;
  cursor: pointer;
  color: hsl(var(--c-primary-900, var(--c-white)));
  z-index: 5;
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
