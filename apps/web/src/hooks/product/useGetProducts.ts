'use client';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';

export interface GetProductsResponse {
  dataWithStock: DataWithStock;
}

export interface DataWithStock {
  productWithStock: {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updateAt: Date;
    warehouseId: number;
    stock: Stock;
    warehouse: Warehouse;
    productCategory: ProductCategory[];
  }[];
}

export interface ProductCategory {
  id: number;
  productId: number;
  categoryId: number;
  category: Category;
}

export interface Category {
  name: string;
}

export interface Stock {
  sum: number;
}

export interface Warehouse {
  latitude: number;
  longtitude: number;
  location: string;
  name: string;
}

interface PaginationQueryParams {
  take: number;
  page: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface GetProductsArg extends PaginationQueryParams {
  filter?: string;
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
  });
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get<GetProductsResponse>(
        '/product',
        {
          params: { ...query, search, userId: 1 },
        },
      );
      setData(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getProduct();
  }, [
    query.page,
    query.filter,
    query.sortBy,
    query.sortOrder,
    query.take,
    query.warehouse,
    search,
  ]);

  return { data, isLoading, setQuery, setSearch, query };
};
