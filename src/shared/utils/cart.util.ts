export function mergeProductsWithCart(
  apiItems: CartItem[] | undefined,
  cartItems: CartLine[] | undefined = undefined
) : CartItem[] {
  const items = apiItems ?? []
  if (!cartItems) return items;
  const byId = new Map(cartItems.map(i => [i.productId, i.amount]))
  return items.map(it => ({
    ...it,
    amount: byId.get(it.productId) ?? 0
  }))
}