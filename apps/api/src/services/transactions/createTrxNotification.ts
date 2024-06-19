import prisma from '@/prisma';
import crypto from 'crypto';

interface TransactionData {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  masked_card: string;
  gross_amount: string;
  fraud_status: string;
  eci: string;
  currency: string;
  channel_response_message: string;
  channel_response_code: string;
  card_type: string;
  bank: string;
  approval_code: string;
}

export const createTransactionNotificationService = async (
  data: TransactionData,
) => {
  const { order_id } = data;
  try {
    const transaction = await prisma.order.findFirst({
      where: {
        id: order_id,
      },
    });

    if (!transaction) throw new Error('No transaction found!');
    console.log(transaction);

    const hash = crypto
      .createHash('sha512')
      .update(
        `${transaction.id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`,
      )
      .digest('hex');

    if (data.signature_key !== hash) {
      return {
        status: 'error',
        message: 'Invalid Signature key',
      };
    }

    let responseData = null;
    const transactionStatus = data.transaction_status;
    const fraudStatus = data.fraud_status;

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'accept') {
        const trans = await prisma.order.update({
          where: {
            id: transaction.id,
          },
          data: {
            status: 'DONE',
            payment_method: data.payment_type,
          },
        });
        responseData = trans;
        await prisma.cart.deleteMany();
      }
    } else if (transactionStatus === 'settlement') {
      const trans = await prisma.order.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: 'DONE',
          payment_method: data.payment_type,
        },
      });
      responseData = trans;
      await prisma.cart.deleteMany();
    } else if (
      transactionStatus === 'cancel' ||
      transactionStatus === 'deny' ||
      transactionStatus === 'expire'
    ) {
      const trans = await prisma.order.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: 'CANCEL',
          payment_method: data.payment_type,
        },
      });
      responseData = trans;
    } else if (transactionStatus === 'pending') {
      const trans = await prisma.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: 'PENDING',
          payment_method: data.payment_type,
        },
      });
      responseData = trans;
    }

    return {
      status: 'success',
      data: responseData,
    };
  } catch (error) {
    throw error;
  }
};
