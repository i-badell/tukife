<template>
    <div>
        <h1>Index</h1>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
import type { MainPageData } from '~~/shared/types/pageData';


// const { data, error } = useFetch<MainPageData>(`/api/home/data`, { server: true })
// const stands = computed(() => !error.value ? data.value?.stands : []);
</script>
