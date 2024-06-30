import { useMutation } from 'react-query';
import useAxios from '../useAxios';

export const usePostOrder = () => {
  const { axiosInstance } = useAxios();

  const postOrder = useMutation({
    mutationFn: async () => axiosInstance.post('/orders'),
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
