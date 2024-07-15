import { User } from '@/app/types/user.type';
import { useNotification } from '@/hooks/useNotification';
import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { adminLoginAction } from '@/redux/slicers/adminSlice';

import { loginAction } from '@/redux/slicers/userSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';

interface LoginArgs extends Pick<User, 'email' | 'role'> {
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { openNotification } = useNotification();
  const { role } = useAppSelector((state) => state.user);
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        '/auth/login',
        payload,
      );
      console.log(data);
      if (data.data) {
        if (data.data.role == 'CUSTOMER') {
          dispatch(loginAction(data.data));
        } else if (
          data.data.employee &&
          (data.data.role == 'WAREHOUSE_ADMIN' ||
            data.data.role == 'SUPER_ADMIN')
        ) {
          dispatch(loginAction(data.data));
          dispatch(adminLoginAction(data.data.employee));
        }
        localStorage.setItem('token', data.token);
        openNotification.success({ message: 'Login success' });

        router.replace('/');
      } else {
        openNotification.error({ message: 'Login failed' });
      }
    } catch (error) {
      openNotification.error({ message: 'Login failed' });
    }
  };

  return { login };
};
export default useLogin;
