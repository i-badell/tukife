<template>
  <article
    class="w-full relative rounded-md bg-[#fdfdfd] border border-[#fafaf9] flex flex-row items-start justify-between p-4 text-left text-lg text-[#181818] font-inria-sans">
    <NuxtImg class="w-[102px] max-h-full object-cover flex-1" :src="imageUrl" :alt="name" />
    <div class="flex flex-col items-start justify-start pl-4 gap-2 flex-2">
      <div class="flex flex-col items-start justify-start">
        <h3 class="text-base font-semibold tracking-[0.01em]">{{ name }}</h3>
        <p class="w-[200px] text-sm tracking-[0.01em] font-inria-serif max-w-[200px]">
          {{ description }}
        </p>
      </div>
      <div class="w-full flex flex-row items-center justify-between">
        <span class="text-base font-medium tracking-[0.01em]">${{ price }}</span>
        <button class="rounded bg-[#00c2a8] flex flex-row items-center justify-center p-2"
          aria-label="Agregar al carrito">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 18V6" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inria+Sans&family=Inria+Serif&display=swap');

.font-inria-sans {
  font-family: 'Inria Sans', sans-serif;
}
.font-inria-serif {
  font-family: 'Inria Serif', serif;
}
</style>


<script lang="ts" setup>
import type { Product } from '../types/products';

const { name, description, price, imageUrl } = defineProps<Product>()

</script>