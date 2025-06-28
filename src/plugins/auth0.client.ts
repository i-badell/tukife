import { createAuth0, User } from '@auth0/auth0-vue'

interface AuthService {
  isAuthenticated: boolean;
  user: User | undefined;
  loading: boolean;
  error: any; 
  login: (options?: any) => void;
  logout: (options?: any) => void;
  getToken: () => Promise<string | undefined>;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const auth0Plugin = createAuth0({
    domain: config.public.domain,
    clientId: config.public.clientId,
    authorizationParams: {
      redirect_uri: `${window.location.origin}/auth/callback`,
    },
  }, {
    skipRedirectCallback: window.location.pathname === '/auth/callback',
  })

  console.log('Auth0 plugin initialized with config:', {
    domain: config.public.domain,
    clientId: config.public.clientId,
    redirectUri: window.location.origin,
    instance: { ...auth0Plugin }
  });

  
  nuxtApp.vueApp.use(auth0Plugin)
})