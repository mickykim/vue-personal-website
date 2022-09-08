<template>
  <section id="contact" data-section-id="3">
    <FadeInComponent direction="up">
      <StyledHeading
        position="left"
        id="resume"
        color="red"
        class="section-heading"
      >
        Contact
      </StyledHeading>
    </FadeInComponent>
    <FadeInComponent direction="up">
      <h2>Let's Talk!</h2>
    </FadeInComponent>
    <div class="form">
      <ContactForm />
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactForm from "../ContactForm.vue";
import StyledHeading from "../StyledHeading.vue";
import FadeInComponent from "../FadeInComponent.vue";
</script>

<style scoped>
.section-heading {
  margin-bottom: 3rem;
}
h2 {
  font-weight: bold;
  margin-bottom: 2rem;
}
.form {
  max-width: 700px;
  margin: 0 auto;
}
</style>
