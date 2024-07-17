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
    return address;
  } catch (error) {
    throw error;
  }
};
