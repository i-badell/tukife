<template>
  <article
    class="w-full relative rounded-md bg-[#fdfdfd] border border-[#fafaf9] flex flex-row items-start justify-between p-4 text-left text-lg text-[#181818] font-inria-sans">
    <NuxtImg 
      class="w-[102px] max-h-full object-cover flex-1" 
      :src="imageUrl" 
      :alt="name" />
    <div class="flex flex-col items-start justify-start pl-4 gap-2 flex-2">
      <div class="flex flex-col items-start justify-start">
        <h3 class="text-base font-normal w-full text-dark">{{ name }}</h3>
        <p class="w-full text-sm font-serif max-w-full text-muted">
          {{ description }}
        </p>
      </div>
      <div class="flex justify-between w-full">
        <span>${{  price }}</span>
        <ProductButtons 
          :product-id="productId"
          :amount="amount"
        />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { CartItem } from '../../shared/types/products';
import ProductButtons from './product-buttons.vue';

const { productId, name, description, price, imageUrl, amount } = defineProps<CartItem>()

</script>