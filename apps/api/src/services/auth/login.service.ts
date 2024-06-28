import { jwtSecretKey } from '@/config';
import { comparePassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';

type User = {
  email: string;
  password: string;
};

export const loginService = async (body: User) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.users.findFirst({
      where: { email },
      include: {
        employee: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    if (!existingUser.password) {
      throw new Error('Password not set for the user');
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }

    const token = sign({ id: existingUser.id }, jwtSecretKey, {
      expiresIn: '2h',
    });

    return {
      message: 'Login successful',
      data: {
        ...existingUser,
        employee:
          existingUser.role == 'CUSTOMER'
            ? undefined
            : {
                warehouseId: existingUser.employee?.warehouse.id,
                warehouse: existingUser.employee?.warehouse.name,
              },
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};
