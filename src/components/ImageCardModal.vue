<template>
  <!-- Trigger/Open The Modal -->
  <div ref="card" class="modal__card" @click="openModal">
    <h3>Pog Title</h3>
    <h4>FeelsGoodMan Description Body</h4>
  </div>

  <!-- The Modal -->
  <div ref="modal" class="modal" @click="closeModal">
    <!-- Modal content -->
    <div class="modal__content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="modal__image-wrapper">
        <ImageGallery :slides="slides" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ImageGallery from "./ImageGallery.vue";

// Get the modal
const modal = ref();

const slides = [
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

function closeModal(e: Event) {
  if (e.target == modal.value) modal.value.classList.remove("revealed");
}

function openModal() {
  modal.value.classList.add("revealed");
}
</script>

<style lang="scss" scoped>
.modal__card {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  height: 30rem;
  border-radius: 1rem;

  background-image: linear-gradient(
      to top,
      hsla(var(--color-background), 1) 0%,
      hsla(var(--color-background), 0.59) 32%,
      hsla(var(--color-background), 0.1) 100%
    ),
    url("./../assets/websiteImage.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: hsla(
    var(--color-background),
    0.4
  ); /* Fade background content */
}
.revealed {
  display: block;
}
/* Modal Content/Box */
.modal__content {
  background-color: hsl(var(--color-background));
  margin: 2rem auto; /* 15% from the top and centered */
  padding: 20px;
  max-width: 60%;
}

/* The Close Button */
.close {
  color: hsl(var(--color-text));
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
