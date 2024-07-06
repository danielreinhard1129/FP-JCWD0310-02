import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@/types/user.type';
interface UserArgs extends User {
  password: string;
  ktp: string;
  npwp: string;
  salary: number;
}
export const useUpdateWarehouseAdminService = async (
  body: UserArgs,
  id: number,
) => {
  try {
    const { password } = body;
    const existingUser = await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    const hashPassword = await hashedPassword(password);
    const response = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashPassword,
        role: 'WAREHOUSE_ADMIN',
        isDelete: false,
        token: '0',
        employee: {
          update: {
            ktp: body.ktp,
            npwp: body.npwp,
            salary: Number(body.salary),
          },
        },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
