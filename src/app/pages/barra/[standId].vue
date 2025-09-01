<script lang="ts" setup>
import type { CartItem } from '~~/shared/types/products';

definePageMeta({
  layout: 'stand'
})
const { data: products } = await useFetch<CartItem[]>(`/api/products/${123}`)

</script>

<template>
  <div>
    <StandBanner stand-name="OPB Beer Truck" class="my-4 shadow-xs" image="banner.jpg" />
    <div class="flex flex-col">
      <ProductCard 
        v-for="product in products"
        :product-id="product.productId"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :image-url="product.imageUrl"
        :amount="0"
        class="my-2 shadow-xs"
        />
    </div>
  </div>
</template>
