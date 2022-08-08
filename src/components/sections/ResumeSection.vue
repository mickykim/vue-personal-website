<template>
  <FadeInComponent direction="up">
    <StyledHeading position="left">Resume/CV</StyledHeading>
  </FadeInComponent>
  <FadeInComponent direction="right">
    <div class="resume-section">
      <StyledButton>Resume</StyledButton>
      <StyledButton>Contact</StyledButton>
    </div>
  </FadeInComponent>
</template>

<script setup lang="ts">
import StyledButton from "../StyledButton.vue";
import StyledHeading from "../StyledHeading.vue";
import FadeInComponent from "../FadeInComponent.vue";
</script>

<style scoped>
.resume-section {
  display: flex;
  margin-bottom: 15rem;
  gap: 2rem;
  justify-content: center;
}
</style>
