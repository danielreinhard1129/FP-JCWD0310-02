import prisma from '@/prisma';

export const getTrxByIdService = async (transaction_id: any) => {
  try {
    const trx = await prisma.order.findFirst({
      where: {
        id: transaction_id,
      },
      include: {
        orderItems: true,
        user: true,
        warehouse: true,
      },
    });
    if (!trx) {
      return { error: 'Transaction not found' };
    }
    return { data: trx };
  } catch (error) {
    throw error;
  }
};
