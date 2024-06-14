import prisma from '@/prisma';

interface GetStockParams {
  userId: number;
  warehouseId: number;
  productId: number;
}

export const GetStockService = async (body: GetStockParams) => {
  try {
    const { productId, userId, warehouseId } = body;

    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!user) {
      return {
        message: "can't find your user acc",
      };
      return new Error("Can't find your account");
    }

    if (!user.employee || user.role == 'CUSTOMER') {
      return {
        message: 'you ar not an admin',
      };
      return new Error('You are not an Admin!!!');
    }

    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: {
        variant: {
          include: {
            variantStocks: {
              include: {
                warehouse: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {}
};
