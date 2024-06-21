import { axiosInstance } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface VerifyTokenArgs {
  password: string;
}
const useResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      alert('Password Reset Successful');
      console.log(response);
      router.replace('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return { resetPassword };
};

export default useResetPassword;
