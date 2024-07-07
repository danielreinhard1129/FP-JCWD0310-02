import { useMutation } from 'react-query';
import useAxios from '../useAxios';

interface IPostOrderResponse {
  invoiceNumber: string;
}

export const usePostOrder = (redirectFunc: (value: string) => void) => {
  const { axiosInstance } = useAxios();

  const postOrder = useMutation({
    mutationKey: ['postOrder'],
    mutationFn: async (payload: {
      shippingCost: number;
      shippingDetail: number;
    }) => axiosInstance.post<IPostOrderResponse>('/orders', payload),
    onSuccess: (order) => {
      redirectFunc('/transactions?payment=' + order.data.invoiceNumber);
    },
  });

  const { data, mutateAsync, mutate, isSuccess } = postOrder;
  return {
    data,
    postOrderAsync: mutateAsync,
    postOrder: mutate,
    isSuccess,
  };
};
0;
