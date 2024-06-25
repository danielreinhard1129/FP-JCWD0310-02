import { useState } from 'react';
import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { Stock } from '@/types/stock.type';
import { Product } from '@/types/product.type';

interface GetStocksResponse {
  data: Product[];
  message: string;
}

const useGetStocks = (queryArgs?: { take: number; page: number }) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Product[]>();
  const [query, setQuery] = useState({
    page: queryArgs?.page || 1,
    take: queryArgs?.take || 10,
  });

  const getStocks = async () => {
    try {
      const response = await axiosInstance.get<GetStocksResponse>('/stocks', {
        params: query,
      });
      setData(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: () => getStocks(),
  });

  return { data, setQuery, mutation };
};

export default useGetStocks;
