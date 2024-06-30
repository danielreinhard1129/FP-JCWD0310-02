import { useQuery } from 'react-query';
import useAxios from '../useAxios';

export const useGetOrders = () => {
  const { axiosInstance } = useAxios();
  const { data, isError, isLoading, isSuccess, refetch } = useQuery({
    queryFn: async () => await axiosInstance.get('/orders'),
  });
  return;
};
