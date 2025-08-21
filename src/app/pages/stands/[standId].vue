<script lang="ts" setup>
definePageMeta({
  layout: 'stand'
})
import { type Product, type StandDefinition } from '~~/shared/types/products';
const { data: stands } = await useFetch<StandDefinition[]>('/api/stands/all')
const { data: products } = await useFetch<Product[]>(`/api/stands/${123}`) 

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
        :amount-selected="1"
        class="my-2 shadow-xs"
        />
    </div>
  </div>
</template>
