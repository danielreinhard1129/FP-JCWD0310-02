import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';
import { useRouter } from 'next/navigation';

interface CreateAdminArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  ktp: string;
  npwp: string;
  salary: number;
}

const useCreateAdmin = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const createAdmin = async (payload: CreateAdminArgs) => {
    try {
      const { data } = await axiosInstance.post(
        '/warehouse/create-warehouse-admin',
        payload,
      );
      openNotification.success({ message: 'Create Admin Success' });
      router.back();
    } catch (error: any) {
      openNotification.error({ message: error.response?.data?.message });
    }
  };
  return { createAdmin };
};

export default useCreateAdmin;
