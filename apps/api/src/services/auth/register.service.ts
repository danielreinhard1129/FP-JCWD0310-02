import prisma from '@/prisma';
import { User } from '@/types/user.type';
import { sign } from 'jsonwebtoken';
import { transporter } from '@/lib/nodemailer';
import { jwtSecretKey } from '@/config';
import { hashedPassword } from '@/lib/bcrypt';
export const registerService = async (body: User) => {
  const { email, password } = body;
  const existingUser = await prisma.users.findFirst({
    where: { email },
  });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const generateToken = sign({ email: email }, jwtSecretKey, {
    expiresIn: '2h',
  });

  const hashPassword = await hashedPassword(password);
  // const token = req.headers.authorization?.split(' ')[1];
  transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Register success ',
    text:
      'klick link di bawah ini untuk verivikasi akun anda ' +
      `http://localhost:3000/verify?token=${generateToken}`,
  });
  return await prisma.users.create({
    data: {
      ...body,
      password: hashPassword,
      role: 'CUSTOMER',
      isDelete: false,
      token: generateToken,
    },
  });
};
