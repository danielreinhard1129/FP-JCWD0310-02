import prisma from '@/prisma';
import dayjs from 'dayjs';

export const getSalesReportsSerivce = async (
  warehouseId: number,
  userId: number,
) => {
  try {
    // const user = await prisma.users.findFirst({
    //   where: { id: 1 },
    //   include: { employee: { include: { warehouse: true } } },
    // });

    // if (!user) throw new Error('Cannot find your user data');
    // if (!user.employee)
    //   throw new Error(
    //     'Sorry you are not authorized for accesing this features',
    //   );

    const revenue = await prisma.order.aggregate({
      where: { status: 'DONE' },
      _sum: {
        total: true,
      },
    });

    const activeOrders = await prisma.order.aggregate({
      where: {
        OR: [{ status: 'ON_PROGRESS' }, { status: 'ON_SHIPPING' }],
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
          count: await prisma.order.count({
            where: {
              orderItems: {
                every: {
                  productId: val.id,
                },
              },
            },
          }),
          total: await prisma.order.aggregate({
            where: {
              orderItems: {
                every: {
                  productId: val.id,
                },
              },
            },
            _sum: { total: true },
          }),
        };
      }),
    );

    const allCategory = await prisma.category.findMany({});

    const salesByCategory = await Promise.all(
      allCategory.map(async (val) => {
        return {
          ...val,
          count: await prisma.order.count({
            where: {
              orderItems: {
                some: {
                  product: { productCategory: { some: { category: val } } },
                },
              },
            },
          }),
          total: await prisma.order.aggregate({
            where: {
              orderItems: {
                some: {
                  product: { productCategory: { some: { category: val } } },
                },
              },
            },
            _sum: {
              total: true,
            },
          }),
        };
      }),
    );

    const recentOrder = await prisma.order.findMany({
      take: 5,
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
        warehouseId: 1,
      },
    });

    const totalSales = sales.reduce((a: any, b) => {
      return {
        ...a,
        [dayjs(b.createdAt).format('YYYY-DD-MM')]: a[
          dayjs(b.createdAt).format('YYYY-DD-MM')
        ]
          ? [...a[dayjs(b.createdAt).format('YYYY-DD-MM')], b]
          : [b],
      };
    }, {});

    const sortedTotalSales = Object.entries(totalSales)
      .sort(([ak, av], [bk, bv]) => {
        const x = new Date(new Date(ak));
        const y = new Date(new Date(bk));

        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
      })
      .reduce((a, b) => {
        return {
          ...a,
          [b[0]]: b[1],
        };
      }, {});

    return {
      totalSales: sortedTotalSales,
      salesByCategory: salesByCategory
        .map((val) => {
          return {
            ...val,
            total: val.total._sum.total,
          };
        })
        .sort((a, b) => a.count + b.count),
      salesByProduct: salesByProduct
        .map((val) => {
          return {
            ...val,
            total: val.total._sum.total,
          };
        })
        .sort((a, b) => a.count + b.count),
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
