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
            <a @click="toggleModal">Link</a>
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
  z-index: 0;

  border-radius: 0.5rem;
  transition: border var(--anim-duration);
  transition: clip-path var(--anim-duration);
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

  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(
        hsl(var(--c-primary-900)),
        hsl(var(--c-primary-800))
      ),
      linear-gradient(hsl(var(--c-primary-800)), hsl(var(--c-primary-700))),
      linear-gradient(hsl(var(--c-primary-700)), hsl(var(--c-primary-600))),
      linear-gradient(hsl(var(--c-primary-600)), hsl(var(--c-primary-500)));
    animation: rotate 10s linear infinite;
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
  top: 0.5rem;
  left: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  grid-template-rows: 50% auto;
  z-index: 10;
  border-radius: 0.5rem;
  .top-section {
    transform: translateY(300%);
    transition: transform var(--anim-duration);
    min-width: calc(100% - 1rem);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    overflow-y: hidden; //Display rounded corners
  }
  .bottom-section {
    background-color: hsl(var(--c-primary-900));

    transform: translateY(150%);
    transition: transform var(--anim-duration);
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
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

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow {
}
</style>
