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
          :full-title="card.fullTitle"
          :subtitle="card.subtitle"
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
    title: "Belmont Village",
    fullTitle: "Belmont Village ",
    subtitle: "Senior Living",
    description: "Full website export from HubSpot CMS to own custom server.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "pathfinder-no-bg.svg",
    websiteLink: "https://belmontvillage.com.mx/",
  },
  {
    title: "Pathfinder",
    fullTitle: "Pathfinder",
    subtitle: "Interactive Dijkstra's & A* w/ Touch",
    description: "Interactive pathfinding algorithm visualizer made in React.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    image: "pathfinder-no-bg.svg",
    githubLink: "https://github.com/mickykim/pathfinder",
    websiteLink: "https://mikimpathfinder.vercel.app/",
  },
  {
    title: "Invex Capital",
    fullTitle: "Invex Capital",
    subtitle: "Invex Capital",
    description:
      "Landing page redesign focused on better performance and user experience. Contains a custom made gallery component and is integrated with HubSpot CMS",
    tags: ["HubSpot/HubL", "React", "JavaScript", "HTML/CSS"],
    image: "invexcapital.webp",
  },
  {
    title: "Construlita",
    description: "Landing page redesign focusing on best performance possible.",
    tags: ["React", "TypeScript", "TailwindCSS"],
    image: "construlita.webp",
    githubLink: "https://github.com/mickykim/construlita",
    websiteLink: "https://construlita.vercel.app/",
  },
  // {
  //   title: "check.gg",
  //   description: "Esports match calendar",
  //   tags: ["Mongoose", "Express", "React", "Node.js"],
  //   image: "websiteImage.jpg",
  // },
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
