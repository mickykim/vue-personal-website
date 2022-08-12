<template>
  <div :class="'styled-heading ' + position">
    <h2><slot>Heading</slot></h2>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ position: String });
</script>

<style scoped>
h2 {
  display: inline-block;
  line-height: normal;
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.375ch;
}

.styled-heading {
  position: relative;
  margin: 6rem 0;
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
  border-left: 4px solid hsl(var(--c-primary-300, var(--c-white)));
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
  border-right: 4px solid hsl(var(--c-primary-300, var(--c-white)));
}
</style>
