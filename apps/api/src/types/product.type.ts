import { Product, Variant, VariantStock } from '@prisma/client';

interface VariantWithStocks extends Pick<Variant, 'size' | 'color'> {
  stock: Pick<VariantStock, 'quantity'>;
}

export interface ProductPostBody
  extends Pick<Product, 'name' | 'description' | 'price'> {}

export interface CreateProductParams {
  user: {
    id: number;
  };
  warehouseId: number | undefined;
  product: Pick<Product, 'name' | 'description' | 'price'>;
  categories: string[];
  image: Express.Multer.File[];
  variant: VariantWithStocks[];
}
