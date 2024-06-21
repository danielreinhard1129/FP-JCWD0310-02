'use client';
import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';

import { useRouter } from 'next/navigation';

interface UpdateArgs extends Omit<User, 'role' | 'lastName' | 'id'> {
  email: string;
  firstName: string;
  password: string;
  profileImageUrl: string;
}
interface RootState {
  user: {
    id: number;
  };
}

const useUpdateUser = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const updateUser = async (payload: UpdateArgs) => {
    try {
      const { data } = await axiosInstance.post(`/user/update/${id}`, {
        ...payload,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { updateUser };
};
export default useUpdateUser;
