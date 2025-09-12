import { TEST_STAND_ID } from "~~/shared/config/test.config";
import { CartItem, Product } from "~~/shared/types/products";

export default defineEventHandler(async (event) => {
  const standId = TEST_STAND_ID // getRouterParam(event, "standId");
  const products : CartItem[] =  [
        {
          "productId": "d3555c24-f7f6-4b65-9b5d-a27ff89fdc2b",
          "name": "Producto 10 - Stand de Empanadas",
          "description": "Delicioso Stand de Empanadas número 10",
          "price": 80,
          "imageUrl": "https://placehold.co/200",
          amount: 0,
          standId
        },
        {
          "productId": "7630cfae-20f6-4725-bbe6-a776caeba433",
          "name": "Producto 9 - Stand de Empanadas",
          "description": "Delicioso Stand de Empanadas número 9",
          "price": 77,
          "imageUrl": "https://placehold.co/200",
          amount: 0,
          standId
        },
        {
          "productId": "864f6070-22fb-405f-a743-3ab5ad60e6f9",
          "name": "Producto 8 - Stand de Empanadas",
          "description": "Delicioso Stand de Empanadas número 8",
          "price": 74,
          "imageUrl": "https://placehold.co/200",
          amount: 0,
          standId,
        },
        {
          "productId": "9d9dfe36-8abd-455f-9a09-8c44f894dc7b",
          "name": "Producto 7 - Stand de Empanadas",
          "description": "Delicioso Stand de Empanadas número 7",
          "price": 71,
          "imageUrl": "https://placehold.co/200",
          amount: 0,
          standId,
        },
        {
          "productId": "fe4b4579-6e11-4a46-ae75-d1d93d1ac09e",
          "name": "Producto 6 - Stand de Empanadas",
          "description": "Delicioso Stand de Empanadas número 6",
          "price": 68,
          "imageUrl": "https://placehold.co/200",
          amount: 0,
          standId
        }
      ]
  return products;
});
