import prisma from '@/prisma';

export const deleteAddressService = async (id: number, userId: number) => {
  try {
    const existingUser = await prisma.address.findFirst({
      where: { id, userId },
    });
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('Address not found');
    }
    const response = await prisma.address.delete({
      where: { id },
    });
    return { message: 'Address deleted successfully', data: response };
  } catch (error) {
    throw error;
  }
};
