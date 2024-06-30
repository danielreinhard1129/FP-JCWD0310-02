import { useMutation } from 'react-query';
import useAxios from '../useAxios';

interface IPostOrderResponse {
  invoiceNumber: string;
}

export const usePostOrder = (redirectFunc: (value: string) => void) => {
  const { axiosInstance } = useAxios();

  const postOrder = useMutation({
    mutationFn: async () => axiosInstance.post<IPostOrderResponse>('/orders'),
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
