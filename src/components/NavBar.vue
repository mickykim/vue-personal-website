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
            :href="section.url"
            :class="section.color"
            :ref="(el) => links.push(el as HTMLLinkElement)"
            @click="onClick(sections[index].color, section.id)"
          >
            {{ section.textContent }}
          </a>
        </li>
      </div>
    </ul>
    <FadeInComponent direction="up" :delay="1">
      <SocialLinks />
    </FadeInComponent>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SocialLinks from "./SocialLinks.vue";
import FadeInComponent from "./FadeInComponent.vue";

/**
 * Setup for background color slides
 ** Variable values should be the same as in the css
 */
const sections = [
  {
    id: 1,
    color: "green",
    textContent: "Mikim",
    url: "#hero",
  },
  {
    id: 2,
    color: "brown",
    textContent: "CV/Resume",
    url: "#resume",
  },
  {
    id: 3,
    color: "blue",
    textContent: "Projects",
    url: "#projects",
  },
  {
    id: 4,
    color: "red",
    textContent: "Contact",
    url: "#contact",
  },
];
const links = ref<HTMLLinkElement[]>([]);

const link_buttons = ref<HTMLLIElement[]>([]);
const emit = defineEmits(["changeColorTheme"]);
function onClick(color: string, id: number) {
  links.value.forEach((link, index) => {
    if (index + 1 === id) {
      link.classList.remove("secondary");
      link.classList.add("expanded-link");
    } else {
      link.classList.add("secondary");
      link.classList.remove("expanded-link");
    }
  });
  emit("changeColorTheme", color);
}

onMounted(() => {
  /**
   * Expand navigation buttons once the last button is revealed
   */
  link_buttons.value[link_buttons.value.length - 1].addEventListener(
    "animationend",
    () => {
      links.value.forEach((link) => {
        link.classList.add("expanded-link");
      });
    }
  );
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

.hidden {
  opacity: 0%;
}

.reveal-link-anim {
  --anim-time: 1s;
  --anim-delay: 0s;
  animation-name: revealLink;
  animation-duration: var(--anim-time);
  animation-delay: calc(
    var(--anim-delay) + var(--anim-time) * var(--anim-order) / 5
  );
  animation-fill-mode: both;
}

.expanded-link {
  min-width: var(--navbar-width);
}

.secondary {
  border: 1px solid hsl(var(--color-text));
  color: hsl(var(--color-text));
  border: 1px solid hsl(var(--c-primary-300));
  color: hsl(var(--c-primary-300));
  background: transparent;
  box-shadow: none !important;
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
    --shadow-xs: inset 0 2px 0 hsl(var(--color-shadow)),
      0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.24);
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
  color: hsl(var(--c-primary-100, var(--color-text)));
  background-color: hsl(var(--color-background));
  box-shadow: var(--shadow-xs);
  font-weight: bold;
  min-width: 0px;
  text-decoration: none;
  transition: min-width 0.5s, color 0.5s, border 0.5s, background 0.5s;
}
a:not(.expanded-link) {
  &:hover {
    color: hsl(var(--color-background));
    border-color: hsl(var(--color-background));
  }
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
  top: 5%;
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
