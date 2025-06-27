// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@kevinmarrec/nuxt-pwa",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
  ],
  pwa: {
    manifest: {
      name: "Tuki app",
      short_name: "Tuki",
      lang: "es",
      start_url: "/",
      display: "standalone",
    },
    workbox: {
      /* caché de assets, rutas de API, etc. */
    },
  },
  runtimeConfig: {
    public: {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_AUDIENCE,
      scopes: ["openid", "profile", "email"],
    },
  },
});
