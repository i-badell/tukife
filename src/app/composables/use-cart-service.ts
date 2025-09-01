export const useUseCartService = () => {
  const store = useCartStore();
  const cartItems = store.asArray;

  const mergeWithCart = (products: Product[]): Product[] =>
    products.map((p) => {
      const itemInStore = cartItems.find(
        (x) => x.productId === p.productId && x.standId === p.standId
      );
      if (!itemInStore) return p;
      return {
        ...p,
        amount: itemInStore.quantity,
      };
    });
  
  return {
    put: store.putProduct,
    mergeWithCart,
    hasOtherStand: store.hasOtherStand,
    
  }
};
