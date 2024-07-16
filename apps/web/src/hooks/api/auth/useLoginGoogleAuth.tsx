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
        console.log(data.data.role);
        dispatch(loginAction(data.data));
        localStorage.setItem('token', data.token);
        openNotification.success({ message: 'Login google success' });

        if (data.data.role === 'CUSTOMER') {
          router.replace('/');
        } else if (
          data.data.role === 'WAREHOUSE_ADMIN' ||
          data.data.role === 'SUPER_ADMIN'
        ) {
          router.replace('/admin');
        }
      } catch (error) {
        openNotification.error({ message: 'Login Google failed' });
      }
    },
    flow: 'auth-code',
  });

  return { googleLogin };
};

export default useLoginGoogleAuth;
