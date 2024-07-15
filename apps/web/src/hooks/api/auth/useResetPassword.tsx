import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface VerifyTokenArgs {
  password: string;
}
const useResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { openNotification } = useNotification();

  const token = searchParams.get('token');

  console.log(searchParams.get('token'));

  const resetPassword = async (payload: VerifyTokenArgs) => {
    console.log(payload.password);
    try {
      const response = await axiosInstance.post(
        '/auth/reset-password',
        {
          password: payload.password,
          token: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      openNotification.success({ message: 'Reset Password Success' });
      console.log(response);
      router.replace('/login');
    } catch (error) {
      openNotification.error({ message: 'Reset Password Failed' });
    }
  };
  return { resetPassword };
};

export default useResetPassword;
