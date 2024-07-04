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
          color: { contains: string };
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
        some: filter.filter && {
          category: { OR: filter.filter },
        },
      },
      variant: (filter.color || filter.size || filter.filter) && {
        some: {
          OR: filter.size,
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
      message: 'Success get products',
      count: countProduct,
    };
  } catch (error) {
    throw error;
  }
};
