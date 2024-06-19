import { Warehouse } from './warehouse.type';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updateAt: Date;
  productCategory: ProductCategory[];
  productImages: ProductImage[];
  variant: Variant[];
  stock: number;
}
export interface ProductImage {
  url: string;
}
export interface ProductCategory {
  id: number;
  productId: number;
  CategoryId: number;
  category: Category;
}
export interface Category {
  id: number;
  name: string;
}
export interface Variant {
  id: number;
  color: string;
  size: string;
  productId: number;
  isDelete: boolean;
  variantStocks: VariantStock[];
}
export interface VariantStock {
  id: number;
  quantity: number;
  warehouseId: number;
  variantId: number;
  warehouse: Warehouse;
}
