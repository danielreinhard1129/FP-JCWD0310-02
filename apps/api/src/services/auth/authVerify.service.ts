import prisma from '@/prisma';
import { comparePassword } from '@/lib/bcrypt';
type verify = {
  token: string;
  password: string;
};

export const authVerifyService = async (body: verify) => {
  try {
    const { token, password } = body;
    const validateUser = await prisma.users.findFirst({
      where: {
        token,
      },
    });

    if (!validateUser) {
      throw new Error('invalid token or password');
    }
    const storedPassword = validateUser.password;
    const hashedPassword = await comparePassword(
      password,
      storedPassword as string,
    );
    // if (!validateUser) {
    //   throw new Error('invalid token or password');
    // }
    // const storedPassword = validateUser.password;
    // if (!storedPassword) {
    //   throw new Error('Password is not set for this user');
    // }
    // const isPasswordValid = await comparePassword(password, storedPassword);

    //get user berdasarkan user id dari isi token
    // cek password pake compare pw dr bcrypt
    // cek token dri body sama engga dgn token dri db

    return {
      message: 'Verify success',
      data: validateUser,
    };
  } catch (error) {
    throw error;
  }
};

// import prisma from '@/prisma';
// import { comparePassword } from '@/lib/bcrypt';

// type VerifyInput = {
//   token: string;
//   password: string;
// };

// export const authVerifyService = async (body: VerifyInput) => {
//   try {
//     const { token, password } = body;

//     const validateUser = await prisma.users.findFirst({
//       where: {
//         token,
//       },
//     });

//     if (!validateUser) {
//       throw new Error('Invalid token or password');
//     }

//     const storedPassword = validateUser.password;

//     if (!storedPassword) {
//       throw new Error('Password is not set for this user');
//     }

//     const isPasswordValid = await comparePassword(password, storedPassword);

//     if (!isPasswordValid) {
//       throw new Error('Invalid token or password');
//     }

//     return {
//       message: 'Verification successful',
//       data: validateUser,
//     };
//   } catch (error) {
//     console.error('Error in authVerifyService:', error);
//     throw new Error('Failed to verify user');
//   }
// };
