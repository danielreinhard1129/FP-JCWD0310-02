'use client';
import { axiosInstance } from '@/lib/axios';

const useDeleteWarehouse = () => {
  const deleteWarehouse = async (id: number) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `/warehouse/delete-warehouse/${id}`,
      );
      alert('Warehouse deleted successfully');
      console.log(response.data);

      return response.data;
    } catch (error) {}
  };
  return { deleteWarehouse };
};

export default useDeleteWarehouse;
