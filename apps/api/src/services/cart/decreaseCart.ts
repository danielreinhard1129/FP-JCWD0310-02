import prisma from '@/prisma';

export const decreaseCartService = async (id: number) => {
  try {
    const decreaseItem = await prisma.cart.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
    return decreaseItem;
  } catch (error) {
    throw error;
  }
};
