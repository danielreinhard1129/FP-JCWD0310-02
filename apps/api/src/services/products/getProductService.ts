import prisma from '@/prisma';

export const GetProductService = async (params: number) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: params,
      },
      include: {
        stock: {
          select: {
            quantity: true,
            warehouseId: true,
          },
        },
        warehouse: {
          select: {
            latitude: true,
            longtitude: true,
            location: true,
            name: true,
          },
        },
        productCategory: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return {
      data: {
        product,
      },
    };
  } catch (error) {}
};
