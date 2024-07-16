import { axiosInstance } from '@/lib/axios';

const useGetWarehouseAdmin = () => {
  const getWarehouseAdmin = async () => {
    try {
      const response = await axiosInstance.get('/user/get-admin');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { getWarehouseAdmin };
};

export default useGetWarehouseAdmin;
