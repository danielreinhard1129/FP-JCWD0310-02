import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

export const getOrdersService = async (
  userId: number,
  warehouseId: number | undefined,
  status: Prisma.EnumOrderStatusFilter<'Order'>,
) => {
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

    if (!user.employee.warehouseId) throw new Error('You are not an admin!');

    const orders = await prisma.order.findMany({
      where: {
        status,
        userId: user.role == 'CUSTOMER' ? user.id : undefined,
        warehouseId:
          user.role == 'SUPER_ADMIN' ? warehouseId : user.employee.warehouseId,
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
