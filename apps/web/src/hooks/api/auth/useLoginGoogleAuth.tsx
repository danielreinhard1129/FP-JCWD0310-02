'use client';

import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slicers/userSlice';
import { useGoogleLogin } from '@react-oauth/google';

import { useRouter } from 'next/navigation';

const useLoginGoogleAuth = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const dispatch = useAppDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('/auth/login/google', {
          code,
        });
        console.log('ini code google', code);
        const { data } = response;
        // dispatch({ type: 'LOGIN', payload: data.data });
        dispatch(loginAction(data.data));
        localStorage.setItem('token', data.token);
        openNotification.success({ message: 'Login google success' });
        router.replace('/');
      } catch (error) {
        openNotification.error({ message: 'Login Google failed' });
      }
    },
    flow: 'auth-code',
  });

  return { googleLogin };
};

export default useLoginGoogleAuth;

// import { OAuth2Client } from 'google-auth-library';
