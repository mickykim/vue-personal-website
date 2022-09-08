<template>
  <ul class="tag-list">
    <li v-for="tag in props.tags" :key="tag" class="tag">
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
  background-color: hsla(var(--c-primary-200, var(--c-green-200)), 0.63);
  color: hsl(var(--c-primary-900, var(--c-white)));
  box-shadow: inset 0 1px 0 hsla(var(--c-primary-900), 0.4),
    0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 8px hsla(0, 0%, 0%, 0.24);
}

.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}
</style>
