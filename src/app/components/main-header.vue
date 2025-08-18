<template>
  <div class="flex flex-row justify-between items-center w-full bg-white">
    <h1 class="text-dark font-sans text-lg">Nombre del evento.</h1>
    <div>
      <UChip 
        :show="showBadge" 
        size="lg" 
        inset 
        color="error"
        :ui="{
          base: 'mt-1 mr-2'
        }"
      >
        <UButton icon="si:notifications-thick-fill" color="primary" size="xl" variant="ghost" />
      </UChip>
    </div>
  </div>
</template>

<script lang="ts" setup>

// TODO: Call api to get number of cart items
const items = computed(() => 2);
const showBadge = computed(() => items.value > 0);

</script>