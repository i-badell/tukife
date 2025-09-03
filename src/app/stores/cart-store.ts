import { ErorrCodes } from "~~/shared/constants/errors";
import localforage from "localforage";
import type { CartDelta, CartItem, CartLines, Product, StandId } from "~~/shared/types/products"
import { de, it } from "@nuxt/ui/runtime/locale/index.js";
import { backoffRetry } from "~/utilis/backoff-retry";
import type { _GettersTree } from "pinia";

const QUEUE_KEY = 'tuki_cart_queue'
const ITEMS_KEY = 'tuki_cart_items'
const STAND_KEY = 'tuki_cart_stand'

interface State {
	items: CartLines;
	syncing: boolean;
	queue: CartDelta[];
	standId: StandId | null;
	lastSyncAt?: number;
	pendingFlush: boolean;
}

interface Getters extends _GettersTree<State> {
  totalItems: (state: State) => number
  qtyByProduct: (state: State) => (id: ProductId) => number
  hasOtherStand: (state: State) => (standId: StandId) => boolean
  asArray: (state: State) => CartLine[]
}

interface Actions {
	loadPersisted: () => Promise<void>;
	persistAll: () => Promise<void>;
	putProduct: (product: Product, quantity: number) => void;
	clear: () => void;

	localPutCartLine: (payload: CartDelta) => void;
	clearLocal: () => void;

	_flushTimer: ReturnType<typeof setTimeout> | undefined;
	_scheduleFlush: () => void;
	flushQueue: () => void;
	enqueueDelta: (delta: CartDelta) => void;
}

export const useCartStore = defineStore<
	'cartStore',
	State, 
	Getters,
	Actions 
>('cartStore', {
	state: () => ({
		items: {},
		syncing: false,
		queue: [],
		standId: null,
		pendingFlush: false,
	}),
	getters: {
    totalItems: (s: State) => Object.values(s.items).reduce((curr, item) => curr + item.quantity, 0),
    qtyByProduct: (s: State) => (id: ProductId) => s.items[id]?.quantity ?? 0,
    hasOtherStand: (s: State) => (standId: StandId) => s.standId !== null && s.standId !== standId,
    asArray: (s: State) => Object.values(s.items),
  },
	actions: {
		async loadPersisted() {
      const [queue, items, standId] = await Promise.all([
        localforage.getItem<string | null>(QUEUE_KEY),
        localforage.getItem<string | null>(ITEMS_KEY),
        localforage.getItem<string | null>(STAND_KEY),
      ])

      if (queue !== null) this.queue = JSON.parse(queue)
      if (items !== null) this.items = JSON.parse(items) 
      if (standId !== null) this.standId = JSON.parse(standId ?? ''); 
    },

    async persistAll() {
      await Promise.all([
        localforage.setItem(QUEUE_KEY, JSON.stringify(this.queue)),
        localforage.setItem(ITEMS_KEY, JSON.stringify(this.items)),
        localforage.setItem(STAND_KEY, JSON.stringify(this.standId)),
      ])
    },

		localPutCartLine(payload : CartDelta) {
			if (this.standId && this.standId !== payload.standId) {
				throw new Error(ErorrCodes.DIFFERENT_STORE);
			}
			if (!this.standId) this.standId = payload.standId;

      if (payload.delta <= 0) {
        delete this.items[payload.productId]
      } else {
        this.items[payload.standId] = {
          productId: payload.productId,
          standId: payload.standId,
          quantity: payload.delta,
          price: payload.price,
        }
      }
      if (Object.keys(this.items).length === 0) this.standId = null
		},

		clearLocal() {
			this.items = {};
			this.standId = null;
		},

		// ---------------------------------------
		// ----------- Queue and flush -----------
		// ---------------------------------------

		enqueueDelta(payload: CartDelta) {
			this.pendingFlush = this.pendingFlush || true;
			const idx = this.queue.findIndex(x => x.productId === payload.productId && x.standId === payload.standId);
			if (idx !== -1) {
				this.queue[idx] = payload;
			} else {
				this.queue.push(payload)
			}
      this.persistAll()
      this._scheduleFlush()
    },

    _flushTimer: undefined as ReturnType<typeof setTimeout> | undefined,
    _scheduleFlush(delay = 600) {
      if (this._flushTimer) clearTimeout(this._flushTimer)
      this._flushTimer = setTimeout(() => this.flushQueue(), delay)
    },

	    async flushQueue() {
      if (this.syncing || this.queue.length === 0) return
      if (!navigator.onLine) return // deja la cola para cuando haya red

      const payload: BatchPayload = { deltas: this.queue }
      this.syncing = true
      try {
        // backoff + batch endpoint (payload mínimo)
        const config = useRuntimeConfig()
        const token = useCookie('auth')?.value
        await backoffRetry(() => {
					// TODO: Use real fetch
					return Promise.resolve();
				}
          // $fetch('/cart/batch', {
          //   baseURL: config.public.apiBase,
          //   method: 'POST',
          //   headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          //   body: payload,
          // })
        )

        this.queue = []
        this.lastSyncAt = Date.now();
				this.pendingFlush = false;
        await this.persistAll()
      } catch (e: any) {
        if (e?.status === 409 || e?.statusCode === 409) throw e
      } finally {
        this.syncing = false
      }
    },

		putProduct(product: Product, quantity = 1) {
			const delta = { 
				price: product.price,
				delta: quantity,
				standId: product.standId,
				productId: product.productId 
			};
			this.localPutCartLine(delta);
			this.enqueueDelta(delta);
		},
		clear() {
      this.clearLocal()
      this.queue = []
      this.persistAll()
    },
	}
})