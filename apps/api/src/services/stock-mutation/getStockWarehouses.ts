import prisma from '@/prisma';

export const getStockWarehouses = async (
  filterWarehouseId: number | undefined,
) => {
  try {
    const warehouse = await prisma.warehouse.findMany({});
    return {
      data: warehouse,
    };
  } catch (error) {
    throw error;
  }
};
