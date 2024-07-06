import { axiosInstance } from '@/lib/axios';

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
  const createAdmin = async (payload: CreateAdminArgs) => {
    try {
      const { data } = await axiosInstance.post(
        '/warehouse/create-warehouse-admin',
        payload,
      );
      console.log(data);
      alert('Admin created successfully');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return { createAdmin };
};

export default useCreateAdmin;
