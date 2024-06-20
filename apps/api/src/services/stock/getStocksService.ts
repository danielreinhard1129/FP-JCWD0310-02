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

    // const ProductWhereClause: Prisma.ProductWhereInput = {
    //   name: {
    //     contains: search,
    //   },
    // };

    // const VariantWhereClause: Prisma.VariantWhereInput = {
    // };

    // const VariantStockWhereClause: Prisma.VariantStockFindManyArgs = {
    //   where: {
    //     warehouseId:
    //       user.role == 'WAREHOUSE_ADMIN'
    //         ? user.employee.warehouseId
    //         : warehouseId || user.employee.warehouseId,
    //   },
    // };

    // const product = await prisma.product
    //   .findMany({
    //     where: ProductWhereClause,
    //     skip: (page - 1) * take,
    //     take,
    //     include: {
    //       variant: {
    //         include: {
    //           variantStocks: VariantStockWhereClause,
    //         },
    //       },
    //     },
    //   })
    //   .then((response) => {
    //     return response.map((val) => {
    //       return {
    //         ...val,
    //         variant: val.variant.map((val) => {
    //           return {
    //             ...val,
    //             overallStock: val.variantStocks.reduce(
    //               (a, b) => a + b.quantity,
    //               0,
    //             ),
    //           };
    //         }),
    //       };
    //     });
    //   });

    const product = await prisma.variant.findMany({
      include: {
        product: true,
        variantStocks: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    return {
      data: product,
    };
  } catch (error) {
    throw error;
  }
};
