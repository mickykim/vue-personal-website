<template>
  <section id="contact" data-section-id="3">
    <FadeInComponent direction="up">
      <StyledHeading position="left" id="resume" color="red">
        Contact
      </StyledHeading>
    </FadeInComponent>
    <h2>Let's Talk!</h2>
    <ContactForm />
  </section>
</template>

<script setup lang="ts">
import ContactForm from "../ContactForm.vue";
import StyledHeading from "../StyledHeading.vue";
import FadeInComponent from "../FadeInComponent.vue";
</script>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
