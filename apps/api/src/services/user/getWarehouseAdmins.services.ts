import prisma from '@/prisma';
interface UserArgs {
  id: number;
  email: string;
  role: string;
  firstName: string;
  password: string;
}
export const getWarehouseAdmins = async (body: UserArgs) => {
  try {
    const response = await prisma.users.findMany({
      where: {
        role: 'WAREHOUSE_ADMIN',
      },
    });

    return { message: 'OK', data: response };
  } catch (error) {}
};
