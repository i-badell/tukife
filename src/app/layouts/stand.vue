<template>
  <div class="inset-0 flex flex-col min-h-screen bg-neutral">
    <header class="sticky top-0 z-50 px-6 py-4 bg-white shadow-xs">
      <MainHeader 
        title="Cosquin Rock"
        :notification-count="1"/>
    </header>

    <main class="flex-1 p-4">
      <slot />
    </main>

    <footer class="sticky bottom-0 z-50 bg-white shadow-sm px-6 py-4">
      <div
        v-if="showPayButton"
        class="w-full flex items-center justify-between "
      >

      	<span>1 Producto $4000</span>
        <UButton 
          icon="ic:outline-credit-card" 
          size="xl" 
          variant="subtle" 
          :ui="{
            leadingIcon: 'text-primary',
            base: 'px-5 py-3'
          }" 
        >
          Ir a pagar
        </UButton>
      </div>
      <span 
        class="w-full flex justify-center"
        v-else
      >
        Agrega productos al carrito para continuar.
      </span>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '~/components/main-header.vue';
const showPayButton = computed(() => 3 > 2);
</script>
