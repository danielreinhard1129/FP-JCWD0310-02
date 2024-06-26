'use client';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { StockMutations } from '@/types/stock.type';

interface GetStockMutationsResponse {
  message: string;
  data: StockMutations[];
}

export const useGetStockJournals = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<StockMutations[]>([]);
  const [loading, setLoading] = useState(false);

  const getStockJournals = async () => {
    try {
      setLoading(true);
      const response =
        await axiosInstance.get<GetStockMutationsResponse>('/stock-mutations');
      setData(response.data.data);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStockJournals();
  }, []);

  return { refetch: getStockJournals, data, loading };
};
