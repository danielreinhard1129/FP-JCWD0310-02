import prisma from '@/prisma';

interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  // isPrimary: boolean;
}

export const updateAddressService = async (body: Address, id: number) => {
  try {
    const existingUser = await prisma.address.findFirst({
      where: { userId: id },
    });
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('Address not found');
    }
    const response = await prisma.address.update({
      where: { id },
      data: {
        ...body,
      },
    });
    console.log(response);
    return {
      message: 'Address updated successfully',
      data: response,
    };
  } catch (error) {
    throw error;
  }
};
