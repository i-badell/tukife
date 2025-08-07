export interface Product {
  productId: string
  name: string
  description: string
  price: number
  imageUrl: string
}

export interface Catalog extends Product { }

export interface Stand {
  standId: string;
  name: string;
  products: Product[];
}

export interface InitialEventData {
  eventId: string;
  eventName: string;
  eventImageUrl: string;
  stand: Stand | null;
  stands: Stand[];
}

