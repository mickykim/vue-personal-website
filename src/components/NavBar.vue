<template>
  <nav ref="nav">
    <div class="icon" ref="icon" @click="openLink('https://www.mikim.dev/')">
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
            <p>{{ section.textContent }}</p>
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
const nav = ref<HTMLDivElement>();
const link_buttons = ref<HTMLLIElement[]>([]);
const emit = defineEmits(["changeColorTheme"]);
function openLink(url: string) {
  window.open(url, "_self");
}
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
/**
 * Utility function to calculate scale for css transform
 * @param {HTMLElement} el
 */
function calculateExpandedScale(el: HTMLElement) {
  if (!nav.value) return {};
  const collapsed = el.getBoundingClientRect();
  const expanded = nav.value.getBoundingClientRect();
  return {
    // Offset of 10 added to prevent clipping issues
    x: expanded.width / collapsed.width,
    y: expanded.height / collapsed.height,
    xdelta: (collapsed.width - expanded.width) / 2,
  };
}

/**
 * Utility function to add CSS to the given element.
 * @param {string} styleString
 */
function addStyle(styleString: string, el: HTMLElement) {
  const style = document.createElement("style");
  style.textContent = styleString;
  el.before(style);
}

watchEffect(() => {
  if (!props.currentSectionId && props.currentSectionId !== 0) return;
  onClick(sections[props.currentSectionId].color, props.currentSectionId);
});
onMounted(() => {
  //Expand navigation buttons once the last button is revealed
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
    },
    { once: true }
  );
  link_buttons.value.forEach((link, index) => {
    const { x, y, xdelta } = calculateExpandedScale(link);
    if (!x || !y) return;
    addStyle(
      `
      @keyframes ${sections[index].color}ScaleText {
        from {
          opacity: 0;
          transform: scaleX(1);
        }
        to {
          opacity: 1;
          transform: scaleX(${1 / x}) translateX(${xdelta}px);

        }
      }
      @keyframes ${sections[index].color}ScaleTextInverted {
        from {
          opacity: 1;
          transform: scaleX(${1 / x}) translateX(${xdelta}px);
        }
        to {
          opacity: 0;
          transform: scaleX(1);
        }
      }

      @keyframes ${sections[index].color}ScaleLink {
        from {
          transform: scaleX(1);
        }
        to {
          transform: scaleX(${x});
        }
      }

      @keyframes ${sections[index].color}ScaleLinkInverted {
        from {         
          transform: scaleX(${x});
        }
        to {
          transform: scaleX(1);
        }
      }
      `,
      link
    );
  });
});
</script>

<style lang="scss" scoped>
/**
* Setup for background color slides
** Variable values should be the same as in the js
*/
$sections: 4;
$colors: "green", "orange", "blue", "red";

@keyframes revealLink {
  0% {
    transform: translateY(120%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes fadeText {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

p {
  font-family: Avertastd, Inter, sans-serif;
  font-size: 16px;
  font-weight: bold;
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
  color: hsl(var(--color-text));
  border: 1px solid hsl(var(--color-background));
  background: hsl(var(--color-background));
  box-shadow: var(--shadow-xs);
}

.secondary {
  border: 1px solid hsl(var(--color-text));
  color: hsl(var(--color-text));
  border: 1px solid hsl(var(--c-primary-800));
  color: hsl(var(--c-primary-800));
  background: transparent;
  box-shadow: none;
}
.inactive {
  opacity: 0;
  color: hsl(var(--c-white));
}

@for $i from 1 through length($colors) {
  $color: nth($colors, $i); //Get the ith value from colors array
  .#{$color} {
    --color-background: var(--c-#{$color}-600);
    --color-text: var(--c-#{$color}-100);
    --color-shadow: var(--c-#{$color}-900);
    --shadow-xs: inset 0 1px 0 hsl(var(--color-shadow)),
      0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 2px hsla(0, 0%, 0%, 0.24);
    animation: scaleLinkInverted var(--scaleDuration) both;
  }
  [data-order="#{$i}"] {
    --anim-order: #{$i};
  }
}

.link__wrapper {
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
ul {
  margin-left: -1rem;
}
a {
  box-sizing: border-box;
  will-change: transform;
  --scaleDuration: 0.5s;
  display: inline-block;
  padding: 0.625rem 2rem;
  border-radius: 0.25rem;
  color: hsl(var(--c-primary-100, var(--color-text)));
  background-color: hsl(var(--color-background));
  box-shadow: var(--shadow-xs);
  font-weight: bold;
  transform-origin: right;
  transform: scaleX(1);
  text-decoration: none;
  transition: transform var(--scaleDuration), border var(--scaleDuration),
    opacity var(--scaleDuration);
}

.orange.expanded-link {
  animation: orangeScaleLink var(--scaleDuration) both;
  p {
    animation: orangeScaleText var(--scaleDuration) both;
  }
}
.green.expanded-link {
  animation: greenScaleLink var(--scaleDuration) both;
  p {
    animation: greenScaleText var(--scaleDuration) both;
  }
}
.blue.expanded-link {
  animation: blueScaleLink var(--scaleDuration) both;
  p {
    animation: blueScaleText var(--scaleDuration) both;
  }
}
.red.expanded-link {
  animation: redScaleLink var(--scaleDuration) both;
  p {
    animation: redScaleText var(--scaleDuration) both;
  }
}

a:not(.expanded-link) {
  p {
    animation: fadeText var(--scaleDuration) both;
  }
  &:hover {
    color: hsl(var(--color-text));
    border-color: hsl(var(--color-background));
    background: hsl(var(--color-background));
    box-shadow: var(--shadow-xs);
    p {
      animation: fadeText var(--scaleDuration) both;
    }

    &:active {
      box-shadow: none;
    }
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
  margin-bottom: 2rem;
}
li {
  transform: translateY(120%);

  margin: 0.25rem 0;
  transition: transform 1s;
  border-radius: 0.5rem;

  cursor: pointer;
}
.icon {
  --border-width: 4px;
  max-width: 150px;
  max-height: 150px;
  border: var(--border-width) solid hsl(var(--c-primary-400, var(--c-white)));
  border-radius: 50%;
  align-self: center;
  margin-left: 25%;
  margin-bottom: 1rem;
  -webkit-transition: border 500ms;
  -moz-transition: border 500ms;
  -o-transition: border 500ms;
  transition: border var(--scaleDuration);
  overflow: hidden;
  cursor: pointer;
}
.icon__inner {
  max-width: calc(150px - calc(var(--border-width) * 2));
  max-height: calc(150px - calc(var(--border-width) * 2));
  object-fit: cover;
  border-radius: 50%;
}
</style>
