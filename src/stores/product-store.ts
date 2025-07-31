import { defineStore } from 'pinia'
import type { EventData, Catalog, Stand, Product } from '../types/products.ts'

interface State {
  products: Product[];
  stands: Stand[];
}

interface Actions {
  getEventCatalog: () => Product[];
  getStandsSummary: () => Stand[];
  getStandCatalog: (standId: string) => Product[];
}
export const useProductStore = defineStore('event', {
  state: () => ({
    eventId: '' as string,
    catalogs: [] as Catalog[],
    stands: [] as Stand[],
  }),
  getters: {
    allStandProducts: (state) =>
      state.stands.flatMap(s =>
        s.catalogs.flatMap(c => c.products)
      ),
  },
  actions: {
    // Carga el JSON completo
    setEventData(payload: EventData) {
      this.eventId = payload.eventId
      this.catalogs = payload.catalogs
      this.stands = payload.stands
    },
    // Agrega un catálogo global
    addCatalog(cat: Catalog) {
      this.catalogs.push(cat)
    },
    // Agrega un stand
    addStand(stand: Stand) {
      this.stands.push(stand)
    },
    // Limpia todo
    reset() {
      this.eventId = ''
      this.catalogs = []
      this.stands = []
    },
  },
})
