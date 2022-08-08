<template>
  <section id="hero" class="hero">
    <h2 class="sliding-fade-in">Miqueas Kim Han</h2>
    <p class="sliding-fade-in">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod officiis
      expedita iure. Praesentium, blanditiis molestiae. Suscipit nobis a,
      placeat adipisci vel quod deleniti dignissimos, cupiditate fugiat error
      aspernatur itaque nostrum!
    </p>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.hero {
  margin: 0 0 25rem 0;
}

@keyframes staggeredReveal {
  0% {
    opacity: 0%;
  }
  90% {
    opacity: 0%;
  }
  100% {
    opacity: 100%;
  }
}

.staggered-reveal {
  --anim-time: 0.25s;

  --anim-delay: calc(var(--anim-order) * 1s);
  --anim-total-duration: calc(var(--anim-time) + var(--anim-delay));
  animation-name: staggeredReveal;
  animation-duration: var(--anim-time);
  animation-delay: var(--anim-delay);
  animation-fill-mode: both;
}

@keyframes slidingFadeIn {
  0% {
    transform: translateY(50%);
    opacity: 0%;
  }

  100% {
    transform: translateY(0%);
    opacity: 100%;
  }
}

.sliding-fade-in {
  animation-name: slidingFadeIn;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-fill-mode: both;
  margin-top: 2rem;
}
h2 {
  display: inline-block;
  line-height: normal;
}

@media screen and (min-width: 600px) {
}
</style>
