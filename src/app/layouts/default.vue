<template>
  <div class="inset-0 flex flex-col min-h-screen">
     <!-- Header fijo arriba -->
    <header class="sticky top-0 z-50">
      <Header />
    </header>

    <!-- Contenido que crece -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer fijo abajo -->
    <footer class="sticky bottom-0 z-50 bg-neutral">
      <FooterNavigation class=""/>
    </footer>
  </div>
</template>

<script lang="ts" setup>
</script>
