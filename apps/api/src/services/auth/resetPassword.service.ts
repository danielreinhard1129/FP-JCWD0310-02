import prisma from '@/prisma';
import { comparePassword, hashedPassword } from '@/lib/bcrypt';
import jwt from 'jsonwebtoken';

interface VerifyBody {
  token: string;
  password: string;
}
interface jwtPayload {
  id: number;
}

export const resetPassword = async (body: VerifyBody) => {
  try {
    const { token, password } = body;

    const decodeToken = jwt.decode(token) as jwtPayload;

    const userId = decodeToken.id;

    const validateUser = await prisma.users.findUnique({
      where: { id: userId },
    });
    if (!validateUser) {
      throw new Error('User not found');
    }

    await prisma.users.update({
      where: { id: userId },
      data: {
        isVerify: true,
        password: await hashedPassword(password),
      },
    });

    return {
      message: 'Verify success',
    };
  } catch (error) {
    throw error;
  }
};
