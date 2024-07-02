import prisma from '@/prisma';

export const deleteCartservice = async (id: number) => {
  try {
    await prisma.cart.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    throw error;
  }
};
