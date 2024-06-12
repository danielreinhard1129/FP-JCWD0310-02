import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';

export interface GetProductsResponse {
  data: DataWithStock;
}

export interface DataWithStock {
  product: {
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
  };
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

export const useGetProduct = (productId: number) => {
  const [id, setId] = useState<Number>(1);
  const [data, setData] = useState<GetProductsResponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get<GetProductsResponse>(
        `/product/${id}`,
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
  }, [id]);

  return { data, isLoading, id, setId };
};
