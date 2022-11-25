import { createApp } from "vue";
import App from "./App.vue";
import withUUID from "vue-uuid";

const app = withUUID(createApp(App)).mount("#app");
