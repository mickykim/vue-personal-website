<template>
  <nav>
    <div class="icon" ref="icon">
      <img
        class="icon__inner"
        src="../assets/mickyIcon.webp"
        width="150"
        height="150"
        ref="iconInner"
      />
    </div>
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
            :ref="(el) => {
              if(links.length < sections.length)
                links.push(el as HTMLLinkElement)
            }"
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
import { ref, onMounted, watchEffect } from "vue";
import SocialLinks from "./SocialLinks.vue";
import FadeInComponent from "./FadeInComponent.vue";
import gsap from "gsap";

/**
 * Setup for background color slides
 ** Variable values should be the same as in the css
 */
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

const props = defineProps({ currentSectionId: Number });
const links = ref<HTMLLinkElement[]>([]);
const icon = ref<HTMLDivElement>();
const iconInner = ref<HTMLImageElement>();
const link_buttons = ref<HTMLLIElement[]>([]);
const emit = defineEmits(["changeColorTheme"]);
function onClick(color: string, id: number) {
  links.value.forEach((link, index) => {
    if (index == id) {
      link.classList.remove("secondary");
      link.classList.add("expanded-link");
    } else {
      link.classList.remove("expanded-link");

      link.classList.add("secondary");
    }
  });
  emit("changeColorTheme", color);
}
watchEffect(() => {
  if (!props.currentSectionId && props.currentSectionId !== 0) return;
  onClick(sections[props.currentSectionId].color, props.currentSectionId);
});
onMounted(() => {
  /**
   * Expand navigation buttons once the last button is revealed
   */
  const tl = gsap.timeline({ defaults: { duration: 0.75 } });
  if (!icon.value || !iconInner.value) return;
  tl.addLabel("start", 0);
  tl.addLabel("afterNav", 1.75);
  tl.from(icon.value, { opacity: 0 }, "afterNav");
  tl.from(iconInner.value, { opacity: 0 }, "afterNav");
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
$colors: "green", "orange", "blue", "purple", "red";

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
  border: 1px solid hsl(var(--c-primary-800));
  color: hsl(var(--c-primary-800));
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
    color: hsl(var(--color-text));
    border-color: hsl(var(--color-background));
    min-width: var(--navbar-width);
    background: hsl(var(--color-background));
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
  margin-bottom: 2rem;
}
li {
  transform: translateY(120%);

  margin: 0.25rem auto;
  transition: transform 1s;
  border-radius: 0.5rem;

  cursor: pointer;
}
.icon {
  --border-width: 4px;
  max-width: 150px;
  max-height: 150px;
  border: var(--border-width) solid hsl(var(--c-primary-200, var(--c-white)));
  border-radius: 50%;
  align-self: center;
  margin-left: 25%;
  margin-bottom: 1rem;
  transition: border 0.5s;
  overflow: hidden;
}
.icon__inner {
  max-width: calc(150px - calc(var(--border-width) * 2));
  max-height: calc(150px - calc(var(--border-width) * 2));
  object-fit: cover;
  border-radius: 50%;
}
</style>
