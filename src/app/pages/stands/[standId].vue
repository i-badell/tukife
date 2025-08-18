<script lang="ts" setup>
import { type Product, type StandDefinition } from '~~/shared/types/products';
const { data: stands } = await useFetch<StandDefinition[]>('/api/stands/all')
const { data: products } = await useFetch<Product[]>(`/api/stands/${123}`) 

</script>

<template>
  <div>
    <StandSelect :stands="stands" :selected="stands[0]" />
    <div class="flex flex-col">
      <ProductCard 
        v-for="product in products"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :image-url="product.imageUrl"
        class="my-2 shadow-xs"
        />
    </div>
  </div>
</template>
