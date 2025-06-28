import { useAuth0 } from '@auth0/auth0-vue'
import { computed }   from 'vue'
import type { AppState, User } from '@auth0/auth0-vue'

export function useAuthService()  : AuthService  {
  if (!process.client) {
    return {
      user:          null,
      isLoggedIn:    computed(() => false),
      loading:       computed(() => false),
      error:         computed(() => null),
      login:         (opts?: any) => {},
      logout:        (opts?: any) => {},
      getToken:      async () => undefined,
      handleRedirectCallback: (url?: string) => undefined 
    }
  }

  const {
    loginWithRedirect,
    logout,
    getAccessTokenSilently: getToken,
    user,
    isAuthenticated,
    isLoading: loading,
    error,
    handleRedirectCallback,
  } = useAuth0()
    
  return {
    user,                                    // Ref<User|null>
    isLoggedIn: computed(() => isAuthenticated.value),
    loading,                                 // Ref<boolean>
    error,                                   // Ref<Error|null>
    login:  (opts?: any) => loginWithRedirect(opts),
    logout: (opts?: any) => logout(opts),
    getToken,
    handleRedirectCallback
  }
}

export interface AuthService  {
  user: User | null;
  isLoggedIn: Ref<boolean>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  login: (opts?: any) => void;
  logout: (opts?: any) => void;
  getToken: () => Promise<string | undefined>;
  handleRedirectCallback?: (url: string | undefined) => any;
}