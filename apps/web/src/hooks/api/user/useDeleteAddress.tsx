'use client';
import { useNotification } from '@/hooks/useNotification';
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
  const { openNotification } = useNotification();
  const userId = useAppSelector((state: RootState) => state.user.id);
  const deleteAddress = async (id: number) => {
    const response = await axiosInstance.delete(`/user/deleteAddress/${id}`, {
      params: { userId },
    });

    openNotification.success({ message: 'Address deleted successfully' });

    router.refresh();
  };
  return { deleteAddress };
};

export default useDeleteAddress;
