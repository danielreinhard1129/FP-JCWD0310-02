import prisma from '@/prisma';

export const deleteWarehouseService = async (id: number) => {
  try {
    const existingWarehouse = await prisma.warehouse.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingWarehouse) {
      throw new Error('Warehouse not found');
    }
    const deletedWarehouse = await prisma.warehouse.deleteMany({
      where: {
        id: Number(id),
      },
    });
    return {
      message: 'Warehouse deleted successfully',
    };
  } catch (error) {
    throw error;
  }
};
