import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { Carts } from '@/types/cart.types';

export const useGetCarts = () => {
  const { axiosInstance } = useAxios();
  const getCarts = async (userId: number) => {
    try {
      const response = axiosInstance.get<Carts[]>('/carts/' + userId);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const mutate = useMutation({
    mutationFn: getCarts,
  });

  return { mutate };
};
