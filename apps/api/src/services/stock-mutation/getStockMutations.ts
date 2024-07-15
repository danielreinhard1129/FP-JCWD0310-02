import prisma from '@/prisma';

export const getStockMutationsService = async (
  userId: number,
  query: {
    page: number;
    take: number;
    status: 'WAIT_CONFIRMATION' | 'ON_PROGRESS' | 'DONE' | 'REJECT' | undefined;
    warehouseId: number;
  },
) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
        employee: {
          warehouseId: {
            not: null,
          },
        },
      },
      include: {
        employee: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!user) throw new Error('Cannot find your user data');
    if (!user.employee) throw new Error('Sorry you are not an admin!');
    if (!user.employee.warehouseId)
      throw new Error('Sorry you are not an admin!');
    if (!user.employee.warehouse)
      throw new Error('Sorry you are not an admin!');

    const stockMutations = await prisma.stockMutation.findMany({
      orderBy: { createdAt: 'desc' },
      take: query.take,
      skip: (query.page - 1) * query.take,
      where: {
        status: { equals: query.status },
        OR: [
          {
            fromWarehouseId:
              user.role == 'SUPER_ADMIN'
                ? query.warehouseId
                  ? query.warehouseId
                  : user.employee.warehouseId
                : user.employee.warehouseId,
          },
          {
            toWarehouseId:
              user.role == 'SUPER_ADMIN'
                ? query.warehouseId
                  ? query.warehouseId
                  : user.employee.warehouseId
                : user.employee.warehouseId,
          },
        ],
      },
      include: {
        fromWarehouse: true,
        toWarehouse: true,
        product: true,
        variant: true,
      },
    });

    const data = stockMutations.reduce((a: any, b) => {
      // return [
      //   ...a,
      //   {
      //     ...b,
      //     sku: `${b.product.name.replace(' ', '-')}-${b.variant.color}-${b.variant.size}-${new Date(b.product.createdAt).toISOString().slice(2, 10).replace('-', '').replace('-', '')}`.toUpperCase(),
      //   },
      // ];
    }, []);

    return {
      data,
    };
  } catch (error) {
    throw error;
  }
};
