'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useNotification } from '../useNotification';

interface Warehouse {
  name: string;
  street: string;
  city: string;
  province: string;
  subdistrict: string;
}

const useCreateWarehouse = () => {
  const router = useRouter();
  const { openNotification } = useNotification();
  const createWarehouse = async (payload: Warehouse) => {
    console.log(payload);
    try {
      const { data } = await axiosInstance.post(`/warehouse/createWarehouse`, {
        ...payload,
      });
      console.log(data);
      openNotification.success({ message: 'Create Warehouse Success' });
      router.back();
    } catch (error) {
      openNotification.error({ message: 'Create Warehouse Failed' });
    }
  };
  return { createWarehouse };
};
export default useCreateWarehouse;
