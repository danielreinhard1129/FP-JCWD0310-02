import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
  filter: {
    name: { equals: string };
  }[];
}

export const getProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, take, search, sortBy, sortOrder, filter } = query;

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
      throw new Error('No products found');
    }

    return {
      data: productWithStock,
    };
  } catch (error) {
    throw error;
  }
};
