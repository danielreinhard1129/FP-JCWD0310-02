import { User } from '@/app/types/user.type';
import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { omit } from 'cypress/types/lodash';
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
      console.log(data);
      openNotification.success({ message: 'Register success' });
      router.replace('/login');
    } catch (error) {
      console.log(error);
      openNotification.error({ message: error });
    }
  };
  return { register };
};
export default useRegister;
