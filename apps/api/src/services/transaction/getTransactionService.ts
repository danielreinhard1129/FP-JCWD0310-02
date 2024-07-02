import prisma from '@/prisma';

export const getTransactionService = async (transactionId: string) => {
  try {
    const transaction = await prisma.payments.findFirst({
      where: {
        invoiceNumber: transactionId,
      },
    });

    if (!transaction) throw new Error('Error could not find your transactions');

    const order = await prisma.order.findFirst({
      where: { paymentsId: transaction.id },
      include: {
        orderItems: {
          include: {
            product: {
              include: {
                productImages: true,
              },
            },
            variant: true,
          },
        },
      },
    });

    return {
      transaction,
      order,
    };
  } catch (error) {
    throw error;
  }
};
