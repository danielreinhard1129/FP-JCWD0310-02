import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

export interface IPayloadPostOrder {
  discount: number;
  payment_method: 'MANUAL' | 'MIDTRANS';
  shippingCost: number;
  shippingDetail: number;
  total: number;
}

export const postOrderService = async (
  userId: number,
  payload: IPayloadPostOrder,
) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('Sorry cannot find your user data');

    if (user.role !== 'CUSTOMER')
      throw new Error('Sorry you cannot create order');

    const order = await prisma.$transaction(async (tx) => {
      try {
        const newOrder = await tx.order.create({
          data: {
            warehouseId: 0,
            userId: 0,
            discount: 0,
            payment_method: 'MANUAL',
            shippingCost: 0,
            shippingDetail: 0,
            status: 'CONFIRMATION_PAYMENT',
            total: 0,
          },
        });
      } catch (error) {
        throw error;
      }
    });
  } catch (error) {
    throw error;
  }
};
