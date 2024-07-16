'use client';
import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
  subdistricts: string;
}
interface RootState {
  user: {
    id: number;
  };
}
const useUpdateAddress = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  const { openNotification } = useNotification();
  const updateAddress = async (payload: Address) => {
    try {
      const response = await axiosInstance.post(`/user/updateAddress/${id}`, {
        ...payload,
      });
      console.log(response.data);
      openNotification.success({ message: response.data.message });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return { updateAddress };
};
export default useUpdateAddress;
