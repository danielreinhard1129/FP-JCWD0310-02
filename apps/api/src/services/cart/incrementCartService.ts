import prisma from '@/prisma';

export const increaseCartService = async (id: number) => {
  try {
    const increaseItem = await prisma.cart.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
    return increaseItem;
  } catch (error) {
    throw error;
  }
};
