<template>
  <div class="hover-card">
    <div class="cards-wrapper">
      <div class="back-card">
        <img class="image" src="./../assets/websiteImage.jpg" loading="lazy" />
      </div>
      <div class="front-card">
        <div class="top-section">
          <img
            class="image"
            src="./../assets/websiteImage.jpg"
            loading="lazy"
          />
        </div>
        <div class="bottom-section">
          <h3>Title</h3>
          <h4>Tags:</h4>
          <p>Description</p>
          <a href="">Link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.hover-card {
  --anim-duration: 0.75s;

  width: 100%;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-s);
  border-radius: 0.5rem;

  cursor: pointer;
}

.cards-wrapper {
  overflow: hidden;

  position: relative;
  border-radius: 0.5rem;
}
.back-card {
  aspect-ratio: 9/10;
  transition: opacity var(--anim-duration);
}
.cards-wrapper:hover {
  .back-card {
    opacity: 0.1;
  }
  .front-card {
    .top-section {
      transform: translateY(0%);
    }
    .bottom-section {
      transform: translateY(0%);
    }
  }
}

.image {
  display: block;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.front-card {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 50% auto;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.5rem;
  .top-section {
    transform: translateY(300%);
    transition: transform var(--anim-duration);
  }
  .bottom-section {
    background-color: hsl(var(--color-root));

    transform: translateY(150%);
    transition: transform var(--anim-duration);
  }

  a {
    padding: 0.5rem 1.5rem;
    background-color: hsl(var(--color-button));
    color: hsl(var(--c-white));
    text-decoration: none;
    border-radius: 0.25rem;
  }
}
</style>
