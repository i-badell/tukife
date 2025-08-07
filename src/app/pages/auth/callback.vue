<template>
	<Spinner :show="loading" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthService } from '@/composables/use-auth-service'
import { AuthConfig } from '~~/shared/config/auth.config'

const router = useRouter()
const loading = ref(true)
const { handleRedirectCallback, getToken } = useAuthService()
console.log("callback")

onMounted(async () => {
	try {
		if (!handleRedirectCallback) return;
		const result = await handleRedirectCallback()
		const token = await getToken()
		console.log('Access Token:', token)

		const tokenCookie = useCookie(AuthConfig.accessTokenCookieKey);
		tokenCookie.value = token;

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
