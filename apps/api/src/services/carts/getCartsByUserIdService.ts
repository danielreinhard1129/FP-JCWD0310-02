import prisma from '@/prisma';

export const getUserCartByIdService = async (userId: number) => {
  try {
    const cartItems = await prisma.cart.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        product: true,
        variant: true,
      },
    });
    return cartItems;
  } catch (error) {
    throw error;
  }
};
