'use client';
import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';

const useDeleteWarehouseAdmin = () => {
  const { openNotification } = useNotification();
  const deleteWarehouseAdmin = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `/warehouse/delete-warehouse-admin/${id}`,
      );
      openNotification.success({
        message: 'Admin deleted successfully',
      });

      return response.data;
    } catch (error) {}
  };
  return { deleteWarehouseAdmin };
};

export default useDeleteWarehouseAdmin;
