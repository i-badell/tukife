<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAuthService } from '@/composables/use-auth-service';

// Obtener error en caso que haya ocurrido
const route = useRoute();
const error = route.query.error as string | undefined;

// Ver si usuario está autenticado
const { isLoggedIn, user, loading, login } = useAuthService();

if (loading.value || isLoggedIn.value) {
  // Si ya está autenticado, redirigir a la página principal
  window.location.href = '/';
} else if (error == 'true') {
  // Si hay un error, mostrar mensaje
  console.error('Error de autenticación:', error);
  // Eventualmente mostrar un mensaje al usuario y redirigir a login
} else {
  login();
}

</script>

<style>

</style>