import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

interface User {
  email: string;
  firstName: string;
  password: string;
  profileImageUrl: string;
  //   isVerify: boolean;
}

export const updateUserService = async (
  body: User,
  id: number,
  file: Express.Multer.File,
) => {
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
        // profileImageUrl: `/images/${file.filename}`,
        // profileImageUrl: String(profileImageUrls),
      },
    });
    return {
      message: 'User updated successfully',
      user: body,
    };
  } catch (error) {}
};
