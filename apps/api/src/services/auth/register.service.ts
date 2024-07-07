import prisma from '@/prisma';
import { User } from '@/types/user.type';
import { sign } from 'jsonwebtoken';
import { transporter } from '@/lib/nodemailer';
import { jwtSecretKey, BASE_WEB } from '@/config';
import { hashedPassword } from '@/lib/bcrypt';
export const registerService = async (body: User) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.users.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashPassword = await hashedPassword(password);
    const user = await prisma.users.create({
      data: {
        ...body,
        password: hashPassword,
        role: 'CUSTOMER',
        isDelete: false,
        token: '0',
      },
    });

    const generateToken = sign({ id: user.id }, jwtSecretKey, {
      expiresIn: '2h',
    });

    // const token = req.headers.authorization?.split(' ')[1];
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'Register success ',
      text:
        'klick link di bawah ini untuk verivikasi akun anda ' +
        `${BASE_WEB}/verify?token=${generateToken}`,
    });
    await prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        token: generateToken,
      },
    });
    return {
      message: `Verification email send to ${email}`,
    };
  } catch (error) {
    throw error;
  }
};
