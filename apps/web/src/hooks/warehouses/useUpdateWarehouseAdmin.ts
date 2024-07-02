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

const useUpdateWarehouseAdmin = () => {
  const updateWarehouseAdmin = async (
    payload: CreateAdminArgs,
    adminId: number,
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/warehouse/update-warehouse-admin/${adminId}`,
        payload,
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    updateWarehouseAdmin,
  };
};
export default useUpdateWarehouseAdmin;