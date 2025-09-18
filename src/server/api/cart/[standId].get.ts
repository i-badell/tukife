import { TEST_STAND_ID } from "~~/shared/config/test.config";
import { CartItem } from "~~/shared/types/products";

export default defineEventHandler(async (event) => {
  const standId = getRouterParam(event, "standId");
  if (!standId) return [];

  const productIds = [
    "d3555c24-f7f6-4b65-9b5d-a27ff89fdc2b",
    "7630cfae-20f6-4725-bbe6-a776caeba433",
    "9d9dfe36-8abd-455f-9a09-8c44f894dc7b",
  ];
  
  if (standId !== TEST_STAND_ID) return [];

  const cart: CartItem[] = [...Array(5).keys()].map((x) => ({
    name: "Producto " + x,
    description: "Descripción del producto " + x,
    imageUrl: "https://placehold.co/200x200",
    standId,
    productId: productIds[Math.floor(Math.random() * productIds.length)],
    amount: Math.floor(Math.random() * x),
    price: 300,
  }));
  return cart;
});
