import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@/types/user.type';
export const createWarehouseAdminService = async (body: User) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.users.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashPassword = await hashedPassword(password);
    const user = await prisma.users.create({
      data: {
        ...body,
        password: hashPassword,
        role: 'WAREHOUSE_ADMIN',
        isDelete: false,
        token: '0',
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
