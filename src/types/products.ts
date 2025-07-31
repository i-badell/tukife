export interface Product {
  productId: string
  name: string
  description: string
  inStock: boolean
  price: number
  imageUrl: string
}

export interface Catalog extends Product { }

export interface StandCatalog {
  catalogId: string;
  products: Product[];
}

export interface Stand {
  standId: string;
  name: string;
  isExtendedCatalog: boolean;
  catalogs: StandCatalog[];
}

export interface InitialEventData {
  eventId: string;
  catalogs: Catalog[];
  stands: Stand[];
}

