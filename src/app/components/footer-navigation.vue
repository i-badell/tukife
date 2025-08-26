<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

const items = ref<TabsItem[]>([
  {
    label: 'Retirar',
    tabIcon: 'mage:qr-code',
    value: 'checkout',
  },
  {
    label: 'Inicio',
    tabIcon: 'material-symbols:home-rounded',
    value: 'home',
  },
  {
    label: 'Perfil',
    tabIcon: 'solar:user-circle-bold',
    value: 'user',
  }
])

const active = computed({
  get() {
    type NavItem = { value: string }
    const path = route.path
    const selected = (items.value as NavItem[]).find(x => x.value !== '' && path.includes(x.value))
    console.log("TEST: selected", selected?.value || 'home'
    )
    return selected?.value || 'home' 
  },
  set(tab) {
    const selectedRoute = tab === 'home' ? '/' : `/${tab}`
    router.push(selectedRoute)
  }
})
</script>

<template>
  <!-- TODO: Fix color text and icons when inactive -->
  <UTabs 
    :content="false" 
    :items="items" 
    v-model="active"
    size="lg" 
    variant="link" 
    class="w-full justify-between" 
    color="primary"
    :ui="{
      list:'min-w-full justify-around',
      indicator: 'h-[.25rem] rounded-none'
    }" >
    <template #default="{ item }">
      <div class="flex flex-col items-center justify-center">
        <UIcon :name="item.tabIcon || ''" class="mb-1 h-5 w-5" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </UTabs>
</template>
