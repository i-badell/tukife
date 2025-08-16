<template>
  <div class="inset-0 flex flex-col min-h-screen bg-neutral">
    <header class="sticky top-0 z-50 shadow-[0px_1px_4px_0px_rgba(0,_0,_0,_0.05)]">
      <MainHeader />
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="sticky bottom-0 z-50 bg-white shadow-[0px_-1px_4px_0px_rgba(0,_0,_0,_0.05)]">
      <FooterNavigation class=""/>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '~/components/main-header.vue';

</script>
