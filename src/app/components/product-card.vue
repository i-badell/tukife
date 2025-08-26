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
        <div class="px-2 py-1 self-end gap-1.5 flex flex-row items-center justify-between bg-primary rounded-md text-white">
          <UButton 
            v-if="showSubstractIcon"
            :icon="substractIcon"" 
            size="md" 
            variant="solid" 
            @click="removeProduct"
            :ui="{
              leadingIcon: 'text-white'
            }" 
          />
          <span class=" text-xl font-medium ">{{ amountSelected }}</span>
          <UButton 
            icon="material-symbols:add-2-rounded" 
            size="md" 
            variant="ghost" 
            @click="addProduct"
            :ui="{
              leadingIcon: 'text-white'
            }" 
          />
        </div>
      </div>

    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from '../../shared/types/products';

const { productId, name, description, price, imageUrl, amountSelected } = defineProps<Product & { amountSelected: number}>()
const substractIcon = computed(() => amountSelected == 1 ? 'ic:baseline-delete' : 'mdi:minus')
const showSubstractIcon = computed(() => amountSelected > 0);
const emit = defineEmits<{
  (e: 'add-product', payload: { id: string }) : void;
  (e: 'remove-product', payload: { id: string}) : void;
}>();

function addProduct() {
  emit('add-product', { id: productId });
}
function removeProduct() {
  emit('remove-product', { id: productId });
}
</script>