'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';

interface Address {
  name: string;
  street: string;
  subdistrict: string;
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
    console.log(payload);
    try {
      const { data } = await axiosInstance.post(`/user/createAddress/${id}`, {
        ...payload,
      });
      console.log(data);
      alert('Address created successfully');
    } catch (error) {
      console.log(error);
    }
  };
  return { createAddress };
};
export default useCreateAddress;
