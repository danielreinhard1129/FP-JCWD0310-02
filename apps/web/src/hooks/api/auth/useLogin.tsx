import { User } from '@/app/types/user.type';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
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
  const login = async (payload: LoginArgs) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        'auth/login',
        payload,
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('email', data.data.email);

      alert('login sucess');
      router.replace('/');
    } catch (error) {
      alert(error);
    }
  };

  return { login };
};
export default useLogin;
