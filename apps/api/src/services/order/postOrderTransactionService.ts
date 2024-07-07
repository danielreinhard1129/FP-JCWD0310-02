import prisma from '@/prisma';
import { automateStockMutations } from '../stock-mutation/automateStockMutations';

export const postOrderTransactionService = async (
  orderId: number,
  adminId: number,
  type: 'CONFIRM' | 'REJECT' | 'SHIPPING',
) => {
  try {
    if (!orderId || !adminId || !type) {
      throw new Error('Wrong parameters');
    }
    if (type != 'CONFIRM' && type != 'REJECT' && type != 'SHIPPING') {
      throw new Error('Wrong parameters');
    }

    const transaction = await prisma.$transaction(async (tx) => {
      try {
        const admin = await tx.users.findFirst({
          where: {
            id: adminId,
          },
          include: {
            employee: {
              include: {
                warehouse: true,
              },
            },
          },
        });

        if (!admin || !admin.employee || admin.role == 'CUSTOMER') {
          throw new Error('Not Authorized!');
        }

        const currentOrder = await tx.order.findFirst({
          where: {
            id: orderId,
          },
          include: {
            orderItems: true,
          },
        });

        if (!currentOrder || !currentOrder.paymentsId)
          throw new Error('Order transaction not found!');

        console.log('userId', admin.id);
        console.log('userRole', admin.role);

        if (
          admin.role != 'SUPER_ADMIN' &&
          admin.employee.warehouseId != currentOrder.warehouseId
        )
          throw new Error('Not authorized for take action on this order!');

        const currentTransaction = await tx.payments.findFirst({
          where: {
            id: currentOrder.paymentsId,
          },
        });

        if (!currentTransaction)
          throw new Error('Something is error on this order and transaction!');

        if (type == 'REJECT') {
          const rejectOrder = await tx.order.update({
            where: {
              id: currentOrder.id,
            },
            data: {
              status: 'CANCEL',
            },
          });
          return rejectOrder;
        }

        if (!currentTransaction.paymentProof)
          throw new Error(
            'Cannot confirm this orders before customer upload a payment proof!',
          );

        if (type == 'SHIPPING') {
          const shippingOrder = await tx.order.update({
            where: {
              id: currentOrder.id,
            },
            data: {
              status: 'ON_SHIPPING',
            },
          });
          return shippingOrder;
        }

        const automateOrder = currentOrder.orderItems.map(async (val) => {
          await automateStockMutations(
            val.variantId,
            currentOrder.warehouseId,
            val.quantity,
            currentOrder.id,
          );
        });

        return automateOrder;
      } catch (error) {
        throw error;
      }
    });

    return transaction;
  } catch (error) {
    throw error;
  }
};
