import prisma from '@/prisma';

export const getWarehouseService = async () => {
  try {
    const response = await prisma.warehouse.findMany({
      include: { employee: true },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
