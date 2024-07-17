import prisma from '@/prisma';

interface User {
  email: string;
  role: string;
  firstName: string;
  isVerify: boolean;
  profileImageUrl: string;
}

export const userService = async (body: User, id: number) => {
  try {
    const existingUser = await prisma.users.findFirst({
      where: { id, isDelete: false },
      // include: { Addresses: true },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        isVerify: true,
        profileImageUrl: true,
        Addresses: true,
      },
    });
    return existingUser;
  } catch (error) {}
};
