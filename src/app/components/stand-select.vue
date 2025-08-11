<script setup lang="ts">
const props = defineProps<{
  stands: StandDefinition[],
  selected: StandDefinition 
}>();
const items = ref(props.stands.map(x => ({label: x.name, value: x.standId})))
const value = ref({label: props.selected.name, value: props.selected.standId})
</script>

<template>
  <USelectMenu 
    v-model="value" 
    :search-input="{
      placeholder: 'Filter...',
      icon: 'i-lucide-search'
    }" 
    :items="items" 
    class="w-48" />
</template>
