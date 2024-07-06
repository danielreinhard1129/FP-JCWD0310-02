import { useMutation } from 'react-query';
import useAxios from '../useAxios';

interface IPayloadPostOrderAdmin {
  orderId: number;
  type: 'CONFIRM' | 'REJECT' | 'SHIPPING';
}

export const usePostOrderAdmin = () => {
  const { axiosInstance } = useAxios();

  const { isSuccess, mutateAsync } = useMutation({
    mutationKey: ['postOrderAdmin'],
    mutationFn: async (postOrderAdmin: IPayloadPostOrderAdmin) => {
      return await axiosInstance.post('/orders/' + postOrderAdmin.orderId, {
        type: postOrderAdmin.type,
      });
    },
  });

  return { isSuccess, mutateAsync };
};
