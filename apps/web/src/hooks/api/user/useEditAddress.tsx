'use client';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
interface Address {
  name: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isPrimary: boolean;
}
interface RootState {
  user: {
    id: number;
  };
}
const useUpdateAddress = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  const updateAddress = async (payload: Address) => {
    try {
      const response = await axiosInstance.post(`/user/updateAddress/${id}`, {
        ...payload,
      });
      console.log(response.data);
      alert('Address updated successfully');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return { updateAddress };
};
export default useUpdateAddress;
