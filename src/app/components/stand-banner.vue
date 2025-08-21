<template>
  <div class="h-[150px] w-full rounded-lg relative overflow-hidden ">
    <NuxtImg class="h-full w-full object-cover" :src="props.image"/>

    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

    <div
      class="absolute left-4 bottom-4 max-w-[80%] rounded-lg bg-primary-50 px-4 py-2 shadow-lg backdrop-blur-sm"
    >
      <h3 class="text-lg font-light text-white leading-none">{{ props.standName }}</h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  standName: string
  image: string
}>();
</script>