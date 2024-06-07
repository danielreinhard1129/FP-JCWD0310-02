import prisma from '@/prisma';

export const GetProductService = async (params: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: params,
      },
    });
    return {
      data: {
        product,
      },
    };
  } catch (error) {}
};
