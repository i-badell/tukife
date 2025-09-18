import { TEST_STAND_ID } from "~~/shared/config/test.config";
import { CartItem } from "~~/shared/types/products";

export default defineEventHandler(async (event) => {

  const productIds = [
    "d3555c24-f7f6-4b65-9b5d-a27ff89fdc2b",
    "7630cfae-20f6-4725-bbe6-a776caeba433",
    "9d9dfe36-8abd-455f-9a09-8c44f894dc7b",
  ];
  

  const cart: CartItem[] = [...Array(5).keys()].map((x) => ({
    name: "Producto " + x,
    description: "Descripción del producto " + x,
    imageUrl: "https://placehold.co/200x200",
    standId: "stand",
    productId: productIds[Math.floor(Math.random() * productIds.length)],
    amount: Math.floor((Math.random() + 1) * (x + 1)),
    price: 300,
  }));
  return cart;
});
