'use client';

import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slicers/userSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';
import { useRouter } from 'next/navigation';

import { axiosInstance } from '@/lib/axios';

const useLoginGoogleAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('auth/login/google', {
          code,
        });
        console.log('ini code google', code);
        const { data } = response;
        // dispatch({ type: 'LOGIN', payload: data.data });
        dispatch(loginAction(data.data));
        console.log('Login successful, server response:', data);
        router.replace('/');
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    flow: 'auth-code',
  });

  return { googleLogin };
};

export default useLoginGoogleAuth;
