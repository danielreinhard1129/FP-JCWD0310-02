'use client';
import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const usePostCart = () => {
  const { axiosInstance } = useAxios();

  const postCart = async (
    productId: number,
    variantId: number,
    userId: number,
    quantity: number,
  ) => {
    try {
      const response = axiosInstance.post('/carts', {
        productId,
        variantId,
        userId,
        quantity,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const mutate = useMutation({
    mutationFn: ({
      productId,
      variantId,
      userId,
      quantity,
    }: {
      productId: number;
      variantId: number;
      userId: number;
      quantity: number;
    }) => postCart(productId, variantId, userId, quantity),
  });

  return { mutate };
};
