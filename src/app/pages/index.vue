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
    <button v-if="showLogout" @click="logout">Logout</button>
</template>

<script lang="ts" setup>
import type { MainPageData } from '../types/pageData';
import { Product } from '#components';

const { loading, logout, login, isLoggedIn } = useAuthService();
const showLogout = ref(false);
showLogout.value = isLoggedIn.value || false;
const { data, error, refresh } = useFetch<MainPageData>(`/api/home/data`, {server: true})
const products = computed(() =>
  data.value?.stands?.flatMap(x => x.products.map(y => {
    return {
        ...y,
        imageUrl: 'https://placehold.co/200'
    }})) ?? []
);

</script>
