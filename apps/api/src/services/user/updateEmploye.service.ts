import prisma from '@/prisma';

export const updateEmployeService = async (id: number, WarehouseId: number) => {
  try {
    const existingEmploye = await prisma.employee.findFirst({
      where: {
        userId: Number(id),
      },
    });
    if (!existingEmploye) {
      throw new Error('Employe not found');
    }
    const updateEmploye = await prisma.employee.update({
      where: {
        id: Number(id),
      },
      data: {
        warehouseId: Number(WarehouseId),
      },
    });
    return updateEmploye;
  } catch (error) {
    throw error;
  }
};
