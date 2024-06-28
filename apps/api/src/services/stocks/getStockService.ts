import prisma from '@/prisma';

interface UserTokenLocals {
  id: number;
}

export const GetStockService = async (
  variantId: number,
  userToken: UserTokenLocals,
  warehouseId: number,
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

    const product = await prisma.variantStock.findFirst({
      where: {
        variantId,
        warehouseId,
      },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
        warehouse: true,
      },
    });

    if (!product) {
      throw new Error('Cannot find the product!');
    }
    const { id, quantity, variant, warehouse } = product;
    const sku =
      `${variant.product.name.replace(' ', '-')}-${variant.color}-${variant.size}-${new Date(variant.product.createdAt).toISOString().slice(2, 10).replace('-', '').replace('-', '')}`.toUpperCase();
    return {
      data: {
        ...product,
        warehouse: `${warehouse.id}-${warehouse.name}`,
        sku: sku,
      },
      message: 'success get stock',
    };
  } catch (error) {
    throw error;
  }
};
