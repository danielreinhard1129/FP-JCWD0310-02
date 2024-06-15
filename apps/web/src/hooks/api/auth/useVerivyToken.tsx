import { axiosInstance } from '@/lib/axios';
import { useSearchParams } from 'next/navigation';

interface VerifyTokenArgs {
  password: string;
  token: string;
}
const useVerifyToken = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get('token'));
  const verifyToken = (payload: VerifyTokenArgs) => {
    try {
      const response = axiosInstance.post('auth/verify', {
        password: payload.password,
        token: searchParams.get('token'),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { verifyToken };
};

export default useVerifyToken;
