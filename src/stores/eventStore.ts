import type { InitialEventData, Product, Stand } from "~/types/products";
import { Guards } from "~/utils/guards.util";

interface State {
  eventId: string;
  authToken: string;
  hasStands: boolean;
  isReady: boolean;
  products?: Product[];
  standProductSummary?: Stand[];
}

interface Actions {
  fetchInitialData: () => void;
  setAuthToken: (token: string) => void;
}

type Getters = {
  getStand: () => (id: string) => Stand;
}

const initialState: State = {
  eventId: '',
  authToken: '',
  hasStands: false,
  isReady: false,
  products: undefined,
  standProductSummary: undefined
}

export const useEventStore = defineStore<
  'EventStore',
  State,
  Getters,
  Actions
>('EventStore', {
  state: () => (initialState),
  getters: {
    getStand(): (id: string) => Stand {
      return (id: string) => {
        return {} as Stand;
      }
    }
  },
  actions: {
    async fetchInitialData() {

      if (Guards.isSsr()) {
        console.log('TEST: SSR, exiting fetchInitialData');
        return;
      }

      if (Guards.isNullOrUndefined(this.authToken)) {
        console.log('TEST: no token, exiting fetchInitialData');
        return;
      }

      const baseUrl = useRuntimeConfig().public.apiConfig.eventsApiBaseUrl;
      const url = `events/${this.eventId}/products`;
      try {
        const initialData = await $fetch<InitialEventData>(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
          },
          baseURL: baseUrl
        });
        console.log("TEST:", initialData);
      } catch (err) {
        console.error("ERROR:", err);
      }
    },
    setAuthToken(token: string) {
      console.log('TEST: setting token');
      this.authToken = token;
    }
  }
}); 
