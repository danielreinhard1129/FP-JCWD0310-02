import prisma from '@/prisma';

export const getProductService = async (params: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: params,
      },
      include: {
        productCategory: {
          include: {
            category: true,
          },
        },
        productImages: {
          select: {
            url: true,
          },
        },
        variant: {
          include: {
            variantStocks: {
              include: { warehouse: true },
            },
          },
        },
      },
    });
    if (!product) {
      throw new Error('Cannot find the product');
    }
    const stock = product.variant.reduce((a, b) => {
      return (
        a +
        b.variantStocks.reduce((c, d) => {
          return c + d.quantity;
        }, 0)
      );
    }, 0);

    return {
      data: { ...product, stock },
    };
  } catch (error) {
    throw error;
  }
};
