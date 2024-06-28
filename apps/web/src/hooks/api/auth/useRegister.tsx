import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
import { omit } from 'cypress/types/lodash';
import { useRouter } from 'next/navigation';

interface RegisterArgs extends Omit<User, 'id'> {
  password: string;
}
const useRegister = () => {
  const router = useRouter();
  const register = async (payload: RegisterArgs) => {
    try {
      const { data } = await axiosInstance.post('/auth/register', payload);

      router.replace('/login');
    } catch (error) {
      alert(error);
    }
  };
  return { register };
};
export default useRegister;
