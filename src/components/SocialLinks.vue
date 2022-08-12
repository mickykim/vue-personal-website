<template>
  <div class="social-links">
    <a href="http://www.google.com" target="_blank" rel="noopener noreferrer">
      <IconGithub class="social-icon" />
    </a>
    <a href="" target="_blank" rel="noopener noreferrer">
      <IconLinkedIn class="social-icon" />
    </a>
    <a href="" target="_blank" rel="noopener noreferrer"
      ><IconTwitter class="social-icon" />
    </a>
  </div>
</template>

<script setup lang="ts">
import IconGithub from "~icons/fa6-brands/github-square";
import IconTwitter from "~icons/fa6-brands/twitter-square";
import IconLinkedIn from "~icons/fa6-brands/linkedin";
</script>

<style scoped>
.social-links {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
}

.social-icon {
  font-size: 2rem;
  color: hsl(var(--c-primary-200, var(--c-white)));
}
</style>
