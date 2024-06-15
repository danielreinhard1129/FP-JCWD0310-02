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
            variantStocks: true,
          },
        },
      },
    });
    if (!product) {
      return {
        messages: 'Cannot find the product',
      };
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
      product,
    };
  } catch (error) {
    throw error;
  }
};
