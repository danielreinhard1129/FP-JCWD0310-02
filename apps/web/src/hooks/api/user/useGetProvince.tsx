import { axiosInstance } from '@/lib/axios';

const useGetProvince = () => {
  const getProvince = async () => {
    try {
      const response = await axiosInstance.get('/user/provinces');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getProvince,
  };
};

export default useGetProvince;
