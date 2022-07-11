<template>
  <div ref="modal" class="modal" @click="closeModal">
    <!-- Modal content -->
    <div class="modal__content">
      <span class="close" @click="$emit('toggleShowModal')">&times;</span>
      <div class="modal__image-wrapper">
        <ImageGallery :slides="slides" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ImageGallery from "./ImageGallery.vue";

const emit = defineEmits(["toggleShowModal"]);

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
  if (e.target == modal.value) emit("toggleShowModal");
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: hsla(
    var(--c-primary-400),
    0.4
  ); /* Fade background content */
}
/* Modal Content/Box */
.modal__content {
  background-color: hsl(var(--c-primary-400));
  margin: 2rem auto; /* 15% from the top and centered */
  padding: 20px;
  max-width: 60%;
  border-radius: 0.5rem;
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
