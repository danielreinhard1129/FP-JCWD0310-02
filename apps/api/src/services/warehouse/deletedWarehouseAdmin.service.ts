import prisma from '@/prisma';

export const deleteWarehouseAdminService = async (id: number) => {
  try {
    console.log(id);
    const existingUser = await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
    console.log(existingUser);
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
    console.log(error);
    throw error;
  }
};
