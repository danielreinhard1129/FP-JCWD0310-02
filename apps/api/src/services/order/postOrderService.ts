import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

export interface IPayloadPostOrder {
  discount: number;
  payment_method: 'MANUAL' | 'MIDTRANS';
  shippingCost: number;
  shippingDetail: number;
  total: number;
}

export const postOrderService = async (userId: number) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('Sorry cannot find your user data');

    if (user.role !== 'CUSTOMER')
      throw new Error('Sorry you cannot create order');

    const order = await prisma.$transaction(async (tx) => {
      try {
        const cart = await tx.cart.findMany({
          where: {
            userId: user.id,
          },
          include: {
            product: true,
            variant: true,
          },
        });

        if (!cart || !cart.length)
          throw new Error('Sorry no cart available on your account');

        const lastTransaction = await tx.payments.findMany({
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        });

        const newTransaction = await tx.payments.create({
          data: {
            paymentMethod: 'MANUAL',
            invoiceNumber: `KKK-${userId}-${lastTransaction.length ? lastTransaction[0].id + 1 : 1}`,
          },
        });

        const newOrder = await tx.order.create({
          data: {
            warehouseId: 1,
            userId: user.id,
            discount: 0,
            payment_method: 'MANUAL',
            shippingCost: 0,
            paymentsId: newTransaction.id,
            shippingDetail: 0,
            status: 'WAIT_USER',
            total: cart.reduce((a, b) => a + b.quantity * b.product.price, 0),
          },
        });

        const newOrderItems = await tx.orderItems.createMany({
          data: cart.map((b) => {
            return {
              quantity: b.quantity,
              productId: b.productId,
              orderId: newOrder.id,
              variantId: b.variantId,
            };
          }),
        });

        const deleteCart = await tx.cart.deleteMany({
          where: { userId },
        });

        return newTransaction;
      } catch (error) {
        throw error;
      }
    });
    return order;
  } catch (error) {
    throw error;
  }
};
