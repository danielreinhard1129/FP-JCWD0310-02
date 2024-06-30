import prisma from '@/prisma';

export const getOrderService = async (orderId: number) => {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    return order;
  } catch (error) {
    throw error;
  }
};
