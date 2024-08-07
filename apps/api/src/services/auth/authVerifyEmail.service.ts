import { jwtSecretKey, BASE_WEB } from '@/config';
import { transporter } from '@/lib/nodemailer';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';
interface User {
  email: string;
}
export const verifyEmail = async (body: User) => {
  const { email } = body;
  try {
    const user = await prisma.users.findFirst({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.password) {
      throw new Error('not gooogle account');
    }
    const generateToken = sign({ id: user.id }, jwtSecretKey, {
      expiresIn: '2h',
    });
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Reset your password',
      text:
        'klick link di bawah ini untuk Reset Password ' +
        `${BASE_WEB}/forgotPassword/resetPassword?token=${generateToken}`,
    });
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        token: generateToken,
      },
    });
    return { message: 'success' };
  } catch (error) {
    throw error;
  }
};
