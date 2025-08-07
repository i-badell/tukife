import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue'
import type { User } from '@auth0/auth0-vue'
import { Guards } from '~/utils/guards.util';

export interface AuthService {
  user: User | null;
  isLoggedIn: Ref<boolean>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  login: (opts?: any) => void;
  logout: (opts?: any) => void;
  getToken: () => Promise<string | undefined>;
  handleRedirectCallback?: (url: string | undefined) => any;
}

const emptyAuthService = {
  user: null,
  isLoggedIn: computed(() => false),
  loading: computed(() => false),
  error: computed(() => null),
  login: (_?: any) => { },
  logout: (_?: any) => { },
  getToken: async () => undefined,
  handleRedirectCallback: (_?: string) => undefined
};

export function useAuthService(): AuthService {
  // If in server we return a mock
  if (Guards.isSsr()) return emptyAuthService;

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
    login: (opts?: any) => loginWithRedirect(opts),
    logout: (opts?: any) => logout(opts),
    getToken,
    handleRedirectCallback
  }
}
