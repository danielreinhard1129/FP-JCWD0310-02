import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import useAxios from '../useAxios';
import { Stock } from '@/types/stock.type';
import { Product } from '@/types/product.type';
import { Warehouse } from 'lucide-react';

interface IProductStocks extends Product {
  warehouse: string;
  warehouseId: number;
}

interface GetStocksResponse {
  data: IProductStocks[];
  message: string;
}

const useGetStocks = (queryArgs: {
  take?: number;
  page?: number;
  warehouseId: number;
}) => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Product[]>();
  const [query, setQuery] = useState({
    page: queryArgs.page || 1,
    take: queryArgs.take || 10,
    warehouseId: queryArgs.warehouseId,
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

  useEffect(() => {
    mutation.mutate();
  }, [query.page, query.take, query.warehouseId]);

  return { data, setQuery, mutation, query };
};

export default useGetStocks;
