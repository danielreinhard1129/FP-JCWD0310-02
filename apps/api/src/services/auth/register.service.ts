import prisma from '@/prisma';
import { User } from '@/types/user.type';
import { sign } from 'jsonwebtoken';
import { transporter } from '@/lib/nodemailer';
export const registerService = async (body: User) => {
  const { email, password, firstName, lastName } = body;

  const existingUser = await prisma.users.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Register success',
    text: 'Register success',
  });
  return await prisma.users.create({
    data: { ...body, role: 'CUSTOMER', isDelete: false, token: '' },
  });
};
