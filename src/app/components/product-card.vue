<template>
  <article
    class="w-full relative rounded-md bg-[#fdfdfd] border border-[#fafaf9] flex flex-row items-start justify-between p-4 text-left text-lg text-[#181818] font-inria-sans">
    <NuxtImg 
      class="w-[102px] max-h-full object-cover flex-1" 
      :src="product.imageUrl" 
      :alt="product.name" />
    <div class="flex flex-col items-start justify-start pl-4 gap-2 flex-2">
      <div class="flex flex-col items-start justify-start">
        <h3 class="text-base font-normal w-full text-dark">{{ product.name }}</h3>
        <p class="w-full text-sm font-serif max-w-full text-muted">
          {{ product.description }}
        </p>
      </div>
      <div class="flex justify-between w-full">
        <span class="flex items-center">${{  product.price }}</span>
        <ProductButtons 
          :product-id="product.productId"
          v-bind:model-value="amount"
          :edit-duration-ms="5000"
          @update-amount="amountUpdate"
          @click="handleClick"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from '~~/shared/types/products';
import ProductButtons from './product-buttons.vue';

const { product, amount } = defineProps<{
  product: Product;
  amount: number;
}>()

const emit = defineEmits<{ 
  (evt: 'amountUpdate', product: Product, quantity: number ) : void 
  (evt: 'editStarted') : void
}>();

const amountUpdate = (payload: number) => emit('amountUpdate', product, payload);
const handleClick = () => emit('editStarted');

</script>