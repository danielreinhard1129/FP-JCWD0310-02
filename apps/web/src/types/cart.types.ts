import { Product, Variant } from './product.type';

export interface Carts {
  id: number;
  quantity: number;
  productId: number;
  product: Product;
  variantId: number;
  variant: Variant;
}
