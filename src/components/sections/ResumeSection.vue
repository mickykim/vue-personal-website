<template>
  <FadeInComponent direction="up">
    <StyledHeading position="left" id="resume">Resume/CV</StyledHeading>
  </FadeInComponent>
  <FadeInComponent direction="right">
    <div class="resume-section">
      <StyledButton>
        <template #text> Resume </template>
        <template #icon><IonDocumentTextSharp class="icon" /> </template>
      </StyledButton>
      <StyledButton>
        <template #text> Contact </template>
        <template #icon
          ><MaterialSymbolsMailOutlineSharp class="icon" />
        </template>
      </StyledButton>
    </div>
  </FadeInComponent>
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
  margin-bottom: 15rem;
  gap: 2rem;
  justify-content: center;
}

.icon {
  font-size: 1.5rem;
}
</style>
