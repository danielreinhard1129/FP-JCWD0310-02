import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
  filter: {
    name: { contains: string };
  }[];
  warehouse: number | undefined;
  userRole: string | undefined;
  userId: number;
}

export const GetProductsService = async (query: GetProductsQuery) => {
  try {
    const {
      page,
      take,
      search,
      sortBy,
      sortOrder,
      filter,
      warehouse,
      userId,
      userRole,
    } = query;

    const user = await prisma.users.findFirst({
      where: {
        id: userId || undefined,
      },
      include: {
        employee: {
          select: {
            warehouseId: true,
          },
        },
      },
    });

    if (user && user.employee && user.role === 'WAREHOUSE_ADMIN') {
      if (warehouse !== user.employee.warehouseId)
        // return new Error('You are not an admin on this warehouse');
        return {
          message: 'You are not an admin on this warehouse',
        };
    }

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      variant:
        userRole == 'ADMIN' && user && user.employee
          ? {
              every: {
                variantStocks: {
                  every: {
                    warehouseId:
                      user.role == 'ADMIN'
                        ? warehouse || undefined
                        : user.employee.warehouseId,
                  },
                },
              },
            }
          : undefined,
      productCategory: {
        every: {
          category: {
            AND: [...filter],
          },
        },
      },
    };

    const product = await prisma.product.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        productImages: {
          select: {
            url: true,
          },
        },
        variant: {
          select: {
            color: true,
            size: true,
            variantStocks:
              userRole == 'ADMIN' && user?.employee
                ? {
                    include: {
                      warehouse: true,
                    },
                  }
                : {
                    select: {
                      quantity: true,
                    },
                  },
          },
        },
        productCategory: {
          select: {
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
        messages:
          userRole == 'ADMIN'
            ? user?.role == 'ADMIN'
              ? 'No data in this warehouse'
              : 'No data on your warehouse'
            : 'No data found',
      };
    }

    return {
      data: productWithStock,
    };
  } catch (error) {
    throw error;
  }
};
