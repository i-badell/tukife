<script lang="ts" setup>
import type { CartPayload } from '~~/shared/types/api';

const emit = defineEmits<{
  (event: 'updateProduct', payload: CartPayload) : void
}>();
const props = defineProps<CartPayload>();

const substractIcon = computed(() => props.amount == 1 ? 'ic:baseline-delete' : 'mdi:minus')
const showSubstractIcon = computed(() => props.amount > 0);
const showControls = ref<boolean>(false);
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function handleEdit() {
  if (hideTimeout) clearTimeout(hideTimeout);

  showControls.value = true;

  hideTimeout = setTimeout(() => {
    showControls.value = false;
    hideTimeout = null;
  }, 5000);
}

onBeforeUnmount(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
});
</script>

<template>
  <!-- CONTENEDOR que anima tamaño -->
  <div
    class="self-end gap-1.5 flex items-center justify-between bg-primary rounded-lg text-white
           transition-all duration-250"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 scale-5"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-5"
    >
      <!-- Estado compacto (número) -->
      <div
        v-if="!showControls"
        key="compact"
        class="w-full h-full px-2.5 py-0.5 flex items-center justify-center cursor-pointer"
        @click="handleEdit"
      >
        <span class="text-xl font-medium">{{ props.amount }}</span>
      </div>

      <!-- Estado expandido (controles) -->
      <div
        v-else
        key="controls"
        class="w-full h-full flex items-center gap-1"
      >
        <UButton
          v-if="showSubstractIcon"
          :icon="substractIcon"
          size="md"
          variant="solid"
          :ui="{ leadingIcon: 'text-white' }"
        />
        <span class="text-xl p-0.5 font-medium">{{ props.amount }}</span>
        <UButton
          icon="material-symbols:add-2-rounded"
          size="md"
          variant="ghost"
          :ui="{ leadingIcon: 'text-white' }"
        />
      </div>
    </Transition>
  </div>
</template>
