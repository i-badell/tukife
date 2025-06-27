import { createAuth0 } from '@auth0/auth0-vue'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const auth0 = createAuth0({
    domain: config.public.domain,
    clientId: config.public.clientId,
    authorizationParams: {
      redirect_uri: 'http://localhost:3001'
    }
  })

  nuxtApp.vueApp.use(auth0)

  addRouteMiddleware('auth', () => {
    auth0.checkSession()
    if (!auth0.isAuthenticated.value) {
      auth0.loginWithRedirect({
        appState: {
          target: useRoute().path,
        },
      })
    }
  })
})
