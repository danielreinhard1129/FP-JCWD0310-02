import prisma from '@/prisma';

export const getStocksReportsService = async (
  warehouseId: number,
  userId: number,
  date: {
    startDate: Date | string;
    endDate: Date | string;
  },
) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
      include: {
        employee: { include: { warehouse: true } },
      },
    });

    if (!user) throw new Error('Cannot find user data');
    if (!user.employee) throw new Error('You are not an admin');
    if (!user.employee.warehouseId) throw new Error('You are not an admin');

    const warehouse = await prisma.warehouse.findFirst({
      where: { id: warehouseId },
    });

    if (!warehouse) throw new Error('');
    const currentWarehouseId =
      user.role == 'SUPER_ADMIN'
        ? warehouseId
          ? warehouseId
          : user.employee.warehouseId
        : user.employee.warehouseId;

    const stockProductReport = await prisma.stockMutation.findMany({
      where: {
        OR: [
          { fromWarehouseId: currentWarehouseId },
          { toWarehouseId: currentWarehouseId },
        ],
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
      include: {
        product: true,
      },
    });

    if (!stockProductReport) throw new Error('Cannot find any stock mutations');
    const reportProduct = stockProductReport.reduce(
      (a: any, b) => {
        if (b.fromWarehouseId == currentWarehouseId) {
          return {
            ...a,
            export: {
              ...a.export,
              [b.product.name]: {
                ...b.product,
                count:
                  a.export &&
                  a.export[b.product.name] &&
                  a.export[b.product.name].count
                    ? a.export[b.product.name].count + b.quantity
                    : b.quantity,
              },
            },
          };
        }
        if (b.toWarehouseId == currentWarehouseId) {
          return {
            ...a,
            import: {
              ...a.import,
              [b.product.name]: {
                ...b.product,
                count:
                  a.import &&
                  a.import[b.product.name] &&
                  a.import[b.product.name].count
                    ? a.import[b.product.name].count + b.quantity
                    : b.quantity,
              },
            },
          };
        }
        // return a;
      },
      { import: {}, export: {} },
    );

    const stock = await prisma.variantStock.findMany({
      where: {
        warehouseId: currentWarehouseId,
      },
      include: {
        variant: {
          include: {
            product: true,
          },
        },
      },
    });

    const totalStock = stock.reduce((a: any, b) => {
      return {
        ...a,
        [b.variant.product.name]: a[b.variant.product.name]
          ? a[b.variant.product.name] + b.quantity
          : b.quantity || 0,
      };
    }, {});

    const overallStocks = await prisma.product.findMany({
      include: {
        stockMutations: {
          where: {
            OR: [
              { fromWarehouseId: currentWarehouseId },
              { toWarehouseId: currentWarehouseId },
            ],
            createdAt: {
              gte: date.startDate,
              lte: date.endDate,
            },
          },
        },
        variant: {
          include: {
            variantStocks: {
              where: {
                warehouseId: currentWarehouseId,
              },
            },
          },
        },
      },
    });

    return { ...reportProduct, totalStock, overallStocks };
  } catch (err) {
    throw err;
  }
};
