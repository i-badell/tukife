<template>
  <div class="inset-0 flex flex-col min-h-screen bg-neutral">
    <header class="sticky top-0 z-50 px-6 py-4 bg-white shadow-xs">
      <MainHeader 
        title="Cosquin Rock"
        :notification-count="1"/>
    </header>

    <main class="flex-1 p-4">
      <slot />
    </main>

    <footer class="sticky bottom-0 z-50 bg-white shadow-sm">
      <FooterNavigation class=""/>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '~/components/main-header.vue';

</script>
