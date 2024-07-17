import prisma from '@/prisma';
import { haversineUtils } from '@/utils/haversineUtils';
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
    if (!payload.shippingDetail) throw new Error('Please input yours address');
    const user = await prisma.users.findFirst({
      where: { id: userId },
    });

    if (!user) throw new Error('Sorry cannot find your user data');

    if (user.role !== 'CUSTOMER')
      throw new Error('Sorry you cannot create order');

    const address = await prisma.address.findFirst({
      where: { id: payload.shippingDetail, userId: user.id },
    });

    if (!address) throw new Error('Something is error');

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

        const warehouse = await tx.warehouse.findMany({});

        if (!warehouse)
          throw new Error('No warehouse available.maybe something is error');

        const closestWarehouse = haversineUtils<{ id: number }>(
          {
            lat: address.lat,
            lon: address.lon,
          },
          warehouse.map((val) => {
            return {
              lat: val.lat,
              lon: val.lon,
              data: val,
            };
          }),
        );

        const newOrder = await tx.order.create({
          data: {
            warehouseId: closestWarehouse.data.id,
            userId: user.id,
            discount: 0,
            payment_method: 'MANUAL',
            shippingCost: payload.shippingCost,
            paymentsId: newTransaction.id,
            shippingAddress: payload.shippingDetail,
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
