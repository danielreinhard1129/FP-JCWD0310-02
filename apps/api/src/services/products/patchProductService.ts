import prisma from '@/prisma';
import { Product } from '@prisma/client';

export const PatchProductService = async (id: number, body: Product) => {
  try {
    const isExistTitle = await prisma.product.findFirst({
      where: {
        name: body.name,
        id,
      },
    });

    if (!isExistTitle) {
      throw new Error('Product is not exist');
    }

    const updateProduct = await prisma.product.update({
      where: {
        id,
      },
      data: body,
    });

    return {
      messages: 'Success update product',
      data: updateProduct,
    };
  } catch (error) {}
};
