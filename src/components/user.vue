<template>
  <Spinner id="user-spinner" :loading="showSpinner" />
  <div v-if="isLoggedIn">
    <h2>Bienvenido, {{ user?.name }}</h2>
    <ul>
      <li><strong>Nombre:</strong> {{ user?.name }}</li>
      <li><strong>Email:</strong> {{ user?.email }}</li>
      <li><strong>Nickname:</strong> {{ user?.nickname }}</li>
      <li><strong>Sub:</strong> {{ user?.sub }}</li>
      <li><strong>Picture:</strong> <img :src="user?.picture" alt="Avatar" width="50" /></li>
      <!-- Agrega más campos según el modelo de usuario de Auth0 si es necesario -->
    </ul>
    <button @click="logout()">Cerrar sesión</button>
  </div>
  <div v-else>
    <button @click="login()">Iniciar sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useAuthService } from '@/composables/use-auth-service'
import { ref, watch } from 'vue'
import Spinner from '@/components/spinner.vue'

const showSpinner = ref(true)

const {
  user,
  isLoggedIn,
  loading,
  error,
  login,
  logout,
} = useAuthService();

watch(
  () => loading.value,
  (newLoadingValue) => {
    showSpinner.value = newLoadingValue;
  },
  { immediate: true },
);
</script>
