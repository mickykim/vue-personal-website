<template>
  <nav>
    <ul>
      <div
        class="link__wrapper"
        v-for="(section, index) in sections"
        :key="section.id"
      >
        <li
          class="reveal-link-anim"
          :ref="(el) => link_buttons.push(el as HTMLLIElement)"
          :data-order="section.id"
        >
          <a
            :class="section.color + ' expanded-navbar-anim'"
            :ref="(el) => links.push(el as HTMLLinkElement)"
            @click="$emit('changeColorTheme', sections[index].color)"
          >
            {{ section.textContent }}
          </a>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

/**
 * Setup for background color slides
 ** Variable values should be the same as in the js
 */
const sections = [
  {
    id: 1,
    color: "green",
    textContent: "About",
  },
  {
    id: 2,
    color: "brown",
    textContent: "Websites",
  },
  {
    id: 3,
    color: "blue",
    textContent: "Poggadopolis",
  },
  {
    id: 4,
    color: "purple",
    textContent: "Information",
  },
  {
    id: 5,
    color: "red",
    textContent: "Contact",
  },
];
const links = ref<HTMLLinkElement[]>([]);
const link_buttons = ref<HTMLLIElement[]>([]);

onMounted(() => {
  /**
   * PauseChamp...
   */
});
</script>

<style lang="scss" scoped>
/**
* Setup for background color slides
** Variable values should be the same as in the js
*/
$sections: 5;
$colors: "green", "brown", "blue", "purple", "red";

@keyframes revealLink {
  0% {
    transform: translateY(120%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes expandedNavbar {
  0% {
    min-width: 0px;
  }
  100% {
    min-width: var(--navbar-width);
  }
}

.hidden {
  opacity: 0%;
}

.reveal-link-anim {
  --anim-time: 1s;
  --anim-delay: 1s;
  animation-name: revealLink;
  animation-duration: var(--anim-time);
  animation-delay: calc(
    var(--anim-delay) + var(--anim-time) * var(--anim-order) / 5
  );
  animation-fill-mode: both;
}

.expanded-navbar-anim {
  --anim-time: 0.5s;
  --anim-delay: 0s;
  animation-name: expandedNavbar;
  animation-delay: 4s;
  animation-duration: var(--anim-time);
  animation-fill-mode: forwards;
}
.inactive {
  opacity: 0;
  color: hsl(var(--c-white));
}

@for $i from 1 through length($colors) {
  $color: nth($colors, $i); //Get the ith value from colors array
  a.#{$color} {
    --color-background: var(--c-#{$color}-600);
    --color-text: var(--c-#{$color}-100);
    --color-shadow: var(--c-#{$color}-900);
    --shadow-xs: inset 0 1px 0 hsl(var(--color-shadow)),
      0 1px 3px hsla(0, 0%, 0%, 0.12), 0 1px 2px hsla(0, 0%, 0%, 0.24);
    box-shadow: var(--shadow-xs);
  }
  [data-order="#{$i}"] {
    --anim-order: #{$i};
  }
}

.link__wrapper {
  overflow: hidden;
}

a {
  display: inline-block;
  padding: 0.625rem 2rem;
  border-radius: 0.25rem;
  color: hsl(var(--color-text));
  background-color: hsl(var(--color-background));
  font-weight: bold;
}
a:active {
  box-shadow: none;
  transform: translateY(2px);
}
nav {
  --navbar-width: 250px;
  display: flex;
  width: var(--navbar-width);
  justify-content: flex-end;
  position: sticky;
  top: 10%;
  align-self: flex-start; /* Fix for sidebar position sticky inside a flex/grid container.
  More info: https://stackoverflow.com/questions/44446671/my-position-sticky-element-isnt-sticky-when-using-flexbox */
}
ul {
  display: flex;

  flex-direction: column;
  list-style-type: none;
  align-items: flex-end;
  padding: 0.5rem 0.5rem;
}
li {
  transform: translateY(120%);

  margin: 0.25rem auto;
  transition: transform 1s;
  border-radius: 0.5rem;

  cursor: pointer;
}
</style>
