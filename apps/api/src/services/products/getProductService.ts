import prisma from '@/prisma';

export const GetProductService = async (params: number) => {
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
          select: {
            color: true,
            size: true,
          },
          include: {
            variantStocks: true,
          },
        },
      },
    });

    if (!product) {
      throw new Error('Product not fond');
    }

    // const variant = await prisma.variant.findMany({
    //   where: {
    //     productId: product.id,
    //   },
    //   include: {
    //     variantStocks: true,
    //   },
    // });

    const stock = product.variant.reduce((a, b) => {
      return (
        a +
        b.variantStocks.reduce((c, d) => {
          return c + d.quantity;
        }, 0)
      );
    }, 0);

    return {
      data: {
        ...product,
        stock,
      },
    };
  } catch (error) {}
};
