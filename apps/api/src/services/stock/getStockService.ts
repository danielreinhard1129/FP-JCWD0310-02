import prisma from '@/prisma';

interface UserTokenLocals {
  id: number;
}

export const GetStockService = async (
  params: number,
  userToken: UserTokenLocals,
) => {
  try {
    const userId = userToken.id;

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
      throw new Error("Can't find your account");
    }

    if (!user.employee || user.role == 'CUSTOMER') {
      throw new Error('You are not an Admin!!!');
    }

    const product = await prisma.product.findFirst({
      where: { id: params },
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

    if (!product) {
      throw new Error('Cannot find the product!');
    }
  } catch (error) {
    throw error;
  }
};
