'use client';

import useAxios from '@/hooks/useAxios';
import { useGoogleLogin } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';

const useGoogleAuth = () => {
  const { axiosInstance } = useAxios();

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('/api/auth/google', { code });

        const { data } = response;

        console.log('Login successful, server response:', data);
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    flow: 'auth-code',
  });

  return { googleLogin };
};

export default useGoogleAuth;
