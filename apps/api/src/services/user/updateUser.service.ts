import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface User {
  email: string;
  firstName: string;

  profileImageUrl: string;
  //   isVerify: boolean;
}

export const updateUserService = async (
  body: User,
  id: number,
  file: Express.Multer.File,
) => {
  try {
    const existingUser = await prisma.users.findFirst({
      where: { id },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }
    const existingemail = await prisma.users.findFirst({
      where: { email: body.email },
    });
    if (!existingemail) {
      await prisma.users.update({
        where: { id },
        data: {
          email: body.email,
          firstName: body.firstName,
          isVerify: false,
        },
      });
      throw 'Email update success and verify your email';
    }
    if (file) {
      await prisma.users.update({
        where: { id },
        data: {
          email: body.email,
          firstName: body.firstName,
          profileImageUrl: `/images/${file.filename}`,
        },
      });
    }

    await prisma.users.update({
      where: { id },
      data: {
        email: body.email,
        firstName: body.firstName,
      },
    });
    return {
      message: 'User updated successfully',
      user: body,
    };
  } catch (error) {}
};
