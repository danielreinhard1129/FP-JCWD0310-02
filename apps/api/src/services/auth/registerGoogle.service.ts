import prisma from '@/prisma';
import { google } from 'googleapis';
import { transporter } from '@/lib/nodemailer';

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  'http://localhost:3000',
);

export const registerGoogleService = async (code: string) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Tokens received from Google:', tokens);

    oAuth2Client.setCredentials(tokens);

    const response = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    const data = response.data as GoogleUser;
    console.log('User info received from Google:', data);

    const existingUser = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) {
      const existingUser = await prisma.users.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          role: 'CUSTOMER',
          isDelete: false,
          token: '',
        },
      });
    }

    // transporter.sendMail({
    //   from: process.env.GMAIL_EMAIL,
    //   to: data.email,
    //   subject: 'Register success',
    //   text: 'Register success',
    // });
    return { message: 'register success', data: existingUser };
  } catch (error) {
    console.error('Error in Google login service:', error);
    throw new Error('Google login failed');
  }
};
