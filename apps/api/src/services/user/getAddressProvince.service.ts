import prisma from '@/prisma';

export const getAddressProvince = async () => {
  try {
    const address = await prisma.province.findMany({
      include: {
        cities: {
          include: {
            subdistricts: true,
          },
        },
      },
    });
    console.log(address);
    return address;
  } catch (error) {
    throw error;
  }
};
