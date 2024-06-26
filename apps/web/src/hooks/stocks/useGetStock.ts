import { Stock } from '@/types/stock.type';
import useAxios from '../useAxios';
import { useMutation } from 'react-query';
import { useEffect } from 'react';

interface GetStockResponse {
  data: Stock;
  messages: string;
}

export const useGetStock = (variantId: number, warehouseId: number) => {
  const { axiosInstance } = useAxios();

  const getStock = async () => {
    try {
      const response = await axiosInstance.get<GetStockResponse>(
        '/stocks/' + variantId,
        {
          params: {
            warehouse: warehouseId,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutate = useMutation({
    mutationFn: getStock,
  });

  useEffect(() => {
    mutate.mutate;
  }, []);

  return { mutate: mutate.mutate, isLoading: mutate.isLoading };
};
