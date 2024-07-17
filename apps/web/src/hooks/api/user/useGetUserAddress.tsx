import useAxios from '@/hooks/useAxios';
import { useAppSelector } from '@/redux/hooks';
import { Address } from '@/types/address.types';
import { useQuery } from 'react-query';

const useGetUserAddress = () => {
  const { axiosInstance } = useAxios();
  const { id } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ['getUserAddresses'],
    queryFn: () =>
      axiosInstance.get<Address[]>(`/user/get-users-address/${id}`),
  });
  return { data };
};
export default useGetUserAddress;
