import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
  filter: {
    name: { contains: string };
  }[];
  warehouse: number | undefined;
  userId: number;
}

export const GetProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, take, search, sortBy, sortOrder, filter, warehouse, userId } =
      query;

    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: {
          select: {
            warehouseId: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Sorry your account is available');
    }

    const warehouseId = () => {
      if (!user.employee) {
        return undefined;
      }
      if (user.role == 'WAREHOUSE_ADMIN') {
        return user.employee.warehouseId;
      }
      return warehouse;
    };

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      variant: {
        every: {
          variantStocks: {
            every: {
              warehouseId: warehouseId(),
            },
          },
        },
      },
      productCategory: {
        every: {
          category: {
            AND: [...filter],
          },
        },
      },
      // stock: {
      //   every: {
      //     warehouseId: warehouseId(),
      //   },
      // },
    };

    const product = await prisma.product.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        productImages: true,
        variant: {
          include: {
            variantStocks: {
              include: {
                warehouse: true,
              },
            },
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

    if (!product) {
      throw new Error('Cannot find the product');
    }

    const productWithStock = product.map((val) => {
      const stock = val.variant.reduce((a, b) => {
        return (
          a +
          b.variantStocks.reduce((c, d) => {
            return c + d.quantity;
          }, 0)
        );
      }, 0);
      return { ...val, stock };
    });

    if (!product.length) {
      return {
        messages: 'No data found',
        detail: {
          userId,
          warehouse,
          warehouseId: warehouseId(),
        },
      };
    }

    return {
      data: {
        ...productWithStock,
      },
    };
  } catch (error) {
    throw error;
  }
};
