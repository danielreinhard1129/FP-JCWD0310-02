import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface VerifyTokenArgs {
  password: string;
}
const useVerifyToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = searchParams.get('token');
  const { openNotification } = useNotification();

  const verifyToken = async (payload: VerifyTokenArgs) => {
    try {
      const response = await axiosInstance.post(
        '/auth/verify',
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
      openNotification.success({ message: 'Token Verified' });
      router.replace('/login');
    } catch (error) {}
  };
  return { verifyToken };
};

export default useVerifyToken;
