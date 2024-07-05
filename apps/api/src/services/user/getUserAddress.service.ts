import prisma from '@/prisma';

export const getUserAddressService = async (userId: number) => {
  const existingUser = await prisma.address.findMany({
    where: {
      userId: Number(userId),
    },
  });
  if (!existingUser) {
    throw new Error('Address not found');
  }

  return existingUser;
};
