// /get-users-address/:id

import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { Address } from '@/types/address.types';

const useGetUserAddress = () => {
  const { id } = useAppSelector((state) => state.user);
  console.log(id);
  const getUserAddress = async () => {
    try {
      const response = await axiosInstance.get(`/user/get-users-address/${id}`);
      console.log(response.data.Addresses);
      return response.data.Addresses;
    } catch (error) {
      throw error;
    }
  };

  return { getUserAddress };
};
export default useGetUserAddress;
