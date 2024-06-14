import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
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
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        'auth/login',
        payload,
      );
      dispatch(loginAction(data.data));

      alert('login sucess');
      router.replace('/');
    } catch (error) {
      alert(error);
    }
  };

  return { login };
};
export default useLogin;
