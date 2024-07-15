import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface VerifyEmailArgs {
  email: string;
}
const useVerifyEmail = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const verifyEmail = async ({ email }: VerifyEmailArgs) => {
    try {
      const response = await axiosInstance.post('/auth/verify-email', {
        email,
      });
      console.log(response);
      openNotification.success({
        message: 'verify email success and check your email',
      });
      router.push('/login');
      return response.data;
    } catch (error) {
      openNotification.error({
        message: 'verify email failed',
      });
    }
  };
  return { verifyEmail };
};
export default useVerifyEmail;
