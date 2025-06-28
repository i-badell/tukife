<template>
  <Spinner :show="loading" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/composables/use-auth-service'

const router = useRouter()
const loading = ref(true)
const { handleRedirectCallback, getToken } = useAuthService()

onMounted(async () => {
  try {
    const result = await handleRedirectCallback()
    const token = await getToken()
    console.log('Access Token:', token)

    document.cookie = `access_token=${token}; path=/; secure; samesite=lax`

    const target = result.appState?.returnTo || '/'
    router.replace(target)
  } catch (err) {
    console.error('Error en callback de Auth0:', err)
    router.replace('/login?error=true')
  } finally {
    loading.value = false
  }
})
</script>