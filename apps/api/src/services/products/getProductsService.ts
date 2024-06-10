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

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: {
          select: {
            warehouseId: true,
            role: true,
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
      if (user.employee.role == 'WAREHOUSE') {
        return user.employee.warehouseId;
      }
      return warehouse;
    };

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      warehouseId: warehouseId(),
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

    const productWithStock = product.map((val) => {
      const sumStock = val.stock.reduce((a, b) => a + b.quantity, 0);
      return {
        ...val,
        stock: {
          ...val.stock,
          sum: sumStock,
        },
      };
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
      // data: {
      //   product,
      // },
      dataWithStock: {
        productWithStock,
      },
    };
  } catch (error) {}
};
