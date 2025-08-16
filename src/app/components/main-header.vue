<template>
  <div class="flex flex-row justify-between items-center w-full py-4 px-6 bg-white">
    <h1 class="text-dark font-sans text-lg">Nombre del evento.</h1>
    <div>
      <UChip 
        :text="items" 
        :show="showBadge" 
        size="2xl" 
        inset 
        :ui="{
          base: 'ring-0 px-1 py-1 bg-error text-color-white font-bold',
        }"
      >
        <UButton icon="material-symbols:shopping-cart" color="primary" size="xl" variant="ghost" />
      </UChip>
    </div>
  </div>
</template>

<script lang="ts" setup>

const items = computed(() => 1);
const showBadge = computed(() => items.value > 0);

</script>