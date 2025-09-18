<script lang="ts" setup>
const { data: products } = await useFetch<CartItem[]>("/api/cart", {
  server: true,
  lazy: true,
  key: "active-cart",
});

definePageMeta({
  title: "Carrito de compra",
  layout: "stand",
});
</script>

<template>
  <div>
    <div class="flex flex-col">
      <ProductCard
        v-for="product in products"
        :key="product.productId"
        :product="product"
        :amount="product.amount"
        class="my-2 shadow-xs"
      />
    </div>
  </div>
</template>
