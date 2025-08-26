<template>
  <div v-if="loading" class="absolute inset-0 bg-white flex items-center justify-center z-50">
    <div class="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
