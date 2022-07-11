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
          <div class="content">
            <h3>Title</h3>
            <h4>Tags:</h4>
            <p>Description</p>
            <a @click="toggleModal">Link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ImageGalleryModal
    @toggle-show-modal="toggleModal"
    :showModal="showModal"
    v-show="showModal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageGalleryModal from "./ImageGalleryModal.vue";

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<style lang="scss" scoped>
.hover-card {
  --anim-duration: 0.75s;

  width: 100%;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-m);
  border-radius: 0.5rem;

  cursor: pointer;
}

.cards-wrapper {
  overflow: hidden;

  position: relative;
  border: 0.5rem solid hsl(var(--c-black));
  border-radius: 0.5rem;

  transition: border var(--anim-duration);
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

  border: 0.5rem solid hsl(var(--c-primary-900));
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
    background-color: hsl(var(--c-primary-700));

    transform: translateY(150%);
    transition: transform var(--anim-duration);
    .content {
      margin: 0 0.5rem;
    }
  }

  a {
    padding: 0.5rem 1.5rem;
    background-color: hsl(var(--c-primary-400));
    color: hsl(var(--c-primary-900));
    text-decoration: none;
    border-radius: 0.25rem;
  }
}
</style>
