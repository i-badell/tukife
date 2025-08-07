<template>
    <h1>Index</h1>
    {{ data }}
</template>

<script lang="ts" setup>
import type { MainPageData } from '~/types/page_data';

const { data, error, refresh } = useFetch<MainPageData>(`/api/home/data`)
console.log("TEST", data.value)
console.log("TEST", error.value)

</script>
