import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
  filter: {
    filter:
      | {
          name: { equals: string };
        }[]
      | undefined;
    size:
      | {
          size: { equals: string };
        }[]
      | undefined;
    color:
      | {
          color: { equals: string };
        }[]
      | undefined;
  };
}

export const getProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, take, search, sortBy, sortOrder, filter } = query;

    const whereClause: Prisma.ProductWhereInput = {
      name: { contains: search },
      productCategory: {
        some: {
          category: { OR: filter.filter },
        },
      },
      variant: {
        some: {
          AND: [
            { OR: filter.size },
            {
              NOT: {
                color: { notIn: filter.color?.map((val) => val.color.equals) },
              },
            },
          ],
        },
      },
    };

    const countProduct = await prisma.product.count({
      where: whereClause,
    });

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
            category: true,
          },
        },
      },
    });

    if (!product.length) {
      return {
        messages: 'No products available',
        data: [],
        count: 0,
      };
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

    return {
      data: productWithStock,
      count: countProduct,
    };
  } catch (error) {
    throw error;
  }
};
