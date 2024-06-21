import { jwtSecretKey, NEXT_PUBLIC_BASE_WEB } from '@/config';
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
    const generateToken = sign({ id: user.id }, jwtSecretKey, {
      expiresIn: '2h',
    });
    console.log(user.id);
    // const token = req.headers.authorization?.split(' ')[1];
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Register success ',
      text:
        'klick link di bawah ini untuk verivikasi akun anda ' +
        `${NEXT_PUBLIC_BASE_WEB}/forgotPassword/resetPassword?token=${generateToken}`,
    });
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        token: generateToken,
      },
    });
    return user;
  } catch (error) {}
};
