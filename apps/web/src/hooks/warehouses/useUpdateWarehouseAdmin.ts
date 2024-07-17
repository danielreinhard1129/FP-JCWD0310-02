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

const useUpdateWarehouseAdmin = () => {
  const { openNotification } = useNotification();
  const updateWarehouseAdmin = async (
    payload: CreateAdminArgs,
    adminId: number,
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `/warehouse/update-warehouse-admin/${adminId}`,
        payload,
      );
      openNotification.success({
        message: 'Warehouse Admin updated successfully',
      });
      return data;
    } catch (error) {}
  };
  return {
    updateWarehouseAdmin,
  };
};
export default useUpdateWarehouseAdmin;
