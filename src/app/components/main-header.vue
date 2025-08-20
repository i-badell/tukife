<template>
  <div class="flex justify-between items-center w-full bg-white">
    <div class="w-6 flex justify-start text-muted">
      <span>◀</span>
    </div>
    <div class="flex-1 text-center font-medium">
      <h1 class="text-dark font-sans text-xl font-light">{{ props.title }}</h1>
    </div>
    <div class="w-6 flex justify-end relative">
      <UChip 
        :show="showBadge" 
        size="sm" 
        inset 
        color="primary" 
        :ui="{
          base: 'mt-1 mr-2'
        }"
      >
        <UButton 
          icon="solar:bell-outline" 
          size="xl" 
          variant="ghost" 
          :ui="{
            leadingIcon: 'text-muted'
          }" 
        />
      </UChip>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title: string;
  notificationCount: number;
}>();
// TODO: Call api to get number of notifications
const showBadge = computed(() => props.notificationCount > 0);

</script>