<template>
  <Spinner :show="showSpinner" />
  <div class="bg-neutral flex flex-col p-1 w-full min-h-screen justify-center items-center  -lvh gap-5" v-if="error">
    <div>
      <p aria-label="error" class="text-dark font-sans font-normal text-2xl text-center ">Ups!</p>
    </div>
    <div>
      <img src="@/assets/img/error_face.png" alt="Logo" class="w-24 h-24" />
      <UProgress color="error" class="mt-2" />
    </div>
    <div>
      <p class="text-dark size-5 font-normal w-full text-center p-1">Ocurrio un error al intentar iniciar sesión,
        intentando
        nuevamente en 10 segundos si el error persiste
        comunicarse a soporte@tuki.uy</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAuthService } from '@/composables/use-auth-service';

const showSpinner = ref(true);

const route = useRoute();
const error = route.query.error as string | undefined;

if (error !== undefined) {
  console.error('Error de autenticación:', error);
  showSpinner.value = false;
  setTimeout(() => {
    login();
    // TODO: Define timeout for login redirect, use config.
  }, 10 * 1000);
}
const { isLoggedIn, loading, login } = useAuthService();

watch(
  () => [loading.value, isLoggedIn.value],
  (newValues) => {
    if (error !== undefined) {
      return
    }
    const [newLoadingValue, newIsLoggedInValue] = newValues;
    if (newLoadingValue) {
      return;
    }
    if (newIsLoggedInValue) {
      console.log('Usuario autenticado, redirigiendo a la página principal...');
      showSpinner.value = false;
      window.location.href = '/';
    } else {
      console.log('Usuario no autenticado, iniciando sesión...');
      login();
    }
  },
  { immediate: true }
)

</script>
