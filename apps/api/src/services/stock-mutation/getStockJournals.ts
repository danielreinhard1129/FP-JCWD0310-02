import prisma from '@/prisma';

export const getStockJournalsService = async (userId: number) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
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

    const stockMutations = await prisma.stockMutation.findMany({
      where: {
        OR: [
          { fromWarehouseId: user.employee.warehouseId },
          { toWarehouseId: user.employee.warehouseId },
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
      return [
        ...a,
        {
          ...b,
          sku: `${b.product.name.replace(' ', '-')}-${b.variant.color}-${b.variant.size}-${new Date(b.product.createdAt).toISOString().slice(2, 10).replace('-', '').replace('-', '')}`.toUpperCase(),
        },
      ];
    }, []);

    return {
      data,
    };
  } catch (error) {
    throw error;
  }
};
