import type { CartItem, Product } from "~~/shared/types/products"

interface State {
	items: CartItem[];
	standId: string;
	cartId: string;
}
type Getters = {}
interface Actions {
	addProduct: (product: Product) => CartItem;
	removeProduct: (product: Product) => CartItem;
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
		addProduct(product) {
			return { ...product, amount: 1}
		},
		removeProduct(product) {
			return { ...product, amount: 0 }
		},
		emptyCart() {
			
		}
	}
})