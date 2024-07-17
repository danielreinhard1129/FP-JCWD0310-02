import { User } from '@/app/types/user.type';
import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface RegisterArgs extends Omit<User, 'id'> {
  password: string;
}
const useRegister = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const register = async (payload: RegisterArgs) => {
    try {
      const { data } = await axiosInstance.post('/auth/register', payload);
      openNotification.success({ message: 'Register success' });
      router.replace('/login');
    } catch (error: any) {
      openNotification.error({ message: error.response?.data?.message });
    }
  };
  return { register };
};
export default useRegister;
