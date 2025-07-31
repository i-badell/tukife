<template>
    <User 
      :is-logged-in="isLoggedIn"
      :loading="loading"
      :user="user"
    />
</template>

<script lang="ts" setup>
import { useAuthService } from '@/composables/use-auth-service'
import { useEventStore } from '../stores/eventStore'

const { isLoggedIn, loading, error, getToken, user } = useAuthService()
const store = useEventStore();
const token = await getToken();

watch(
  () => isLoggedIn.value,
  async (newIsLoggedIn) => {
    if (!newIsLoggedIn) return;
    console.log('TEST from watche');
    store.setAuthToken(token || '');
    await store.fetchInitialData();
  },
  { immediate: true }
);
</script>
