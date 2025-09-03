<script lang="ts" setup>
import ModalAlert from '~/components/modal-alert.vue';
import type ProductCard from '~/components/product-card.vue';
import { ErorrCodes } from '~~/shared/constants/errors';
import type { CartItem } from '~~/shared/types/products';

const route = useRoute();
const standId = computed(() => route.params.standId as string);
const cartService = useCartService();

const overlay = useOverlay()

const modal = overlay.create(ModalAlert)
const hasOtherCart = computed(() => cartService.hasOtherStand(standId.value))
const showPrompt = ref(false)
let pendingAction: null | (() => void) = null
const editors = ref<Record<string, typeof ProductCard>>({})

function setEditorRef(id: string, el: unknown) {
  if (!el) {
    delete editors.value[id]
    return
  }

  editors.value[id] = el as typeof ProductCard 
}

function handleProductUpdate(product: Product, quantity: number) {
  try {
    cartService.put(product, quantity)
  } catch (e: any) {
    if (e.message === ErorrCodes.DIFFERENT_STORE) {
      showPrompt.value = true;
      pendingAction = () => cartService.put(product, quantity);
    }
  }
}


async function handleEditStart(productId: string) {
  if (hasOtherCart.value) {
    const instance = modal.open();  
    const confirm = await instance.result
    if (confirm) confirmSwitchStore();
    editors.value[productId]?.cancelEdit();
  }
}

definePageMeta({
  layout: 'stand'
})

function confirmSwitchStore() {
  cartService.clear()       // limpiamos local y cola
  pendingAction?.()  // re-aplicamos la accion original
  pendingAction = null
}
const { data: storeProducts } = await useFetch<CartItem[]>(`/api/products/${123}`)

const products = ref(cartService.mergeWithCart(storeProducts.value ?? []));
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
        :ref="(el) => setEditorRef(product.productId, el)"
        :product="product"
        :amount="0"
        class="my-2 shadow-xs"
        @amount-update="handleProductUpdate"
        @edit-started="handleEditStart(product.productId)"
        />
    </div>

    <dialog v-show="showPrompt" open class="p-4 rounded-xl border">
      <p class="mb-3">Ya tenés un carrito de otra tienda. ¿Vaciar y seguir?</p>
      <div class="flex gap-2">
        <button class="px-3 py-1 rounded bg-emerald-600 text-white" @click="confirmSwitchStore">Sí</button>
        <button class="px-3 py-1 rounded bg-gray-200" @click="hasOtherCart=false">No</button>
      </div>
    </dialog>
  </div>
</template>
