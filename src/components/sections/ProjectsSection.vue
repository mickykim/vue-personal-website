<template>
  <section id="projects" data-section-id="2">
    <FadeInComponent direction="up">
      <StyledHeading position="right" color="blue" class="section-heading">
        Projects
      </StyledHeading>
    </FadeInComponent>

    <div class="projects-section">
      <div
        class="tilt-card-wrapper"
        v-for="(card, index) in cardsData"
        :key="index"
      >
        <TiltCard
          :id="index"
          :title="card.title"
          :description="card.description"
          :tags="card.tags"
          :image="card.image"
          :github-link="card.githubLink"
          :website-link="card.websiteLink"
          class="tilt-card"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FadeInComponent from "../FadeInComponent.vue";
import StyledHeading from "../StyledHeading.vue";
import TiltCard from "../TiltCard.vue";

const cardsData = [
  {
    title: "Pathfinder",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    image: "pathfinder-no-bg.svg",
    githubLink: "https://github.com/mickykim/pathfinder",
    websiteLink: "https://mikimpathfinder.vercel.app/",
  },
  {
    title: "Invex Capital",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["Vue", "TypeScript", "GSAP"],
    image: "invexcapital.png",
  },
  {
    title: "Construlita",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    image: "construlita.png",
    githubLink: "https://github.com/mickykim/construlita",
    websiteLink: "https://construlita.vercel.app/",
  },
  {
    title: "check.gg",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    tags: ["Mongoose", "Express", "React", "Node.js"],
    image: "websiteImage.jpg",
  },
];
</script>

<style scoped>
#projects {
  margin-bottom: 6rem;
}
.section-heading {
  margin-bottom: 3rem;
}
.projects-section {
  max-width: 760px;
  margin: 2rem auto;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  justify-items: center;
  padding: 0 1.5rem;
  /* transition: background 0.5s;
  background: hsl(var(--c-primary-900)); */
}
.tilt-card-wrapper {
  width: 100%;
}
@media screen and (min-width: 600px) {
  .projects-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  /* Selects the first TiltCard when there are an odd number of cards */
  .tilt-card-wrapper:last-child:nth-child(odd) {
    grid-column: auto / span 2;
  }

  /* Selects the first TiltCard when there are an even number of cards */
  .tilt-card-wrapper:last-child:nth-last-child(even) {
    grid-column: auto / span 1;
  }
}
</style>
