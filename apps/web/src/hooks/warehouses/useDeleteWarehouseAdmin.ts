'use client';
import { axiosInstance } from '@/lib/axios';

const useDeleteWarehouseAdmin = () => {
  const deleteWarehouseAdmin = async (id: number) => {
    console.log(id);
    try {
      const response = await axiosInstance.delete(
        `/warehouse/delete-warehouse-admin/${id}`,
      );
      alert('Admin deleted successfully');
      console.log(response.data);
      window.location.reload();

      return response.data;
    } catch (error) {}
  };
  return { deleteWarehouseAdmin };
};

export default useDeleteWarehouseAdmin;
