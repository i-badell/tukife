export type ProductId = string;
export type StandId = string;

export interface Product {
  productId: ProductId;
  standId: StandId; 
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface CartLine {
  productId: ProductId;
  standId: StandId;
  amount: number;
  price: number;
}

export type CartLines = Record<ProductId, CartLine>;

export interface CartDelta {
  productId: ProductId;
  standId: StandId;
  delta: number;
  price: number;
}

export interface BatchPayload { deltas: Delta[] }

export interface Catalog extends Product { }

export interface Stand extends StandDefinition {
  products: Product[];
}

export interface CartItem extends Product {
  amount: number;
}

export type StandDefinition = {
  standId: string;
  imageUrl: string;
  name: string;
}

export interface InitialEventData {
  eventId: string;
  eventName: string;
  eventImageUrl: string;
  stand: Stand | null;
  stands: Stand[];
}

