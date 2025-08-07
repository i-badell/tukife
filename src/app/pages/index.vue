<template>
    <h1>Index</h1>
    <div
        v-for="product in products"
    >
        <Product 
            :description="product.description"
            :name="product.name"
            :image-url="product.imageUrl"
            :price="product.price"
            :product-id="product.productId"
        />
    </div>
</template>

<script lang="ts" setup>
import type { MainPageData } from '../types/pageData';

const { data, error, refresh } = useFetch<MainPageData>(`/api/home/data`)
const products = data.value?.stands.map(x => x.products).flat();
console.log("TEST", data.value)
console.log("TEST", error.value)

</script>
