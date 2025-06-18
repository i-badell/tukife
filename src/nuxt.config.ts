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
      name: "Mi Evento",
      short_name: "Evento",
      lang: "es",
      start_url: "/",
      display: "standalone",
    },
    workbox: {
      /* caché de assets, rutas de API, etc. */
    },
  },
  axios: {
    baseURL: process.env.API_BASE_URL || "https://api.miapp.com",
  },
});
