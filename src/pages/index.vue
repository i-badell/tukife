<template>
    <User />
</template>

<script lang="ts" setup>
import { useAuthService } from '@/composables/use-auth-service'

const { isLoggedIn, loading, error } = useAuthService()
</script>

<style>

</style>