'use client';

import useAxios from '@/hooks/useAxios';
import { axiosInstance } from '@/lib/axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

const useRegisterGoogleAuth = () => {
  const router = useRouter();
  const googleRegister = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const response = await axiosInstance.post('auth/register/google', {
          code,
        });
        console.log('ini code google', code);
        const { data } = response;

        console.log('Register successful, server response:', data);
        router.replace('/login');
      } catch (error) {}
    },
    flow: 'auth-code',
  });

  return { googleRegister };
};

export default useRegisterGoogleAuth;
