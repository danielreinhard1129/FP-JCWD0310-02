import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
  filter: {
    name: { contains: string };
  }[];
  userId: number;
}

export const GetProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, take, search, sortBy, sortOrder, filter, userId } = query;
    const user = await prisma.users.findFirst({
      where: {
        id: userId || undefined,
      },
    });

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      productCategory: {
        some: {
          category: { OR: [...filter] },
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
              user?.role == 'CUSTOMER'
                ? {
                    select: {
                      quantity: true,
                    },
                  }
                : {
                    include: {
                      warehouse: true,
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
          user?.role == 'CUSTOMER'
            ? 'No data found'
            : user?.role == 'SUPER_ADMIN'
              ? 'No data in this warehouse'
              : 'No data on your warehouse',
      };
    }

    return {
      data: productWithStock,
    };
  } catch (error) {
    throw error;
  }
};
