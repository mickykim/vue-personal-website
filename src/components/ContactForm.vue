<template>
  <div class="container">
    <form method="POST" @submit.prevent="sendEmail">
      <label for="fname">First Name (Required)</label>
      <input
        type="text"
        id="fname"
        name="firstname"
        placeholder="Name"
        required
      />

      <label for="email">Email (Required)</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="you@example.com"
        required
      />

      <label for="company">Company</label>
      <input type="text" id="company" name="company" placeholder="Company" />

      <label for="message">Message (Required)</label>
      <textarea
        id="message"
        name="message"
        placeholder="Write something.."
        style="height: 200px"
        required
      ></textarea>

      <input type="submit" value="Submit" />
    </form>
  </div>
  <div class="circle-loader">
    <div class="checkmark draw"></div>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosError } from "axios";
import { ref } from "vue";
const name = ref();
const company = ref();
const email = ref();
const message = ref();

const displayLoading = ref(false);
const sendEmail = async () => {
  displayLoading.value = true;
  try {
    const { data, status } = await axios.post(
      "https://formspree.io/f/mqkjeqaw",
      {
        name: name.value,
        email: email.value,
        subject: company.value
          ? `mikim.dev | Contact request from  ${name.value} of ${company.value}`
          : `mikim.dev | Contact request from  ${name.value}`,
        message: message.value,
      }
    );
    if (status) {
      displayLoading.value = false;
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
    }
  }
};
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  padding-bottom: 15rem;
}
textarea {
  /* Set max and min width so that textarea can only resize vertically without changing the cursor */
  resize: vertical;
  min-height: 250px;
}
textarea:after {
  cursor: nwse-resize;
}
label {
  font-size: 1.25rem;
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
}

//Circle loader animation
// Define vars we'll be using
$brand-success: hsl(var(--c-primary-600, 120deg, 39.3%, 54.1%));
$loader-size: 7em;
$loader-thickness: 3px;
$check-height: calc($loader-size/2);
$check-width: calc($check-height/2);
$check-left: calc($loader-size/6 + $loader-size/12);
$check-thickness: 3px;
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
