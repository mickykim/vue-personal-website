<template>
  <div :class="'styled-heading ' + position" ref="styledHeading">
    <h2 ref="heading"><slot>Heading</slot></h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({ position: String, color: String });
const heading = ref<HTMLElement>();
const styledHeading = ref<HTMLElement>();
onMounted(() => {
  if (!heading.value || !styledHeading.value) return;

  styledHeading.value.style.setProperty(
    "--c-border",
    `hsl(var(--c-${props.color}-300, var(--c-white)))`
  );
  heading.value.style.color = `hsl(var(--c-${props.color}-900, var(--c-white)))`;
});
</script>

<style scoped>
h2 {
  display: inline-block;
  line-height: normal;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.125ch;
}

.styled-heading {
  position: relative;
}
.styled-heading.left {
  padding-left: 1.5rem;
}
.styled-heading.left::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-left: 4px solid var(--c-border);
  transition: border-color 0.5s;
}

.styled-heading.right {
  text-align: right;
  padding-right: 1.5rem;
}
.styled-heading.right::after {
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-right: 4px solid var(--c-border);
}
</style>
