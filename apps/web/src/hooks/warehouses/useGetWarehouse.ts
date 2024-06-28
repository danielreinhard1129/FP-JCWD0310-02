import { axiosInstance } from '@/lib/axios';

const useGetWarehouse = () => {
  const getWarehouse = async () => {
    try {
      const response = await axiosInstance.get('/warehouse/getWarehouses');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { getWarehouse };
};
export default useGetWarehouse;
