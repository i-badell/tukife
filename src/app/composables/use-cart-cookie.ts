export type CartSnapshotItem = {
  productId: string
  quantity: number
}

export function useCartCookie() {
  // SameSite=Lax, httpOnly: false (lo necesita el cliente), path=/
  const cookie = useCookie<CartSnapshotItem[]>('cart', {
    default: () => [],
    sameSite: 'lax',
    path: '/',
    // Opcional: maxAge: 60 * 60 * 24 * 7,
  })

  const read = () => cookie.value ?? []
  const write = (items: CartSnapshotItem[]) => {
    cookie.value = (items || []).filter(i => i.quantity > 0)
  }

  return { read, write, cookie }
}
