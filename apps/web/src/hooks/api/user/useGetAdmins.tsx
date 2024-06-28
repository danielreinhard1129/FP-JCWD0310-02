'use client';
import { axiosInstance } from '@/lib/axios';

interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  password: string;
}

const useWarehousesAdmin = () => {
  const getWarehousesAdmin = async () => {
    try {
      const response = await axiosInstance.get(`/user/getUsers`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { getWarehousesAdmin };
};

export default useWarehousesAdmin;
