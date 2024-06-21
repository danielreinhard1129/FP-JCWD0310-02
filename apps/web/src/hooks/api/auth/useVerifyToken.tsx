import { axiosInstance } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

interface VerifyTokenArgs {
  password: string;
}
const useVerifyToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  console.log(searchParams.get('token'));

  const verifyToken = async (payload: VerifyTokenArgs) => {
    console.log(payload.password);
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
      alert('Token Verified');
      console.log(response);
      router.replace('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return { verifyToken };
};

export default useVerifyToken;
