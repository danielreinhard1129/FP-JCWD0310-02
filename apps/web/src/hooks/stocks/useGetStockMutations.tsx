'use client';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { StockMutations } from '@/types/stock.type';

interface GetStockMutationsResponse {
  message: string;
  data: StockMutations[];
}

export const useGetStockMutations = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<StockMutations[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({
    page: 1,
    take: 5,
    status: '',
  });

  const getStockMutations = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<GetStockMutationsResponse>(
        '/stock-mutations',
        {
          params: query,
        },
      );
      setData(response.data.data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStockMutations();
  }, [query.page, query.take, query.status]);

  return { refetch: getStockMutations, data, loading, setQuery, query };
};
