import prisma from '@/prisma';
import { Variant, VariantStock } from '@prisma/client';

interface VariantWithStocks extends Variant {
  variantStocks: VariantStock[];
}

interface PostStockService {
  productId: number;
  userId: number;
  warehouseId: number;
  stock: VariantWithStocks[] | undefined;
  newStock:
    | {
        quantity: number;
        variant: Pick<Variant, 'color' | 'size'>;
      }
    | undefined;
}

export const PostStockService = async (body: PostStockService) => {
  try {
    const newVariant = await prisma.variant.findFirst({});
  } catch (error) {
    throw error;
  }
};

const updateStock = async (payload: VariantWithStocks[]) => {
  const variantStockData = payload.map((val) => {
    return {
      variantId: val.id,
      quantity: val.variantStocks[0],
    };
  });
  // return await prisma.variantStocks.updateMany({
  //     where : {
  //     }
  //     data : {}
  // })
};
