import { axiosInstance } from '@/lib/axios';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
interface User {
  Addresses: {
    id: number;
    name: string;
    lat: number;
    lon: number;
    street: string;
    city: string;
    province: string;
    postalCode: string;
    isPrimary: boolean;
  }[];
}
const useGetAddress = () => {
  const { id } = useAppSelector((state: RootState) => state.user);
  const getAddress = async (received: User) => {
    try {
      const response = await axiosInstance.get(`/user/${id}`, {
        params: { ...received },
      });
      return response.data.Addresses;
    } catch (error) {
      throw error;
    }
  };
  return { getAddress };
};
export default useGetAddress;
