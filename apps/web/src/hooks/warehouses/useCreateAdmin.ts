import { axiosInstance } from '@/lib/axios';

interface CreateAdminArgs {
  email: string;
  password: string;
}

const useCreateAdmin = () => {
  const createAdmin = async (payload: CreateAdminArgs) => {
    try {
      const { data } = await axiosInstance.post(
        '/warehouse/createAdmin',
        payload,
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { createAdmin };
};

export default useCreateAdmin;
