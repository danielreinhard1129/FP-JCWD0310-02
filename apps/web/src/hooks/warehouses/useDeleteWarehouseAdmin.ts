'use client';
import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';

const useDeleteWarehouseAdmin = () => {
  const { openNotification } = useNotification();
  const deleteWarehouseAdmin = async (id: number) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `/warehouse/delete-warehouse-admin/${id}`,
      );
      openNotification.success({
        message: 'Admin deleted successfully',
      });
      console.log(response.data);

      return response.data;
    } catch (error) {}
  };
  return { deleteWarehouseAdmin };
};

export default useDeleteWarehouseAdmin;
