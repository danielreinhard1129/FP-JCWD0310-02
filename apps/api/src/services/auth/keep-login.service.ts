import prisma from '@/prisma';

export const keeploginService = async (id: number) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { id },
    });
    console.log(existingUser);
    if (!existingUser) {
      throw new Error(`Invalid userid`);
    }

    return {
      message: 'keep login success',
      data: existingUser,
    };
  } catch (error) {
    throw error;
  }
};
