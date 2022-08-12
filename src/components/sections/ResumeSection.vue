<template>
  <section id="resume" data-section-id="1">
    <FadeInComponent direction="up">
      <StyledHeading position="left" id="resume">Resume/CV</StyledHeading>
    </FadeInComponent>
    <FadeInComponent :stagger="0.2" target="resume-section">
      <div class="resume-section">
        <StyledButton class="styled-button">
          <template #text> Resume </template>
          <template #icon>
            <IonDocumentTextSharp class="icon" />
          </template>
        </StyledButton>
        <StyledButton class="styled-button">
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
</script>

<style scoped>
.resume-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 15rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
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
