'use client';
import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';

import { useRouter } from 'next/navigation';

interface UpdateArgs extends Omit<User, 'role' | 'lastName' | 'id'> {
  email: string;
  firstName: string;
  password: string;
  profileImageUrl: File[];
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
      const updateUser = new FormData();
      updateUser.append('email', payload.email);
      updateUser.append('firstName', payload.firstName);
      updateUser.append('password', payload.password);
      updateUser.append('profileImageUrl', payload.profileImageUrl[0]);
      const { data } = await axiosInstance.post(`/user/update/${id}`, {
        updateUser,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return { updateUser };
};
export default useUpdateUser;
