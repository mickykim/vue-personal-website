<template>
  <div class="container" ref="container">
    <form method="POST" @submit.prevent="sendEmail" v-if="!displayLoading">
      <div class="label__wrapper">
        <label for="fname">First Name (Required)</label>
      </div>
      <input
        type="text"
        id="fname"
        name="firstname"
        placeholder="Name"
        v-model="name"
        required
      />
      <div class="label__wrapper">
        <label for="email">Email (Required)</label>
      </div>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        v-model="email"
        required
      />
      <div class="label__wrapper">
        <label for="company">Company</label>
      </div>
      <input
        type="text"
        id="company"
        name="company"
        placeholder="Company"
        v-model="company"
      />
      <div class="label__wrapper">
        <label for="message">Message (Required)</label>
      </div>
      <textarea
        id="message"
        name="message"
        placeholder="Write something.."
        style="height: 200px"
        v-model="message"
        required
      ></textarea>

      <input type="submit" value="Submit" />
    </form>
    <div class="circle-loader" v-if="displayLoading" ref="circleLoader">
      <div class="checkmark draw" ref="checkmark"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from "axios";
import gsap from "gsap";
import { onMounted, ref, watch } from "vue";

//References
const name = ref();
const company = ref();
const email = ref();
const message = ref();
const displayLoading = ref(false);
const circleLoader = ref<HTMLDivElement>();
const checkmark = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();

// Helper functions
const sendEmail = async () => {
  if (!container.value) throw new Error("container ref not found");
  displayLoading.value = true;
  container.value.style.display = "flex";
  container.value.style.justifyContent = "center";
  container.value.style.alignItems = "center";

  try {
    const { data, status } = await axios.post(
      "https://formspree.io/f/mqkjeqaw",
      {
        //! NEED TO SANITIZE INPUTS!!
        name: name.value,
        email: email.value,
        subject: company.value
          ? `mikim.dev | Contact request from  ${name.value} of ${company.value}`
          : `mikim.dev | Contact request from  ${name.value}`,
        message: message.value,
      }
    );
    if (status) {
      if (!circleLoader.value) throw new Error("circle loader ref not found");
      if (!checkmark.value) throw new Error("checkmark ref not found");
      circleLoader.value.classList.toggle("load-complete");
      checkmark.value.style.display = "block";
      setTimeout(() => {
        if (!circleLoader.value) throw new Error("circle loader ref not found");
        if (!checkmark.value) throw new Error("checkmark ref not found");
        circleLoader.value.classList.toggle("load-complete");
        checkmark.value.style.display = "none";
        displayLoading.value = false;
      }, 3000);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      displayLoading.value = false;
      console.log(error.config);
      alert("Error sending email, please try again");
    }
  }
};

//Lifecycle methods
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: "form", start: "top 80%" },
    defaults: { duration: 1, ease: "power2.inOut" },
  });
  tl.from("label", { y: 101, stagger: 0.2 });
});
</script>

<style scoped lang="scss">
.container {
  min-height: 750px;
}
form {
  display: flex;
  flex-direction: column;
  padding-bottom: 15rem;
  width: 100%;
  color: hsl(var(--c-primary-900, var(--c-red-900)));
}
textarea {
  /* Set max and min width so that textarea can only resize vertically without changing the cursor */
  resize: vertical;
  min-height: 250px;
}
textarea:after {
  cursor: nwse-resize;
}
.label__wrapper {
  overflow: hidden;
}
label {
  font-size: 1.25rem;
  display: inline-block;
}

textarea,
input {
  background: hsla(var(--c-white), 0.4);
  padding: 1rem 0.5rem;
  border: none;
  color: hsl(var(--c-primary-100));
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}
input:focus,
textarea:focus {
  outline-color: hsl(var(--c-priamry-900, 0deg, 50%, 50%));
  outline-style: solid;
  outline-width: 3px;
}
input[type="submit"] {
  background: hsl(var(--c-primary-600, var(--c-white)));
  transition: background 1s;
  padding: 1.125rem 2rem;
  align-self: center;
  cursor: pointer;
  box-shadow: inset 0 1px 0 hsl(var(--c-primary-900)),
    0 2px 3px hsla(0, 0%, 0%, 0.12), 0 2px 5px hsla(0, 0%, 0%, 0.24);
  outline: none;
}

input[type="submit"]:active {
  box-shadow: none;
}

//Circle loader animation
// Define vars we'll be using
$brand-success: hsl(var(--c-primary-600, 120deg, 39.3%, 54.1%));
$loader-size: 10em;
$loader-thickness: 4px;
$check-height: calc($loader-size/2);
$check-width: calc($check-height/2);
$check-left: calc($loader-size/6 + $loader-size/12);
$check-thickness: 8px;
$check-color: $brand-success;

.circle-loader {
  margin-bottom: calc($loader-size/2);
  border: $loader-thickness solid rgba(0, 0, 0, 0.2);
  border-left-color: $check-color;
  animation: loader-spin 1.2s infinite linear;
  position: relative;
  display: inline-block;
  vertical-align: top;
  border-radius: 50%;
  width: $loader-size;
  height: $loader-size;
}

.load-complete {
  -webkit-animation: none;
  animation: none;
  border-color: $check-color;
  transition: border 500ms ease-out;
}

.checkmark {
  display: none;

  &.draw:after {
    animation-duration: 800ms;
    animation-timing-function: ease;
    animation-name: checkmark;
    transform: scaleX(-1) rotate(135deg);
  }

  &:after {
    opacity: 1;
    height: $check-height;
    width: $check-width;
    transform-origin: left top;
    border-right: $check-thickness solid $check-color;
    border-top: $check-thickness solid $check-color;
    content: "";
    left: $check-left;
    top: $check-height;
    position: absolute;
  }
}

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes checkmark {
  0% {
    height: 0;
    width: 0;
    opacity: 1;
  }
  20% {
    height: 0;
    width: $check-width;
    opacity: 1;
  }
  40% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
  100% {
    height: $check-height;
    width: $check-width;
    opacity: 1;
  }
}
</style>
