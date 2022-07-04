<template>
  <div class="background" ref="background">
    <span
      v-for="j in rows"
      :key="j"
      class="hidden"
      :data-order="j"
      ref="color_rows"
      style=""
    ></span>
  </div>

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
            :class="section.color + '-600 expanded-navbar-anim'"
            :ref="(el) => links.push(el as HTMLLinkElement)"
            @click="color_animation(sections[index].color)"
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
const rows = 20;
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
const background = ref<HTMLDivElement>();
const root = document.querySelector<HTMLElement>(":root");
const links = ref<HTMLLinkElement[]>([]);
const link_buttons = ref<HTMLLIElement[]>([]);
const color_rows = ref<HTMLSpanElement[]>([]);

const color_animation = (color: string) => {
  color_rows.value.forEach((row, index) => {
    row.classList.remove("hidden");
    row.classList.add("changeColor");
    row.classList.add(color + "-700");

    const end_animation = () => {
      row.className = "";
    };

    if (index === 0) {
      row.addEventListener("animationend", () => {
        if (background.value)
          background.value.className = `background ${color}-700`;

        if (root) {
          root.style.setProperty("--color-text", `var(--c-${color}-100)`);
          root.style.setProperty("--color-background", `var(--c-${color}-700)`);
          root.style.setProperty("--color-root", `var(--c-${color}-900)`);
          root.style.setProperty("--color-button", `var(--c-${color}-500)`);
        }
        end_animation();
      });
    } else if (index === color_rows.value.length - 1) {
      row.addEventListener("animationend", () => {
        end_animation();
      });
    } else {
      row.addEventListener("animationend", end_animation);
    }
  });
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
/**
* Setup for background color slides
** Variable values should be the same as in the js
*/
$rows: 20;
$colors: "green", "brown", "blue", "purple", "red";

@keyframes changeColor {
  0% {
    width: 0;
  }
  60% {
    width: 100%;
    left: 0%;
  }
  100% {
    left: 0%;
    opacity: 100%;
  }
}

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
.changeColor {
  --anim-time: 1s;
  animation-name: changeColor;
  animation-duration: var(--anim-time);
  animation-delay: calc(var(--anim-time) * var(--anim-order) / (2 * $rows));
  animation-fill-mode: both;
  /* animation-timing-function: ease-in-out; */
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

@each $color in $colors {
  @for $i from 0 through $rows {
    .#{$color}-#{$i}00 {
      --color-background: var(--c-#{$color}-#{$i}00);
      --color-text: var(--c-#{$color}-100);
    }
    a.#{$color}-#{$i}00 {
      --color-shadow: var(--c-#{$color}-900);
      --shadow-xs: inset 0 1px 0 hsl(var(--color-shadow)),
        0 1px 3px hsla(0, 0%, 0%, 0.12), 0 1px 2px hsla(0, 0%, 0%, 0.24);
      box-shadow: var(--shadow-xs);
    }
    [data-order="#{$i}"] {
      --anim-order: #{$i};
    }
  }
}

.background span {
  display: block;
  height: calc((100% / $rows));
  position: relative;
  background-color: hsl(var(--color-background));
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  z-index: -10;
  overflow: hidden;
  background-color: hsl(var(--color-background));
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
