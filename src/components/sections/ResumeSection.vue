<template>
  <section id="resume" data-section-id="1">
    <FadeInComponent direction="up">
      <StyledHeading
        position="left"
        id="resume"
        color="orange"
        class="section-heading"
        >Resume / CV</StyledHeading
      >
    </FadeInComponent>
    <FadeInComponent
      :stagger="0.2"
      :delay="0.5"
      target="resume-section"
      direction="up"
    >
      <div class="resume-section">
        <StyledButton
          class="styled-button"
          @click="openLink('https://www.google.com/')"
        >
          <template #text> Resume </template>
          <template #icon>
            <IonDocumentTextSharp class="icon" />
          </template>
        </StyledButton>
        <StyledButton class="styled-button" @click="scrollToContact">
          <template #text> Contact </template>
          <template #icon>
            <MaterialSymbolsMailOutlineSharp class="icon" />
          </template>
        </StyledButton>
      </div>
    </FadeInComponent>
  </section>
</template>

<script setup lang="ts">
import StyledButton from "../StyledButton.vue";
import StyledHeading from "../StyledHeading.vue";
import FadeInComponent from "../FadeInComponent.vue";
import IonDocumentTextSharp from "~icons/ion/document-text-sharp";
import MaterialSymbolsMailOutlineSharp from "~icons/material-symbols/mail-outline-sharp";

const openLink = (url: string) => {
  window.open(url);
};
const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({
    behavior: "smooth",
  });
};
</script>

<style scoped>
.section-heading {
  margin-bottom: 3rem;
}
.resume-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 15rem;
}

.icon {
  font-size: 1.5rem;
}

.styled-button {
  transform: scale(0.8);
}

@media screen and (min-width: 600px) {
  .resume-section {
    flex-direction: row;
  }
  .styled-button {
    transform: scale(1);
  }
}
</style>
