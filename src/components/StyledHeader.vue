<template>
  <div class="styled-header">
    <h2><slot>Heading</slot></h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
h2 {
  display: inline-block;
  line-height: normal;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}

.styled-header {
  padding-left: 1.5rem;
  position: relative;
}
.styled-header::after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-left: 4px solid hsl(var(--c-primary-500, var(--c-white)));
}
</style>
