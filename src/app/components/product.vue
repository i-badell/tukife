<template>
  <div
    class="w-80 p-4 bg-white rounded-md outline-1 outline-offset-[-1px] outline-Background inline-flex justify-between items-start">
    <div class="w-24 self-stretch inline-flex flex-col justify-center items-center">
      <div class="w-24 h-24 bg-zinc-300 rounded"></div>
      <img class="w-28 h-52 rounded" src="https://placehold.co/108x201" />
    </div>
    <div class="pl-4 inline-flex flex-col justify-start items-start gap-4">
      <div class="flex flex-col justify-start items-start">
        <div class="justify-start text-Dark text-lg font-normal font-['Inria_Sans'] tracking-tight">
          {{ props.name }}
        </div>
        <div class="w-48 max-w-48 justify-start text-Dark text-xs font-normal font-['Inria_Serif'] tracking-tight">
          {{ props.description }}  
        </div>
      </div>
      <div class="self-stretch inline-flex justify-between items-center">
        <div class="justify-start text-Dark text-lg font-normal font-['Inria_Sans'] tracking-tight">
          ${{ props.price }}
        </div>
        <div class="p-2.5 bg-primary-accent rounded flex justify-start items-center gap-1">
          <div data-style="linear" class="w-4 h-4 relative rounded-md">
            <div
              class="w-2 h-0 left-[4px] top-[8px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white">
            </div>
            <div
              class="w-0 h-2 left-[8px] top-[4px] absolute outline outline-[1.50px] outline-offset-[-0.75px] outline-white">
            </div>
            <div class="w-4 h-4 left-0 top-0 absolute opacity-0"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import type { Product } from '../types/products';

const props = defineProps<Product>();

</script>