import { createAuth0, User } from '@auth0/auth0-vue'
import { AuthConfig } from '~~/shared/config/auth.config';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const auth0Plugin = createAuth0({
    domain: config.public.domain,
    clientId: config.public.clientId,
    authorizationParams: {
      redirect_uri: AuthConfig.callbackUrl(window.location.origin),
      audience: config.public.audience,
      // scope: config.public.scopes.join(' '),
    },
  }, {
    skipRedirectCallback: window.location.pathname === '/auth/callback',
  })

    domain: config.public.domain,
    clientId: config.public.clientId,
    redirectUri: AuthConfig.callbackUrl(window.location.origin),
    instance: { ...auth0Plugin }
  });

  
  nuxtApp.vueApp.use(auth0Plugin)
})