import prisma from '@/prisma';

export const getOrdersService = async (userId: number) => {
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

    if (!user || !user.employee)
      throw new Error('Sorry cannot find your user data');

    const orders = await prisma.order.findMany({
      where: {
        userId: user.role == 'CUSTOMER' ? user.id : undefined,
        // warehouseId:
        //   user.role == 'SUPER_ADMIN' ? undefined : user.employee.warehouseId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
            variant: true,
          },
        },
        user: true,
      },
    });
    return orders;
  } catch (error) {
    throw error;
  }
};
