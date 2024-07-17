'use client';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';

interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
}

const useGetUser = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  const getUser = async (received: User) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`, {
        params: { ...received },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { getUser };
};
export default useGetUser;
