export enum ProductFlags {
  None = 0,
  Active = 1,
  InStock = 2,
}

export interface Product {
  id: number;
  name: string;
  price: number;
  status: ProductFlags;
  merchantId: number;
  categoryId: number;
}