import { TEST_STAND_ID } from "~~/shared/config/test.config";

export default defineEventHandler(async (event) => {
  const standId = getRouterParam(event, "standId");
  if (!standId) return;
  if (standId !== TEST_STAND_ID) return []; 
  const productIds = [
    "d3555c24-f7f6-4b65-9b5d-a27ff89fdc2b",
    "7630cfae-20f6-4725-bbe6-a776caeba433",
    "9d9dfe36-8abd-455f-9a09-8c44f894dc7b",
  ];
  const cart: CartLine[] = [...Array(5).keys()].map((x) => ({
    standId,
    productId: productIds[Math.floor(Math.random() * productIds.length)],
    amount: Math.floor(Math.random() * x),
    price: 300,
  }));
  return cart;
});
