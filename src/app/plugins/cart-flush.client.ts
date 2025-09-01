import { useCartStore } from '~/stores/cart-store'

export default defineNuxtPlugin(() => {
  const cart = useCartStore()
  const onVisible = () => { if (document.visibilityState === 'visible') cart.flushQueue() }
  const onOnline = () => cart.flushQueue()

  document.addEventListener('visibilitychange', onVisible)
  window.addEventListener('online', onOnline)

  cart.loadPersisted().then(() => cart.flushQueue())
})
