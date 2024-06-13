import prisma from '@/prisma';
import { Product } from '@prisma/client';

export const PostProductService = async (body: Product) => {
  try {
    const isExistTitle = await prisma.product.findFirst({
      where: {
        name: body.name,
      },
    });

    if (isExistTitle) {
      throw new Error('Product title is exist');
    }

    const newProduct = await prisma.product.create({
      data: body,
    });

    return {
      messages: 'Success create product',
      data: newProduct,
    };
  } catch (error) {
    throw error;
  }
};
