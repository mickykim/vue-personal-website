<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag" class="tag">
      {{ tag }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  tags: Array<string>,
});
</script>

<style scoped>
.tag {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: hsla(var(--c-primary-200, var(--c-green-200)), 0.33);
  color: hsl(var(--c-primary-900, var(--c-white)));
}

.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 2rem 0rem;
}
</style>
