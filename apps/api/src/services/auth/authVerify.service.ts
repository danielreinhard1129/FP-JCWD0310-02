// import prisma from '@/prisma';
// import { comparePassword } from '@/lib/bcrypt';
// import jwt from 'jsonwebtoken';
// type verify = {
//   token: string;
//   password: string;
// };

// export const authVerifyService = async (body: verify) => {
//   try {
//     const { token, password } = body;
//     console.log(token);
//     const decodeToken = jwt.decode(token);
//     const validateUser = await prisma.users.findFirst({
//       where: { id: Number(decodeToken) },
//     });
//     console.log(validateUser);
//     if (!validateUser) {
//       console.log('user not found');
//       throw new Error('user not found');
//     }

//     if (!validateUser.password) {
//       console.log('Password not set for the user');
//       throw new Error('Password not set for the user');
//     }
//     const hashedPassword = await comparePassword(
//       password,
//       validateUser.password,
//     );
//     if (!hashedPassword) {
//       throw new Error('Incorrect password');
//     }

//     await prisma.users.update({
//       where: { id: Number(decodeToken) },
//       data: {
//         isVerify: true,
//       },
//     });
//     return {
//       message: 'Verify success',
//       toast: 'Verify success',
//     };
//   } catch (error) {
//     throw error;
//   }
// };

import prisma from '@/prisma';
import { comparePassword } from '@/lib/bcrypt';
import jwt from 'jsonwebtoken';

interface VerifyBody {
  token: string;
  password: string;
}
interface jwtPayload {
  id: number;
}

export const authVerifyService = async (body: VerifyBody) => {
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

    if (!validateUser.password) {
      throw new Error('Password not set for the user');
    }

    const isPasswordCorrect = await comparePassword(
      password,
      validateUser.password,
    );
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    await prisma.users.update({
      where: { id: userId },
      data: {
        isVerify: true,
      },
    });

    return {
      message: 'Verify success',
    };
  } catch (error) {
    throw error;
  }
};
