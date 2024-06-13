import { jwtSecretKey } from '@/config';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
type User = {
  email: string;
  password: string;
};

export const loginService = async (body: User) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    const validPassword = await prisma.user.findFirst({
      where: { password },
    });

    if (!validPassword) {
      throw new Error('Invalid password');
    }
    const token = sign({ id: existingUser.id }, jwtSecretKey, {
      expiresIn: '2h',
    });

    return { message: 'login success', data: existingUser, token };
  } catch (error) {
    throw error;
  }
};
