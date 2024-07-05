'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

interface Warehouse {
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
}

const useCreateWarehouse = () => {
  const router = useRouter();
  const createWarehouse = async (payload: Warehouse) => {
    console.log(payload);
    try {
      const { data } = await axiosInstance.post(`/warehouse/createWarehouse`, {
        ...payload,
      });
      console.log(data);
      alert('Warehouse created successfully');
      router.back();
    } catch (error) {
      console.log(error);
    }
  };
  return { createWarehouse };
};
export default useCreateWarehouse;
