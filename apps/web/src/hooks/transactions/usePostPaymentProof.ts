import { useMutation } from 'react-query';
import useAxios from '../useAxios';

interface IpayloadPostPaymentProof {
  images: File;
  invoiceNumber: string;
}

export const usePostPaymentProof = () => {
  const { axiosInstance } = useAxios();

  const { data, isError, isSuccess, mutateAsync, mutate } = useMutation({
    mutationFn: async (payload: IpayloadPostPaymentProof) => {
      const formData = new FormData();
      formData.append('images', payload.images);
      formData.append('invoiceNumber', payload.invoiceNumber);
      return axiosInstance.post('/transactions', formData);
    },
  });
  return { data, isError, isSuccess, mutateAsync, mutate };
};
