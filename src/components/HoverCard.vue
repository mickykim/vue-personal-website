<template>
  <div class="hover-card">
    <div class="cards-wrapper">
      <div class="back-card">
        <img class="image" src="./../assets/websiteImage.jpg" loading="lazy" />
      </div>
      <div class="front-card">
        <div class="top-section">
          <ImageGallery :slides="frontCardSlides" />
        </div>
        <div class="bottom-section">
          <div class="content">
            <h3>Title</h3>
            <h4>Tags:</h4>
            <p>Description</p>
            <a @click="toggleModal">Details</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ImageGalleryModal
    @toggle-show-modal="toggleModal"
    :showModal="showModal"
    :slides="modalSlides"
    v-show="showModal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageGalleryModal from "./ImageGalleryModal.vue";
import ImageGallery from "./ImageGallery.vue";

const showModal = ref(false);
const frontCardSlides = [
  {
    id: 3,
    imgurl: "websiteImage.jpg",
  },
  {
    id: 4,
    imgurl: "websiteImage.jpg",
  },
];

const modalSlides = [
  {
    id: 1,
    imgurl: "websiteImage.jpg",
    title: "Pog",
    description: "Poggers description",
  },
  {
    id: 2,
    imgurl: "websiteImage.jpg",
    title: "Pog",
    description: "Poggers description",
  },
];
function toggleModal() {
  showModal.value = !showModal.value;
}
</script>

<style lang="scss" scoped>
.hover-card {
  --anim-duration: 0.75s;
  --border-size: 0px;
  --border-radius: 0rem;

  width: 100%;
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-s);
  border-radius: 0.5rem;
  /* background-color: gray; */

  cursor: pointer;
}

.cards-wrapper {
  overflow: hidden;

  position: relative;
  z-index: 0;
  border-radius: var(--border-radius);
  transition: border var(--anim-duration);
  transition: clip-path var(--anim-duration);
}
.back-card {
  aspect-ratio: 9/10;
  transition: opacity var(--anim-duration);
  border: 2px solid hsl(var(--c-primary-700, var(--c-green-500)));
  img {
    opacity: 0;
  }
}
.cards-wrapper:hover {
  box-shadow: var(--shadow-s);
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
  position: absolute;
  top: var(--border-size);
  left: var(--border-size);
  width: calc(100% - var(--border-size) * 2); // leave space for animated margin
  height: calc(
    100% - var(--border-size) * 2
  ); // leave space for animated margin
  grid-template-rows: 50% auto;
  z-index: 10;
  border-radius: var(--border-radius);
  .top-section {
    transform: translateY(300%);
    transition: transform var(--anim-duration);
    min-width: calc(100% - var(--border-size) * 2);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    overflow-y: hidden; //Display rounded corners
  }
  .bottom-section {
    background-color: hsl(var(--c-white));
    color: hsl(var(--c-primary-100));

    box-shadow: var(--shadow-inset-s);

    transform: translateY(150%);
    transition: transform var(--anim-duration);
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
    .content {
      margin: 0 0.5rem;
    }
  }

  a {
    padding: 0.5rem 1.5rem;
    background-color: hsl(var(--c-primary-500));
    color: hsl(var(--c-primary-100));
    text-decoration: none;
    font-weight: bold;
    border-radius: 0rem;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>
