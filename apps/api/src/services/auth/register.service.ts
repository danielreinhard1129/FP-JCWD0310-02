import prisma from '@/prisma';
import { User } from '@/types/user.type';

export const registerService = async (body: User) => {
  const { email, password, firstName, lastName } = body;

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  return await prisma.user.create({
    data: {
      ...body,
      role: 'USER',
    },
  });
};
