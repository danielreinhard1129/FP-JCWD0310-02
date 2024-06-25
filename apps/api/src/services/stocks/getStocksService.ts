import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

interface QueryGetStocksService {
  take: number;
  page: number;
  search: string;
  warehouseId: string | undefined;
}

interface UserToken {
  id: number;
}

export const GetStocksService = async (
  userToken: UserToken,
  query: QueryGetStocksService,
) => {
  try {
    const { search, take, page } = query;
    const warehouseId = Number(query.warehouseId);

    const user = await prisma.users.findFirst({
      where: {
        id: Number(userToken.id),
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

    const warehouse = await prisma.warehouse.findFirst({
      where: {
        id: warehouseId || user.employee.warehouseId,
      },
    });

    if (!warehouse) throw new Error('Cannot find the warehouse');

    const product = await prisma.product.findMany({
      where: {
        isDelete: false,
      },
      include: {
        variant: {
          include: {
            variantStocks: {
              where: {
                warehouseId: 1,
              },
            },
          },
        },
      },
    });

    const productWithTotalStock = product.reduce((a: any, b) => {
      return [
        ...a,
        {
          ...b,
          stock: b.variant.reduce((a, b) => {
            return a + b.variantStocks.reduce((a, b) => a + b.quantity, 0);
          }, 0),
        },
      ];
    }, []);

    return {
      data: productWithTotalStock,
    };
  } catch (error) {
    throw error;
  }
};
