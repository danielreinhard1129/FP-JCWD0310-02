import { User } from '@/app/types/user.type';
import { useNotification } from '@/hooks/useNotification';
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
  const { openNotification } = useNotification();

  const updateUser = async (payload: UpdateArgs) => {
    try {
      const formData = new FormData();
      formData.append('email', payload.email);
      formData.append('firstName', payload.firstName);
      formData.append('password', payload.password);

      if (Array.isArray(payload.profileImageUrl)) {
        payload.profileImageUrl.forEach((file) => {
          formData.append('images', file);
        });
      }

      const { data } = await axiosInstance.put(`/user/update/${id}`, formData);

      openNotification.success({ message: data.message });
    } catch (error) {}
  };

  return { updateUser };
};

export default useUpdateUser;
