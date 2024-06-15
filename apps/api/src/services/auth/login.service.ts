// import { jwtSecretKey } from '@/config';
// import { comparePassword } from '@/lib/bcrypt';
// import prisma from '@/prisma';
// import { sign } from 'jsonwebtoken';
// type User = {
//   email: string;
//   password: string;
// };

// export const loginService = async (body: User) => {
//   try {
//     const { email, password } = body;
//     const existingUser = await prisma.users.findFirst({
//       where: { email },
//     });
//     if (!existingUser) {
//       throw new Error('User not found');
//     }

//     const isPasswordValid = await comparePassword(
//       password,
//       existingUser.password,
//     );
//     if (!isPasswordValid) {
//       throw new Error('incorect password');
//     }
//     const token = sign({ id: existingUser.id }, jwtSecretKey, {
//       expiresIn: '2h',
//     });

//     return { message: 'login success', data: existingUser, token };
//   } catch (error) {
//     throw error;
//   }
// };

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

    return { message: 'Login successful', data: existingUser, token };
  } catch (error) {
    throw error;
  }
};
