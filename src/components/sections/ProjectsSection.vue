<template>
  <section id="projects" data-section-id="2">
    <FadeInComponent direction="up">
      <StyledHeading position="right"> Projects </StyledHeading>
    </FadeInComponent>

    <div class="projects-section">
      <TiltCard
        v-for="(card, index) in cardsData"
        :id="index"
        :key="index"
        :title="card.title"
        :description="card.description"
        :tags="card.tags"
        :image="card.image"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import FadeInComponent from "../FadeInComponent.vue";
import StyledHeading from "../StyledHeading.vue";
import TiltCard from "../TiltCard.vue";

const cardsData = [
  {
    title: "Invex Capital",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["Vue", "TypeScript", "GSAP"],
    image: "websiteImage",
  },
  {
    title: "check.gg",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "websiteImage",
  },
  {
    title: "Title 3",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["Mongoose", "Express", "React", "Node.js"],
    image: "websiteImage",
  },
  {
    title: "Title 4",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["Hubspot/HubL", "Javascript"],
    image: "websiteImage",
  },
];
</script>

<style scoped>
.projects-section {
  display: flex;
  max-width: 760px;
  margin: 4rem 0;
  gap: 6rem;
  flex-wrap: wrap;
}
.website-showcase-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  justify-items: center;
  padding: 0 2rem;
  margin-bottom: 8rem;
  /* transition: background 0.5s;
  background: hsl(var(--c-primary-900)); */
}
@media screen and (min-width: 600px) {
  .website-showcase-section {
    grid-template-columns: 1fr 1fr;
  }

  .projects-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;

    gap: 4rem;
  }
}
</style>
