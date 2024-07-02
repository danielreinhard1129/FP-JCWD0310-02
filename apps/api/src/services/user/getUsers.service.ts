import prisma from '@/prisma';

export const getUsersService = async () => {
  try {
    const response = await prisma.users.findMany({
      where: { isDelete: false },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
        employee: true,
      },
    });

    return { message: 'OK', data: response };
  } catch (error) {
    console.log(error);
  }
};
