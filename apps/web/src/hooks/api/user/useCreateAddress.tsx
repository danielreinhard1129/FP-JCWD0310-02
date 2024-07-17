'use client';

import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
interface Address {
  name: string;
  street: string;
  subdistrict: string;
  city: string;
  province: string;
  postalCode: string;
}
interface RootState {
  user: {
    id: number;
  };
}

const useCreateAddress = () => {
  const { openNotification } = useNotification();

  const { id } = useAppSelector((state: RootState) => state.user);

  const createAddress = async (payload: Address) => {
    try {
      const { data } = await axiosInstance.post(`/user/createAddress/${id}`, {
        ...payload,
      });

      openNotification.success({ message: 'Address created successfully' });
    } catch (error) {}
  };
  return { createAddress };
};
export default useCreateAddress;
