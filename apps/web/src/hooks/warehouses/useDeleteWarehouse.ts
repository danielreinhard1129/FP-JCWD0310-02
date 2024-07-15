'use client';
import { axiosInstance } from '@/lib/axios';
import { useNotification } from '../useNotification';

const useDeleteWarehouse = () => {
  const { openNotification } = useNotification();
  const deleteWarehouse = async (id: number) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `/warehouse/delete-warehouse/${id}`,
      );

      openNotification.success({
        message: 'Warehouse deleted successfully',
      });

      return response.data;
    } catch (error) {}
  };
  return { deleteWarehouse };
};

export default useDeleteWarehouse;
