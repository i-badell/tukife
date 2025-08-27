import type { CartPayload } from "~~/shared/types/api";
import type { CartItem, Product } from "~~/shared/types/products"

interface State {
	items: CartItem[];
	standId: string;
	cartId: string;
}

type Getters = {}

interface Actions {
	updateProduct: (product: CartItem) => CartItem;
	emptyCart: () => void;
}

export const cartStore = defineStore<
	'cartStore',
	State, 
	Getters,
	Actions
>('cartStore', {
	state: () => ({
		items: [] as CartItem[],
		standId: '',
		cartId: ''
	}),
	actions: {
		updateProduct(payload : CartItem) {
			const idx = this.items.findIndex(x => x.productId === payload.productId);
			if (idx === -1) {
				const cartItem = payload;
				if (payload.amount !== 0) this.items.push(cartItem);
				return cartItem;
			}
			if (payload.amount === 0) {
				this.items.slice(idx, idx);
				return payload;
			}
			const cartItem = this.items[idx];
			if (!cartItem) {
				throw new Error("Something went terribly wrong. PANIC");
			}
			cartItem.amount = payload.amount;
			return cartItem;
		},
		emptyCart() {
			this.items = [] as CartItem[];
		}
	}
})