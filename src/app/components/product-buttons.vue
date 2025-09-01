<script lang="ts" setup>
import type { CartPayload } from '~~/shared/types/api';

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'updateProduct', value: number) : void
}>();

const props = withDefaults(defineProps<{
  // Amount
  modelValue: number
  editDurationMs?: number
  lockWhileEditing?: boolean
}>(), {
  editDurationMs: 10_000,
  lockWhileEditing: true,
})

const icons = {
  delete: 'ic:baseline-delete',
  substract: 'mdi:minus',
  add: 'material-symbols:add-2-rounded'
}

const isEditing = ref(false)
const draft = ref(props.modelValue)
let timer: number | undefined

function startEdit() {
  isEditing.value = true
  resetTimer()
}

function change(delta: number) {
  if (!isEditing.value) startEdit()
  draft.value = Math.max(0, draft.value + delta)
  resetTimer()
}

const add = () => change(+1);
const substract = () => change(-1);

function resetTimer() {
  clearTimer()
  timer = window.setTimeout(finishEdit, props.editDurationMs)
}

function finishEdit() {
  isEditing.value = false
  clearTimer()
  emit('update:modelValue', draft.value) 
  emit('updateProduct', draft.value)
}

function clearTimer() {
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

watch(() => props.modelValue, (val) => {
  if (!isEditing.value || !props.lockWhileEditing) {
    draft.value = val
  }
})
</script>

<template>
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
      <div
        v-if="!isEditing"
        key="compact"
        class="w-full h-full px-2.5 py-0.5 flex items-center justify-center cursor-pointer"
        @click="startEdit"
      >
        <div v-if="draft === 0" class="py-2 flex h-fit">
          <UIcon :name="icons.add" class="size-5" />
        </div>
        <div v-else class="flex items-center min-w-5 min-h-5 justify-center">
          <span class="text-2xl font-medium">{{ draft }}</span>
        </div>
      </div>

      <div
      	v-else
        key="controls"
        class="w-full h-full flex items-center gap-1"
      >
        <UButton
          :icon="icons.substract"
          :class="draft === 0 ? 'opacity-30' : ''"
          size="lg"
          variant="solid"
          @click="substract"
          :ui="{ leadingIcon: 'text-white' }"
        />
        <span class="text-xl p-0.5 font-medium flex-1 text-center align-middle">{{ draft }}</span>
        <UButton
          :icon="icons.add"
          size="lg"
          variant="ghost"
          @click="add"
          :ui="{ leadingIcon: 'text-white' }"
        />
      </div>
    </Transition>
  </div>
</template>
