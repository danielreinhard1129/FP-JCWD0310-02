import prisma from '@/prisma';

export const deleteWarehouseAdminService = async (id: number) => {
  try {
    const existingUser = await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    await prisma.users.update({
      where: { id: Number(id) },
      data: {
        isDelete: true,
      },
    });
    await prisma.employee.delete({
      where: { userId: Number(id) },
    });

    return { message: 'Warehouse deleted successfully', data: existingUser };
  } catch (error) {
    throw error;
  }
};
