'use client';

import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slicers/userSlice';
// import { loginAction } from '@/redux/slices/userSlice';

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const dispatch = useAppDispatch();
  const keeplogin = async () => {
    try {
      const { data } =
        await axiosInstance.get<KeepLoginResponse>('/auth/keep-login');

      dispatch(loginAction(data.data));
    } catch (error) {}
  };
  return { keeplogin };
};

export default useKeepLogin;
