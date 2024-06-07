import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetProductsQuery extends PaginationQueryParams {
  search: string;
}

export const GetProductsService = async (query: GetProductsQuery) => {
  try {
    const { page, take, search, sortBy, sortOrder } = query;
    const whereClaouse: Prisma.ProductWhereInput = {
      name: { contains: search },
    };
    const product = await prisma.product.findMany({
      where: whereClaouse,
      skip: (page - 1) * take,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        stock: true,
        warehouse: true,
        productCategory: {
          select: {
            category: true,
          },
        },
      },
    });
    return {
      data: {
        product,
      },
    };
  } catch (error) {}
};
