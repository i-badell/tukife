<script lang="ts" setup>
import type ProductCard from '~/components/product-card.vue';
import { ErorrCodes } from '~~/shared/constants/errors';
import type { CartItem } from '~~/shared/types/products';
import { mergeProductsWithCart } from '~~/shared/utils/cart.util';

const route = useRoute();
const standId = computed(() => route.params.standId as string);
const opts = { server: true, lazy: true } 

const { data: hasOtherCart } = await useFetch<boolean>(
  `/api/cart/${standId.value}/hasOtherCart`,
  { ...opts, key: `hoc:${standId.value}` }
)

let products = ref<CartItem[]>([])

if (hasOtherCart.value) {
 const { data: productsRef } = await useFetch<CartItem[]>(
    `/api/products/${standId.value}`,
    { ...opts, key: `products:${standId.value}` }
  )
  products.value = mergeProductsWithCart(productsRef.value ?? []);
} else {
 const [
    { data: productsRef },
    { data: cartRef }
  ] = await Promise.all([
    useFetch<CartItem[]>(`/api/products/${standId.value}`, { ...opts, key: `products:${standId.value}` }),
    useFetch<CartLine[]>(`/api/cart/${standId.value}`, { ...opts, key: `cart:${standId.value}` })
  ]);
  products.value = mergeProductsWithCart(productsRef.value ?? [], cartRef.value ?? []);
}

const {
  put: addToCart,
  clear: emptyCart,
} = useCartStore();


const showPrompt = ref(false)
let pendingAction: null | (() => void) = null
const editors = ref<Record<string, typeof ProductCard>>({})
const modal = useAlertDialog();

function setEditorRef(id: string, el: unknown) {
  if (!el) {
    delete editors.value[id]
    return
  }

  editors.value[id] = el as typeof ProductCard
}

function handleUpdateComplete(product: Product, quantity: number) {
  try {
    addToCart(product, quantity)
  } catch (e: any) {
    if (e.message === ErorrCodes.DIFFERENT_STORE) {
      showPrompt.value = true;
      pendingAction = () => addToCart(product, quantity);
    }
  }
}

async function handleUpdateStart(productId: string) {
  if (hasOtherCart.value) {
    const confirm = await modal.showAndWaitResponse();
    if (confirm) {
      emptyCart()
      pendingAction?.()
      pendingAction = null
      return;
    }
    editors.value[productId]?.cancelEdit();
  }
}

definePageMeta({
  layout: 'stand'
})


</script>

<template>
  <div>
    <UAlert
      v-show="hasOtherCart"
      description="Tu carrito actual pertenece a otro stand. Si agregás un producto de aquí, reemplazaremos el carrito."
      icon="si:warning-line"
      color="warning"
      class="text-muted items-center"
    />
    <StandBanner stand-name="OPB Beer Truck" class="my-4 shadow-xs" image="banner.jpg" />
    <div class="flex flex-col">
      <ProductCard 
        v-for="product in products"
        :key="product.productId"
        :ref="(el) => setEditorRef(product.productId, el)"
        :product="product"
        :amount="product.amount"
        class="my-2 shadow-xs"
        @amount-update-complete="handleUpdateComplete"
        @amount-update-start="handleUpdateStart(product.productId)"
        />
    </div>
  </div>
</template>
