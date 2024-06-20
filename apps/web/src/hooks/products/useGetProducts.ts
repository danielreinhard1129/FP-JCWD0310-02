'use client';
import { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import { Product } from '@/types/product.type';

export interface GetProductsResponse {
  data: Product[];
  count: number;
}

interface PaginationQueryParams {
  take: number;
  page: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface GetProductsArg extends PaginationQueryParams {
  filter?: string;
  size?: string;
  color?: string;
  warehouse?: number;
}

export const useGetProducts = (queryParams?: {
  page: number;
  take: number;
}) => {
  const [data, setData] = useState<GetProductsResponse>();
  const [search, setSearch] = useState<String>('');
  const [query, setQuery] = useState<GetProductsArg>({
    page: queryParams?.page || 1,
    take: queryParams?.take || 9,
    filter: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { axiosInstance } = useAxios();

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get<GetProductsResponse>(
        '/products',
        {
          params: { ...query },
        },
      );
      setData(response.data);
      console.log('ini response', response);
    } catch (error) {
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProduct();
  }, [
    query.page,
    query.filter,
    query.size,
    query.color,
    query.sortBy,
    query.sortOrder,
    query.take,
    query.warehouse,
    search,
  ]);

  return { data, isLoading, setQuery, setSearch, query };
};
