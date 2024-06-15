import prisma from '@/prisma';
import { comparePassword } from '@/lib/bcrypt';
type verify = {
  email: string;
  token: string;
  password: string;
};

export const authVerifyService = async (body: verify) => {
  try {
    const { token, password } = body;
    console.log(token, password);
    const validateUser = await prisma.users.findFirst({
      where: { token },
    });
    console.log(validateUser?.token);
    if (!validateUser) {
      throw new Error('Invalid token or password');
    }
    if (!validateUser.password) {
      throw new Error('Password is not set for this user');
    }
    const hashedPassword = await comparePassword(
      password,
      validateUser.password,
    );
    if (!hashedPassword) {
      throw new Error('Incorrect password');
    }

    return {
      message: 'Verify success',
    };
  } catch (error) {
    throw error;
  }
};
