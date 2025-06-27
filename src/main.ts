import App from "./app.vue";
import { createAuth0 } from "@auth0/auth0-vue";
import { createApp } from "vue";

const app = createApp(App);
const config = useRuntimeConfig();

app.use(
  createAuth0({
    domain: config.auth0.domain,
    clientId: config.auth0.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  }),
);

app.mount("#app");
