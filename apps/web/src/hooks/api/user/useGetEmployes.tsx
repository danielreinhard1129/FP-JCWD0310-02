import { axiosInstance } from '@/lib/axios';

const useGetEmployes = () => {
  const getEmployes = async () => {
    try {
      const response = await axiosInstance.get('/user/get-employes');
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { getEmployes };
};
export default useGetEmployes;
