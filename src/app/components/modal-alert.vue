<script setup lang="ts">
const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    title="Estas a punto de crear un nuevo carrito"
  >
    <template #footer>
      <div class="flex justify-between gap-2">
        <UButton color="neutral" label="Cancelar" @click="emit('close', false)" />
        <UButton label="Confirmar" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>