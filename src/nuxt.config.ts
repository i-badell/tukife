// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@pinia/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      errorTimeout: 8000,
      scopes: ["openid", "profile", "email"],
      fetchOptions: {
        credentials: "include",
      },
      server: {
        eventId: "955a8a87-7a18-4a59-ac3c-03e73a53cff0",
        // baseUrl: "http://localhost:7500/api",
        baseUrl: "https://localhost:7165/api"
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Irina+Sans:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
});
