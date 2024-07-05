import prisma from '@/prisma';

export const getStocksReportsService = async () => {
  try {
    const warehouse = await prisma.warehouse.findFirst({
      where: { id: 1 },
    });

    if (!warehouse) throw new Error('');

    const stockProductReport = await prisma.stockMutation.findMany({
      where: {
        OR: [
          { fromWarehouseId: warehouse.id },
          { toWarehouseId: warehouse.id },
        ],
      },
      include: {
        product: true,
      },
    });

    if (!stockProductReport) throw new Error('Cannot find any stock mutations');
    const reportProduct = stockProductReport.reduce(
      (a: any, b) => {
        if (b.fromWarehouseId == warehouse.id) {
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
                    ? a.export[b.product.name].count + 1
                    : 1,
              },
            },
          };
        }
        if (b.toWarehouseId == warehouse.id) {
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
                    ? a.import[b.product.name].count + 1
                    : 1,
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
        warehouseId: warehouse.id,
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
      where: {
        // variant: {
        //   every: {
        //     variantStocks: {
        //       every: {
        //         warehouseId: warehouse.id,
        //       },
        //     },
        //   },
        // },
      },
      include: {
        stockMutations: {
          where: {
            OR: [
              { fromWarehouseId: warehouse.id },
              { toWarehouseId: warehouse.id },
            ],
          },
        },
        variant: {
          include: {
            variantStocks: {
              where: {
                warehouseId: warehouse.id,
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
