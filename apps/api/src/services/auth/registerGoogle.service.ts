import prisma from '@/prisma';
import { google } from 'googleapis';
import { transporter } from '@/lib/nodemailer';
import { BASE_WEB } from '@/config';

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
  BASE_WEB,
);

export const registerGoogleService = async (code: string) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    oAuth2Client.setCredentials(tokens);

    const response = await oAuth2Client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });
    const data = response.data as GoogleUser;

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
          profileImageUrl: data.picture,
          isVerify: true,
        },
      });
    }

    return { message: 'register success', data: existingUser };
  } catch (error) {
    console.error('Error in Google login service:', error);
    throw new Error('Google login failed');
  }
};
