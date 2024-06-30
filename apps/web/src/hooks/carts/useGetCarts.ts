import { useQuery } from 'react-query';
import useAxios from '../useAxios';
import { Carts } from '@/types/cart.types';

export const useGetCarts = (userId: number) => {
  const { axiosInstance } = useAxios();
  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['userId', userId],
    queryFn: () => axiosInstance.get<Carts[]>('/carts/' + userId),
  });

  return { data, isSuccess, refetch };
};
