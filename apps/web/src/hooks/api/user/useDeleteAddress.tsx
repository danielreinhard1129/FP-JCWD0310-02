'use client';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
interface RootState {
  user: {
    id: number;
  };
}
const useDeleteAddress = () => {
  const router = useRouter();
  const userId = useAppSelector((state: RootState) => state.user.id);
  const deleteAddress = async (id: number) => {
    console.log(id);
    const response = await axiosInstance.delete(`/user/deleteAddress/${id}`, {
      params: { userId },
    });
    alert('Address deleted successfully');
  };
  return { deleteAddress };
};

export default useDeleteAddress;
