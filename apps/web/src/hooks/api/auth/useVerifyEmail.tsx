import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface VerifyEmailArgs {
  email: string;
}
const useVerifyEmail = () => {
  const router = useRouter();
  const verifyEmail = async ({ email }: VerifyEmailArgs) => {
    try {
      const response = await axiosInstance.post('/auth/verify-email', {
        email,
      });
      console.log(response);
      alert('verify email success and check your email');
      router.push('/login');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { verifyEmail };
};
export default useVerifyEmail;
