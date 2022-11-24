<template>
  <ul class="tag-list" ref="tagList">
    <li
      class="tag-wrapper"
      v-for="tag in props.tags"
      :key="tag"
      ref="tagWrapper"
    >
      <p class="tag" ref="tag">
        {{ tag }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps({
  tags: Array<string>,
  animationDelay: Number,
  animationReverse: Boolean
});
const tagWrapper = ref();
const tagList = ref<HTMLElement>();
const tag = ref();
const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut', stagger: 0.125 }, });

onMounted(async () => {
  if(!tagWrapper.value || !tag.value) await nextTick();
  tl.addLabel('start', 0);
  tl.to(tagWrapper.value, { x: '0%'}, `start+=${props.animationDelay}`);
  tl.to(tag.value, { x: '0%' },  `start+=${props.animationDelay}`);
  ScrollTrigger.create({
    animation: tl,
    trigger: tagList.value,
    start: 'top 85%',
    once: true,
  })
});

// Reverse taglist sliding animation when closing cover page
watch(() => props.animationReverse, () => {
  console.log('hello');
  tl.reverse();
})
</script>

<style scoped>
.tag-wrapper {
  overflow: hidden;
  will-change: transform;
  transform: translateX(-101%);
}

.tag {
  display: inline-block;
  will-change: transform;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: hsl(var(--c-primary-900, var(--c-blue-200)));
  color: hsl(var(--c-primary-100, var(--c-white)));
  box-shadow: inset 0 1px 0 hsla(var(--c-primary-900, var(--c-blue-900)), 0.4),
    0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 8px hsla(0, 0%, 0%, 0.24);
  transform: translateX(101%);
}

.tag-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}
</style>
