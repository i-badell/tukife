export interface Product {
  productId: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface Catalog extends Product { }

export interface Stand extends StandDefinition {
  products: Product[];
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

