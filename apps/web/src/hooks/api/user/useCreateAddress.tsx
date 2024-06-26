'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';

interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  // isPrimary: boolean;
}
interface RootState {
  user: {
    id: number;
  };
}

const useCreateAddress = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  console.log(id);

  const createAddress = async (payload: Address) => {
    try {
      const { data } = await axiosInstance.post(`/user/createAddress/${id}`, {
        ...payload,
      });
      console.log(data);
      alert('Address created successfully');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return { createAddress };
};
export default useCreateAddress;
