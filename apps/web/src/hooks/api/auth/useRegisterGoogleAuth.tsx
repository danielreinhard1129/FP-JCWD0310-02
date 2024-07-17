'use client';

import useAxios from '@/hooks/useAxios';
import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const useRegisterGoogleAuth = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const googleRegister = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('auth/register/google', {
          code,
        });
        const { data } = response;

        openNotification.success({
          message: 'Register Google successful',
        });

        router.replace('/login');
      } catch (error) {
        openNotification.error({ message: 'Register Google failed' });
      }
    },
    flow: 'auth-code',
  });

  return { googleRegister };
};

export default useRegisterGoogleAuth;
