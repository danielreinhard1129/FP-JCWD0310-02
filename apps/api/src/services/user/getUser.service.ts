import prisma from '@/prisma';

interface User {
  email: string;
  role: string;
  firstName: string;
  isVerify: boolean;
  password: string;
}

export const userService = async (body: User, id: number) => {
  try {
    console.log(id);
    const existingUser = await prisma.users.findFirst({
      where: { id, isDelete: false },
      include: { Addresses: true },
    });
    console.log(existingUser);
    return existingUser;
  } catch (error) {}
};
