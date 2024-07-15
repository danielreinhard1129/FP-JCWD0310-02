import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';

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
  const { openNotification } = useNotification();
  const createAdmin = async (payload: CreateAdminArgs) => {
    try {
      const { data } = await axiosInstance.post(
        '/warehouse/create-warehouse-admin',
        payload,
      );
      console.log(data);
      openNotification.success({ message: 'Create Admin Success' });
      window.location.reload();
    } catch (error) {
      openNotification.error({ message: 'Create Admin Failed' });
    }
  };
  return { createAdmin };
};

export default useCreateAdmin;
