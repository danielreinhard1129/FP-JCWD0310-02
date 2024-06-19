import { axiosInstance } from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';

interface VerifyTokenArgs {
  password: string;
}
const useVerifyToken = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  console.log(searchParams.get('token'));

  const verifyToken = (payload: VerifyTokenArgs) => {
    console.log(payload.password);
    try {
      const response = axiosInstance.post(
        'auth/verify',
        {
          password: payload.password,
        },
        {
          headers: {
            Authorization: `Bearer ${searchParams.get('token')}`,
          },
        },
      );

      console.log(response);
      router.replace('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return { verifyToken };
};

export default useVerifyToken;
