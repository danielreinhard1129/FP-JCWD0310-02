import { Product, Variant } from './product.type';

export interface Order {
  id: number;
  status: string;
  total: number;
  shippingCost: number;
  shippingDetail: number;
  discount: number;
  payment_method: string;
  snap_token: string | null;
  snap_redirect_url: string | null;
  createdAt: string;
  updateAt: string;
  userId: number;
  warehouseId: number;
  paymentsId: number;
  user: {
    firstName: string;
    lastName: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    orderId: number;
    product: Omit<Product, 'productCategory' | 'productImages' | 'variant'>;
    variant: Omit<Variant, 'variantStocks'>;
    productId: number;
    variantId: number;
  }[];
}
