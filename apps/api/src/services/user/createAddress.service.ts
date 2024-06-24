import prisma from '@/prisma';

export const createAddressService = async (userId: string, data: any) => {
  console.log(data);
  //   return await prisma.address.create({
  //     data: {
  //       ...data,
  //       userId,
  //     },
  //   });
};
