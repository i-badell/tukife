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

		await $fetch('/api/auth/callback', {
			method: 'POST',
			body: { token }
		})

		const target = result.appState?.returnTo || '/'
		router.replace(target)
		loading.value = false;
	} catch (err) {
		loading.value = false;
		console.error('Error en callback de Auth0:', err)
		// NOTE: Eliminar despues de implemetar el manejo de errores
		//router.replace('/login?error=true')
	} 
})
</script>
