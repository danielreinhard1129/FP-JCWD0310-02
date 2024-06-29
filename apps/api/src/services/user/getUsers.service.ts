import prisma from '@/prisma';
interface UserArgs {
  id: number;
  email: string;
  role: string;
  firstName: string;
  password: string;
}
export const getUsersService = async () => {
  try {
    const response = await prisma.users.findMany({
      where: { isDelete: false },
      include: {
        employee: true,
      },
    });

    return { message: 'OK', data: response };
  } catch (error) {
    console.log(error);
  }
};
