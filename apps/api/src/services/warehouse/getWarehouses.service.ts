import prisma from '@/prisma';

export const getWarehouseService = async () => {
  try {
    const response = await prisma.warehouse.findMany({});
    return response;
  } catch (error) {
    throw error;
  }
};
