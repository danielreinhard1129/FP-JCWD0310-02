import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@/types/user.type';
interface UserArgs extends User {
  password: string;
  ktp: string;
  npwp: string;
  salary: number;
}
export const createWarehouseAdminService = async (body: UserArgs) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.users.findFirst({
      where: { email },
    });
    console.log(existingUser);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashPassword = await hashedPassword(password);
    const user = await prisma.users.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashPassword,
        role: 'WAREHOUSE_ADMIN',
        isDelete: false,
        token: '0',
        employee: {
          create: {
            ktp: body.ktp,
            npwp: body.npwp,
            salary: Number(body.salary),
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
