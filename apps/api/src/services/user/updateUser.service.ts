import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface User {
  email: string;
  firstName: string;
  password: string;
  profileImageUrl: string;
  //   isVerify: boolean;
}

export const updateUser = async (body: User, id: number) => {
  try {
    const { password } = body;
    const existingUser = await prisma.users.findFirst({
      where: { id },
    });
    console.log(body);
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const hashPassword = await hashedPassword(password);
    await prisma.users.update({
      where: { id },
      data: { ...body, password: hashPassword },
    });
    return {
      message: 'User updated successfully',
      user: body,
    };
  } catch (error) {}
};
