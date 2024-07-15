import prisma from '@/prisma';
import dayjs from 'dayjs';

export const getSalesReportsSerivce = async (
  warehouseId: number,
  userId: number,
  date: {
    startDate: Date | string;
    endDate: Date | string;
  },
) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: { employee: { include: { warehouse: true } } },
    });

    if (!user) throw new Error('Cannot find your user data');
    if (!user.employee)
      throw new Error(
        'Sorry you are not authorized for accesing this features',
      );
    if (!user.employee.warehouseId)
      throw new Error(
        'Sorry you are not authorized for accesing this features',
      );

    const currentWarehouse =
      user.role == 'SUPER_ADMIN'
        ? warehouseId
          ? warehouseId
          : user.employee.warehouseId
        : user.employee.warehouseId;

    const revenue = await prisma.order.aggregate({
      where: {
        status: 'DONE',
        warehouseId: currentWarehouse,
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
      _sum: {
        total: true,
      },
    });

    const activeOrders = await prisma.order.aggregate({
      where: {
        OR: [{ status: 'ON_PROGRESS' }, { status: 'ON_SHIPPING' }],
        warehouseId: currentWarehouse,
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        total: true,
      },
    });

    const cancelledOrders = await prisma.order.aggregate({
      where: {
        status: 'CANCEL',
        warehouseId: currentWarehouse,
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        total: true,
      },
    });

    const allProduct = await prisma.product.findMany({
      include: {
        productImages: true,
      },
      take: 10,
      orderBy: {
        orderItems: {
          _count: 'desc',
        },
      },
    });

    const salesByProduct = await Promise.all(
      allProduct.map(async (val) => {
        return {
          ...val,
          count: await prisma.orderItems.aggregate({
            where: {
              productId: val.id,
              order: {
                status: 'DONE',
                warehouseId: currentWarehouse,
                createdAt: {
                  gte: date.startDate,
                  lte: date.endDate,
                },
              },
            },
            _sum: {
              quantity: true,
            },
          }),
          total: await prisma.order.aggregate({
            where: {
              status: 'DONE',
              warehouseId: currentWarehouse,
              orderItems: {
                some: {
                  productId: val.id,
                },
              },
              createdAt: {
                gte: date.startDate,
                lte: date.endDate,
              },
            },
            _sum: { total: true },
          }),
        };
      }),
    );

    const allCategory = await prisma.category.findMany({
      take: 10,
    });

    const salesByCategory = await Promise.all(
      allCategory.map(async (val) => {
        return {
          ...val,
          count: await prisma.orderItems.aggregate({
            where: {
              product: {
                productCategory: {
                  some: {
                    CategoryId: val.id,
                  },
                },
              },
              order: {
                status: 'DONE',
                warehouseId: currentWarehouse,
                createdAt: {
                  gte: date.startDate,
                  lte: date.endDate,
                },
              },
            },
            _sum: {
              quantity: true,
            },
          }),
        };
      }),
    );

    const recentOrder = await prisma.order.findMany({
      take: 10,
      where: {
        warehouseId: currentWarehouse,
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const sales = await prisma.order.findMany({
      where: {
        warehouseId: currentWarehouse,
        createdAt: {
          gte: date.startDate,
          lte: date.endDate,
        },
      },
    });

    const totalSales = sales.reduce((a: any, b) => {
      return {
        ...a,
        [b.createdAt.toISOString()]: a[b.createdAt.toISOString()]
          ? [...a[b.createdAt.toISOString()], b]
          : [b],
      };
    }, {});

    const sortedTotalSales = totalSales;

    return {
      totalSales: sortedTotalSales,
      salesByCategory: salesByCategory.map((val) => {
        return {
          ...val,
        };
      }),
      salesByProduct: salesByProduct.map((val) => {
        return {
          ...val,
          total: val.total._sum.total,
        };
      }),
      revenue: revenue._sum.total,
      activeOrders: {
        count: activeOrders._count.id,
        total: activeOrders._sum.total,
      },
      cancelledOrders: {
        count: cancelledOrders._count.id,
        total: cancelledOrders._sum.total,
      },
      recentOrder,
    };
  } catch (error) {
    throw error;
  }
};
