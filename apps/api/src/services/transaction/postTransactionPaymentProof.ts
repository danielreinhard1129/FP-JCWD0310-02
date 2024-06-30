import prisma from '@/prisma';

export const postTransactionPaymentProof = async (
  image: Express.Multer.File,
  userId: number,
  invoiceNumber: string,
) => {
  try {
    const updatePaymentProof = await prisma.$transaction(async (tx) => {
      try {
        const payment = await tx.payments.findFirst({
          where: {
            invoiceNumber,
          },
        });

        if (!payment) throw new Error('Transaction not found!');

        const order = await tx.order.findFirst({
          where: {
            paymentsId: payment.id,
          },
        });

        if (!order) throw new Error('Order not found!');

        const user = await tx.users.findFirst({
          where: { id: userId },
        });

        if (!user) throw new Error('Your account cannot found!');
        if (order.userId !== user.id)
          throw new Error('Your transaction not found!');

        const updatedPayment = await tx.payments.update({
          where: {
            invoiceNumber,
          },
          data: {
            paymentProof: `images/${image.filename}`,
          },
        });

        if (!updatedPayment) throw new Error('Cannot update your transaction!');

        const updatedOrder = await tx.order.update({
          where: {
            id: order.id,
          },
          data: {
            status: 'CONFIRMATION_PAYMENT',
          },
        });

        return updatedPayment;
      } catch (error) {
        throw error;
      }
    });

    return {
      message: 'Success upload payment proof',
      updatePaymentProof,
    };
  } catch (error) {}
};
