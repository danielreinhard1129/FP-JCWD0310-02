import { Product, Variant, VariantStock } from './product.type';
import { Warehouse } from './warehouse.type';

interface VariantProduct extends Omit<Variant, 'variantStocks'> {
  product: Pick<Product, 'name' | 'isDelete' | 'id'>;
}

export interface Stock extends Omit<VariantStock, 'warehouse'> {
  variant: VariantProduct;
  warehouse: string;
  totalStocks: number;
  warehouseId: number;
  sku: string;
}

export interface StockMutations {
  id: number;
  quantity: number;
  status: string;
  sku: string;
  type: string;
  createdAt: Date;
  updateAt: Date;
  fromWarehouseId: number;
  fromWarehouse: Warehouse;
  toWarehouseId: number;
  toWarehouse: Warehouse;
  product: Omit<Product, 'productCategory' | 'productImages' | 'variant'>;
  variant: Omit<Variant, 'variantStocks'>;
}
